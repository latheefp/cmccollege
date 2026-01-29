"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, History, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const managementMembers = [
    {
        name: "TK Abdu Rahman Baqavi",
        role: "Chairman, CM College of Arts and Science and General Secretary, CM Centre, Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/chairman.jpg"
    },
    {
        name: "CM Ibrahim",
        role: "President, President CM Centre Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/president.jpg"
    },
    {
        name: "NA Backer Haji",
        role: "Finance Secretary, CM Centre Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/finance.jpg"
    },
    {
        name: "Mr. Abdul Rasheed",
        role: "TGeneral Manager, CM Centre Madavoor",
        image: "https://ik.imagekit.io/5c6j602yp/About/General-manager.jpg"
    }
];

export default function ManagementPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="relative rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100 p-8 md:p-12">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7a0b3a]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7a0b3a]"></span>
                            <span className="text-sm font-bold tracking-widest text-[#7a0b3a] uppercase">Management</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 font-agency">
                            Advisory Board
                        </h1>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            Guided by a commitment to academic excellence and institutional integrity, our management
                            team ensures a nurturing environment where innovation and tradition coexist.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                {managementMembers.map((member, idx) => (
                    <ScrollReveal key={idx} delay={idx * 100}>
                        <div className="group flex flex-col items-center">
                            {/* 🪪 Portrait Image Container */}
                            <div className="relative aspect-[4/5] w-full bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 mb-6 border border-zinc-100/50">
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
                                <h3 className="text-lg font-bold text-zinc-900 transition-colors duration-300 group-hover:text-[#7B0046] mb-2 leading-tight">
                                    {member.name}
                                </h3>
                                <div className="h-0.5 w-6 bg-[#7B0046]/20 mx-auto my-3 group-hover:w-16 transition-all duration-300"></div>
                                <p className="text-[#7B0046] text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase leading-relaxed max-w-[200px] mx-auto opacity-80 group-hover:opacity-100">
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
