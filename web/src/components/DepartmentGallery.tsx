"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface GalleryImage {
    img: string;
    category: string;
    title?: string;
}

interface DepartmentGalleryProps {
    images: GalleryImage[];
}

const ITEMS_PER_PAGE = 20;

export default function DepartmentGallery({ images }: DepartmentGalleryProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentImages = images.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of gallery smoothly
        const galleryElement = document.getElementById('department-gallery');
        if (galleryElement) {
            galleryElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!images || images.length === 0) return null;

    return (
        <section id="department-gallery" className="py-16 md:py-24 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-[#7B0046]/5 text-[#7B0046] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-[#7B0046]/10">
                            Visual Tour
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif text-zinc-900 mb-4 tracking-tight">
                            Department Gallery
                        </h2>
                        <div className="h-1 w-16 bg-[#7B0046] mx-auto rounded-full mb-4" />
                        <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-light">
                            A visual journey through our specialized labs, collaborative spaces, and vibrant academic life.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {currentImages.map((image, index) => (
                        <ScrollReveal key={`${currentPage}-${index}`} delay={index * 50}>
                            <motion.div
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-zinc-100 border border-zinc-100 shadow-sm"
                                whileHover={{ y: -4 }}
                                onClick={() => setSelectedImage(image)}
                            >
                                <Image
                                    src={image.img}
                                    alt={image.category || "Gallery Image"}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                        <ZoomIn className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Caption Badge */}
                                {image.category && (
                                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 delay-75">
                                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-bold text-[#7B0046] shadow-lg">
                                            {image.category}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 md:mt-16">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all
                                ${currentPage === 1
                                    ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                                    : "border-zinc-300 text-zinc-600 hover:border-[#7B0046] hover:text-[#7B0046] hover:bg-[#7B0046]/5"
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-full text-sm font-bold transition-all
                                        ${currentPage === page
                                            ? "bg-[#7B0046] text-white shadow-lg shadow-[#7B0046]/20"
                                            : "bg-white border border-zinc-200 text-zinc-600 hover:border-[#7B0046] hover:text-[#7B0046]"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all
                                ${currentPage === totalPages
                                    ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                                    : "border-zinc-300 text-zinc-600 hover:border-[#7B0046] hover:text-[#7B0046] hover:bg-[#7B0046]/5"
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video max-h-[85vh] rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.img}
                                alt={selectedImage.category || "Gallery Image"}
                                fill
                                className="object-contain" // Full image size in lightbox
                                priority
                            />
                            {selectedImage.title && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                                    <p className="opacity-80">{selectedImage.category}</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
