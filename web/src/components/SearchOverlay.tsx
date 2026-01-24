"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, History, ArrowRight, FileText } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";

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

const TRENDING = ["Integrated NEET/JEE", "Student Hostel", "Integrated +1 & +2", "Admission Process"];

// Search Index Data
const SEARCH_INDEX = [
    {
        title: "Institutional Excellence",
        type: "About Us",
        url: "/about",
        content: "Fostering a legacy of academic rigor, moral integrity, and relentless innovation in a world-class learning environment. Founded in 2010, CM College has grown into a premier institution bridging traditional values and modern education. We believe in nurturing future leaders grounded in ethics and skilled for the global stage."
    },
    {
        title: "Academic Programs",
        type: "Academics",
        url: "/academics",
        content: "Integrated +1 and +2 education combining rigorous academic excellence with Islamic values and professional entrance coaching like NEET, JEE, and CA Foundation. Our unique Integrated Program provides systematic entrance exam preparation and spiritual mentorship."
    },
    {
        title: "Science Stream",
        type: "Academics",
        url: "/academics",
        content: "Our Science stream is engineered for students aiming for careers in Medicine, Engineering, and Research. Intensive training in Physics, Chemistry, Biology, and Mathematics with integrated coaching modules."
    },
    {
        title: "Chairman's Message",
        type: "About Us",
        url: "/about#chairman",
        content: "Dr. Abdul Rahman guides our institution with wisdom. The CM Centre has established educational institutions in Kozhikode and Wayanad, providing opportunities to people of all ages and helping students from disadvantaged backgrounds pursue successful careers in Medicine, Engineering, and Teaching."
    },
    {
        title: "Admissions 2024",
        type: "Admissions",
        url: "/admissions",
        content: "Apply now for the upcoming academic year. We offer Merit-based scholarships and specialized hostel facilities for students from far-off locations. Admission desk is open for counseling and campus tours."
    },
    {
        title: "Campus Amenities",
        type: "Amenities",
        url: "/amenities",
        content: "Our campus features high-tech science laboratories, a digital library, spacious classrooms, and modern sports infrastructure. Supervised night study sessions and Quranic training are part of our residential program."
    },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            inputRef.current?.focus();
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    // Advanced Search Logic
    const searchResults = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();

        return SEARCH_INDEX.map(item => {
            const titleMatch = item.title.toLowerCase().includes(lowerQuery);
            const contentMatch = item.content.toLowerCase().includes(lowerQuery);
            const typeMatch = item.type.toLowerCase().includes(lowerQuery);

            if (!titleMatch && !contentMatch && !typeMatch) return null;

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
                score: titleMatch ? 2 : 1
            };
        })
            .filter((item): item is NonNullable<typeof item> => item !== null)
            .sort((a, b) => b.score - a.score);
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
                    className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0, y: -10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                            <span className="text-xs font-black text-emerald-900/60 uppercase tracking-widest ml-2">Smart Search</span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-6 overflow-hidden">
                            {/* Search Input Area */}
                            <div className="relative group shrink-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/50 w-5 h-5 group-focus-within:text-emerald-900 transition-colors" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type to search content..."
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

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                                {/* Suggestions Area */}
                                {!query && (
                                    <div className="space-y-6 pb-2">
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
                                                        onClick={onClose}
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

                                {/* Search Results */}
                                {query && (
                                    <div className="space-y-4 pb-2">
                                        <h3 className="text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em] px-1">
                                            Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                                        </h3>
                                        {searchResults.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-3">
                                                {searchResults.map((result, idx) => (
                                                    <a
                                                        key={`${result.url}-${idx}`}
                                                        href={result.url}
                                                        className="flex flex-col p-4 bg-emerald-50/50 rounded-2xl hover:bg-white border border-emerald-100 transition-all group"
                                                        onClick={onClose}
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <FileText size={14} className="text-emerald-800" />
                                                                <span className="text-emerald-950 font-black text-sm uppercase tracking-tight">
                                                                    <HighlightText text={result.title} highlight={query} />
                                                                </span>
                                                            </div>
                                                            <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase tracking-widest">
                                                                {result.type}
                                                            </span>
                                                        </div>
                                                        <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2">
                                                            <HighlightText text={result.snippet} highlight={query} />
                                                        </p>
                                                        <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            View Page <ArrowRight size={10} />
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-12 text-center bg-zinc-50/50 rounded-3xl border border-dashed border-zinc-200">
                                                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Search size={20} className="text-zinc-400" />
                                                </div>
                                                <p className="text-zinc-500 text-sm font-medium">No matches found for "{query}"</p>
                                                <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">Try different keywords</p>
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
