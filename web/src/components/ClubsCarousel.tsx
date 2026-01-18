'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

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
    // Triplicate for seamless loop
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
            <div className="w-full overflow-hidden mask-gradient-x">
                <motion.div
                    className="flex gap-4 md:gap-6 w-max"
                    animate={{ x: "-33.333%" }}
                    transition={{
                        duration: 15,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                >
                    {displayClubs.map((club, index) => (
                        <div // Changed from motion.div for better performance
                            key={`${club.id}-${index}`}
                            className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 w-24 h-24 md:w-40 md:h-40 flex flex-col items-center justify-center border border-zinc-100 group relative overflow-hidden flex-shrink-0"
                        >
                            <div className="relative w-10 h-10 md:w-20 md:h-20 mb-1 md:mb-3 transition-transform duration-500 group-hover:scale-105">
                                <Image
                                    src={club.image}
                                    alt={club.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100px, 160px"
                                />
                            </div>
                            <h3 className="text-[9px] md:text-xs font-bold text-zinc-800 text-center px-1 md:px-2 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-2">
                                {club.name}
                            </h3>
                        </div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
