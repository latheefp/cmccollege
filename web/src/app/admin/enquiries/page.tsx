"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

interface Enquiry {
    _id: string;
    name: string;
    phone: string;
    email?: string;
    message: string;
    status: 'Pending' | 'Read';
    createdAt: string;
}

export default function EnquiriesAdminPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchEnquiries = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`);
            const data = await response.json();
            if (response.ok) {
                setEnquiries(data.data);
            } else {
                setError(data.message || "Failed to fetch enquiries");
            }
        } catch (err) {
            setError("Could not connect to backend server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: 'Pending' | 'Read') => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Update local state for instant feedback
                setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900">Parent Enquiries</h2>
                    <p className="text-zinc-500 mt-1 font-medium">Manage and respond to admission and general queries.</p>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center gap-4">
                        <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                        <p className="text-zinc-400 font-bold italic tracking-widest text-sm">Loading Enquiries...</p>
                    </div>
                ) : error ? (
                    <div className="py-24 text-center">
                        <p className="text-red-500 font-bold">{error}</p>
                        <button onClick={fetchEnquiries} className="mt-4 text-emerald-600 font-bold hover:underline">Retry</button>
                    </div>
                ) : enquiries.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-24 flex flex-col items-center justify-center text-center p-8"
                    >
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-white p-6 rounded-full shadow-sm border border-emerald-50">
                                <Inbox className="w-12 h-12 text-emerald-200" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">No Enquiries Yet</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto">
                            When parents make enquiries, they will appear here instantly.
                        </p>
                    </motion.div>
                ) : (
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
                                {enquiries.map((enquiry) => (
                                    <tr key={enquiry._id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div>
                                                <p className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">{enquiry.name}</p>
                                                <p className="text-xs text-zinc-400 mt-1 max-w-[200px] truncate italic">{enquiry.message}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div>
                                                <p className="text-sm font-bold text-zinc-700">{enquiry.phone}</p>
                                                <p className="text-sm text-zinc-400">{enquiry.email || 'N/A'}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-medium text-zinc-600 italic">{formatDate(enquiry.createdAt)}</p>
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
                                            {enquiry.status === 'Pending' ? (
                                                <button
                                                    onClick={() => handleUpdateStatus(enquiry._id, 'Read')}
                                                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all"
                                                >
                                                    Mark as Read
                                                </button>
                                            ) : (
                                                <span className="text-zinc-300 font-bold text-sm uppercase italic">Completed</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Info Footer */}
                <div className="px-8 py-5 bg-zinc-50/50 flex items-center justify-between">
                    <p className="text-sm text-zinc-400 font-medium italic">Showing {enquiries.length} records</p>
                </div>
            </div>
        </div>
    );
}
