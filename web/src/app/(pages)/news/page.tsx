'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight, Search } from 'lucide-react';

interface NewsItem {
    _id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    tag: string;
}

export default function NewsPage() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    const tags = ['All', 'Seminar', 'Sports', 'Cultural', 'Academic', 'General', 'Workshop', 'Events'];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch("/api/news");
                const data = await res.json();
                if (data.success) {
                    setNewsItems(data.data);
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
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    const filteredNews = newsItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
        return matchesSearch && matchesTag;
    });

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 pt-[112px]">
            {/* Header */}
            <section className="bg-emerald-900 py-16 px-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[30px_30px]" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Campus News & Events
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Stay updated with the latest happenings, achievements, and announcements from CM College.
                    </motion.p>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-[112px] z-30 bg-white border-b border-zinc-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Tags */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                            {tags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${selectedTag === tag
                                        ? 'bg-emerald-800 text-white shadow-md'
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all text-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-12 md:py-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-white rounded-2xl h-[450px] animate-pulse shadow-sm border border-zinc-100" />
                            ))}
                        </div>
                    ) : filteredNews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                                >
                                    <Link href={`/news/${item._id}`} className="block relative h-56 overflow-hidden">
                                        <Image
                                            src={item.image || '/images/college.png'}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-emerald-900 uppercase tracking-widest shadow-sm">
                                            {item.tag}
                                        </div>
                                    </Link>

                                    <div className="p-6 flex flex-col grow">
                                        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3 font-medium">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{formatDate(item.date)}</span>
                                        </div>

                                        <Link href={`/news/${item._id}`}>
                                            <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-tight">
                                                {item.title}
                                            </h3>
                                        </Link>

                                        <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3 mb-6">
                                            {item.description}
                                        </p>

                                        <Link
                                            href={`/news/${item._id}`}
                                            className="mt-auto inline-flex items-center gap-2 text-emerald-800 font-bold text-sm tracking-wide group/btn"
                                        >
                                            Read Full Story
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-zinc-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-800 mb-2">No news found</h3>
                            <p className="text-zinc-500">Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
