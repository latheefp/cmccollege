"use client";

import { motion } from "framer-motion";
import { Book, Monitor, Wifi, Bus, Home, Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Styled placeholders matching the theme since image generation is currently limited
const AMENITIES = [
    {
        id: "library",
        title: "Central Library",
        slug: "central-library",
        icon: Book,
        image: "https://placehold.co/800x1200/2A0818/FFFFFF?text=Central+Library",
        colSpan: 1,
    },
    {
        id: "computer-lab",
        title: "Computer Labs",
        slug: "computer-labs",
        icon: Monitor,
        image: "https://placehold.co/800x1200/3B0A22/FFFFFF?text=Computer+Labs",
        colSpan: 1,
    },
    {
        id: "wifi",
        title: "Wi-Fi Campus",
        slug: "wifi-campus",
        icon: Wifi,
        image: "https://placehold.co/800x1200/4C0D2C/FFFFFF?text=Wi-Fi+Enabled",
        colSpan: 1,
    },
    {
        id: "transport",
        title: "Transportation",
        slug: "transportation",
        icon: Bus,
        image: "https://placehold.co/800x1200/5D1035/FFFFFF?text=Transportation",
        colSpan: 1,
    },
    {
        id: "girls-hostel",
        title: "Girls Hostel",
        slug: "girls-hostel",
        icon: Home,
        image: "https://placehold.co/800x1200/6E133F/FFFFFF?text=Girls+Hostel",
        colSpan: 1,
    },
    {
        id: "boys-hostel",
        title: "Boys Hostel",
        slug: "boys-hostel",
        icon: Home,
        image: "https://placehold.co/800x1200/7F1649/FFFFFF?text=Boys+Hostel",
        colSpan: 1,
    },
];

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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {AMENITIES.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            className="group relative h-[400px] md:h-[500px] rounded-[20px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
                        >
                            <Link href={`/amenities/${item.slug}`} className="block h-full w-full">
                                {/* Background Image */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="flex flex-col gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <item.icon strokeWidth={1.5} className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-serif text-white tracking-wide">
                                            {item.title}
                                        </h3>
                                        <div className="h-0.5 w-12 bg-[#5D1035] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
