'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Skeleton from './Skeleton';

interface GalleryItem {
    _id: string;
    title?: string;
    category?: string;
    imageUrl: string;
}

const fallbackItems: GalleryItem[] = [
    { _id: '1', imageUrl: '/images/college.png' },
    { _id: '2', imageUrl: '/images/college.png' },
    { _id: '3', imageUrl: '/images/college.png' },
    { _id: '4', imageUrl: '/images/college.png' },
    { _id: '5', imageUrl: '/images/college.png' },
    { _id: '6', imageUrl: '/images/college.png' }
];

interface GalleryProps {
    initialItems?: GalleryItem[];
}

export default function Gallery({ initialItems }: GalleryProps) {
    const [items, setItems] = useState<GalleryItem[]>(initialItems || []);
    const [loading, setLoading] = useState(!initialItems);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        if (initialItems) return;

        const fetchGallery = async () => {
            try {
                const response = await fetch("/api/gallery");
                const data = await response.json();

                if (data.success && data.data.length > 0) {
                    setItems(data.data.slice(0, 6));
                } else {
                    setItems(fallbackItems.slice(0, 6));
                }
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
                setItems(fallbackItems.slice(0, 6));
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'unset';
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % items.length);
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + items.length) % items.length);
        }
    };

    return (
        <section className="py-12 md:py-24 bg-zinc-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl font-agency font-bold text-emerald-950 mb-3 uppercase tracking-tight"
                    >
                        Campus <span className="text-[#7B0046]">Experience</span>
                    </motion.h2>
                    <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full mb-6"></div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto font-medium"
                    >
                        A window into the vibrant life and excellence at CM College.
                    </motion.p>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="w-full aspect-4/3 rounded-2xl md:rounded-[32px] overflow-hidden border-2 md:border-4 border-white">
                                <Skeleton className="w-full h-full" variant="rounded" />
                            </div>
                        ))
                    ) : (
                        items.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.05 }}
                                className="relative w-full aspect-4/3 rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm md:shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer border-2 md:border-4 border-white"
                                onClick={() => openLightbox(index)}
                            >
                                {/* Blurred Background Layer (Fills the container) */}
                                <Image
                                    src={item.imageUrl || '/images/college.png'}
                                    alt="Background Effect"
                                    fill
                                    quality={20}
                                    className="object-cover blur-2xl scale-125 opacity-60 pointer-events-none"
                                />

                                {/* Main Full Image (No Crop) */}
                                <Image
                                    src={item.imageUrl || '/images/college.png'}
                                    alt="Gallery Thumbnail"
                                    fill
                                    className="object-cover z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-md"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:duration-500 flex items-center justify-center p-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform scale-90 group-hover:scale-100 transition-all duration-500">
                                        <Maximize2 className="text-white w-8 h-8" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Explore Button */}
                <div className="mt-12 text-center">
                    <Link href="/gallery">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-[#7B0046] text-white rounded-2xl md:rounded-4xl shadow-lg md:shadow-xl overflow-hidden cursor-pointer w-full md:w-auto justify-center"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <span className="text-base md:text-lg font-bold md:font-black tracking-tight uppercase">View Full Gallery</span>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Lightbox / Image Viewer */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-200 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-210 bg-white/10 p-4 rounded-4xl border border-white/10 hover:bg-white/20"
                            onClick={closeLightbox}
                        >
                            <X className="w-10 h-10" />
                        </motion.button>

                        {/* Navigation buttons */}
                        <div className="absolute inset-x-6 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-210 pointer-events-none">
                            <motion.button
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-20 h-20 rounded-4xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all pointer-events-auto backdrop-blur-xl shadow-2xl"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, x: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-20 h-20 rounded-4xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all pointer-events-auto backdrop-blur-xl shadow-2xl"
                                onClick={nextImage}
                            >
                                <ChevronRight className="w-10 h-10" />
                            </motion.button>
                        </div>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="relative w-full h-full flex items-center justify-center pointer-events-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full max-w-6xl max-h-[85vh] pointer-events-auto shadow-[0_100px_200px_rgba(0,0,0,0.8)] rounded-[3rem] overflow-hidden border-8 border-white/5">
                                <Image
                                    src={items[selectedImageIndex].imageUrl}
                                    alt="Full View"
                                    fill
                                    className="object-contain"
                                    priority
                                />

                                {/* Snapshot Counter */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                                    <p className="text-white/80 font-black tracking-widest text-xs uppercase">
                                        Slide <span className="text-emerald-400">{selectedImageIndex + 1}</span> of {items.length}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
