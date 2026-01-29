"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ChairmanMessagePage() {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullText = `Quthub al Alam CM valiyullahi, who rose to prominence through a prosperous life, was the pillar of support and shade of strength for thousands and that shadow continues even after his death. The CM Memorial Centre was established in his hometown of Madavoor during his lifetime at the behest of greats. He had dreamt to have an Islamic institution in his native place which can give shelter to orphans, destitute, and the marginalized section of society. Now, more than 3500 students are studying under this institution which has students from primary school to professional courses. The institution aims for an educated and civilized society that values morality, secularism, patriotism, religious attitude, and social life, and adopts a method of education in which traditional Islamic principles and modern academic teachings are merged.`;

    // Truncate logic
    const truncatedText = fullText.slice(0, 350) + "...";

    return (
        <div className="min-h-screen bg-white pt-[140px] pb-20 relative overflow-x-hidden flex items-center">
            {/* Subtle Pattern Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }}></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

                    {/* LEFT: Simple Portrait Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 shrink-0"
                    >
                        <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl">
                            <Image
                                src="https://ik.imagekit.io/5c6j602yp/About/chairman"
                                alt="T K Abdu Rahman Baqavi"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT: Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-7/12 flex flex-col justify-center"
                    >
                        <h4 className="text-zinc-500 font-bold tracking-[0.15em] uppercase text-sm mb-4">Chairman Message</h4>

                        <div className="text-zinc-600 leading-[1.8] text-base lg:text-lg text-justify font-light mb-6">
                            <p>
                                {isExpanded ? fullText : truncatedText}
                            </p>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-2 inline-flex items-center gap-1 text-[#0EA5E9] font-semibold text-sm hover:underline focus:outline-hidden"
                            >
                                {isExpanded ? (
                                    <>Read Less <ChevronUp className="w-4 h-4" /></>
                                ) : (
                                    <>Read More <ChevronDown className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#0EA5E9] tracking-tight">TK ABDURAHIMAN BAQUAVI</h3>
                            <p className="text-[#0EA5E9]/80 font-medium text-sm">(General Secretary, CM Centre)</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
