"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface Announcement {
    _id: string;
    title: string;
    description: string;
    isImportant: boolean;
    createdAt: string;
}

const fallbackAnnouncements = [
    "Odd Semester 2025 Examination Result Published",
    "PG Scholarship 2025: Applications Open",
    "UG Admission 2025 Batch: Apply Now",
    "College Arts Fest '25 Registration Closing Soon",
    "NSS Camp 2025: Volunteer Highlights",
];

export default function BottomTicker() {
    const pathname = usePathname();
    const [announcements, setAnnouncements] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements`);
                const data = await response.json();
                if (data.success && data.data && data.data.length > 0) {
                    // Filter for important announcements, or take the latest 5 if none important
                    const important = data.data.filter((a: Announcement) => a.isImportant);
                    const listToUse = important.length > 0 ? important : data.data.slice(0, 5);
                    setAnnouncements(listToUse.map((a: Announcement) => a.title));
                } else {
                    setAnnouncements(fallbackAnnouncements);
                }
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
                setAnnouncements(fallbackAnnouncements);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // If loading, show nothing or static? Let's show static initially to avoid layout shift
    // Actually, initializing state with fallback prevents layout shift best.
    // Let's rely on the useEffect setter.

    const displayList = announcements.length > 0 ? announcements : fallbackAnnouncements;

    return (
        <Link href="/announcements">
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-800 h-10 md:h-12 flex shadow-2xl">
                {/* Label - Fixed Left */}
                <div className="flex-shrink-0 bg-[#7B0046] px-4 md:px-6 flex items-center justify-center relative z-20">
                    <span className="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Announcements
                    </span>
                    {/* Slant effect on right edge */}
                    <div className="absolute top-0 right-0 bottom-0 select-none overflow-hidden">
                        <svg className="h-full w-4 text-neutral-900 transform translate-x-1/2" viewBox="0 0 10 40" preserveAspectRatio="none">
                            <path d="M0,0 L10,0 L0,40 Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {/* Marquee Container */}
                <div className="flex-1 relative overflow-hidden flex items-center">
                    {/* Gradient Mask Left */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none"></div>
                    {/* Gradient Mask Right */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none"></div>

                    {/* Optimized for 9s infinite loop with gap correction */}
                    <div className="flex items-center gap-12 animate-marquee whitespace-nowrap min-w-full pr-12" style={{ animationDuration: '9s' }}>
                        {Array(8).fill(displayList).flat().map((item, index) => (
                            <div key={index} className="flex items-center gap-3 group cursor-pointer">
                                <span className="text-neutral-300 text-xs md:text-sm font-medium hover:text-white transition-colors">
                                    {item}
                                </span>
                                <span className="text-white text-[10px]">|</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );

}
