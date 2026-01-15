'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const clubs = [
    {
        id: 1,
        name: "Nature Club",
        image: "https://i.pinimg.com/1200x/9e/db/d8/9edbd8e1200b24f0e5bb560733a087e8.jpg"
    },
    {
        id: 2,
        name: "TechSias",
        image: "https://i.pinimg.com/736x/d9/90/a9/d990a970d73df3c569b2e9a467d59922.jpg"
    },
    {
        id: 3,
        name: "Women Development Cell",
        image: "https://i.pinimg.com/1200x/1e/1b/80/1e1b80ce59caa3bcf552518baadf513d.jpg"
    },
    {
        id: 4,
        name: "National Service Scheme",
        image: "https://i.pinimg.com/1200x/1e/1b/80/1e1b80ce59caa3bcf552518baadf513d.jpg"
    },
    {
        id: 5,
        name: "Arts & Cultural Club",
        image: "https://i.pinimg.com/736x/7d/73/da/7d73da2678a646971f19004eeaec8eab.jpg"
    },
    {
        id: 6,
        name: "Sports Club",
        image: "https://i.pinimg.com/736x/83/c2/64/83c2648170276c460351205df7c36e34.jpg"
    },
    {
        id: 7,
        name: "Entrepreneurship Cell",
        image: "https://i.pinimg.com/736x/34/7e/b8/347eb87ff820c17dcca0039e282e2059.jpg"
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
            setWidth(carouselRef.current.scrollWidth / 2);
        }
    }, []);

    useEffect(() => {
        const startAnimation = async () => {
            if (!isHovered && width > 0) {
                try {
                    await controls.start({
                        x: -width,
                        transition: {
                            duration: 25,
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
    const displayClubs = [...clubs, ...clubs, ...clubs];

    return (
        <section className="py-12 md:py-24 bg-zinc-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-16">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-semibold text-emerald-800 mb-2 md:mb-3 tracking-tight"
                    >
                        Student Clubs & Activities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto font-medium"
                    >
                        Platforms that encourage leadership, innovation, and social responsibility
                    </motion.p>
                </div>
            </div>

            {/* Carousel */}
            <motion.div
                ref={carouselRef}
                className="pl-4 md:pl-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    animate={controls}
                    style={{ x }}
                    className="flex gap-4 md:gap-6 w-max"
                >
                    {displayClubs.map((club, index) => (
                        <motion.div
                            key={`${club.id}-${index}`}
                            className="bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 w-28 h-28 md:w-48 md:h-48 flex flex-col items-center justify-center border border-zinc-100 group cursor-pointer relative overflow-hidden"
                            whileHover={{ y: -8 }}
                        >
                            <div className="relative w-12 h-12 md:w-24 md:h-24 mb-2 md:mb-4 transition-transform duration-500 group-hover:scale-110">
                                <Image
                                    src={club.image}
                                    alt={club.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-[10px] md:text-sm font-bold text-zinc-800 text-center px-1 md:px-4 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-2">
                                {club.name}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

        </section>
    );
}
