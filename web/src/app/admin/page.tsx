"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Enquiry {
    _id: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    status: 'Pending' | 'Read';
    createdAt: string;
}

interface Announcement {
    _id: string;
    title: string;
    description: string;
    isImportant: boolean;
    createdAt: string;
}

interface GalleryImage {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}

interface Activity {
    id: string;
    type: 'enquiry' | 'announcement' | 'gallery' | 'status';
    user: string;
    action: string;
    time: string;
    date: Date;
}

export default function AdminDashboardPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    const fetchData = async () => {
        try {
            setLoading(true);
            const baseUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL.replace(/\/$/, '')}/api`;

            const [enqRes, annRes, galRes] = await Promise.all([
                fetch(`${baseUrl}/enquiries`),
                fetch(`${baseUrl}/announcements`),
                fetch(`${baseUrl}/gallery`)
            ]);

            const [enqData, annData, galData] = await Promise.all([
                enqRes.json(),
                annRes.json(),
                galRes.json()
            ]);

            if (enqData.success) setEnquiries(enqData.data);
            if (annData.success) setAnnouncements(annData.data);
            if (galData.success) setGallery(galData.data);

            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to fetch dashboard data. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    const activities: Activity[] = [
        ...enquiries.slice(0, 3).map(e => ({
            id: e._id,
            type: 'enquiry' as const,
            user: e.name,
            action: 'submitted a new enquiry',
            time: getTimeAgo(e.createdAt),
            date: new Date(e.createdAt)
        })),
        ...announcements.slice(0, 2).map(a => ({
            id: a._id,
            type: 'announcement' as const,
            user: 'Admin',
            action: `posted "${a.title}" notice`,
            time: getTimeAgo(a.createdAt),
            date: new Date(a.createdAt)
        })),
        ...gallery.slice(0, 1).map(g => ({
            id: g._id,
            type: 'gallery' as const,
            user: 'Admin',
            action: 'uploaded a new image to Gallery',
            time: getTimeAgo(g.createdAt),
            date: new Date(g.createdAt)
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    const stats = [
        { name: 'Total Enquiries', value: enquiries.length.toString(), icon: '✉️', color: 'bg-blue-50 text-blue-600', trend: `${enquiries.filter(e => e.status === 'Pending').length} pending`, href: '/admin/enquiries' },
        { name: 'Announcements', value: announcements.length.toString(), icon: '📢', color: 'bg-emerald-50 text-emerald-600', trend: `${announcements.filter(a => a.isImportant).length} important`, href: '/admin/announcements' },
        { name: 'Gallery Images', value: gallery.length.toString(), icon: '🖼️', color: 'bg-purple-50 text-purple-600', trend: 'Latest upload ' + (gallery[0] ? getTimeAgo(gallery[0].createdAt) : 'N/A'), href: '/admin/gallery' },
        { name: 'Campus Visitors', value: '82', icon: '📍', color: 'bg-orange-50 text-orange-600', trend: 'Upcoming: 4 tours', href: '#' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                    <p className="text-zinc-500 font-medium">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
                <p className="text-red-600 font-medium mb-4">{error}</p>
                <button
                    onClick={fetchData}
                    className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                >
                    Retry Loading
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Welcome Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h2>
                <p className="text-zinc-500 mt-1">Welcome back! Here's what's happening at your school today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Link key={stat.name} href={stat.href} className="block transition-transform hover:-translate-y-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-sm italic`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">{stat.name}</p>
                                <h3 className="text-3xl font-bold text-zinc-900 mt-1">{stat.value}</h3>
                                <p className="text-[11px] text-zinc-400 font-medium mt-3 flex items-center gap-1 uppercase tracking-wider">
                                    {stat.trend}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="p-6 border-b border-zinc-50 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-zinc-900">Recent Activity</h3>
                        <button className="text-emerald-600 text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="p-0">
                        {activities.length > 0 ? (
                            activities.map((activity, idx) => (
                                <div key={activity.id} className={`p-6 flex items-center gap-4 ${idx !== activities.length - 1 ? 'border-b border-zinc-50' : ''} hover:bg-zinc-50/50 transition-colors`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${activity.type === 'enquiry' ? 'bg-blue-50 text-blue-600' :
                                        activity.type === 'gallery' ? 'bg-purple-50 text-purple-600' :
                                            activity.type === 'announcement' ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-50 text-zinc-600'
                                        }`}>
                                        {activity.type === 'enquiry' ? '✉️' : activity.type === 'gallery' ? '🖼️' : activity.type === 'announcement' ? '📢' : '⚙️'}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-zinc-800">
                                            <span className="font-bold">{activity.user}</span> {activity.action}
                                        </p>
                                        <p className="text-xs text-zinc-400 mt-1 font-medium italic">{activity.time}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <p className="text-zinc-400 italic">No recent activity found.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="space-y-6">
                    <div className="bg-emerald-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-2">School Motto</h3>
                            <p className="text-emerald-100 text-sm italic leading-relaxed">
                                "Knowledge is light, and character is its guide."
                            </p>
                            <div className="mt-8 pt-6 border-t border-emerald-800">
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Pro Tip</p>
                                <p className="text-sm text-emerald-50 mt-2">Check new enquiries daily to maintain high parent satisfaction.</p>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">Quick Links</h3>
                        <div className="space-y-4">
                            <button className="w-full py-3 px-4 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-sm font-bold rounded-xl transition-all flex items-center justify-between group">
                                Post Announcement
                                <span className="text-zinc-300 group-hover:text-emerald-600 transition-colors">→</span>
                            </button>
                            <button className="w-full py-3 px-4 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-sm font-bold rounded-xl transition-all flex items-center justify-between group">
                                Upload Gallery
                                <span className="text-zinc-300 group-hover:text-emerald-600 transition-colors">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
