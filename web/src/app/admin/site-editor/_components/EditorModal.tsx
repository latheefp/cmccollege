"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface EditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (value: string) => void;
    selectedElement: {
        key: string;
        page: string;
        label: string;
        type: 'text' | 'image';
        initialValue: string;
    } | null;
    onUpdate: (value: string) => void;
}

export default function EditorModal({ isOpen, onClose, selectedElement, onUpdate, onSave }: EditorModalProps) {
    const [value, setValue] = React.useState("");

    useEffect(() => {
        if (isOpen && selectedElement) {
            setValue(selectedElement.initialValue);
        }
    }, [isOpen, selectedElement]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
        onUpdate(newValue);
    };

    if (!isOpen || !selectedElement) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-emerald-900 px-6 py-4 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="text-white font-bold text-lg">Edit Content</h3>
                        <div className="flex items-center gap-2 text-emerald-200 text-xs uppercase tracking-wider font-semibold">
                            <span>{selectedElement.page}</span>
                            <span>•</span>
                            <span>{selectedElement.label}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {selectedElement.type === 'text' ? (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-700">
                                Text Content
                            </label>
                            <textarea
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                className="w-full h-40 p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y"
                                placeholder="Enter text content..."
                            />
                            <p className="text-xs text-zinc-400">
                                Changes are previewed live on the page behind this modal.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-700">
                                    Image Source (URL)
                                </label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleChange(e.target.value)}
                                    className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-700">
                                    Preview
                                </label>
                                <div className="relative w-full aspect-video bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 flex items-center justify-center">
                                    {value ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={value}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    ) : (
                                        <span className="text-zinc-400 text-sm">No image selected</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-100 flex justify-end gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-zinc-500 font-medium hover:text-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave?.(value)}
                        className="px-6 py-2 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-900 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
