"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const GALLERY_ITEMS = [
    { id: '1', src: '/images/school_sports_day_1768117809679.png', category: 'Sports', title: 'Sports Day' },
    { id: '2', src: '/images/cultural_fest_performance_1768117835053.png', category: 'Events', title: 'Cultural Fest' },
    { id: '3', src: '/images/science_exhibition_project_1768117868795.png', category: 'Campus', title: 'Science Lab' },
    { id: '4', src: '/images/school_annual_award_ceremony_stage_1768117893644.png', category: 'Events', title: 'Award Stage' },
    { id: '5', src: '/images/school_hostel_1768115536813.png', category: 'Campus', title: 'Hostel' },
    { id: '6', src: '/images/school_library_1768115599802.png', category: 'Campus', title: 'Library' },
];

const CATEGORIES = ['All', 'Campus', 'Events', 'Sports', 'Hostel'];

export default function GalleryAdminPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredItems = activeFilter === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === activeFilter);

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900">Gallery Management</h2>
                    <p className="text-zinc-500 mt-1 font-medium italic">Update the school gallery with the latest moments.</p>
                </div>
                <button className="w-full sm:w-auto px-6 py-4 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group">
                    <svg className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload New Image
                </button>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === cat
                                ? 'bg-emerald-600 text-white shadow-md scale-105'
                                : 'bg-white text-zinc-400 hover:bg-zinc-100 border border-zinc-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.id} className="group relative aspect-square bg-zinc-100 rounded-[32px] overflow-hidden border border-zinc-100 hover:shadow-2xl transition-all duration-500">
                        <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                            <div className="flex justify-end">
                                <button className="p-3 bg-white/20 hover:bg-red-500 text-white rounded-2xl backdrop-blur-md transition-all group/del">
                                    <svg className="w-5 h-5 transform group-hover/del:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 mb-1 block">{item.category}</span>
                                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <button className="aspect-square rounded-[32px] border-4 border-dashed border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all flex flex-col items-center justify-center group">
                    <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                        <svg className="w-8 h-8 text-zinc-300 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <span className="text-sm font-bold text-zinc-400 group-hover:text-emerald-800 transition-colors uppercase tracking-widest">Quick Add</span>
                </button>
            </div>

            {filteredItems.length === 0 && (
                <div className="py-24 text-center bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-100">
                    <p className="text-zinc-400 font-bold italic tracking-widest text-lg">No images found in this category.</p>
                </div>
            )}
        </div>
    );
}
