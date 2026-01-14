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
        quote: "CM College stands out as a beacon of excellence in education. The transformative years spent here were instrumental in honing my skills and shaping my perspective. The exceptional mentorship and state-of-the-art facilities provided a holistic learning experience. Beyond academics, the college encouraged a spirit of leadership and community service, qualities that continue to guide me in my career and life.",
        name: "Muhammed Masood",
        program: "B.Sc Computer Science",
        year: "Class of 2020",
    },
    {
        id: 2,
        quote: "Attending CM College was an unforgettable journey that enriched my academic and personal growth. The dedicated faculty and innovative curriculum provided a solid foundation for my career. The college’s vibrant campus life and diverse student community fostered lifelong friendships and networking opportunities. Grateful for the nurturing environment that helped shape me into a successful professional.",
        name: "Tony Martin",
        program: "BA ENGLISH",
        year: "Class of 2016",
    },
    {
        id: 3,
        quote: "Choosing CM College was a pivotal decision that I’ll forever cherish. The institution’s commitment to academic rigor, combined with its inclusive atmosphere, set the stage for my achievements. The interactive classroom sessions and emphasis on real-world applications equipped me with practical knowledge. I owe a significant part of my accomplishments to the solid education and values instilled by CM College.",
        name: "Hashir Salim",
        program: "BCA",
        year: "Class of 2022",
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

    const handleDragEnd = (event: any, info: any) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -50 || velocity < -500) {
            // Swipe Left -> Next
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        } else if (offset > 50 || velocity > 500) {
            // Swipe Right -> Previous
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    return (
        <section
            className="relative w-full py-24 md:py-32 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
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
                        Testimonials
                    </h2>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto mt-6 rounded-full opacity-80"></div>
                </motion.div>

                {/* Testimonial Carousel */}
                <div className="relative min-h-[350px] md:min-h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={testimonials[currentIndex].id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={handleDragEnd}
                            className="absolute inset-0 flex flex-col items-center justify-center px-4 touch-pan-y"
                        >
                            <div className="max-w-4xl">
                                <p className="text-base md:text-lg lg:text-xl font-medium leading-loose italic opacity-90 mb-6 md:mb-8 font-serif">
                                    &quot;{testimonials[currentIndex].quote}&quot;
                                </p>
                                <div className="flex flex-col items-center gap-1.5">
                                    <h4 className="text-base md:text-lg font-bold text-emerald-200 uppercase tracking-wide">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <span className="text-xs md:text-sm text-gray-300 font-medium tracking-wider bg-white/10 px-3 py-1 rounded-full">
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
