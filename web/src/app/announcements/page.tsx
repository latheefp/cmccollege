"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface Announcement {
    _id: string;
    title: string;
    description: string;
    isImportant: boolean;
    createdAt: string;
}

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements`);
                if (response.ok) {
                    const data = await response.json();
                    setAnnouncements(data.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    const hasAnnouncements = announcements.length > 0;

    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-[112px]">
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Announcements
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
                            Stay updated with the latest news, notices, and events from our school community.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6 max-w-5xl mx-auto flex-grow">
                {loading ? (
                    <div className="py-24 text-center">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-zinc-400 font-bold italic tracking-widest">Fetching latest notices...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
                        <h2 className="text-2xl font-bold text-red-900 mb-2">Technical Difficulty</h2>
                        <p className="text-red-600">We're having trouble loading the notices right now. Please try again later.</p>
                    </div>
                ) : !hasAnnouncements ? (
                    <ScrollReveal className="text-center py-20 bg-emerald-50/30 rounded-3xl border border-emerald-100 border-dashed">
                        <div className="text-6xl mb-6">📢</div>
                        <h2 className="text-2xl font-bold text-emerald-900 mb-4">No New Announcements</h2>
                        <p className="text-zinc-500 max-w-md mx-auto">
                            There are currently no active notices. Please check back later for updates regarding school activities and events.
                        </p>
                    </ScrollReveal>
                ) : (
                    <div className="space-y-8">
                        {announcements.map((notice, i) => (
                            <ScrollReveal key={notice._id} delay={i * 100}>
                                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-emerald-50 hover:shadow-xl hover:border-emerald-200 transition-all group relative overflow-hidden">
                                    {notice.isImportant && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-emerald-600 text-white text-[10px] uppercase font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                                                Important
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                                📄
                                            </div>
                                            <div className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
                                                Official Notice
                                            </div>
                                        </div>
                                        <div className="text-zinc-400 font-medium flex items-center gap-2">
                                            <span className="text-emerald-800">📅</span> {new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-emerald-900 mb-4 group-hover:text-emerald-700 transition-colors">
                                        {notice.title}
                                    </h2>
                                    <p className="text-zinc-600 text-lg leading-relaxed">
                                        {notice.description}
                                    </p>

                                    <div className="mt-8 pt-6 border-t border-emerald-50 flex justify-end">
                                        <button className="text-emerald-800 font-bold hover:text-emerald-600 transition-colors flex items-center gap-2">
                                            Read More <span className="text-xl">→</span>
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </section>

            {/* Subscription/Help CTA */}
            <section className="py-20 px-6 bg-zinc-50 border-t border-emerald-100">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <h3 className="text-2xl font-bold text-emerald-900 mb-4">Never Miss an Update</h3>
                        <p className="text-zinc-600 text-lg mb-8">
                            We recommend checking this page regularly for important school news. For urgent queries, contact the administrative office.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="/contact" className="px-8 py-3 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-900 transition-all shadow-lg">
                                Contact Admin
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
