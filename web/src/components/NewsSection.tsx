'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const newsItems = [
    {
        id: 1,
        date: "15 Aug 2026",
        title: "Independence Day Celebration Conducted on Campus",
        description: "Cultural programs and student activities marked the celebration, fostering patriotism and unity among students.",
        image: "/images/cultural_fest_performance_1768117835053.png", // Using existing image
        tag: "Event"
    },
    {
        id: 2,
        date: "05 Aug 2026",
        title: "Semester Examination Schedule Released",
        description: "Students are advised to check the academic calendar for details regarding the upcoming semester examinations.",
        image: "/images/classroom_learning_1768115518451.png", // Using existing image
        tag: "Notice"
    },
    {
        id: 3,
        date: "28 Jul 2026",
        title: "Admissions Open for 2026–2027",
        description: "Applications are now open for UG and PG programs. Prospective students can apply online or visit the campus.",
        image: "/images/admissions_open_hero_1768116412312.png", // Using existing image
        tag: "Admission"
    }
];

export default function NewsSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-3 tracking-tight"
                    >
                        Latest News & Announcements
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg max-w-2xl mx-auto text-center font-medium"
                    >
                        Stay updated with the latest happenings and important notices
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-wider shadow-sm">
                                    {item.tag}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm font-medium text-zinc-500">{item.date}</span>
                                </div>

                                <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>

                                <p className="text-zinc-600 mb-6 text-sm leading-relaxed line-clamp-3">
                                    {item.description}
                                </p>

                                <div className="mt-auto flex items-center text-emerald-700 font-bold text-sm group-hover:gap-2 transition-all duration-300">
                                    <span>Read more</span>
                                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link href="/announcements">
                        <button className="px-8 py-3 rounded-full border border-zinc-200 text-zinc-600 font-semibold hover:bg-zinc-50 hover:text-emerald-800 hover:border-emerald-200 transition-all">
                            View All News
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
