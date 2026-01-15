"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Users,
    Megaphone,
    Image as ImageIcon,
    TrendingUp,
    Clock,
    AlertCircle,
    ArrowRight,
    Calendar,
    Briefcase
} from 'lucide-react';

interface Enquiry {
    _id: string;
    name: string;
    email: string;
    status: 'Pending' | 'Read';
    createdAt: string;
}

interface Announcement {
    _id: string;
    title: string;
    isImportant: boolean;
    createdAt: string;
}

interface GalleryImage {
    _id: string;
    createdAt: string;
}

export default function AdminDashboardPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL.replace(/\/$/, '')}/api`;
                const [enqRes, annRes, galRes] = await Promise.all([
                    fetch(`${baseUrl}/enquiries`),
                    fetch(`${baseUrl}/announcements`),
                    fetch(`${baseUrl}/gallery`)
                ]);

                const [enqData, annData, galData] = await Promise.all([
                    enqRes.json(), annRes.json(), galRes.json()
                ]);

                if (enqData.success) setEnquiries(enqData.data);
                if (annData.success) setAnnouncements(annData.data);
                if (galData.success) setGallery(galData.data);
            } catch (err) {
                console.error('Data fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [API_URL]);

    const getTimeAgo = (dateStr: string) => {
        const days = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 3600 * 24));
        return days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days}d ago`;
    };

    const stats = [
        {
            label: 'Total Enquiries',
            val: enquiries.length,
            trend: `+${enquiries.filter(e => new Date(e.createdAt).getMonth() === new Date().getMonth()).length} this month`,
            icon: Users,
            color: 'from-blue-600 to-blue-400',
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            href: '/admin/enquiries'
        },
        {
            label: 'Announcements',
            val: announcements.length,
            trend: 'Active',
            icon: Megaphone,
            color: 'from-emerald-600 to-emerald-400',
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            href: '/admin/announcements'
        },
        {
            label: 'Gallery Assets',
            val: gallery.length,
            trend: 'Images',
            icon: ImageIcon,
            color: 'from-purple-600 to-purple-400',
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            href: '/admin/gallery'
        },
        {
            label: 'Engagement',
            val: '98%',
            trend: 'Avg. Response Rate',
            icon: TrendingUp,
            color: 'from-orange-600 to-orange-400',
            bg: 'bg-orange-50',
            text: 'text-orange-600',
            href: '#'
        }
    ];

    const pendingEnquiries = enquiries.filter(e => e.status === 'Pending').slice(0, 4);

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-800" />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h1>
                    <p className="text-zinc-500">Real-time updates and performance metrics</p>
                </div>
                <div className="flex gap-2">
                    <span className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-medium text-zinc-600">
                        <Calendar size={14} />
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link href={stat.href} className="group block relative overflow-hidden bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.text}`}>
                                <stat.icon size={64} />
                            </div>
                            <div className="relative z-10">
                                <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${stat.bg} ${stat.text}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div className="text-3xl font-bold text-zinc-900 mb-1">{stat.val}</div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
                                    <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.bg} ${stat.text}`}>
                                        {stat.trend}
                                    </div>
                                </div>
                            </div>
                            <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} transition-all duration-500`} />
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Pending Action Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <h3 className="font-bold text-zinc-900">Pending Enquiries</h3>
                            </div>
                            <Link href="/admin/enquiries" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="p-2 flex-1">
                            {pendingEnquiries.length > 0 ? (
                                <div className="space-y-2">
                                    {pendingEnquiries.map((enq) => (
                                        <div key={enq._id} className="flex items-center justify-between p-4 hover:bg-zinc-50 rounded-xl transition-colors group cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                                    {enq.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-zinc-900">{enq.name}</div>
                                                    <div className="text-xs text-zinc-500">{enq.email}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                                                    <Clock size={12} /> {getTimeAgo(enq.createdAt)}
                                                </div>
                                                <div className="hidden sm:block">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                                                        Action Reqd
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center py-12 text-zinc-400">
                                    <Briefcase size={32} className="mb-2 opacity-20" />
                                    <p>No pending enquiries!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Quick Info */}
                <div className="space-y-6">
                    {/* Activity Timeline */}
                    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                        <h3 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
                            <Clock size={18} className="text-zinc-400" />
                            Recent Activity
                        </h3>
                        <div className="space-y-6 relative before:absolute before:left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-zinc-100">
                            {[
                                ...enquiries.slice(0, 2).map(e => ({ type: 'Enquiry', msg: `New enquiry from ${e.name}`, time: getTimeAgo(e.createdAt) })),
                                ...announcements.slice(0, 1).map(a => ({ type: 'Notice', msg: `Posted "${a.title}"`, time: getTimeAgo(a.createdAt) })),
                                ...gallery.slice(0, 1).map(g => ({ type: 'Upload', msg: 'New gallery image added', time: getTimeAgo(g.createdAt) }))
                            ].map((item, i) => (
                                <div key={i} className="relative pl-8 cursor-pointer hover:bg-zinc-50/50 p-2 rounded-lg transition-colors">
                                    <div className="absolute left-0 top-3 w-4 h-4 rounded-full border-2 border-white bg-blue-500 shadow-sm z-10" />
                                    <p className="text-sm font-medium text-zinc-800">{item.msg}</p>
                                    <p className="text-xs text-zinc-400 mt-1">{item.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    {/* Daily Quote Card */}
                    <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                Daily Inspiration
                            </div>
                            <blockquote className="text-lg font-serif italic leading-relaxed text-emerald-50 opacity-90">
                                "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                            </blockquote>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-0.5 w-8 bg-emerald-500/50"></div>
                                <cite className="text-sm font-medium text-emerald-300 not-italic">Malcolm X</cite>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-8 -right-8 text-emerald-800/20 rotate-12">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                            </svg>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
