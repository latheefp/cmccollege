"use client";

import Image from "next/image";
import { use } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { DEPARTMENT_DATA } from "@/data/departments";
import { motion } from "framer-motion";

export default function FacultyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-8">
            <ScrollReveal>
                <div className="border-b border-zinc-100 pb-6 mb-8">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#5D1035]/5 text-[#5D1035] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-3 border border-[#5D1035]/10">
                        Academic Team
                    </span>
                    <h2 className="text-3xl font-bold font-serif text-zinc-900 mb-4">Our Faculty</h2>
                    <p className="text-zinc-600 leading-relaxed font-light max-w-2xl">
                        Meet the dedicated mentors and researchers shaping the future of our students through academic excellence.
                    </p>
                </div>
            </ScrollReveal>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {data.faculty.map((member, idx) => (
                    <motion.div
                        key={idx}
                        variants={item}
                        className="group relative"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100 mb-4">
                            {member.img ? (
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-50 text-zinc-300">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}

                            {/* Overlay gradient for text readability if needed, though design calls for name below */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>

                        <div className="bg-[#FDFCFB] p-4 rounded-xl border border-zinc-100 group-hover:border-[#5D1035]/10 transition-colors shadow-sm group-hover:shadow-md">
                            <h4 className="font-serif text-lg font-medium text-zinc-900 mb-1 group-hover:text-[#5D1035] transition-colors">{member.name}</h4>
                            <p className="text-xs font-bold tracking-wider text-[#5D1035]/80 uppercase">{member.role}</p>
                            {member.spec && (
                                <p className="text-xs text-zinc-500 mt-2 font-light border-t border-zinc-100 pt-2">
                                    {member.spec}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
