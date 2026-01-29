"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, History, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const managementMembers = [
    {
        name: "CM Ibrahim",
        role: "President, CM Centre Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/president.jpg"
    },
    {
        name: "TK Abdu Rahman Baqavi",
        role: "General Secretary, CM Centre Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/chairman"
    },
    {
        name: "NA Backer Haji",
        role: "Finance Secretary, CM Centre Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/finance.jpg"
    },
    {
        name: "Musthafa Saquafi",
        role: "General Manager, CM Centre Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/General-manager.jpg"
    }
];

export default function ManagementPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden bg-linear-to-br from-[#7a0b3a] via-[#9f0f4e] to-[#7a0b3a] text-white p-6 md:p-16 shadow-xl md:shadow-2xl shadow-[#7a0b3a]/20">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0CA789] shadow-[0_0_10px_#0CA789]"></span>
                            <span className="text-sm font-bold tracking-widest text-[#0CA789] uppercase">Management</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold font-sans leading-tight tracking-wide drop-shadow-md">
                            CM Centre Madavoor
                        </h1>
                    </motion.div>

                    {/* Logo Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="flex justify-center md:justify-end"
                    >
                        <div className="relative w-40 h-40 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white/5 backdrop-blur-xl rounded-full p-6 md:p-10 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] md:shadow-[0_0_40px_rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-white/10 transition-all duration-500 hover:scale-105">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                            {/* Inner Glow Circle */}
                            <div className="absolute inset-4 rounded-full border border-white/5"></div>
                            <Image
                                src="https://ik.imagekit.io/5c6j602yp/Home/images/cm-center-logo?updatedAt=1769708637046"
                                alt="CM Center Logo"
                                width={300}
                                height={300}
                                className="object-contain drop-shadow-2xl w-full h-full p-4"
                            />
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
                                src="https://ik.imagekit.io/5c6j602yp/About/"
                                alt="CM Centre Madavoor"
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
                                <h3 className="text-sm md:text-lg font-bold text-zinc-900 transition-colors duration-300 group-hover:text-[#7B0046] mb-1 md:mb-2 leading-tight px-1">
                                    {member.name}
                                </h3>
                                <div className="h-0.5 w-6 bg-[#7B0046]/20 mx-auto my-3 group-hover:w-16 transition-all duration-300"></div>
                                <p className="text-[#7B0046] text-[9px] md:text-xs font-bold tracking-widest uppercase leading-relaxed max-w-[200px] mx-auto opacity-80 group-hover:opacity-100 px-1">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    );
}
