"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface EditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedElement: {
        key: string;
        page: string;
        label: string;
    } | null;
}

export default function EditorModal({ isOpen, onClose, selectedElement }: EditorModalProps) {
    if (!isOpen || !selectedElement) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-emerald-900 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-bold text-lg">Edit Content</h3>
                        <p className="text-emerald-200 text-xs uppercase tracking-wider font-semibold">
                            {selectedElement.page} Page
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                            Editing Target
                        </label>
                        <div className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 font-mono text-sm break-all">
                            {selectedElement.key}
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-amber-800 text-sm">
                        <span className="text-xl">🚧</span>
                        <p>
                            <strong>Editor interactions are disabled.</strong><br />
                            This is a preview mode. Editing logic will be enabled in the next step.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-zinc-500 font-medium hover:text-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        disabled
                        className="px-6 py-2 bg-emerald-800/50 text-white font-bold rounded-lg cursor-not-allowed opacity-70"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
