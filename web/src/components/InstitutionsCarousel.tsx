"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Institution {
    name?: string;
    logo: string;
}

interface InstitutionsCarouselProps {
    items: string[]; // specific to the simple array of strings used in parent
}

export default function InstitutionsCarousel({ items }: InstitutionsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4); // Default to desktop

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(2);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(3);
            } else {
                setItemsPerPage(5);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    // Auto-slide 
    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex, items.length]);

    // Circular item retrieval logic
    const getVisibleItems = () => {
        const result = [];
        for (let i = 0; i < itemsPerPage; i++) {
            result.push(items[(currentIndex + i) % items.length]);
        }
        return result;
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="relative max-w-7xl mx-auto px-4 md:px-12 group">
            {/* Auto-slide Progress Bar */}
            <div className="absolute top-0 left-12 right-12 h-0.5 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-[#7a0b3a]/20"
                />
            </div>

            {/* Carousel Content Container */}
            <div className="overflow-hidden py-10 px-2 cursor-grab active:cursor-grabbing">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            const threshold = 50;
                            if (info.offset.x > threshold) {
                                prev();
                            } else if (info.offset.x < -threshold) {
                                next();
                            }
                        }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="flex items-center justify-center gap-4 md:gap-8"
                    >
                        {visibleItems.map((logo, idx) => (
                            <motion.div
                                key={`${currentIndex}-${idx}`}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="relative w-28 h-16 md:w-44 md:h-28 shrink-0 bg-white rounded-xl border border-zinc-100/50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex items-center justify-center p-3 md:p-5 group/logo"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-zinc-50 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity rounded-xl"></div>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={logo}
                                        alt={`Institution Logo`}
                                        fill
                                        className="object-contain transition-all duration-500 opacity-70 group-hover/logo:opacity-100 scale-90 group-hover/logo:scale-100"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
