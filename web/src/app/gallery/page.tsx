"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const GALLERY_IMAGES = [
    { id: "1", category: "Sports", src: "/images/school_sports_day_1768117809679.png", title: "Annual Sports Day 2024" },
    { id: "2", category: "Events", src: "/images/cultural_fest_performance_1768117835053.png", title: "Cultural Fest Performance" },
    { id: "3", category: "Academic", src: "/images/science_exhibition_project_1768117868795.png", title: "Science Exhibition" },
    { id: "4", category: "Events", src: "/images/school_annual_award_ceremony_stage_1768117893644.png", title: "Award Ceremony" },
    { id: "5", category: "Campus", src: "/images/hero_campus_background_1768115501790.png", title: "School Campus" },
    { id: "6", category: "Academic", src: "/images/classroom_learning_1768115518451.png", title: "Classroom Learning" },
    { id: "7", category: "Campus", src: "/images/school_hostel_1768115536813.png", title: "Hostel Facility" },
    { id: "8", category: "Academic", src: "/images/school_library_1768115599802.png", title: "School Library" },
];

const CATEGORIES = ["All", "Academic", "Campus", "Sports", "Events"];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredImages = activeCategory === "All"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter(img => img.category === activeCategory);

    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-20">
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-emerald-900 text-white overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            School Gallery
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
                            Capturing moments of learning, growth, and joy within our campus community.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto flex-grow">
                {/* Category Filters */}
                <ScrollReveal className="flex flex-wrap justify-center gap-4 mb-16">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeCategory === category
                                    ? "bg-emerald-800 text-white shadow-lg scale-105"
                                    : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </ScrollReveal>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredImages.map((image, i) => (
                        <ScrollReveal key={image.id} delay={i * 50} className="group">
                            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 border border-emerald-50">
                                <Image
                                    src={image.src}
                                    alt={image.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                                        {image.category}
                                    </span>
                                    <h3 className="text-white text-xl font-bold">{image.title}</h3>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {filteredImages.length === 0 && (
                    <ScrollReveal className="text-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
                        <p className="text-zinc-400 text-lg">No images found in this category.</p>
                    </ScrollReveal>
                )}
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-emerald-900 text-white text-center">
                <ScrollReveal>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to see more?</h2>
                    <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">Visit our school to experience our vibrant campus life firsthand. Our doors are always open for parents and students.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href="/contact" className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform text-lg">
                            Book a Campus Visit
                        </a>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
