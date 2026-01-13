'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface GalleryItem {
    _id: string;
    title: string;
    category: string;
    imageUrl: string;
}

const fallbackItems: GalleryItem[] = [
    {
        _id: '1',
        title: 'Academic Resources',
        category: 'Library',
        imageUrl: '/images/college.png',
    },
    {
        _id: '2',
        title: 'Modern Infrastructure',
        category: 'Facilities',
        imageUrl: '/images/college.png',
    },
    {
        _id: '3',
        title: 'Student Events',
        category: 'Activities',
        imageUrl: '/images/college.png',
    },
    {
        _id: '4',
        title: 'Learning Environment',
        category: 'Campus',
        imageUrl: '/images/college.png',
    },
    {
        _id: '5',
        title: 'Student Communities',
        category: 'Clubs',
        imageUrl: '/images/college.png',
    },
    {
        _id: '6',
        title: 'Physical Fitness',
        category: 'Sports',
        imageUrl: '/images/college.png',
    }
];

export default function Gallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);
                const data = await response.json();

                if (data.success && data.data.length > 0) {
                    setItems(data.data);
                } else {
                    setItems(fallbackItems);
                }
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
                setItems(fallbackItems);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight"
                    >
                        Campus Highlights
                    </motion.h2>
                    <div className="h-1 w-20 bg-emerald-600 mx-auto rounded-full mb-6"></div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg max-w-2xl mx-auto text-center font-medium"
                    >
                        Discover the vibrant life and world-class facilities at CM College
                    </motion.p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-zinc-100"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={item.imageUrl || '/images/college.png'}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Subtle overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                {/* Category Tag */}
                                <span className="inline-block text-xs font-bold tracking-wider uppercase text-emerald-600 mb-2">
                                    {item.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-zinc-900 mb-1 group-hover:text-emerald-800 transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Explore Button */}
                <div className="mt-16 text-center">
                    <Link href="/gallery">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all group"
                        >
                            <span className="text-emerald-900 font-bold text-lg">Explore Full Gallery</span>
                            <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center group-hover:bg-emerald-800 transition-colors">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                                </svg>
                            </div>
                        </motion.button>
                    </Link>
                    <p className="mt-6 text-zinc-400 text-sm font-medium tracking-wide">
                        Detailed view of academic, sports, and cultural milestones
                    </p>
                </div>

            </div>
        </section>
    );
}
