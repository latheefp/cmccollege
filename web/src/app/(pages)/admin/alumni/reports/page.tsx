"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';
import ImageKit from 'imagekit-javascript';
import { Loader2, Trash2, Upload, Plus, FileText, Download } from 'lucide-react';
import Link from 'next/link';

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit/auth");
        if (!response.ok) throw new Error('Authentication failed');
        return await response.json();
    } catch (error) {
        throw new Error(`Authentication request failed: ${error}`);
    }
};

interface Report {
    _id: string;
    title: string;
    fileUrl: string;
    date: string;
}

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ikUploadRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        fileUrl: "",
        fileId: "",
        date: new Date().toISOString().split('T')[0]
    });

    const ikClient = useMemo(() => {
        if (!publicKey || !urlEndpoint) return null;
        return new ImageKit({
            publicKey,
            urlEndpoint
        });
    }, []);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onFileUploadSuccess = (res: any) => {
        setIsUploading(false);
        setFormData(prev => ({ ...prev, fileUrl: res.url, fileId: res.fileId }));
    };

    const onFileUploadError = (err: any) => {
        setIsUploading(false);
        console.error("Upload error", err);
        alert("Upload failed");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fileUrl) return alert("Please upload a file");

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
                setFormData({ title: "", fileUrl: "", fileId: "", date: new Date().toISOString().split('T')[0] });
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

    if (!publicKey || !urlEndpoint) return <div className="p-10">Missing ImageKit Configuration</div>;

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-zinc-900">Alumni Reports</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Report
                    </button>
                </div>

                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
                            <h2 className="text-2xl font-bold mb-6">Add New Report</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div
                                    onClick={() => ikUploadRef.current?.click()}
                                    className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer bg-zinc-50 ${formData.fileUrl ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-300 hover:border-emerald-500'}`}
                                >
                                    <IKUpload
                                        ref={ikUploadRef}
                                        onSuccess={onFileUploadSuccess}
                                        onError={onFileUploadError}
                                        onUploadStart={() => setIsUploading(true)}
                                        className="hidden"
                                    />
                                    {isUploading ? (
                                        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                                    ) : formData.fileUrl ? (
                                        <div className="text-center">
                                            <FileText className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                                            <span className="text-sm font-bold text-emerald-700">File Selected</span>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="w-8 h-8 mx-auto mb-2 text-zinc-400" />
                                            <span className="text-sm text-zinc-500 font-medium">Click to Upload PDF/File</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <input
                                        name="title"
                                        placeholder="Report Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 py-3 font-bold text-zinc-600 bg-zinc-100 rounded-xl hover:bg-zinc-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isUploading || !formData.fileUrl}
                                        className="flex-1 py-3 font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save Report'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {loading ? (
                        <div className="py-20 text-center text-zinc-400">Loading reports...</div>
                    ) : reports.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900">{item.title}</h3>
                                    <p className="text-sm text-zinc-500">{item.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={item.fileUrl}
                                    target="_blank"
                                    className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                >
                                    <Download className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ImageKitProvider>
    );
}
