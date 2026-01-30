"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface GalleryItem {
    _id: string;
    imageUrl: string;
    category: string;
}

export default function AlumniGalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/gallery?category=Alumni");
                const data = await response.json();
                if (data.data) { // Standardizing response format
                    // Filter client side as backup if API doesn't filter, or API route logic needs to handle param
                    // Assuming generic gallery API returns { data: [] }
                    // If current gallery API needs category param, we should pass it.
                    // Let's assume generic /api/gallery might filter by query param if implemented, 
                    // or we fetch all and filter.
                    // Checking step 60 (gallery/page.tsx) shows fetch("/api/gallery"), which returns all.
                    // We might need to update API route for filtering or filter here.
                    // For now, let's fetch all and filter client side to be safe, or check API code.
                    const alumniImages = data.data.filter((item: GalleryItem) => item.category === 'Alumni');
                    setImages(alumniImages);
                }
            } catch (error) {
                console.error("Failed to fetch gallery", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-zinc-200/40 border border-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-serif text-zinc-900 mb-8 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-800">
                            <ImageIcon className="w-5 h-5" />
                        </span>
                        Alumni Gallery
                    </h3>

                    {images.length === 0 ? (
                        <p className="text-zinc-500 text-center py-10">No photos in the gallery yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {images.map((item, idx) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="aspect-4/3 bg-zinc-100 rounded-2xl overflow-hidden relative group cursor-pointer"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt="Alumni Gallery"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <p className="text-white font-medium">Alumni Event</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
