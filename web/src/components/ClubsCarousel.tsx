'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const clubs = [
    {
        id: 1,
        name: "TechSias",
        icon: "💻"
    },
    {
        id: 2,
        name: "Women Development Cell",
        icon: "👩‍🎓"
    },
    {
        id: 3,
        name: "National Service Scheme",
        icon: "🤝"
    },
    {
        id: 4,
        name: "Arts & Cultural Club",
        icon: "🎨"
    },
    {
        id: 5,
        name: "Sports Club",
        icon: "🏆"
    },
    {
        id: 6,
        name: "Entrepreneurship Cell",
        icon: "🚀"
    }
];

export default function ClubsCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();
    const x = useMotionValue(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth / 2); // Divide by 2 because we duplicated items
        }
    }, []);

    useEffect(() => {
        const startAnimation = async () => {
            if (!isHovered && width > 0) {
                try {
                    await controls.start({
                        x: -width,
                        transition: {
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    });
                } catch (e) {
                    // Animation stopped
                }
            } else {
                controls.stop();
            }
        };

        startAnimation();
    }, [isHovered, width, controls]);

    // Duplicate clubs for seamless loop
    const displayClubs = [...clubs, ...clubs, ...clubs]; // Tripled to ensure smoothness on large screens

    return (
        <section className="py-24 bg-zinc-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-semibold text-emerald-800 mb-3 tracking-tight"
                    >
                        Student Clubs & Activities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium"
                    >
                        Platforms that encourage leadership, innovation, and social responsibility
                    </motion.p>
                </div>
            </div>

            {/* Carousel */}
            <motion.div
                ref={carouselRef}
                className="pl-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    animate={controls}
                    style={{ x }}
                    className="flex gap-6 w-max"
                >
                    {displayClubs.map((club, index) => (
                        <motion.div
                            key={`${club.id}-${index}`}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 w-32 h-32 md:w-64 md:h-64 flex flex-col items-center justify-center border border-zinc-100 group cursor-pointer"
                            whileHover={{ y: -8 }}
                        >
                            <div className="text-3xl md:text-6xl mb-3 md:mb-6 bg-zinc-50 p-3 md:p-6 rounded-full group-hover:scale-110 transition-transform duration-300">
                                {club.icon}
                            </div>
                            <h3 className="text-xs md:text-lg font-bold text-zinc-800 text-center px-1 md:px-4 group-hover:text-emerald-700 transition-colors leading-tight">
                                {club.name}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

        </section>
    );
}
