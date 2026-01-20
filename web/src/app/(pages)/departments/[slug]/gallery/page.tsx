"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { DEPARTMENT_DATA } from "@/data/departments";

export default function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
        setCurrentSlide(Math.abs((page + newDirection) % data.gallery.length));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [page]);

    return (
        <div className="space-y-8">
            <div className="border-b border-zinc-100 pb-8">
                <h2 className="text-3xl font-bold font-serif text-[#5D1035] mb-4">Department Gallery</h2>
                <p className="text-xl text-zinc-600 leading-relaxed font-light">
                    A visual journey through our specialized labs, collaborative spaces, and vibrant academic life.
                </p>
            </div>

            <ScrollReveal>
                <div className="relative mx-auto w-full">
                    <div className="aspect-[4/3] md:aspect-[16/9] w-full bg-white rounded-[2.5rem] p-3 md:p-4 shadow-2xl overflow-hidden relative border border-zinc-200">
                        <div className="w-full h-full relative rounded-[2rem] overflow-hidden bg-zinc-50">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={page}
                                    custom={direction}
                                    variants={{
                                        enter: (direction: number) => ({
                                            x: direction > 0 ? 1000 : -1000,
                                            opacity: 0
                                        }),
                                        center: {
                                            zIndex: 1,
                                            x: 0,
                                            opacity: 1
                                        },
                                        exit: (direction: number) => ({
                                            zIndex: 0,
                                            x: direction < 0 ? 1000 : -1000,
                                            opacity: 0
                                        })
                                    }}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="absolute inset-0"
                                >
                                    {/* Ambient Background Blur */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={data.gallery[currentSlide].img}
                                            alt="Background blur"
                                            fill
                                            className="object-cover blur-md scale-110 opacity-40 grayscale-[20%]"
                                            priority
                                        />
                                    </div>

                                    {/* Main Image */}
                                    <Image
                                        src={data.gallery[currentSlide].img}
                                        alt={`Gallery image ${currentSlide}`}
                                        fill
                                        className="object-contain z-10 relative transition-transform duration-700 hover:scale-105 drop-shadow-2xl"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <div className="absolute bottom-4 right-4 flex gap-3 z-20">
                                <button
                                    onClick={() => paginate(-1)}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 transition-all active:scale-95"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => paginate(1)}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 transition-all active:scale-95"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
