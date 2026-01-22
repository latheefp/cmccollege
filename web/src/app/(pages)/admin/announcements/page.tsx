"use client";

import React, { useState, useEffect } from 'react';

interface Announcement {
    _id: string;
    title: string;
    description: string;
    isImportant: boolean;
    createdAt: string;
}

export default function AnnouncementsAdminPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        isImportant: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch("/api/announcements");
            const data = await response.json();
            if (response.ok) {
                setAnnouncements(data.data);
            } else {
                setError(data.message || "Failed to fetch announcements");
            }
        } catch (err) {
            setError("Could not connect to backend server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/announcements", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setAnnouncements(prev => [data.data, ...prev]);
                setFormData({ title: "", description: "", isImportant: false });
                setShowForm(false);
            } else {
                alert(data.message || "Error creating announcement");
            }
        } catch (err) {
            alert("Network error. Is the backend running?");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this notice?")) return;

        try {
            const response = await fetch(`/api/announcements/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setAnnouncements(prev => prev.filter(a => a._id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            alert("Network error");
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
                    <h2 className="text-2xl font-bold text-zinc-900">Announcements Management</h2>
                    <p className="text-zinc-500 mt-1 font-medium italic">Create and manage notices for parents and students.</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-all shadow-lg hover:shadow-emerald-900/20 active:scale-95 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Notice
                    </button>
                )}
            </div>

            {/* Quick Add Form */}
            {showForm && (
                <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-emerald-950 uppercase tracking-tight">Create New Announcement</h3>
                        <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-3 space-y-2">
                                <label className="text-sm font-bold text-zinc-600 ml-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Annual Sports Day 2024"
                                    className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                            <div className="flex items-end pb-4 px-2">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="isImportant"
                                        checked={formData.isImportant}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 accent-emerald-600 rounded"
                                    />
                                    <span className="text-sm font-bold text-zinc-600">Mark as Important</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-zinc-600 ml-1">Content / Description</label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter the announcement details here..."
                                className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-emerald-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3.5 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 min-w-[160px]"
                            >
                                {isSubmitting ? "Saving..." : "Publish Notice"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-8 py-3.5 bg-zinc-100 text-zinc-600 font-bold rounded-2xl hover:bg-zinc-200 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Announcements List */}
            <div className="grid grid-cols-1 gap-6 min-h-[200px]">
                {loading ? (
                    <div className="py-24 text-center">
                        <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-zinc-400 font-bold italic tracking-widest text-sm">Loading Announcements...</p>
                    </div>
                ) : error ? (
                    <div className="py-24 text-center">
                        <p className="text-red-500 font-bold">{error}</p>
                    </div>
                ) : announcements.length === 0 ? (
                    <div className="py-24 text-center border-2 border-dashed border-zinc-100 rounded-[40px] bg-zinc-50/20">
                        <p className="text-zinc-400 font-bold italic tracking-wider">No announcements found. Start by adding one above.</p>
                    </div>
                ) : (
                    announcements.map((announcement) => (
                        <div key={announcement._id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 hover:border-emerald-200 transition-all group flex flex-col md:flex-row gap-6 relative overflow-hidden">
                            {announcement.isImportant && (
                                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
                            )}

                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full uppercase tracking-widest">{formatDate(announcement.createdAt)}</span>
                                    {announcement.isImportant && (
                                        <span className="text-[10px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded italic uppercase tracking-tighter">Important</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-emerald-800 transition-colors uppercase tracking-tight">{announcement.title}</h3>
                                <p className="text-zinc-500 leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-none font-medium italic">"{announcement.description}"</p>
                            </div>

                            <div className="flex items-center gap-4 md:border-l border-zinc-50 md:pl-8">
                                <button
                                    onClick={() => handleDelete(announcement._id)}
                                    className="p-3 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all block group/del"
                                    title="Delete"
                                >
                                    <svg className="w-6 h-6 transform group-hover/del:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Info Footer */}
            {!loading && announcements.length > 0 && (
                <div className="mt-8 px-8 py-5 bg-zinc-50/50 rounded-2xl border border-zinc-100 flex items-center justify-between">
                    <p className="text-sm text-zinc-400 font-medium italic">Showing {announcements.length} live records from MongoDB</p>
                </div>
            )}
        </div>
    );
}
