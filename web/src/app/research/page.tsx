"use client";

import { motion } from "framer-motion";
import { FlaskConical, BookOpen, Users, Globe, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

// --- 1. CONFIGURATION & DATA ---
// Edit these constants to update the page content without touching the layout code.

interface HeroContent {
    status: 'updating' | 'active'; // 'updating' shows the "Coming Soon" card. 'active' shows a Featured Article.
    title: string;
    subtitle: string;
    description: string;
    badge_text: string;
    // content_link is only used if status is 'active'
    content_link?: string;
}

const HERO_CONTENT: HeroContent = {
    status: 'updating', // Change to 'active' when you have real content.
    title: "Research & Discovery",
    subtitle: "Innovation Hub",
    description: "Driving academic excellence through inquiry and interdisciplinary collaboration. Our institution is committed to pushing the boundaries of knowledge.",
    badge_text: "Curating Data"
};

interface ResearchCategory {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    href: string; // Future link
}

const RESEARCH_CATEGORIES: ResearchCategory[] = [
    {
        id: "publications",
        title: "Publications",
        description: "Peer-reviewed papers and academic journals.",
        icon: BookOpen,
        href: "#"
    },
    {
        id: "centers",
        title: "Research Centers",
        description: "Specialized hubs for interdisciplinary study.",
        icon: Users,
        href: "#"
    },
    {
        id: "global",
        title: "Global Projects",
        description: "Collaborative initiatives with international partners.",
        icon: Globe,
        href: "#"
    }
];

// --- 2. PAGE COMPONENT ---

export default function ResearchPage() {
    return (
        <main className="min-h-screen bg-emerald-50 pt-24 md:pt-28 pb-12 md:pb-20">
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
                            Research & Discovery
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            {HERO_CONTENT.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* 1. Page Title Section */}


                {/* 2. Dynamic Hero Status Card */}
                {/* This card automatically adapts based on HERO_CONTENT.status */}
                <div className="max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 border border-emerald-100 shadow-xl shadow-emerald-900/5 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500"
                    >
                        {/* Decorative Background Blobs */}
                        <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 md:-mr-20 md:-mt-20 opacity-60"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-[#7B0046]/5 rounded-full blur-3xl -ml-16 -mb-16 md:-ml-20 md:-mb-20 opacity-60"></div>

                        <div className="relative z-10 flex flex-col items-center">

                            {/* Conditional Icon based on state */}
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-2xl shadow-inner border border-emerald-100 flex items-center justify-center mb-6 md:mb-8 text-emerald-700 group-hover:scale-110 transition-transform duration-500">
                                {HERO_CONTENT.status === 'updating' ? (
                                    <FlaskConical className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
                                ) : (
                                    <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
                                )}
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold font-serif text-emerald-900 mb-3 md:mb-4">
                                {HERO_CONTENT.status === 'updating' ? "Research Content Updating" : "Featured Research"}
                            </h2>

                            <p className="text-zinc-600 mb-8 md:mb-10 max-w-lg mx-auto text-sm md:text-lg leading-relaxed">
                                {HERO_CONTENT.status === 'updating'
                                    ? "We are currently compiling our latest research publications, ongoing projects, and faculty achievements. The full research portal will be available soon."
                                    : "Explore our latest findings and academic contributions to the global scientific community."}
                            </p>

                            {/* Status Badge or CTA Button */}
                            {HERO_CONTENT.status === 'updating' ? (
                                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-[#7B0046] bg-[#7B0046]/5 px-4 py-2 md:px-6 md:py-3 rounded-full border border-[#7B0046]/10">
                                    <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                                    <span className="uppercase tracking-wide">{HERO_CONTENT.badge_text}</span>
                                </div>
                            ) : (
                                <Link
                                    href={HERO_CONTENT.content_link || "#"}
                                    className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-6 py-3 rounded-full shadow-lg hover:shadow-emerald-900/20 transition-all"
                                >
                                    <span>Read Featured Article</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* 3. Research Categories Grid */}
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <div className="flex items-center justify-center gap-4 opacity-40 mb-2">
                            <div className="h-px w-8 md:w-12 bg-zinc-300"></div>
                            <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                {HERO_CONTENT.status === 'updating' ? "Coming Soon" : "Browse by Category"}
                            </span>
                            <div className="h-px w-8 md:w-12 bg-zinc-300"></div>
                        </div>
                    </motion.div>

                    {/* 
                        Use 'opacity-70 grayscale' when updating to suggest inertness.
                        Remove these classes when active.
                    */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 transition-all duration-700 ${HERO_CONTENT.status === 'updating' ? 'opacity-70 grayscale hover:grayscale-0' : ''}`}>
                        {RESEARCH_CATEGORIES.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                                className="group p-6 md:p-8 rounded-2xl md:rounded-3xl border border-dashed border-zinc-200 bg-white/50 hover:bg-white hover:border-emerald-200 hover:shadow-lg transition-all duration-300 cursor-default"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-4 md:mb-6 text-zinc-400 group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold font-serif text-zinc-900 mb-2 md:mb-3">{item.title}</h3>
                                <p className="text-sm md:text-base text-zinc-500 leading-relaxed group-hover:text-zinc-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-16 md:mt-24 text-zinc-400 text-xs md:text-sm px-4">
                    <p>Have questions about our research? <Link href="/contact" className="text-emerald-700 font-semibold hover:text-emerald-900 underline underline-offset-4 decoration-emerald-200 hover:decoration-emerald-900 transition-all">Contact the Dean's Office</Link></p>
                </div>
            </div>
        </main>
    );
}
