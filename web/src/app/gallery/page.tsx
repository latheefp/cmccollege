"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface GalleryItem {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}

const CATEGORIES = ["All", "Campus", "Events", "Hostel", "Classroom"];

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);
                if (response.ok) {
                    const data = await response.json();
                    setItems(data.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const filteredImages = activeCategory === "All"
        ? items
        : items.filter(img => img.category === activeCategory);

    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-[112px]">
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
                {loading ? (
                    <div className="py-24 text-center">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-zinc-400 font-bold italic tracking-widest">Loading moments...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
                        <h2 className="text-2xl font-bold text-red-900 mb-2">Notice</h2>
                        <p className="text-red-600">The gallery is temporarily unavailable. Please try again later.</p>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <ScrollReveal className="text-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
                        <p className="text-zinc-400 text-lg">No images found in this category.</p>
                    </ScrollReveal>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredImages.map((image, i) => (
                            <ScrollReveal key={image._id} delay={i * 50} className="group">
                                <div className="relative h-80 rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 border border-emerald-50">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.title}
                                        fill
                                        unoptimized
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
