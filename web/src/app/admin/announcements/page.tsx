"use client";

import React from 'react';

const ANNOUNCEMENTS = [
    { id: '1', title: 'Annual Sports Day 2024', date: 'Jan 15, 2024', content: 'The annual sports meet will be held on January 25th. Attendance is mandatory.', isNew: true },
    { id: '2', title: 'Admissions Open for 2024-25', date: 'Jan 10, 2024', content: 'Admissions for +1 Science and Commerce are now open. Early bird discounts available.', isNew: true },
    { id: '3', title: 'Winter Vacation Announcement', date: 'Dec 20, 2023', content: 'School will remain closed from Dec 24 to Jan 2 for winter break.', isNew: false },
    { id: '4', title: 'New Science Lab Inauguration', date: 'Dec 05, 2023', content: 'Our state-of-the-art physics lab is now open for students.', isNew: false },
];

export default function AnnouncementsAdminPage() {
    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900">Announcements Management</h2>
                    <p className="text-zinc-500 mt-1 font-medium italic">Create and manage notices for parents and students.</p>
                </div>
                <button className="px-6 py-3 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-all shadow-lg hover:shadow-emerald-900/20 active:scale-95 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Notice
                </button>
            </div>

            {/* Announcements List */}
            <div className="grid grid-cols-1 gap-6">
                {ANNOUNCEMENTS.map((announcement) => (
                    <div key={announcement.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 hover:border-emerald-200 transition-all group flex flex-col md:flex-row gap-6 relative overflow-hidden">
                        {announcement.isNew && (
                            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
                        )}

                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full uppercase tracking-widest">{announcement.date}</span>
                                {announcement.isNew && (
                                    <span className="text-[10px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded italic uppercase tracking-tighter">New</span>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-emerald-800 transition-colors uppercase tracking-tight">{announcement.title}</h3>
                            <p className="text-zinc-500 leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-none font-medium italic">"{announcement.content}"</p>
                        </div>

                        <div className="flex items-center gap-4 md:border-l border-zinc-50 md:pl-8">
                            <button className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all block group/btn" title="Edit">
                                <svg className="w-6 h-6 transform group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button className="p-3 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all block group/del" title="Delete">
                                <svg className="w-6 h-6 transform group-hover/del:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State UI Preview */}
            <div className="mt-12 p-12 border-2 border-dashed border-zinc-100 rounded-[40px] text-center bg-zinc-50/20">
                <p className="text-zinc-400 font-bold italic tracking-wider">End of active announcements.</p>
                <button className="text-emerald-600 text-sm font-black uppercase tracking-widest mt-4 hover:underline">View Archived Notices</button>
            </div>
        </div>
    );
}
