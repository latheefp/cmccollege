"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Plus, FileText, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Report {
    _id: string;
    title: string;
    details: string;
    link: string;
    date: string;
    fileUrl?: string;
}

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        details: "",
        link: "",
        date: new Date().toISOString().split('T')[0]
    });

    const fetchReports = async () => {
        try {
            const response = await fetch("/api/alumni/reports");
            const data = await response.json();
            if (data.success) {
                setReports(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/alumni/reports", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                setReports(prev => [data.data, ...prev]);
                setShowForm(false);
                setFormData({ title: "", details: "", link: "", date: new Date().toISOString().split('T')[0] });
            }
        } catch (error) {
            alert("Failed to save");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this report?")) return;
        try {
            const response = await fetch(`/api/alumni/reports/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setReports(prev => prev.filter(item => item._id !== id));
            }
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-zinc-50 p-6 rounded-3xl border border-zinc-200">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Alumni Reports</h1>
                    <p className="text-zinc-500 font-medium mt-1">Manage event reports and documentation links.</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 active:scale-95 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Report
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] p-10 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                        <h2 className="text-2xl font-black mb-8 text-zinc-900 tracking-tight relative z-10">New Event Report</h2>
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Event & Date</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <input
                                        name="title"
                                        placeholder="Event Name"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="col-span-2 w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-bold text-zinc-900"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full p-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-600 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Asset Link</label>
                                <div className="relative">
                                    <input
                                        name="link"
                                        placeholder="Paste Google Drive or PDF Link here..."
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        className="w-full p-4 pl-12 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium text-emerald-700"
                                        required
                                    />
                                    <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2 block">Key Details</label>
                                <textarea
                                    name="details"
                                    placeholder="Brief description of the event or report..."
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all min-h-[100px] font-medium text-zinc-700"
                                    required
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 py-4 font-bold text-zinc-500 bg-zinc-100 rounded-2xl hover:bg-zinc-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-4 font-bold text-white bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Publish Report'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <div className="py-20 text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-zinc-300 mb-3" />
                        <p className="text-zinc-400 font-bold text-sm tracking-widest uppercase">Loading Archive</p>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
                        <p className="text-zinc-400 font-bold">No reports found.</p>
                    </div>
                ) : reports.map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100/50 hover:shadow-md transition-all group flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                        <div className="flex gap-5 items-start">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex flex-col items-center justify-center text-emerald-700 border border-emerald-100 shrink-0">
                                <FileText className="w-6 h-6 mb-1" />
                                <span className="text-[10px] font-black uppercase tracking-wider">DOC</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-zinc-900 leading-tight">{item.title}</h3>
                                    <span className="text-[10px] font-bold bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {item.date}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-xl">{item.details}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto pl-21 sm:pl-0">
                            <Link
                                href={item.link || item.fileUrl || "#"}
                                target="_blank"
                                className="px-5 py-2.5 bg-zinc-50 text-zinc-600 hover:text-emerald-700 hover:bg-emerald-50 border border-zinc-200 rounded-xl font-bold text-sm transition-all flex items-center gap-2 group/link"
                            >
                                <div>
                                    Open File
                                </div>
                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                            </Link>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="p-2.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Delete Report"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
