"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Construction, Clock, Bell } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

interface ComingSoonProps {
    title: string;
    description?: string;
    parentLink?: string;
    parentText?: string;
}

export default function ComingSoon({
    title,
    description = "We're currently crafting a premium digital experience for this section. Stay tuned for updates on our latest initiatives and resources.",
    parentLink = "/students-zone",
    parentText = "Back to Students Zone"
}: ComingSoonProps) {
    return (
        <div className="flex min-h-screen flex-col bg-white pt-[112px]">
            {/* Hero Section */}
            <section className="relative py-24 px-6 bg-[#7a0b3a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                            <Clock size={14} className="text-pink-300" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Coming Soon</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-pink-100/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            {description}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content Area */}
            <section className="py-24 px-6 flex-1 flex flex-col items-center justify-center text-center">
                <ScrollReveal>
                    <div className="mb-12">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-pink-100 transform rotate-12 transition-transform hover:rotate-0 duration-500">
                                <Construction className="w-12 h-12 text-[#7a0b3a] -rotate-12" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#7a0b3a] rounded-full flex items-center justify-center text-white border-4 border-white animate-bounce shadow-lg">
                                <Sparkles size={14} />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Under Development</h2>
                        <p className="text-zinc-500 max-w-md mx-auto mb-10 leading-relaxed font-medium">
                            This page is part of our commitment to providing a top-tier digital ecosystem for our students.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={parentLink}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-black transition-all hover:scale-105"
                            >
                                <ArrowLeft size={18} />
                                {parentText}
                            </Link>
                            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-zinc-200 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-50 transition-all">
                                <Bell size={18} className="text-[#7a0b3a]" />
                                Notify When Live
                            </button>
                        </div>
                    </div>

                    {/* Decorative Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto w-full pt-12 border-t border-zinc-100">
                        {[
                            { step: "01", text: "Designing Interface" },
                            { step: "02", text: "Integrating Data" },
                            { step: "03", text: "Testing Experience" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-left p-4">
                                <span className="text-4xl font-black text-pink-50">{item.step}</span>
                                <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
