"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, History, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const councilMembers = [
    {
        name: "T K Abdu Rahman Baqavi",
        role: "Chairman - CM College",
        image: "https://ik.imagekit.io/5c6j602yp/About/chairman"
    },
    {
        name: "Zainudheen T K",
        role: "Director - CM College",
        image: "https://ik.imagekit.io/5c6j602yp/About/director.jpg"
    },
    {
        name: "Shafi Pulpara",
        role: "Principal - CM College",
        image: "https://ik.imagekit.io/5c6j602yp/About/principal.jpeg"
    },
    {
        name: "Jabir Ali P P",
        role: "Vice Principal - CM College",
        image: "/images/default-user-placeholder.png"
    },
    {
        name: "Uvais T K",
        role: "AO- CM College",
        image: "/images/default-user-placeholder.png"
    }
];

export default function AdministrationPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 🔴 HERO SECTION - Full-width Maroon Gradient */}
            <section className="relative h-[300px] md:h-[400px] rounded-[24px] md:rounded-[32px] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#7a0b3a] via-[#9f0f4e] to-[#7a0b3a] text-white shadow-xl md:shadow-2xl shadow-[#7a0b3a]/20">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold font-sans tracking-[0.15em] uppercase leading-tight drop-shadow-2xl">
                            Administrative <br className="md:hidden" /> Council
                        </h1>
                        <div className="w-16 md:w-24 h-0.5 bg-white/30 mx-auto mt-8 opacity-50"></div>
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
                            Governed by a distinguished panel of leaders, the Administrative Council ensures the strategic
                            growth and moral integrity of CM College, fostering a legacy of academic distinction.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 👥 COUNCIL MEMBERS SECTION - Single Row Layout */}
            <section className="pb-32 bg-white overflow-x-hidden">
                <div className="container mx-auto px-4">

                    {/* Decorative Header */}
                    <div className="flex justify-center mb-16 opacity-50">
                        <div className="h-1 w-24 bg-[#7a0b3a] rounded-full"></div>
                    </div>

                    {/* All Council Members in One Centered Row */}
                    <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-5 xl:gap-8 overflow-visible max-w-[1400px] mx-auto">
                        {councilMembers.map((member, idx) => {
                            const isChairman = idx === 0;
                            return (
                                <ScrollReveal key={idx} delay={idx * 100}>
                                    <div className={`group flex flex-col items-center transition-all duration-500 ${isChairman ? 'z-10' : 'z-0'}`}>
                                        {/* Card Container - Size varies based on role */}
                                        <div
                                            className={`relative bg-white rounded-[20px] lg:rounded-[24px] overflow-hidden shadow-lg border border-zinc-100 transition-all duration-500 
                                            ${isChairman
                                                    ? 'w-[280px] lg:w-[300px] xl:w-[320px] aspect-4/5 shadow-2xl scale-105 border-[#7a0b3a]/10 ring-4 ring-[#7a0b3a]/5'
                                                    : 'w-[220px] lg:w-[230px] xl:w-[240px] aspect-4/5 hover:-translate-y-2'
                                                }`}
                                        >
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Unified Hover Gradient */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Name & Role below card for ALL members */}
                                        <div className={`text-center mt-4 lg:mt-6 ${isChairman ? 'max-w-[280px] lg:max-w-[320px]' : 'max-w-[200px] lg:max-w-[230px]'}`}>
                                            <h3 className={`font-bold text-zinc-900 group-hover:text-[#7a0b3a] transition-colors duration-300 leading-tight ${isChairman ? 'text-2xl lg:text-3xl tracking-tight' : 'text-lg lg:text-xl'}`}>
                                                {member.name}
                                            </h3>
                                            <p className={`text-[#7a0b3a]/80 font-bold tracking-wider uppercase mt-1 leading-relaxed ${isChairman ? 'text-xs lg:text-sm mt-2' : 'text-[10px] line-clamp-2'}`}>
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>

                                    {isChairman && (
                                        <div className="text-center mt-4 lg:mt-6 max-w-[280px] lg:max-w-[320px]">
                                            <p className="text-zinc-500 text-xs font-medium italic border-t border-zinc-100 pt-4 hidden md:block">
                                                Leading with vision and integrity.
                                            </p>
                                        </div>
                                    )}
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
