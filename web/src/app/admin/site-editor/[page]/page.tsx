"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import EditorModal from "../_components/EditorModal";

// Import Page Components
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import AcademicsPage from "@/app/academics/page";
import AdmissionsPage from "@/app/admissions/page";
import FacilitiesPage from "@/app/facilities/page";
import ContactPage from "@/app/contact/page";

const PAGES: Record<string, React.ComponentType<any>> = {
    home: HomePage,
    about: AboutPage,
    academics: AcademicsPage,
    admissions: AdmissionsPage,
    facilities: FacilitiesPage,
    contact: ContactPage,
};

export default function SiteEditorPage() {
    const params = useParams();
    const pageSlug = params.page as string;
    const pageKey = pageSlug?.toLowerCase();

    const PageComponent = PAGES[pageKey];

    // State for Editor Modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedElement, setSelectedElement] = React.useState<{
        key: string,
        page: string,
        label: string,
        type: 'text' | 'image',
        initialValue: string
    } | null>(null);

    // Refs for DOM manipulation and restoring
    const activeElementRef = React.useRef<HTMLElement | null>(null);
    const originalValueRef = React.useRef<string>("");

    // Use Effect to handle double-click events
    useEffect(() => {
        const handleDoubleClick = (e: MouseEvent) => {
            // Find the closest editable element
            const target = (e.target as HTMLElement).closest('[data-editable]');

            if (target && target instanceof HTMLElement) {
                e.preventDefault();
                e.stopPropagation();

                const editableKey = target.getAttribute('data-editable');
                const editablePage = target.getAttribute('data-page');

                if (editableKey && editablePage) {
                    // Store DOM reference
                    activeElementRef.current = target;

                    // Determine Type and Value
                    let type: 'text' | 'image' = 'text';
                    let initialValue = '';

                    if (target.tagName === 'IMG') {
                        type = 'image';
                        initialValue = target.getAttribute('src') || '';
                        // Special handling for Next.js Image component which might wrap the img or modify src
                        // Usually Next.js Images have src attribute on the img tag.
                        // However, if we are using srcset, we might need to be careful.
                        // For Step 4, we assume changing 'src' is enough for visual preview.
                        // Note: If using Next.js <Image>, updating 'src' directly might work for preview.
                        // But srcset might override it. Let's see.
                        if (target.hasAttribute('srcset')) {
                            // Clear srcset to ensure src takes precedence during preview
                            target.setAttribute('data-original-srcset', target.getAttribute('srcset') || '');
                            target.removeAttribute('srcset');
                        }
                    } else {
                        initialValue = target.innerText;
                    }

                    originalValueRef.current = initialValue;

                    // Highlight Effect
                    const originalOutline = target.style.outline;
                    const originalTransition = target.style.transition;

                    target.style.transition = 'all 0.2s ease-in-out';
                    target.style.outline = '4px solid #10b981'; // Emerald-500
                    target.style.borderRadius = '4px';
                    target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.2)';
                    target.style.cursor = 'pointer';

                    // Remove highlight after a short delay
                    setTimeout(() => {
                        target.style.outline = originalOutline;
                        target.style.transition = originalTransition;
                        target.style.boxShadow = '';
                        target.style.borderRadius = '';
                    }, 800);

                    // Open Modal
                    setSelectedElement({
                        key: editableKey,
                        page: editablePage,
                        label: editableKey.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), // Simple Humanize
                        type,
                        initialValue
                    });
                    setIsModalOpen(true);
                }
            }
        };

        // Attach event listener to the document
        document.addEventListener('dblclick', handleDoubleClick);

        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
        };
    }, []);

    const handleUpdate = (newValue: string) => {
        if (activeElementRef.current) {
            if (selectedElement?.type === 'image') {
                activeElementRef.current.setAttribute('src', newValue);
            } else {
                activeElementRef.current.innerText = newValue;
            }
        }
    };

    const handleClose = () => {
        // Restore original value if cancelled (simplified for now: we assume close = cancel/finish without save)
        // Step 4 "Cancelling restores original value".
        // But "Confirming" (or clicking outside?) isn't explicitly separated from Cancel in UI yet.
        // Let's assume closing the modal WITHOUT a future 'Save' action implies revert?
        // Wait, Step 4 says "Safely discard changes until publishing".
        // Actually, usually "Save" in modal means "Keep in memory", "Cancel" means "Revert".
        // The modal currently has "Cancel" and "Save Changes".
        // Let's split logic:
        // Modal needs to distinguish Cancel vs Save.
        // For now, let's implement: Closing via X/Backdrop/Cancel -> Revert.
        // If the user clicked "Save" (which is disabled in previous step, but we should enable it for 'local' save),
        // we wouldn't revert.
        // Let's leave "Save" button disabled/dummy for now or enable it as "Apply"?
        // Prompt says "Add 'Cancel' action... Cancelling restores original value".
        // So we need a distinct onCancel.

        setIsModalOpen(false);
        // We'll handle the actual revert logic in a specific onCancel handler passed to Modal,
        // OR we just revert here if we define 'close' as 'cancel'.
        // Let's assume for this step, if we just close the modal, we revert.
        // If the user clicked "Save" (which is disabled in previous step, but we should enable it for 'local' save),
        // we wouldn't revert.
        // Let's leave "Save" button disabled/dummy for now or enable it as "Apply"?
        // Prompt says "Add 'Cancel' action... Cancelling restores original value".
        // So we need a distinct onCancel.
    };

    const handleCancel = () => {
        if (activeElementRef.current) {
            if (selectedElement?.type === 'image') {
                activeElementRef.current.setAttribute('src', originalValueRef.current);
                // Restore srcset if it was hidden
                if (activeElementRef.current.hasAttribute('data-original-srcset')) {
                    activeElementRef.current.setAttribute('srcset', activeElementRef.current.getAttribute('data-original-srcset') || '');
                    activeElementRef.current.removeAttribute('data-original-srcset');
                }
            } else {
                activeElementRef.current.innerText = originalValueRef.current;
            }
        }
        setIsModalOpen(false);
    }

    // We treat "Close" (X, backdrop) as Cancel for safety to avoid accidental persistent edits in view mode
    // Ideally "Save" should commit to a local store. For Step 4, "Live Preview" is key.
    // If I close the modal, should the text STAY changed or REVERT?
    // "Cancelling restores original value". implied that "Saving/Confirming" KEEPS it.
    // I'll update EditorModal to call onCancel.

    if (!PageComponent) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4">
                    !
                </div>
                <h2 className="text-2xl font-bold text-zinc-800 mb-2">Page Not Found</h2>
                <p className="text-zinc-500 max-w-md mx-auto mb-8">
                    The page <span className="font-mono bg-zinc-100 px-2 py-1 rounded text-zinc-700">"{pageSlug}"</span> is not available in the Site Editor.
                </p>
                <Link href="/admin" className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            {/* Editor Toolbar / Header */}
            <div className="bg-emerald-900/90 backdrop-blur text-white px-6 py-4 rounded-t-xl shadow-lg flex justify-between items-center z-30 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold tracking-wider text-sm uppercase">Editor Mode</span>
                    <span className="text-emerald-400/50">|</span>
                    <span className="text-emerald-100 font-medium capitalize">{pageKey} Page</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-emerald-200/80">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Double-click elements to edit
                    </span>
                </div>
            </div>

            {/* Page Preview Viewport */}
            <div className="flex-grow relative border-x-4 border-b-4 border-emerald-900/10 rounded-b-xl overflow-hidden bg-white shadow-xl isolate">
                {/*
            Container for the page.
            We use 'isolate' to create a new stacking context so page fixed elements don't escape easily (though fixed refers to viewport).
            Since typical pages use 'fixed' for standard navbar, it might look messy.
            Ideally we would render this in an iframe, but Step 2 asks to "load page component".
            We'll render it directly.
        */}
                <div className="h-full w-full overflow-y-auto relative no-scrollbar">
                    <PageComponent />
                </div>

                {/* Overlay to prevent interaction (links etc) for now?
            Prompt says "No event listeners yet", "No edit logic yet".
            It does NOT say "Disable interactions".
            But "No backend interaction".
            If I click a Link in the page, it will navigate AWAY from admin.
            Maybe I should prevent navigation?
            Step 3 adds interactions.
            For now, I'll leave it interactive (links work) or just let it be.
            The prompt says "View and navigate the real website pages inside an editor context".
            Actually, "navigate" implies I should be able to click links?
            But if I click a link to "/about", I go to the PUBLIC /about page, leaving the admin.
            Ideally links should navigate to `/admin/site-editor/about`.
            But I cannot change the `Link` components inside `HomePage` easily without refactoring.
            So navigation might be broken (leads out of editor).
            That's acceptable for Step 2 "View Mode".
            Step 2 goal: "Admin sees the real website inside admin panel".
        */}
            </div>

            {/* Editor Modal */}
            <EditorModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                onUpdate={handleUpdate}
                selectedElement={selectedElement}
                onSave={() => setIsModalOpen(false)}
            />
        </div>
    );
}
