'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const alumni = [
    {
        name: "Mohammed Faizal",
        role: "Software Engineer",
        company: "TCS, Bangalore",
        graduation: "BCA · 2022",
        image: "/images/default-user-placeholder.png"
    },
    {
        name: "Ayesha Rahman",
        role: "Data Analyst",
        company: "Infosys",
        graduation: "BSc Computer Science · 2021",
        image: "/images/default-user-placeholder.png"
    },
    {
        name: "Salman P",
        role: "Business Executive",
        company: "HDFC Bank",
        graduation: "BCom · 2020",
        image: "/images/default-user-placeholder.png"
    },
    {
        name: "Fathima K",
        role: "UI/UX Designer",
        company: "Startup Studio",
        graduation: "BCA · 2023",
        image: "/images/default-user-placeholder.png"
    }
];

export default function Professionals() {
    return (
        <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-agency font-bold text-emerald-800 mb-3 uppercase"
                    >
                        Meet The Professionals
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg max-w-2xl mx-auto text-center font-medium"
                    >
                        Our alumni building successful careers across industries
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {alumni.map((alum, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shrink-0 w-[75vw] md:w-auto snap-center border border-zinc-100"
                        >
                            {/* Profile Image (Color) */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6">
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-zinc-50 shadow-inner">
                                    <Image
                                        src={alum.image}
                                        alt={alum.name}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 96px, 128px"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center">
                                <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-1 group-hover:text-emerald-800 transition-colors">
                                    {alum.name}
                                </h3>
                                <p className="text-sm font-medium text-zinc-600 mb-1">
                                    {alum.role}
                                </p>
                                <p className="text-sm font-bold text-emerald-600 mb-3">
                                    {alum.company}
                                </p>
                                <div className="inline-block px-3 py-1 bg-zinc-50 rounded-full text-xs font-medium text-zinc-400">
                                    {alum.graduation}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Explore Button */}
                <div className="mt-16 text-center">
                    <Link href="/alumni">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-emerald-800 text-white font-bold rounded-full shadow-lg hover:cursor-pointer hover:bg-emerald-900 transition-all flex items-center gap-2 mx-auto"
                        >
                            <span>View more</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
