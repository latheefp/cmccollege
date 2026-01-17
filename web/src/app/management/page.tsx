"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, History, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const managementMembers = [
    {
        name: "Dr. Abdul Rahman",
        role: "CHAIRMAN",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Dr. Sayeed Mohammed",
        role: "VICE CHAIRMAN",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Adv. Ibrahim Kutty",
        role: "SECRETARY",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Mr. Abdul Rasheed",
        role: "TREASURER",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    }
];

export default function ManagementPage() {
    return (
        <main className="min-h-screen bg-white pt-[112px]">

            {/* 🔴 HERO SECTION - Full-width Maroon Gradient */}
            <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                {/* Homepage-style Maroon Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B0046] via-[#5D1035] to-[#3B001F]"></div>

                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Animated content */}
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white tracking-widest uppercase mb-6">
                            Management
                        </h1>
                        <div className="w-24 md:w-32 h-0.5 bg-white/40 mx-auto"></div>
                    </motion.div>
                </div>
            </section>

            {/* 🧠 INTRO SECTION */}
            <section className="py-20 md:py-28 bg-white border-b border-zinc-50">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-5xl font-bold font-serif text-zinc-900 mb-8 tracking-tight">
                            Our Visionary Leadership
                        </h2>
                        <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-light">
                            Guided by a commitment to academic excellence and institutional integrity, our management
                            team ensures a nurturing environment where innovation and tradition coexist.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 👥 MANAGEMENT MEMBERS SECTION */}
            <section className="py-24 bg-stone-50/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 max-w-7xl mx-auto">
                        {managementMembers.map((member, idx) => (
                            <ScrollReveal key={idx} delay={idx * 100}>
                                <div className="group flex flex-col items-center">
                                    {/* 🪪 Portrait Image Container */}
                                    <div className="relative aspect-[4/5] w-full bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 mb-8 border border-zinc-100/50">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Subtle Maroon Overlay on hover */}
                                        <div className="absolute inset-0 bg-[#7B0046]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    {/* Details */}
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xl font-bold text-zinc-900 transition-colors duration-300 group-hover:text-[#7B0046]">
                                            {member.name}
                                        </h3>
                                        <p className="text-[#7B0046] text-xs font-bold tracking-[0.2em] uppercase">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

        </main >
    );
}
