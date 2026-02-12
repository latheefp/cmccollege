"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Download, Filter, ChevronRight, Book, GraduationCap, Clock, Loader2, X, Menu, CheckCircle, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import toast from "react-hot-toast";
import { semesters, departments } from "@/data/question-papers";

export default function QuestionBankPage() {
    const [mockQuestions, setMockQuestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedSem, setSelectedSem] = useState("All");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const res = await fetch("/api/question-papers");
                const data = await res.json();
                if (data.success) {
                    setMockQuestions(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch papers:", error);
                toast.error("Failed to load question papers");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPapers();
    }, []);

    // Prevent body scroll when mobile filter is open
    useEffect(() => {
        if (isFiltersOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isFiltersOpen]);

    const filteredQuestions = mockQuestions.filter(q => {
        const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDept === "All" || q.department === selectedDept;
        const matchesSem = selectedSem === "All" || q.semester === selectedSem;
        return matchesSearch && matchesDept && matchesSem;
    });

    const displayedQuestions = filteredQuestions.slice(0, visibleCount);

    const handleLoadMore = () => {
        setIsMoreLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 4);
            setIsMoreLoading(false);
        }, 800);
    };

    const getFinalUrl = (url: string) => {
        if (!url) return "#";
        const trimmed = url.trim();
        if (trimmed === "#") return "#";

        // Only prepend https:// if it doesn't already have a protocol
        const hasProtocol = /^[a-z][a-z0-9+.-]*:/i.test(trimmed);
        return hasProtocol ? trimmed : `https://${trimmed}`;
    };

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 font-sans pt-[104px] lg:pt-[112px]">
            {/* Hero Section */}
            <section className="relative py-20 px-6 bg-[#7a0b3a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[30px_30px]" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-maroon-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <ScrollReveal>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-pink-100 text-sm font-bold tracking-widest uppercase mb-6">
                                    <GraduationCap size={16} />
                                    Academic Resources
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase leading-tight">
                                    Question Bank
                                </h1>
                                <p className="text-xl text-pink-100/80 leading-relaxed font-medium">
                                    Access comprehensive collection of previous year university question papers to excel in your examinations.
                                </p>
                            </ScrollReveal>
                        </div>

                        <div className="w-full max-w-md">
                            <ScrollReveal delay={200}>
                                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                            <BookOpen className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white uppercase tracking-wider leading-none">Smart Search</h3>
                                            <p className="text-pink-100/60 text-xs mt-1 uppercase tracking-widest font-bold">Find papers in seconds</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search by subject or code..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-white text-zinc-900 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-pink-500/20 transition-all border-none font-medium shadow-inner"
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter & Results Section */}
            <section className="py-16 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-36 z-40 self-start h-fit">
                        {/* Mobile Toggle Button */}
                        <div className="lg:hidden mb-6 sticky top-28 z-40">
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className="w-full flex items-center justify-between bg-[#7a0b3a] text-white p-4 rounded-2xl shadow-lg font-bold uppercase tracking-wider backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <Filter size={20} />
                                    <span>Filters</span>
                                    {(selectedDept !== "All" || selectedSem !== "All") && (
                                        <span className="ml-2 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                                    )}
                                </div>
                                {isFiltersOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>

                        {/* Mobile Overlay/Drawer */}
                        <AnimatePresence>
                            {isFiltersOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: "100%" }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: "100%" }}
                                    transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                                    className="lg:hidden fixed inset-0 z-100 bg-white p-6 pt-28 overflow-y-auto overscroll-contain pb-20"
                                >
                                    {/* Mobile Header in Overlay */}
                                    <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
                                        <div className="flex items-center gap-2">
                                            <Filter size={20} className="text-[#7a0b3a]" />
                                            <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-800">Filters</h2>
                                        </div>
                                        <button
                                            onClick={() => setIsFiltersOpen(false)}
                                            className="p-2 rounded-full bg-zinc-100 text-zinc-600 active:scale-95 transition-transform"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Department Filter (Mobile) */}
                                        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm border-l-4 border-l-[#7a0b3a]">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#7a0b3a] mb-6 flex items-center gap-2">
                                                <Book size={14} />
                                                Department
                                            </h3>
                                            <div className="space-y-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedDept("All");
                                                        setIsFiltersOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all hover:cursor-pointer ${selectedDept === "All" ? "bg-[#7a0b3a] text-white shadow-md shadow-[#7a0b3a]/20" : "hover:bg-zinc-50 text-zinc-600 border border-transparent hover:border-zinc-200"}`}
                                                >
                                                    All Departments
                                                </button>
                                                {departments.map(dept => (
                                                    <button
                                                        key={dept}
                                                        onClick={() => {
                                                            setSelectedDept(dept);
                                                            setIsFiltersOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all hover:cursor-pointer ${selectedDept === dept ? "bg-[#7a0b3a] text-white shadow-md shadow-[#7a0b3a]/20" : "hover:bg-zinc-50 text-zinc-600 border border-transparent hover:border-zinc-200"}`}
                                                    >
                                                        {dept}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Semester Filter (Mobile) */}
                                        <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm border-l-4 border-l-emerald-800 mt-6">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-6 flex items-center gap-2">
                                                <Clock size={14} />
                                                Semester
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedSem("All");
                                                        setIsFiltersOpen(false);
                                                    }}
                                                    className={`col-span-2 text-center px-4 py-3 rounded-xl text-sm hover:cursor-pointer font-bold transition-all ${selectedSem === "All" ? "bg-emerald-800 text-white shadow-md" : "bg-zinc-50 text-zinc-600 border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50"}`}
                                                >
                                                    All
                                                </button>
                                                {semesters.map(sem => (
                                                    <button
                                                        key={sem}
                                                        onClick={() => {
                                                            setSelectedSem(sem);
                                                            setIsFiltersOpen(false);
                                                        }}
                                                        className={`text-center px-3 py-3 rounded-xl text-xs hover:cursor-pointer font-bold transition-all ${selectedSem === sem ? "bg-emerald-800 text-white shadow-md" : "bg-zinc-50 text-zinc-600 border border-zinc-100 hover:border-emerald-100 hover:bg-emerald-50"}`}
                                                    >
                                                        Sem {sem.split(" ")[1]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Desktop Filters (Static) */}
                        <div className="hidden lg:block space-y-8">
                            <ScrollReveal>
                                <div className="flex items-center gap-2 mb-6">
                                    <Filter size={18} className="text-[#7a0b3a]" />
                                    <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-800">Filters</h2>
                                </div>

                                {/* Department Filter */}
                                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm border-l-4 border-l-[#7a0b3a]">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#7a0b3a] mb-6 flex items-center gap-2">
                                        <Book size={14} />
                                        Department
                                    </h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setSelectedDept("All")}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all hover:cursor-pointer ${selectedDept === "All" ? "bg-[#7a0b3a] text-white shadow-md shadow-[#7a0b3a]/20" : "hover:bg-zinc-50 text-zinc-600 border border-transparent hover:border-zinc-200"}`}
                                        >
                                            All Departments
                                        </button>
                                        {departments.map(dept => (
                                            <button
                                                key={dept}
                                                onClick={() => setSelectedDept(dept)}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all hover:cursor-pointer ${selectedDept === dept ? "bg-[#7a0b3a] text-white shadow-md shadow-[#7a0b3a]/20" : "hover:bg-zinc-50 text-zinc-600 border border-transparent hover:border-zinc-200"}`}
                                            >
                                                {dept}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Semester Filter */}
                                <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm border-l-4 border-l-emerald-800 mt-6">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-800 mb-6 flex items-center gap-2">
                                        <Clock size={14} />
                                        Semester
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setSelectedSem("All")}
                                            className={`col-span-2 text-center px-4 py-3 rounded-xl text-sm hover:cursor-pointer font-bold transition-all ${selectedSem === "All" ? "bg-emerald-800 text-white shadow-md" : "bg-zinc-50 text-zinc-600 border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50"}`}
                                        >
                                            All
                                        </button>
                                        {semesters.map(sem => (
                                            <button
                                                key={sem}
                                                onClick={() => setSelectedSem(sem)}
                                                className={`text-center px-3 py-3 rounded-xl text-xs hover:cursor-pointer font-bold transition-all ${selectedSem === sem ? "bg-emerald-800 text-white shadow-md" : "bg-zinc-50 text-zinc-600 border border-zinc-100 hover:border-emerald-100 hover:bg-emerald-50"}`}
                                            >
                                                Sem {sem.split(" ")[1]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </aside>

                    {/* Main Content: Question Paper Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <ScrollReveal>
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xl font-bold text-zinc-800 uppercase tracking-tight">Question Papers</h3>
                                    <span className="bg-zinc-200 text-zinc-600 text-xs font-bold px-3 py-1 rounded-full">{filteredQuestions.length} Found</span>
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {isLoading ? (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center">
                                    <Loader2 className="h-10 w-10 animate-spin text-[#7a0b3a] mb-4" />
                                    <p className="text-zinc-500 font-medium">Fetching question papers...</p>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {displayedQuestions.length > 0 ? (
                                        displayedQuestions.map((q, idx) => (
                                            <motion.div
                                                key={`paper-${q._id || idx}`}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                className="group bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-pink-100 transition-all duration-500"
                                            >
                                                <div className="flex flex-col h-full">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="text-xs font-bold text-[#7a0b3a] bg-pink-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                                            {q.code}
                                                        </div>
                                                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                                                            <Clock size={12} />
                                                            {q.year}
                                                        </div>
                                                    </div>

                                                    <a
                                                        href={getFinalUrl(q.pdfUrl)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-[#7a0b3a] transition-colors leading-tight cursor-pointer block"
                                                    >
                                                        {q.title}
                                                    </a>

                                                    <div className="flex items-center gap-3 mb-6">
                                                        <span className="text-xs text-zinc-500 font-medium">{q.department}</span>
                                                        <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                                                        <span className="text-xs text-zinc-500 font-medium">{q.semester}</span>
                                                    </div>

                                                    <div className="mt-auto flex items-center justify-between">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                                            {q.type}
                                                        </span>
                                                        <a
                                                            href={getFinalUrl(q.pdfUrl)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 shadow-md shadow-zinc-900/10 cursor-pointer bg-zinc-900 group-hover:bg-[#7a0b3a] text-white"
                                                        >
                                                            <ExternalLink size={16} />
                                                            View Paper
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="col-span-full py-20 text-center"
                                        >
                                            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Search size={32} className="text-zinc-400" />
                                            </div>
                                            <h4 className="text-xl font-bold text-zinc-800 uppercase mb-2">No Papers Found</h4>
                                            <p className="text-zinc-500">Try adjusting your filters or search terms.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Pagination / Load More */}
                        {filteredQuestions.length > visibleCount && (
                            <ScrollReveal>
                                <div className="mt-12 flex justify-center">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={isMoreLoading}
                                        className="group flex items-center justify-center min-w-[220px] gap-2 px-8 py-4 border-2 border-zinc-200 rounded-2xl text-zinc-700 font-bold hover:bg-[#7a0b3a] hover:text-white hover:border-[#7a0b3a] transition-all duration-300 uppercase tracking-widest text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isMoreLoading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Loading...</span>
                                            </>
                                        ) : (
                                            <>
                                                Load More Papers
                                                <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </section>

            {/* Contribution Section */}
            <section className="py-24 px-6 bg-zinc-900 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#7a0b3a] to-transparent" />
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tight">Help Your Peers</h2>
                        <p className="text-xl text-zinc-400 mb-10 leading-relaxed font-medium">
                            Have a question paper that isn&apos;t here? Contribute it to our digital library and help future batches excel.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-10 py-5 bg-[#7a0b3a] hover:bg-[#60082d] text-white font-bold rounded-2xl shadow-xl shadow-maroon-900/20 transition-all hover:-translate-y-1 cursor-pointer">
                                Upload Paper
                            </button>
                            <button className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-2xl transition-all cursor-pointer">
                                Contact Coordinator
                            </button>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
