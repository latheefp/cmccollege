"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Download, Filter, ChevronRight, Book, GraduationCap, Clock, Loader2 } from "lucide-react";

import ScrollReveal from "@/components/ScrollReveal";

const departments = [
    "Computer Science",
    "Management",
    "Mass Communication",
    "Economics",
    "English",
    "Commerce",
];

const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];

const mockQuestions = [
    { id: 1, title: "Data Structures", code: "BCS3B04", department: "Computer Science", semester: "Semester 3", year: "2023", type: "Main Exam" },
    { id: 2, title: "Micro Economics", code: "ECO1B01", department: "Economics", semester: "Semester 1", year: "2023", type: "Main Exam" },
    { id: 3, title: "Business Management", code: "BBA1B01", department: "Management", semester: "Semester 1", year: "2022", type: "Main Exam" },
    { id: 4, title: "Python Programming", code: "BCS4B05", department: "Computer Science", semester: "Semester 4", year: "2022", type: "Supplementary" },
    { id: 5, title: "Digital Journalism", code: "JOU2B02", department: "Mass Communication", semester: "Semester 2", year: "2023", type: "Main Exam" },
    { id: 6, title: "Financial Accounting", code: "BCM2B02", department: "Commerce", semester: "Semester 2", year: "2023", type: "Main Exam" },
    { id: 7, title: "Operating Systems", code: "BCS4B06", department: "Computer Science", semester: "Semester 4", year: "2023", type: "Main Exam" },
    { id: 8, title: "Managerial Economics", code: "ECO2B02", department: "Economics", semester: "Semester 2", year: "2022", type: "Main Exam" },
    { id: 9, title: "Marketing Management", code: "BBA2B02", department: "Management", semester: "Semester 2", year: "2023", type: "Main Exam" },
    { id: 10, title: "English Grammar", code: "ENG1B01", department: "English", semester: "Semester 1", year: "2023", type: "Main Exam" },
    { id: 11, title: "Database Systems", code: "BCS5B07", department: "Computer Science", semester: "Semester 5", year: "2023", type: "Main Exam" },
    { id: 12, title: "Corporate Accounting", code: "BCM3B03", department: "Commerce", semester: "Semester 3", year: "2022", type: "Main Exam" },
];

export default function QuestionBankPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedSem, setSelectedSem] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    const filteredQuestions = mockQuestions.filter(q => {
        const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDept === "All" || q.department === selectedDept;
        const matchesSem = selectedSem === "All" || q.semester === selectedSem;
        return matchesSearch && matchesDept && matchesSem;
    });

    const displayedQuestions = filteredQuestions.slice(0, visibleCount);

    const handleLoadMore = () => {
        setIsMoreLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setVisibleCount(prev => prev + 4);
            setIsMoreLoading(false);
        }, 800);
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
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">

                    {/* Sidebar Filters */}
                    <aside className="space-y-8">
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
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedDept === "All" ? "bg-[#7a0b3a] text-white shadow-md shadow-[#7a0b3a]/20" : "hover:bg-zinc-50 text-zinc-600 border border-transparent hover:border-zinc-200"}`}
                                    >
                                        All Departments
                                    </button>
                                    {departments.map(dept => (
                                        <button
                                            key={dept}
                                            onClick={() => setSelectedDept(dept)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedDept === dept ? "bg-[#7a0b3a] text-white shadow-md shadow-[#7a0b3a]/20" : "hover:bg-zinc-50 text-zinc-600 border border-transparent hover:border-zinc-200"}`}
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
                            <AnimatePresence mode="popLayout">
                                {displayedQuestions.length > 0 ? (
                                    displayedQuestions.map((q, idx) => (
                                        <motion.div
                                            key={q.id}
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

                                                <h4 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-[#7a0b3a] transition-colors leading-tight">
                                                    {q.title}
                                                </h4>

                                                <div className="flex items-center gap-3 mb-6">
                                                    <span className="text-xs text-zinc-500 font-medium">{q.department}</span>
                                                    <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                                                    <span className="text-xs text-zinc-500 font-medium">{q.semester}</span>
                                                </div>

                                                <div className="mt-auto flex items-center justify-between">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                                        {q.type}
                                                    </span>
                                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 group-hover:bg-[#7a0b3a] text-white rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 shadow-md shadow-zinc-900/10 cursor-pointer">
                                                        <Download size={16} />
                                                        Download
                                                    </button>
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
