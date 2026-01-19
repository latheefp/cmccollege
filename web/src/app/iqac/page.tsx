"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileText, ShieldCheck, Target, Award, BookOpen, Users, CheckCircle } from "lucide-react";

// --- 1. CONFIGURATION & CONTENT ---

interface IacTab {
    id: string;
    label: string;
    icon: any; // Lucide icon
    title: string;
    subtitle: string;
    content: React.ReactNode;
}

const IQAC_TABS: IacTab[] = [
    {
        id: "about",
        label: "About IQAC",
        icon: ShieldCheck,
        title: "Internal Quality Assurance Cell",
        subtitle: "Commitment to Excellence",
        content: (
            <div className="space-y-8 text-zinc-600 leading-relaxed text-lg text-justify">
                <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                    <p className="relative z-10">
                        The Internal Quality Assurance Cell (IQAC) was established to develop a system for conscious, consistent,
                        and catalytic improvement in the overall performance of the institution. As a post-accreditation quality
                        sustenance measure, the IQAC works towards realizing the goals of quality enhancement and sustenance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-2xl bg-[#7B0046]/10 flex items-center justify-center text-[#7B0046] mb-4">
                            <Target className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-zinc-900 mb-2 font-serif">Primary Objective</h4>
                        <p className="text-sm">To channelize all efforts and measures of the institution towards promoting holistic academic excellence.</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
                            <Users className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-zinc-900 mb-2 font-serif">Participative Nature</h4>
                        <p className="text-sm">Functions as a participative organ of the institution, ensuring stakeholder engagement in all quality initiatives.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "constitution",
        label: "Constitution",
        icon: FileText,
        title: "Constitution of the IQAC",
        subtitle: "Structural Framework",
        content: (
            <div className="space-y-8 text-zinc-600 leading-relaxed">
                <p className="text-lg">
                    The IQAC functions under the Chairmanship of the Principal with heads of important academic and
                    administrative units and a few teachers and a few distinguished educationists and representatives
                    of the College Management and other stakeholders.
                </p>

                <div className="bg-gradient-to-br from-emerald-50/80 to-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
                    <h4 className="font-bold text-emerald-900 mb-6 font-serif text-xl flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm">🏛️</span>
                        General Composition
                    </h4>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { role: "Chairperson", val: "Principal" },
                            { role: "Teachers", val: "Three to eight members" },
                            { role: "Administration", val: "Office Superintendent" },
                            { role: "Management", val: "One member nominee" },
                            { role: "Local Society", val: "One/two nominees" },
                            { role: "Students & Alumni", val: "One/two nominees" },
                            { role: "Employers", val: "One/two nominees" },
                            { role: "Coordinator", val: "Senior Teacher" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-emerald-100/50 hover:border-emerald-200 hover:shadow-md transition-all group">
                                <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-[#7B0046] group-hover:text-white group-hover:border-[#7B0046] transition-colors shrink-0">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">{item.role}</div>
                                    <div className="text-sm font-medium text-zinc-700">{item.val}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "responsibilities",
        label: "Responsibilities",
        icon: BookOpen,
        title: "Responsibilities of IQAC",
        subtitle: "Key Accountabilities",
        content: (
            <div className="space-y-6 text-zinc-600 leading-relaxed text-lg">
                <div className="grid md:grid-cols-2 gap-5">
                    {[
                        "Ensuring timely, efficient and progressive performance of academic, administrative and financial tasks.",
                        "The relevance and quality of academic and research programmes.",
                        "Equitable access to and affordability of academic programmes for various sections of society.",
                        "Optimization and integration of modern methods of teaching and learning.",
                        "The credibility of evaluation procedures.",
                        "Ensuring the adequacy, maintenance and proper allocation of support structure and services."
                    ].map((resp, i) => (
                        <div key={i} className="flex gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-emerald-50/30 hover:border-emerald-100 transition-colors group">
                            <div className="mt-1 w-2 h-2 rounded-full bg-[#7B0046] shrink-0 group-hover:bg-emerald-600 transition-colors" />
                            <p className="text-sm font-medium text-zinc-700">{resp}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "functions",
        label: "Functions",
        icon: Target,
        title: "Functions of the IQAC",
        subtitle: "Operational Objectives",
        content: (
            <div className="space-y-6 text-zinc-600 leading-relaxed">
                <p className="text-lg">The core functions of the IQAC include:</p>
                <div className="grid md:grid-cols-2 gap-5">
                    {[
                        "Development and application of quality benchmarks/parameters for the various Academic and Administrative activities for quality assurance.",
                        "Review the teaching, learning process, structure and methodology of operations and learning outcome of all the programmes at periodic intervals",
                        "Organising Workshops, Seminars and Special lectures on quality related themes as well as promotion of Quality Circles.",
                        "Ensuring maximum utilization of infrastructural facilities and the available ICT resources.",
                        "Conducting Academic Administrative Audit (AAA) and Curricular Audit annually.",
                        "Conducting Orientation and Training Programmes for Outcome based Education",
                        "Development of Quality Culture in the institution.",
                        "Preparation of the Annual Quality Assurance Report (AQAR) as per guidelines and parameters of NAAC, to be submitted to NAAC.",
                        "Facilitating the creation of a learner-centric environment conducive to quality education and faculty maturation.",
                        "Arrangement for feedback response from students, parents and other stakeholders on quality-related institutional processes."
                    ].map((func, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="flex gap-5 p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all cursor-default"
                        >
                            <div className="shrink-0">
                                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 text-xl font-bold font-serif border border-emerald-100">
                                    {i + 1}
                                </span>
                            </div>
                            <p className="text-base text-zinc-700 leading-relaxed pt-1">{func}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "benefits",
        label: "IQAC Benefits",
        icon: Award,
        title: "Benefits of IQAC",
        subtitle: "Institutional Impact",
        content: (
            <div className="space-y-8 text-zinc-600 leading-relaxed">
                <p className="text-lg">
                    IQAC will facilitate / contribute to
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        "Ensure heightened level of clarity and focus in institutional functioning towards quality enhancement.",
                        "Ensure internalization of the quality culture.",
                        "Ensure enhancement and coordination among various activities of the institution and institutionalize all good practices.",
                        "Provide a sound basis for decision-making to improve institutional functioning.",
                        "Act as a dynamic system for quality changes in HEIs.",
                        "Build an organised methodology of documentation and internal communication."
                    ].map((benefit, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-gradient-to-b from-white to-zinc-50 hover:to-emerald-50/30 border border-zinc-100 hover:border-emerald-200 transition-all group hover:-translate-y-1 duration-300 shadow-sm">
                            <div className="mb-4 w-12 h-12 rounded-2xl bg-[#7B0046]/5 flex items-center justify-center text-[#7B0046] group-hover:bg-[#7B0046] group-hover:text-white transition-colors">
                                <Award className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-bold text-zinc-700 leading-relaxed">{benefit}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
];

export default function IQACPage() {
    const [activeTabId, setActiveTabId] = useState(IQAC_TABS[0].id);

    const activeTab = IQAC_TABS.find(t => t.id === activeTabId) || IQAC_TABS[0];

    return (
        <main className="min-h-screen bg-emerald-50 pt-24 md:pt-28 pb-12 md:pb-20">

            {/* HERO AREA */}
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-[#5D1035] text-white overflow-hidden mb-12">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Internal Quality Assurance Cell
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Catalyzing academic excellence through consistent quality enhancement and stakeholder engagement.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="w-full px-4 md:px-[30px] max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* LEFT SIDEBAR NAVIGATION */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-32 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-zinc-200/50 border border-white p-6 overflow-hidden">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-2 mb-6 block">
                                Navigation
                            </span>
                            <div className="space-y-2">
                                {IQAC_TABS.map((tab) => {
                                    const isActive = activeTabId === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTabId(tab.id)}
                                            className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden ${isActive
                                                ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 scale-[1.02]"
                                                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-medium"
                                                }`}
                                        >
                                            <tab.icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#7B0046]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                                            <span className="relative z-10 text-sm">
                                                {tab.label}
                                            </span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTabIndicator"
                                                    className="absolute inset-0 bg-zinc-900 rounded-xl -z-10"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT AREA - Premium Card Style */}
                    <div className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-zinc-200/40 border border-white relative overflow-hidden"
                            >
                                {/* Decorative Background Mesh */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-emerald-50/50 to-transparent rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none opacity-60"></div>
                                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-t from-[#7B0046]/5 to-transparent rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none opacity-60"></div>

                                {/* Content Header */}
                                <div className="mb-12 relative z-10 border-b border-zinc-50 pb-8">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-4"
                                    >
                                        <activeTab.icon className="w-3 h-3" />
                                        {activeTab.subtitle}
                                    </motion.span>
                                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-zinc-900 leading-tight">
                                        {activeTab.title}
                                    </h2>
                                </div>

                                {/* Body Content */}
                                <div className="relative z-10">
                                    {activeTab.content}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </main>
    );
}
