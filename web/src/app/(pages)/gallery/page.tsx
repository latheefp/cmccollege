"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import DynamicCTA from "@/components/DynamicCTA";

interface GalleryItem {
    _id: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}

const CATEGORIES = ["All", "Campus", "Events", "Sports", "Classroom", "Others"];

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch("/api/gallery");
                if (response.ok) {
                    const data = await response.json();
                    setItems(data.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const filteredImages = activeCategory === "All"
        ? items
        : items.filter(img => img.category === activeCategory);

    const openLightbox = (index: number) => {
        const originalIndex = items.findIndex(item => item._id === filteredImages[index]._id);
        setSelectedImageIndex(originalIndex);
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
        <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 font-sans pt-[112px]">
            {/* Page Header */}
            <section className="py-20 px-6 bg-white border-b border-zinc-100">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-agency font-bold text-emerald-900 mb-6 uppercase tracking-tight">
                            Campus <span className="text-[#7B0046]">Gallery</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            Capturing the moments, achievements, and daily life at CM College.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 px-4 md:px-8 max-w-[2000px] mx-auto grow w-full">
                {/* Category Filters */}
                <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-12">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 active:scale-95 border ${activeCategory === category
                                ? "bg-[#7B0046] text-white border-[#7B0046] shadow-lg shadow-[#7B0046]/20"
                                : "bg-white text-zinc-500 border-zinc-200 hover:border-emerald-600 hover:text-emerald-700"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </ScrollReveal>

                {/* Image Grid */}
                {loading ? (
                    <div className="py-24 text-center">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-zinc-400 font-medium text-sm">Loading gallery...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-red-100 max-w-2xl mx-auto shadow-sm">
                        <h2 className="text-2xl font-bold text-red-900 mb-2 uppercase">Notice</h2>
                        <p className="text-red-600 font-medium">The digital gallery is temporarily offline.</p>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <ScrollReveal className="text-center py-24 bg-white rounded-3xl border border-dashed border-zinc-200 max-w-3xl mx-auto">
                        <p className="text-zinc-400 text-xl font-medium">No visuals found for this category.</p>
                    </ScrollReveal>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-6">
                        {filteredImages.map((image, i) => (
                            <ScrollReveal key={image._id} delay={i * 30}>
                                <div
                                    className="group relative aspect-square md:aspect-4/3 rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-zinc-100 cursor-pointer"
                                    onClick={() => openLightbox(i)}
                                >
                                    <Image
                                        src={image.imageUrl}
                                        alt="Gallery entry"
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Subtle Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">
                                            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                                {image.category}
                                            </span>
                                            <div className="w-10 h-10 rounded-full bg-white text-[#7B0046] flex items-center justify-center shadow-lg">
                                                <Maximize2 size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </section>

            {/* Lightbox / Image Viewer */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] bg-white/10 p-3 rounded-full border border-white/10"
                            onClick={closeLightbox}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation - Hidden on mobile/tablet */}
                        <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 hidden lg:flex justify-between z-110 pointer-events-none">
                            <button
                                className="w-14 h-14 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all pointer-events-auto backdrop-blur-md"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                className="w-14 h-14 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all pointer-events-auto backdrop-blur-md"
                                onClick={nextImage}
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Image Container with Swipe Support */}
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, info) => {
                                const swipeThreshold = 50;
                                if (info.offset.x < -swipeThreshold) {
                                    nextImage();
                                } else if (info.offset.x > swipeThreshold) {
                                    prevImage();
                                }
                            }}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-5xl w-full h-[70vh] md:h-[80vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 select-none pointer-events-none">
                                <Image
                                    src={items[selectedImageIndex].imageUrl}
                                    alt="Gallery Showcase"
                                    fill
                                    className="object-contain"
                                    priority
                                    unoptimized
                                />
                            </div>

                            {/* Meta Info & Touch Indicator */}
                            <div className="absolute -bottom-16 left-0 right-0 text-center text-white">
                                <p className="text-sm font-bold tracking-widest uppercase opacity-80 mb-1">
                                    {items[selectedImageIndex].category}
                                </p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-0.5 w-8 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#7B0046] transition-all duration-300"
                                            style={{ width: `${((selectedImageIndex + 1) / items.length) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] opacity-50 uppercase tracking-[0.2em] font-bold">
                                        {selectedImageIndex + 1} / {items.length}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer CTA */}
            <DynamicCTA className="py-20 px-6 bg-emerald-950 text-white text-center" />
        </div>
    );
}
