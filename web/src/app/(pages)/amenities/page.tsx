"use client";

import { motion } from "framer-motion";
import { Book, Monitor, Wifi, Bus, Home, Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AMENITIES_DATA } from "@/data/amenities";

// Derive the list from our single source of truth to ensure consistency
const amenitiesList = Object.entries(AMENITIES_DATA).map(([slug, data]) => ({
    id: slug,
    title: data.title,
    slug: slug,
    icon: data.icon || Book, // Fallback icon if missing
    image: data.image,
    colSpan: 1,
}));

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
};

export default function AmenitiesPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-zinc-900 pt-[112px]">
            {/* --- Hero Section --- */}
            <section className="relative py-24 px-6 bg-gradient-to-b from-[#5D1035] to-[#3d0a23] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 tracking-tight">
                        Campus Amenities
                    </h1>
                    <p className="text-lg md:text-xl font-light text-white/80 tracking-wide">
                        Designed for learning, living, and growth.
                    </p>
                </motion.div>
            </section>

            {/* --- Amenities Grid --- */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {amenitiesList.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            className="group relative h-[260px] md:h-[300px] rounded-[32px] overflow-hidden cursor-pointer bg-zinc-900 shadow-xl hover:shadow-2xl hover:shadow-[#5D1035]/20 transition-all duration-500 sm:first:col-span-2"
                        >
                            <Link href={`/amenities/${item.slug}`} className="block h-full w-full relative">
                                {/* Background Image */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />

                                {/* Subtle Dark Overlay for contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-colors duration-500" />

                                {/* Floating Glass Pill - Centered Content */}
                                <div className="absolute inset-x-4 bottom-4">
                                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center justify-between gap-3 group-hover:bg-white/20 transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#5D1035] flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <item.icon strokeWidth={2} className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-base font-bold font-serif text-white leading-tight">
                                                {item.title}
                                            </h3>
                                        </div>

                                        {/* Animated Arrow */}
                                        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}
