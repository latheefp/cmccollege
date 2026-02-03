"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, History, ArrowRight, FileText, GraduationCap, Building, Link as LinkIcon, Newspaper } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { SEARCH_INDEX, SearchItem } from "@/data/searchIndex";
import Link from "next/link"; // Use Next.js Link for internal navigation

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const QUICK_LINKS = [
    { name: "Academic Programs", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact & Enquiry", href: "/contact" },
];

const TRENDING = ["Computer Science", "Hostel", "Scholarships", "BBA"];

// Helper to get icon based on type
const getTypeIcon = (type: SearchItem["type"]) => {
    switch (type) {
        case "Department": return GraduationCap;
        case "Amenity": return Building;
        case "News": return Newspaper;
        case "Service": return LinkIcon;
        default: return FileText;
    }
};

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Small delay to ensure render before focus
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    // Enhanced Search Logic
    const searchResults = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase().trim();
        const queryWords = lowerQuery.split(/\s+/); // Split by space for multi-word matching

        return SEARCH_INDEX.map(item => {
            let score = 0;
            const lowerTitle = item.title.toLowerCase();
            const lowerContent = item.content.toLowerCase();

            // 1. Exact Title Match (Highest Priority)
            if (lowerTitle === lowerQuery) score += 20;
            // 2. Partial Title Match
            else if (lowerTitle.includes(lowerQuery)) score += 10;

            // 3. Keyword Match
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(lowerQuery)) score += 5;
            });

            // 4. Content Match
            if (lowerContent.includes(lowerQuery)) score += 2;

            // 5. Multi-word robustness (if user types "cs dept", check both words)
            if (queryWords.length > 1) {
                const allWordsMatch = queryWords.every(word =>
                    lowerTitle.includes(word) ||
                    item.keywords.some(k => k.toLowerCase().includes(word)) ||
                    lowerContent.includes(word)
                );
                if (allWordsMatch) score += 5;
            }

            if (score === 0) return null;

            // Extract snippet
            let snippet = "";
            const sentences = item.content.match(/[^\.!\?]+[\.!\?]+/g) || [item.content];
            const matchingSentence = sentences.find(s => s.toLowerCase().includes(lowerQuery));

            if (matchingSentence) {
                snippet = matchingSentence.trim();
            } else {
                snippet = item.content.substring(0, 100) + "...";
            }

            return {
                ...item,
                snippet,
                score
            };
        })
            .filter((item): item is NonNullable<typeof item> & { snippet: string, score: number } => item !== null)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8); // Limit to top 8 results
    }, [query]);

    // Highlighting function
    const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
        if (!highlight.trim()) return <span>{text}</span>;

        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <mark key={i} className="bg-emerald-100 text-emerald-900 font-bold px-0.5 rounded-sm">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-[100] bg-zinc-950/60 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-24 px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-zinc-100 ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                            <span className="text-[10px] md:text-xs font-black text-emerald-900/60 uppercase tracking-[0.2em] ml-2">Global Search</span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600 outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 md:p-6 flex flex-col gap-6 overflow-hidden h-full">
                            {/* Search Input Area */}
                            <div className="relative group shrink-0">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 group-focus-within:text-emerald-700 transition-colors" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search departments, facilities, or information..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-4 pl-12 pr-10 text-lg font-medium text-zinc-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-zinc-400"
                                />
                                {query && (
                                    <button
                                        onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-200 text-zinc-400 transition-all"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 h-full pr-2 custom-scrollbar">
                                {/* Suggestions Area */}
                                {!query && (
                                    <div className="space-y-8 pb-4">
                                        {/* Quick Links */}
                                        <div>
                                            <h3 className="flex items-center gap-2 text-[11px] font-black text-emerald-900/50 uppercase tracking-[0.2em] mb-4">
                                                <History size={12} /> Quick Links
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {QUICK_LINKS.map((link) => (
                                                    <Link
                                                        key={link.name}
                                                        href={link.href}
                                                        className="group flex items-center justify-between p-3.5 bg-white rounded-xl hover:bg-emerald-50 border border-zinc-100 hover:border-emerald-100 transition-all text-left shadow-sm hover:shadow-md"
                                                        onClick={onClose}
                                                    >
                                                        <span className="text-zinc-700 group-hover:text-emerald-900 font-semibold text-sm">{link.name}</span>
                                                        <ArrowRight size={14} className="text-zinc-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Trending */}
                                        <div>
                                            <h3 className="flex items-center gap-2 text-[11px] font-black text-emerald-900/50 uppercase tracking-[0.2em] mb-4">
                                                <TrendingUp size={12} /> Trending
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {TRENDING.map((tag) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setQuery(tag)}
                                                        className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-xs font-bold text-zinc-600 uppercase hover:bg-emerald-900 hover:text-white hover:border-emerald-900 transition-all cursor-pointer"
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Search Results */}
                                {query && (
                                    <div className="space-y-4 pb-2">
                                        <h3 className="text-[10px] font-black text-emerald-900/50 uppercase tracking-[0.2em] px-1 sticky top-0 bg-white/95 backdrop-blur-sm py-2 z-10">
                                            Found {searchResults.length} matches
                                        </h3>
                                        {searchResults.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-3">
                                                {searchResults.map((result, idx) => {
                                                    const Icon = getTypeIcon(result.type);
                                                    return (
                                                        <Link
                                                            key={`${result.url}-${idx}`}
                                                            href={result.url}
                                                            className="flex flex-col p-4 bg-white rounded-xl hover:bg-emerald-50/50 border border-zinc-100 hover:border-emerald-200 transition-all group shadow-sm hover:shadow-md cursor-pointer"
                                                            onClick={onClose}
                                                        >
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className={`p-1.5 rounded-lg shrink-0 ${result.type === 'Department' ? 'bg-blue-50 text-blue-600' :
                                                                        result.type === 'Amenity' ? 'bg-orange-50 text-orange-600' :
                                                                            'bg-emerald-50 text-emerald-600'
                                                                        }`}>
                                                                        <Icon size={16} strokeWidth={2.5} />
                                                                    </div>
                                                                    <span className="text-zinc-900 font-bold text-sm md:text-base group-hover:text-emerald-950 transition-colors">
                                                                        <HighlightText text={result.title} highlight={query} />
                                                                    </span>
                                                                </div>
                                                                <span className="text-[9px] font-black bg-zinc-100 text-zinc-500 px-2 py-1 rounded uppercase tracking-wider shrink-0">
                                                                    {result.type}
                                                                </span>
                                                            </div>
                                                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed line-clamp-2 pl-9">
                                                                <HighlightText text={result.snippet} highlight={query} />
                                                            </p>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="py-16 text-center bg-zinc-50/50 rounded-3xl border border-dashed border-zinc-200 flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                                    <Search size={24} className="text-zinc-300" />
                                                </div>
                                                <p className="text-zinc-900 font-bold text-lg mb-1">No results found</p>
                                                <p className="text-zinc-500 text-sm">We couldn't find anything matching "{query}"</p>
                                                <button
                                                    onClick={() => setQuery("")}
                                                    className="mt-6 text-emerald-700 font-bold text-sm hover:underline"
                                                >
                                                    Clear search & try again
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
