"use client";

import React from 'react';
import Link from 'next/link';

export default function AdminPagesPage() {
    const pages = [
        { slug: "home", title: "Home Page" },
        { slug: "about", title: "About Us" },
        { slug: "academics", title: "Academic Programs" },
        { slug: "admissions", title: "Admissions" },
        { slug: "facilities", title: "Facilities" },
        { slug: "contact", title: "Contact" },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900">Website Pages</h2>
                <p className="text-zinc-500 mt-1">Manage the content of your public website pages.</p>
            </div>

            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                    <div key={page.slug} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow flex flex-col justify-between h-48">
                        <div>
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                                📄
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900">{page.title}</h3>
                            <p className="text-zinc-500 text-sm mt-1">/{page.slug === 'home' ? '' : page.slug}</p>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
}
