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

                        <div className="mt-6 flex justify-end">
                            <Link
                                href={`/admin/site-editor/${page.slug}`}
                                className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition-colors text-sm flex items-center gap-2"
                            >
                                Edit Content
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
