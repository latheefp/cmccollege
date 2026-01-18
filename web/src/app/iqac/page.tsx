"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileText, ShieldCheck, Target, Award, BookOpen } from "lucide-react";

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
            <div className="space-y-6 text-zinc-600 leading-relaxed text-lg text-justify">
                <p>
                    Internal Quality Assurance Cell (IQAC), is to build and ensure a quality culture at the institutional level. The IQAC is meant to plan, guide and monitor Quality Assurance(QA) and Quality Enhancement (QE) activities of the College. The IQAC shall not be a record-keeping cell but shall channelize and systematize the effort to pull the College in the path of academic excellence.
                </p>
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
            <div className="space-y-6 text-zinc-600 leading-relaxed">
                <p>
                    The IQAC functions under the Chairmanship of the Principal with heads of important academic and
                    administrative units and a few teachers and a few distinguished educationists and representatives
                    of the College Management and other stakeholders.
                </p>
                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-4 font-serif text-lg">General Composition</h4>
                    <p className="mb-4 text-sm font-medium text-zinc-700">The following is the general composition of the IQAC of the College:</p>
                    <ul className="space-y-3">
                        {[
                            "Chairperson: Principal",
                            "Three to eight teachers",
                            "Office Superintendent",
                            "One member from the College Management",
                            "One/two nominees from Local Society, Students and Alumni",
                            "One/two nominees from Employers/Industrialists/stakeholders",
                            "One of the senior teachers as the Coordinator of the IQAC"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-base">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7B0046] shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
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
                <p>The core functions of the IQAC include:</p>
                <ul className="grid md:grid-cols-2 gap-4">
                    {[
                        "Development and application of quality benchmarks/parameters for the various Academic and Administrative activities for quality assurance.",
                        "Review the teaching, learning process, structure and methodology of operations and learning outcome of all the programmes at periodic intervals",
                        "Organising Workshops, Seminars and Special lectures on quality related themes as well as promotion of Quality Circles.",
                        "Ensuring maximum utilization of infrastructural facilities and the available ICT resources.",
                        "Conducting Academic Administrative Audit (AAA) and Curricular Audit annually.",
                        "Conducting Orientation and Training Programmes for Outcome based Education",
                        "Development of Quality Culture in the institution.",
                        "Preparation of the Annual Quality Assurance Report (AQAR) as per guidelines and parameters of NAAC, to be submitted to NAAC.",
                        "Facilitating the creation of a learner-centric environment conducive to quality education and faculty maturation to adopt the required knowledge and technology for participatory teaching and learning process.",
                        "Arrangement for feedback response from students, parents and other stakeholders on quality-related institutional processes."
                    ].map((func, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-sm">
                                {i + 1}
                            </div>
                            <span className="pt-1">{func}</span>
                        </li>
                    ))}
                </ul>
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
            <div className="space-y-6 text-zinc-600 leading-relaxed">
                <p>
                    A fully functional IQAC will facilitate/contribute to:
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
                        <div key={i} className="p-5 rounded-2xl bg-zinc-50 hover:bg-emerald-50/30 border border-zinc-100 hover:border-emerald-100 transition-colors">
                            <div className="mb-3 text-[#7B0046]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-zinc-700">{benefit}</p>
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

            {/* HERO AREA - Matching Research/About style for consistency */}
            <div className="pt-10 pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-100/50 text-emerald-800 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 border border-emerald-200/50">
                            Quality Assurance
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif text-zinc-900 mb-6 tracking-tight leading-tight">
                            Internal Quality <span className="text-[#7B0046] italic">Assurance Cell</span>
                        </h1>
                        <p className="text-base md:text-xl text-zinc-600 leading-relaxed font-light max-w-3xl mx-auto">
                            Catalyzing academic excellence through consistent quality enhancement and stakeholder engagement.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="w-full px-[30px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* LEFT SIDEBAR NAVIGATION */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 bg-white rounded-2xl shadow-xl shadow-[#7B0046]/5 border border-zinc-100 overflow-hidden">
                            <div className="p-6 border-b border-zinc-50 bg-emerald-50/10">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
                                    Navigation
                                </span>
                            </div>
                            <div className="p-3 space-y-1">
                                {IQAC_TABS.map((tab) => {
                                    const isActive = activeTabId === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTabId(tab.id)}
                                            className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${isActive
                                                ? "bg-[#7B0046] text-white shadow-md shadow-[#7B0046]/20"
                                                : "text-zinc-600 hover:bg-zinc-50 font-medium"
                                                }`}
                                        >
                                            <span className="flex items-center gap-3 relative z-10">
                                                {tab.label}
                                            </span>
                                            {isActive && <ChevronRight className="w-4 h-4 relative z-10" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Download Section */}
                            <div className="p-6 mt-2 border-t border-zinc-100 bg-zinc-50/50">
                                <h4 className="font-bold text-zinc-900 text-sm mb-2">IQAC Reports</h4>
                                <p className="text-zinc-500 text-xs mb-4">Access annual quality assurance documents.</p>
                                <button className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/10">
                                    Download Archive
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT AREA - Premium Card Style */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-[#7B0046]/5 border-l-4 border-l-[#7B0046] border-t border-r border-b border-gray-100 relative overflow-hidden"
                            >
                                {/* Decorative Background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B0046]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                                {/* Header of Content Section */}
                                <div className="mb-10 relative z-10">
                                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold tracking-widest uppercase mb-4 border border-emerald-100">
                                        {activeTab.subtitle}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-zinc-900 leading-tight">
                                        {activeTab.title}
                                    </h2>
                                </div>

                                {/* Body Content */}
                                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-li:text-zinc-600 prose-emerald max-w-none relative z-10">
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
