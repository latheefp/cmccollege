"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, History, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import InstitutionsCarousel from "@/components/InstitutionsCarousel";

const managementMembers = [
    {
        name: "CM Ibrahim",
        role: "President",
        org: "CM Centre Madavoor",
        image: "https://ik.imagekit.io/1yxtj9qun/About/president.jpg"
    },
    {
        name: "TK Abdu Rahman Baqavi",
        role: "General Secretary",
        org: "CM Centre Madavoor",
        image: "https://ik.imagekit.io/1yxtj9qun/About/chairman.png?updatedAt=1770370502173"
    },
    {
        name: "NA Backer Haji",
        role: "Finance Secretary",
        org: "CM Centre Madavoor",
        image: "https://ik.imagekit.io/1yxtj9qun/About/finance.jpg"
    },
    {
        name: "Musthafa Saquafi",
        role: "General Manager",
        org: "CM Centre Madavoor",
        image: "https://ik.imagekit.io/1yxtj9qun/About/General-manager.jpg"
    }
];

export default function ManagementPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden bg-[#7a0b3a] text-white py-12 px-6 md:p-20 shadow-2xl shadow-maroon-900/40 min-h-[400px] flex items-center">

                {/* Dynamic Background Elements */}
                <div className="absolute inset-0 bg-linear-to-br from-[#7a0b3a] via-[#910d44] to-[#60082d]"></div>

                {/* Simplified Background Patches (Static to save GPU) */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none mix-blend-overlay" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[60px] -ml-32 -mb-32 pointer-events-none" />

                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                {/* Simplified Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                y: [-10, -80],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                delay: i * 2,
                                ease: "linear"
                            }}
                            className="absolute w-1 h-1 bg-white rounded-full bg-linear-to-b from-white to-transparent"
                            style={{
                                left: `${25 + i * 20}%`,
                                top: `${60 + i * 10}%`
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-center">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse"></span>
                            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-white uppercase">Management Board</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-4"
                        >
                            CM <span className="text-white/40 font-light">Centre</span> <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-pink-200/50">Madavoor</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-pink-100/60 font-medium text-sm md:text-lg tracking-wide uppercase max-w-xl mx-auto md:mx-0"
                        >
                            Upholding values through educational excellence
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2
                        }}
                        className="flex justify-center"
                    >
                        <div className="relative group">
                            {/* Minimalism - Tighter Sleek Container */}
                            <div className="relative w-48 h-20 md:w-80 md:h-36 bg-white rounded-xl md:rounded-2xl shadow-xl shadow-black/10 flex items-center justify-center p-4 md:p-8 transition-all duration-500 group-hover:scale-[1.02]">
                                <Image
                                    src="https://ik.imagekit.io/1yxtj9qun/Home/images/cm-center-logo.png?updatedAt=1770370304268"
                                    alt="CM Center Logo"
                                    width={400}
                                    height={200}
                                    priority
                                    className="object-contain w-full h-full transform-gpu scale-110 md:scale-125"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Chairman Message Section */}
            <ScrollReveal>
                <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start py-4 md:py-8">
                    {/* Image Section - Floating & Clean */}
                    <div className="w-full md:w-5/12 lg:w-4/12 relative group pl-4">
                        <div className="absolute top-4 -right-4 w-full h-full border-2 border-[#7a0b3a]/10 rounded-2xl md:rounded-[32px] -z-10 group-hover:top-2 group-hover:-right-2 transition-all duration-500"></div>
                        <div className="relative aspect-3/4 w-full rounded-2xl md:rounded-[32px] overflow-hidden shadow-xl shadow-zinc-200/50">
                            <Image
                                src="https://ik.imagekit.io/1yxtj9qun/About/chairman.png?updatedAt=1770370502173"
                                alt="TK Abdurahiman Baquavi - Chairman"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-7/12 lg:w-8/12 pt-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-px bg-[#7a0b3a]"></span>
                            <h2 className="text-xs font-bold tracking-[0.2em] text-[#7a0b3a] uppercase">Chairman&apos;s Message</h2>
                        </div>

                        <div className="relative">
                            <span className="absolute -top-4 -left-6 text-6xl text-[#7a0b3a]/5 font-serif select-none pointer-events-none">&ldquo;</span>
                            <div className="space-y-6 text-zinc-600 leading-relaxed text-lg relative z-10">
                                <p>
                                    Quthub al Alam CM valiyullahi, who rose to prominence through a prosperous life, was the pillar of support and shade of strength for thousands and that shadow continues even after his death. The CM Memorial Centre was established in his hometown of Madavoor during his lifetime at the behest of greats.
                                </p>
                                <p>
                                    He had dreamt to have an Islamic institution in his native place which can give shelter to orphans, destitute, and the marginalized section of society. Now, more than 3500 students are studying under this institution which has students from primary school to professional courses. The institution aims for an educated and civilized society that values morality, secularism, patriotism, religious attitude, and social life.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 border-t border-zinc-100 pt-6">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">
                                    TK Abdurahiman Baquavi
                                </h3>
                                <p className="text-[#0CA789] font-medium text-sm mt-0.5">
                                    General Secretary, CM Centre
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Members Grid Section */}
            <div className="pt-8 pb-4">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="h-px w-8 md:w-16 bg-[#7a0b3a]/20"></span>
                    <h2 className="text-xl md:text-3xl font-bold text-[#7a0b3a] uppercase tracking-wide text-center drop-shadow-sm">
                        Committee Advisory Board
                    </h2>
                    <span className="h-px w-8 md:w-16 bg-[#7a0b3a]/20"></span>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-2 md:px-0">
                {managementMembers.map((member, idx) => (
                    <ScrollReveal key={idx} delay={idx * 100}>
                        <div className="group flex flex-col items-center">
                            {/* Portrait Image Container */}
                            <div className="relative aspect-4/5 w-full bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 mb-3 md:mb-6 border border-zinc-100/50">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Subtle Maroon Overlay on hover */}
                                <div className="absolute inset-0 bg-[#7B0046]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Details */}
                            <div className="text-center w-full">
                                <h3 className="text-sm md:text-lg font-bold text-zinc-900 transition-colors duration-300 group-hover:text-[#7B0046] mb-1 leading-tight px-1 uppercase tracking-tight">
                                    {member.name}
                                </h3>

                                <div className="space-y-1">
                                    <p className="text-[#0CA789] text-[10px] md:text-xs font-black tracking-widest uppercase">
                                        {member.role}
                                    </p>
                                    <div className="h-0.5 w-4 bg-[#7B0046]/10 mx-auto group-hover:w-12 transition-all duration-300"></div>
                                    <p className="text-zinc-400 text-[8px] md:text-[10px] font-bold tracking-wider uppercase opacity-80">
                                        {member.org}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* Our Institutions Section */}
            <ScrollReveal>
                <div className="py-20 border-y border-zinc-100 bg-linear-to-b from-white via-[#fcf9f5]/30 to-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 mb-4"
                        >
                            <span className="h-px w-6 bg-[#0CA789]"></span>
                            <span className="text-[#0CA789] font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Professional Network</span>
                            <span className="h-px w-6 bg-[#0CA789]"></span>
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#7a0b3a] font-agency uppercase tracking-tight">Accredited Institutions</h2>
                        <p className="text-zinc-500 mt-4 max-w-2xl mx-auto text-sm md:text-base font-medium">
                            Recognized and affiliated with leading educational bodies and organizations
                        </p>
                    </div>

                    <InstitutionsCarousel
                        items={[
                            "https://ik.imagekit.io/1yxtj9qun/About/ifer.png?updatedAt=1769710741851",
                            "https://ik.imagekit.io/1yxtj9qun/About/osams.png?updatedAt=1770370502238",
                            "https://ik.imagekit.io/1yxtj9qun/About/keep.png?updatedAt=1769710741844",
                            "https://ik.imagekit.io/1yxtj9qun/About/ceas.png?updatedAt=1769710741807",
                            "https://ik.imagekit.io/1yxtj9qun/About/imsar.png?updatedAt=1769710741733",
                            "https://ik.imagekit.io/1yxtj9qun/About/afaq.png?updatedAt=1769710741445",
                            "https://ik.imagekit.io/1yxtj9qun/Home/images/PNG%20CM%20COLLEGE.png?updatedAt=1768917745508"
                        ]}
                    />
                </div>
            </ScrollReveal>
        </div>
    );
}
