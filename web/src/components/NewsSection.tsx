'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

interface NewsItem {
    _id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    tag: string;
}

interface NewsSectionProps {
    initialNews?: any[];
}

export default function NewsSection({ initialNews }: NewsSectionProps) {
    const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews || []);
    const [isLoading, setIsLoading] = useState(!initialNews);

    useEffect(() => {
        if (initialNews) return;

        const fetchNews = async () => {
            try {
                const res = await fetch("/api/news");
                const data = await res.json();
                if (data.success) {
                    setNewsItems(data.data.slice(0, 3)); // Show only latest 3
                }
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-agency font-bold text-emerald-800 mb-2 md:mb-3 uppercase"
                    >
                        Latest News & Events
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto text-center font-medium"
                    >
                        Highlights from campus life, academic activities, and events
                    </motion.p>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden border border-zinc-100 flex flex-col h-[400px]">
                                <Skeleton className="h-48 w-full" />
                                <div className="p-5 flex flex-col gap-4 grow">
                                    <Skeleton className="h-4 w-24" variant="text" />
                                    <Skeleton className="h-6 w-full" variant="text" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-full" variant="text" />
                                        <Skeleton className="h-3 w-[80%]" variant="text" />
                                    </div>
                                    <Skeleton className="h-4 w-20 mt-auto" variant="text" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {newsItems.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full shrink-0 w-[85vw] md:w-auto snap-center"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-zinc-100">
                                    <Image
                                        src={item.image || '/images/college.png'}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 uppercase tracking-wider shadow-sm">
                                        {item.tag}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs font-medium text-zinc-500">{formatDate(item.date)}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                                        {item.title}
                                    </h3>

                                    <p className="text-zinc-600 mb-4 text-xs md:text-sm leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>

                                    <div className="mt-auto flex items-center text-emerald-700 font-bold text-xs group-hover:gap-1.5 transition-all duration-300">
                                        <span>Read more</span>
                                        <svg className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                )}

                {/* View All Button */}
                <div className="mt-10 text-center">
                    <Link href="/news">
                        <button className="px-6 py-2.5 rounded-full border border-zinc-200 text-zinc-600 text-sm font-semibold hover:bg-zinc-50 hover:text-emerald-800 hover:border-emerald-200 transition-all">
                            View All Events
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
