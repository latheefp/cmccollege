"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Announcement {
    _id: string;
    title: string;
    description: string;
    isImportant: boolean;
    createdAt: string;
}

export default function AnnouncementTicker() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch("/api/announcements");
                const data = await response.json();
                if (data.success && data.data) {
                    const important = data.data.filter((a: Announcement) => a.isImportant);
                    setAnnouncements(important);
                }
            } catch (error) {
                console.error("Failed to fetch announcements for ticker:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    useEffect(() => {
        if (announcements.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, [announcements, isHovered]);

    useEffect(() => {
        const root = document.documentElement;
        if (isVisible && announcements.length > 0) {
            root.style.setProperty("--ticker-height", "40px");
            // Also adjust body padding for the fixed navbar which usually is h-20
            root.style.setProperty("--navbar-offset", "40px");
        } else {
            root.style.setProperty("--ticker-height", "0px");
            root.style.setProperty("--navbar-offset", "0px");
        }
        return () => {
            root.style.setProperty("--ticker-height", "0px");
            root.style.setProperty("--navbar-offset", "0px");
        };
    }, [isVisible, announcements]);

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
    };

    if (!isVisible || announcements.length === 0) return null;

    const currentAnnouncement = announcements[currentIndex];

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-emerald-950 border-b border-white/10 shadow-lg h-10 flex items-center overflow-hidden">
            <div className="flex-shrink-0 bg-black/20 px-4 h-full flex items-center border-r border-white/5">
                <span className="text-white font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Important
                </span>
            </div>

            <div
                className="flex-grow h-full relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentAnnouncement._id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="h-full flex items-center px-6"
                    >
                        <Link
                            href={`/announcements`}
                            className="flex items-center gap-3 w-full"
                        >
                            <span className="text-emerald-50 text-xs font-semibold truncate max-w-[50vw] md:max-w-none">
                                {currentAnnouncement.title}
                            </span>
                            <span className="hidden sm:flex text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:underline items-center gap-1.5 flex-shrink-0">
                                Click Here
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            {announcements.length > 1 && (
                <div className="flex-shrink-0 flex items-center h-full border-l border-white/5 bg-emerald-950/20 px-1">
                    <button
                        onClick={handlePrev}
                        className="p-2 text-emerald-300 hover:text-white hover:bg-white/5 transition-all rounded-md"
                        title="Previous"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="w-[1px] h-4 bg-white/10 mx-0.5" />
                    <button
                        onClick={handleNext}
                        className="p-2 text-emerald-300 hover:text-white hover:bg-white/5 transition-all rounded-md"
                        title="Next"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
