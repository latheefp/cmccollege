"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, History, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const QUICK_LINKS = [
    { name: "Academic Calendar", href: "/academics#calendar" },
    { name: "Admission Forms", href: "/admissions" },
    { name: "Campus Gallery", href: "/gallery" },
    { name: "Contact Administration", href: "/contact" },
];

const TRENDING = ["NEET Coaching", "Hostel Facilities", "Scholarships", "Integrated Program"];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                            <span className="text-xs font-black text-emerald-900/60 uppercase tracking-widest ml-2">Search Portal</span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            {/* Search Input Area */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/50 w-5 h-5 group-focus-within:text-emerald-900 transition-colors" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="What are you looking for?"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl py-4 pl-12 pr-10 text-lg font-medium text-emerald-950 focus:bg-white focus:border-emerald-500/30 outline-none transition-all placeholder:text-emerald-900/40"
                                />
                                {query && (
                                    <button
                                        onClick={() => setQuery("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-emerald-900/60 hover:text-emerald-900 uppercase"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Suggestions */}
                            {!query && (
                                <div className="space-y-6">
                                    {/* Quick Links */}
                                    <div>
                                        <h3 className="flex items-center gap-2 text-[11px] font-black text-emerald-900/60 uppercase tracking-[0.2em] mb-4">
                                            <History size={12} /> Quick Links
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {QUICK_LINKS.map((link) => (
                                                <a
                                                    key={link.name}
                                                    href={link.href}
                                                    className="group flex items-center justify-between p-3 bg-emerald-50/30 rounded-xl hover:bg-white border border-transparent hover:border-emerald-100 transition-all text-left"
                                                >
                                                    <span className="text-emerald-900 font-bold text-sm">{link.name}</span>
                                                    <ArrowRight size={12} className="text-emerald-900/30 group-hover:translate-x-1 transition-all" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Trending */}
                                    <div>
                                        <h3 className="flex items-center gap-2 text-[11px] font-black text-emerald-900/60 uppercase tracking-[0.2em] mb-4">
                                            <TrendingUp size={12} /> Trending
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {TRENDING.map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setQuery(tag)}
                                                    className="px-4 py-2 bg-white border border-emerald-100 rounded-lg text-xs font-black text-emerald-900 uppercase hover:bg-emerald-900 hover:text-white transition-all shadow-sm"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Search Results Placeholder */}
                            {query && (
                                <div className="py-10 text-center border-t border-emerald-50">
                                    <p className="text-emerald-900/70 text-sm font-bold uppercase tracking-widest">Searching for "{query}"...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
