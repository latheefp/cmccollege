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
        <main className="min-h-screen bg-white pt-[112px]">

            {/* 🔴 PAGE HEADER - Research Style */}
            <section className="relative py-24 px-6 bg-[#7B0046] text-white overflow-hidden mb-12">
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
                            Management
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Guided by a commitment to academic excellence and institutional integrity, our management
                            team ensures a nurturing environment where innovation and tradition coexist.
                        </p>
                    </motion.div>
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
