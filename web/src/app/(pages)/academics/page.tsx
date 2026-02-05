"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, FileText, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const academicFeatures = [
    {
        title: "Syllabus",
        description: "Access comprehensive course structures and learning objectives for all departments.",
        icon: BookOpen,
        link: "http://docs.uoc.ac.in/website/Syll/",
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
        <div className="flex min-h-screen flex-col bg-[#7B0046]/3">
            {/* Hero Section - Matching Home Page Slider Pattern */}
            <section className="relative min-h-[50vh] lg:min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden text-white text-center md:text-left">
                {/* Background Pattern Cluster */}
                <div className="absolute inset-0 z-0 bg-emerald-800">
                    {/* Animated Particles for "Premium" feel */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-40"
                                animate={{
                                    x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                                    y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Attractive UI Dot Grid */}
                    <div className="absolute inset-0 opacity-[0.2] z-10"
                        style={{
                            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                            backgroundSize: '32px 32px'
                        }}
                    />

                    {/* Dark Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15 pointer-events-none z-10" />

                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20 z-20" />
                </div>

                <div className="container mx-auto relative z-30">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto md:mx-0">
                            <div className="inline-flex mt-6 items-center gap-3 mb-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <GraduationCap size={18} className="text-pink-400" />
                                <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-pink-100">Academic Hub</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-agency font-bold mb-6 leading-tight tracking-tight uppercase">
                                Empowering Minds, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">
                                    Enriching Futures
                                </span>
                            </h1>
                            <p className="text-base md:text-xl text-zinc-300 font-medium leading-relaxed max-w-2xl opacity-90 drop-shadow-sm">
                                Access all the resources you need for a successful academic journey. From detailed syllabi to organized schedules and preparation materials.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 💎 Resources Grid - 2x2 for mobile, 4x1 for desktop */}
            <section className="py-20 px-4 md:px-6 relative bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {academicFeatures.map((feature, idx) => (
                            <ScrollReveal key={idx} delay={idx * 50}>
                                <Link
                                    href={feature.link}
                                    className="group block relative h-full bg-white p-5 md:p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-2xl hover:bg-emerald-800 transition-all duration-500 hover:-translate-y-2 overflow-hidden transform-gpu will-change-transform"
                                >
                                    {/* Icon Box */}
                                    <div className={`w-10 h-10 md:w-14 md:h-14 ${feature.bgLight} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 border border-transparent group-hover:border-white/20 transform-gpu will-change-transform`}>
                                        <feature.icon size={22} className={`${feature.title === "Question Bank" ? "text-emerald-800" : feature.color.replace('bg-', 'text-').replace('-500', '-600')} group-hover:text-white transition-colors duration-500 opacity-100 shadow-sm`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-base md:text-2xl font-bold text-zinc-900 mb-2 md:mb-4 group-hover:text-white transition-colors duration-500 leading-tight tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[12px] md:text-sm text-zinc-500 leading-relaxed mb-6 md:mb-8 line-clamp-2 md:line-clamp-none opacity-80 group-hover:text-white/80 transition-colors duration-500">
                                        {feature.description}
                                    </p>

                                    {/* Action Link */}
                                    <div className="hidden md:flex items-center gap-2 text-[#7a0b3a] group-hover:text-white font-bold text-xs uppercase tracking-widest mt-auto transition-colors duration-500">
                                        Explore Resource
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform transform-gpu" />
                                    </div>

                                    {/* Mobile Indicator */}
                                    <div className="md:hidden absolute bottom-5 right-5 text-[#7a0b3a]/40 group-hover:text-white/50 transition-colors duration-500">
                                        <ChevronRight size={18} />
                                    </div>

                                    {/* Hover Decorative Element */}
                                    <div className={`absolute -bottom-10 -right-10 w-20 h-20 ${feature.bgLight} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl`} />
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Excellence - Sync with Home Page About Style */}
            <section className="py-24 px-6 bg-emerald-50 border-y border-[#7B0046]/10 relative overflow-hidden">
                {/* Background Decoration from Home Page */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#7B0046]/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border-l-[6px] border-[#7B0046] shadow-[#7B0046]/10 bg-white group">
                                <Image
                                    src="https://ik.imagekit.io/5c6j602yp/Home/images/library.jpeg"
                                    alt="Campus Library"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <div className="space-y-8">
                                <h2 className="text-4xl lg:text-5xl font-agency font-bold text-emerald-800 leading-tight tracking-tight uppercase">
                                    A Campus Built for <br />
                                    <span className="text-[#7a0b3a]">Future Leaders</span>
                                </h2>
                                <div className="space-y-6 text-zinc-600 text-lg leading-relaxed font-normal text-justify">
                                    <p>
                                        Our 15-acre eco-friendly campus offers a serene and stimulating environment for academic and personal growth. Equipped with modern infrastructure, advanced laboratories, and a rich library, we ensure students have access to the best resources.
                                    </p>
                                    <p>
                                        From smart classrooms to extensive sports facilities and vibrant student activity centers, every corner of CM College is designed to foster creativity, collaboration, and excellence.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#7B0046]/10">
                                    <div className="transform-gpu">
                                        <div className="text-4xl font-black text-[#7a0b3a] mb-1">15+</div>
                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Acres of Campus</div>
                                    </div>
                                    <div className="transform-gpu">
                                        <div className="text-4xl font-black text-[#7a0b3a] mb-1">Modern</div>
                                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Infrastructure</div>
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
