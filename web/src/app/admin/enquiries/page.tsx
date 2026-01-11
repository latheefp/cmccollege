"use client";

import React from 'react';

const ENQUIRIES = [
    { id: '1', name: 'Zaid Ibrahim', phone: '+91 9876543210', email: 'zaid@example.com', date: '2024-01-10', status: 'Pending', message: 'I want to know about the +1 Science batch and hostel fees.' },
    { id: '2', name: 'Fatima Shaikh', phone: '+91 9988776655', email: 'fatima@mail.com', date: '2024-01-09', status: 'Read', message: 'Is there any transport facility from the city center?' },
    { id: '3', name: 'Omar Farooq', phone: '+91 9123456789', email: 'omar@provider.net', date: '2024-01-09', status: 'Pending', message: 'Minimum marks required for Commerce stream?' },
    { id: '4', name: 'Aisha Siddiqa', phone: '+91 8877665544', email: 'aisha@domain.org', date: '2024-01-08', status: 'Read', message: 'Requesting a campus visit on Saturday morning.' },
    { id: '5', name: 'Bilal Ahmed', phone: '+91 7766554433', email: 'bilal@web.com', date: '2024-01-07', status: 'Read', message: 'Interested in Integrated Coaching for NEET.' },
];

export default function EnquiriesAdminPage() {
    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900">Parent Enquiries</h2>
                    <p className="text-zinc-500 mt-1 font-medium">Manage and respond to admission and general queries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white border border-zinc-200 text-zinc-700 font-bold rounded-xl hover:bg-zinc-50 transition-colors shadow-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="px-8 py-5 text-sm font-bold text-zinc-400 uppercase tracking-widest">Name</th>
                                <th className="px-8 py-5 text-sm font-bold text-zinc-400 uppercase tracking-widest">Contact</th>
                                <th className="px-8 py-5 text-sm font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-5 text-sm font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-sm font-bold text-zinc-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {ENQUIRIES.map((enquiry) => (
                                <tr key={enquiry.id} className="hover:bg-zinc-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">{enquiry.name}</p>
                                            <p className="text-xs text-zinc-400 mt-1 max-w-[200px] truncate italic">{enquiry.message}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="text-sm font-bold text-zinc-700">{enquiry.phone}</p>
                                            <p className="text-sm text-zinc-400">{enquiry.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-medium text-zinc-600 italic">{enquiry.date}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${enquiry.status === 'Pending'
                                                ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${enquiry.status === 'Pending' ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
                                                }`}></span>
                                            {enquiry.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all">
                                            View Details
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-8 py-5 bg-zinc-50/50 flex items-center justify-between">
                    <p className="text-sm text-zinc-400 font-medium italic">Showing 1 to 5 of 48 entries</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-400 rounded-lg text-sm font-bold cursor-not-allowed">Previous</button>
                        <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all rounded-lg text-sm font-bold shadow-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
