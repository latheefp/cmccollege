"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const partners = [
    { name: "MMU", logo: "/images/mmu-logo.png" },
    { name: "Oman", logo: "/images/oman-logo.png" },
    { name: "Tally", logo: "/images/tally-logo.png" },
    { name: "Keltron", logo: "/images/keltron-logo.png" },
];

export default function Collaborations() {
    return (
        <section className="py-20 px-6 bg-white border-t border-zinc-100">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-3 tracking-tight">
                        Our Collaborations
                    </h2>
                    <p className="text-zinc-500 text-lg font-medium">
                        Academic and industry partners supporting our mission
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <ScrollReveal
                            key={index}
                            delay={index * 100}
                            className="w-full flex justify-center group"
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="relative w-40 h-24 md:w-48 md:h-32 flex items-center justify-center p-4 bg-white rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={partner.logo}
                                        alt={`${partner.name} logo`}
                                        fill
                                        className="object-contain p-2 filter grayscale-0 opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
