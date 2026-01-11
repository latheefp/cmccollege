"use client";

import React from 'react';

const STATS = [
    { name: 'Total Enquiries', value: '48', icon: '✉️', color: 'bg-blue-50 text-blue-600', trend: '+12% from last month' },
    { name: 'Announcements', value: '12', icon: '📢', color: 'bg-emerald-50 text-emerald-600', trend: '3 active notices' },
    { name: 'Gallery Images', value: '156', icon: '🖼️', color: 'bg-purple-50 text-purple-600', trend: '+24 new this week' },
    { name: 'Campus Visitors', value: '82', icon: '📍', color: 'bg-orange-50 text-orange-600', trend: 'Upcoming: 4 tours' },
];

const RECENT_ACTIVITY = [
    { id: 1, type: 'enquiry', user: 'Ahmed Khan', action: 'submitted a new enquiry', time: '2 hours ago' },
    { id: 2, type: 'gallery', user: 'Admin', action: 'uploaded 4 images to Campus category', time: '5 hours ago' },
    { id: 3, type: 'announcement', user: 'Admin', action: 'posted "Annual Sports Day 2024" notice', time: '1 day ago' },
    { id: 4, type: 'enquiry', user: 'Sarah Malik', action: 'enquired about +1 Science admission', time: '2 days ago' },
    { id: 5, type: 'status', user: 'Admin', action: 'marked enquiry #428 as "Read"', time: '3 days ago' },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-10">
            {/* Welcome Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h2>
                <p className="text-zinc-500 mt-1">Welcome back! Here's what's happening at your school today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-sm italic`}>
                                {stat.icon}
                            </div>
                            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm font-medium">{stat.name}</p>
                            <h3 className="text-3xl font-bold text-zinc-900 mt-1">{stat.value}</h3>
                            <p className="text-[11px] text-zinc-400 font-medium mt-3 flex items-center gap-1 uppercase tracking-wider">
                                {stat.trend}
                            </p>
                        </div>
                    </div>
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
                        {RECENT_ACTIVITY.map((activity, idx) => (
                            <div key={activity.id} className={`p-6 flex items-center gap-4 ${idx !== RECENT_ACTIVITY.length - 1 ? 'border-b border-zinc-50' : ''} hover:bg-zinc-50/50 transition-colors`}>
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
                                <button className="p-2 text-zinc-300 hover:text-zinc-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))}
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
