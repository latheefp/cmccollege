"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, FileText, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const academicFeatures = [
    {
        title: "Syllabus",
        description: "Access comprehensive course structures and learning objectives for all departments.",
        icon: BookOpen,
        link: "/academics/syllabus",
        color: "bg-blue-500",
        bgLight: "bg-blue-50"
    },
    {
        title: "Time Table",
        description: "Stay organized with up-to-date weekly schedules for all classes and batches.",
        icon: Clock,
        link: "/academics/time-table",
        color: "bg-emerald-500",
        bgLight: "bg-emerald-50"
    },
    {
        title: "Academic Calendar",
        description: "Plan your semester with key dates for exams, holidays, and campus events.",
        icon: Calendar,
        link: "/academic-calender",
        color: "bg-amber-500",
        bgLight: "bg-amber-50"
    },
    {
        title: "Question Bank",
        description: "Prepare effectively with our repository of previous year question papers.",
        icon: FileText,
        link: "/question-bank",
        color: "bg-maroon-600",
        bgLight: "bg-pink-50"
    }
];

export default function AcademicsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-zinc-900 text-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
                {/* Optimized Blur - Reduced radius for better performance */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7a0b3a]/15 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none transform-gpu" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[60px] -ml-20 -mb-20 pointer-events-none transform-gpu" />

                <div className="container mx-auto relative z-10">
                    <ScrollReveal>
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <GraduationCap size={18} className="text-pink-400" />
                                <span className="text-xs font-black tracking-[0.2em] uppercase text-pink-100">Academic Hub</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                Empowering Minds, <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-600">
                                    Enriching Futures
                                </span>
                            </h1>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
                                Access all the resources you need for a successful academic journey. From detailed syllabi to organized schedules and preparation materials.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="py-24 px-6 relative">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {academicFeatures.map((feature, idx) => (
                            <ScrollReveal key={idx} delay={idx * 100}>
                                <Link
                                    href={feature.link}
                                    className="group block relative h-full bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden transform-gpu will-change-transform"
                                >
                                    {/* Icon Box */}
                                    <div className={`w-14 h-14 ${feature.bgLight} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 transform-gpu will-change-transform`}>
                                        <feature.icon size={28} className={feature.title === "Question Bank" ? "text-[#7a0b3a]" : feature.color.replace('bg-', 'text-')} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-[#7a0b3a] transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-zinc-500 leading-relaxed mb-8">
                                        {feature.description}
                                    </p>

                                    {/* Action Link */}
                                    <div className="flex items-center gap-2 text-[#7a0b3a] font-bold text-sm uppercase tracking-widest mt-auto">
                                        Explore Resource
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform transform-gpu" />
                                    </div>

                                    {/* Hover Decorative Element */}
                                    <div className={`absolute -bottom-12 -right-12 w-24 h-24 ${feature.bgLight} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl`} />
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academic Philosophy */}
            <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-100">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder for campus philosophy video
                                    title="Academic Excellence"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <div className="space-y-8">
                                <h2 className="text-4xl font-bold text-zinc-900 leading-tight">
                                    Our Commitment to <br />
                                    <span className="text-[#7a0b3a]">Academic Excellence</span>
                                </h2>
                                <div className="space-y-6 text-zinc-600 text-lg leading-relaxed">
                                    <p>
                                        At CM College, we believe that education is a transformative journey. Our academic framework is designed to challenge students, foster critical thinking, and provide the practical skills needed in today's global landscape.
                                    </p>
                                    <p>
                                        We provide a holistic learning environment where traditional values meet modern innovation, ensuring our graduates are well-prepared for both professional success and social leadership.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <div className="transform-gpu">
                                        <div className="text-3xl font-black text-[#7a0b3a] mb-1">98%</div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-zinc-400">Success Rate</div>
                                    </div>
                                    <div className="transform-gpu">
                                        <div className="text-3xl font-black text-[#7a0b3a] mb-1">20+</div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-zinc-400">Research Projects</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
