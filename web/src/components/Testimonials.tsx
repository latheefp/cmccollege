"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    program: string;
    year: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "The academic rigor and supportive environment at CM College shaped my career foundation. It wasn't just about degrees; it was about character building and holistic growth.",
        name: "Aysha R.",
        program: "B.Sc. Psychology",
        year: "Class of 2019",
    },
    {
        id: 2,
        quote: "From cultural fests to intense classroom sessions, my days here were unforgettable. The faculty truly cares about every student's potential and future success.",
        name: "Muhammed Fasil",
        program: "B.Com Computer Application",
        year: "Class of 2021",
    },
    {
        id: 3,
        quote: "Being part of the NSS and various clubs gave me leadership skills I use every day in my corporate life. A wonderful place to learn and grow.",
        name: "Fathima S.",
        program: "BA English",
        year: "Class of 2020",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 3000); // 7 seconds per slide

        return () => clearInterval(interval);
    }, [isHovered]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section
            className="relative w-full py-24 md:py-32 overflow-hidden flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/school_annual_award_ceremony_stage_1768117893644.png"
                    alt="Alumni Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Premium Dark Overlay */}
                <div className="absolute inset-0 bg-zinc-900/80 md:bg-zinc-900/75 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900/50"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center text-white">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 md:mb-16"
                >
                    <span className="block text-[#fff] text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-80 mb-3">
                        What Our Alumni Say
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-serif tracking-tight">
                        Our Testimonials
                    </h2>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto mt-6 rounded-full opacity-80"></div>
                </motion.div>

                {/* Testimonial Carousel */}
                <div className="relative h-[280px] md:h-[220px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={testimonials[currentIndex].id}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <div className="max-w-3xl">
                                <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed italic opacity-90 mb-8">
                                    &quot;{testimonials[currentIndex].quote}&quot;
                                </p>
                                <div className="flex flex-col items-center gap-1">
                                    <h4 className="text-lg md:text-xl font-bold text-emerald-200">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <span className="text-sm text-gray-300 font-medium tracking-wide">
                                        {testimonials[currentIndex].program} &bull; {testimonials[currentIndex].year}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8 md:mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-emerald-500" : "w-2 bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
