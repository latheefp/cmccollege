"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';
import ImageKit from 'imagekit-javascript';

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

const authenticator = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/imagekit/auth`);
        if (!response.ok) throw new Error('Authentication failed');
        return await response.json();
    } catch (error) {
        throw new Error(`Authentication request failed: ${error}`);
    }
};

interface GalleryItem {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}

const CATEGORIES = ['All', 'Campus', 'Events', 'Hostel', 'Classroom'];

export default function GalleryAdminPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeFilter, setActiveFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        fileId: "",
        category: "Campus"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const ikUploadRef = useRef<HTMLInputElement>(null);

    const ikClient = useMemo(() => {
        if (!publicKey || !urlEndpoint) return null;
        return new ImageKit({
            publicKey,
            urlEndpoint
        });
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);
            const data = await response.json();
            if (response.ok) {
                setItems(data.data);
            } else {
                setError(data.message || "Failed to fetch gallery");
            }
        } catch (err) {
            setError("Could not connect to backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const [isDragging, setIsDragging] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const processImage = (src: string, fileId: string = "") => {
        setFormData(prev => ({ ...prev, imageUrl: src, fileId: fileId }));
    };

    const uploadFile = async (file: File) => {
        if (!ikClient) return;
        setIsUploading(true);
        try {
            // Manually fetch auth params for the core SDK
            const authParams = await authenticator();
            const res = await ikClient.upload({
                file,
                fileName: file.name,
                tags: ["gallery"],
                ...authParams
            });
            onFileUploadSuccess(res);
        } catch (err) {
            onFileUploadError(err);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        // 1. Desktop drop (Files)
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                await uploadFile(file);
                return;
            }
        }

        // 2. Browser drop (Images/URLs)
        const html = e.dataTransfer.getData('text/html');
        if (html) {
            const match = html.match(/src="([^"]+)"/);
            if (match && match[1]) {
                processImage(match[1]);
                return;
            }
        }

        const text = e.dataTransfer.getData('text/plain');
        if (text && (text.startsWith('http') || text.startsWith('data:image/'))) {
            processImage(text);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) return alert("Please provide an image.");
        if (isUploading) return alert("Image is still uploading...");

        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setItems(prev => [data.data, ...prev]);
                setFormData({ title: "", imageUrl: "", fileId: "", category: "Campus" });
                setShowForm(false);
            } else {
                alert(data.message || "Error adding image");
            }
        } catch (err) {
            alert("Network error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Remove this image from gallery?")) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setItems(prev => prev.filter(item => item._id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            alert("Network error");
        }
    };

    const onFileUploadSuccess = (res: any) => {
        processImage(res.url, res.fileId);
        setIsUploading(false);
    };

    const onFileUploadError = (err: any) => {
        console.error("Upload error", err);
        alert("Upload failed.");
        setIsUploading(false);
    };

    const onUploadStart = () => {
        setIsUploading(true);
    };

    const filteredItems = activeFilter === 'All'
        ? items
        : items.filter(item => item.category === activeFilter);

    const renderContent = () => (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-gradient-to-br from-emerald-900 to-emerald-950 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px]">Studio Manager</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Gallery <span className="text-emerald-400">Hub</span></h2>
                    <p className="text-emerald-100/60 mt-4 font-medium max-w-md leading-relaxed text-lg">Curate the visual legacy of our school with a premium, high-performance aesthetic.</p>
                </div>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="relative z-10 w-full lg:w-auto px-10 py-5 bg-white text-emerald-950 font-black rounded-3xl hover:bg-emerald-50 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-center gap-4 active:scale-95 group/btn hover:cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                    >
                        <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center group-hover/btn:bg-emerald-200 transition-colors">
                            <svg className="w-5 h-5 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-lg">Add to Collection</span>
                    </button>
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white/90 backdrop-blur-2xl p-10 rounded-[56px] shadow-[0_40px_100px_rgba(6,95,70,0.2)] border border-white/50 w-full max-w-4xl relative overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h3 className="text-3xl font-black text-emerald-950 tracking-tight">New Showcase</h3>
                                <p className="text-zinc-500 font-medium">Add a new moment to the school's story.</p>
                            </div>
                            <button
                                onClick={() => setShowForm(false)}
                                className="w-14 h-14 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-2xl flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                                <div className="lg:col-span-3">
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`relative aspect-[4/3] rounded-[40px] border-4 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden group ${formData.imageUrl
                                            ? 'border-emerald-500 bg-emerald-50/50'
                                            : isDragging
                                                ? 'border-emerald-600 bg-emerald-100 scale-[1.02] shadow-2xl'
                                                : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100/50'
                                            } ${isUploading ? 'cursor-wait' : 'cursor-pointer'}`}
                                        onClick={() => ikUploadRef.current?.click()}
                                    >
                                        <div className="hidden">
                                            <IKUpload
                                                ref={ikUploadRef}
                                                onSuccess={onFileUploadSuccess}
                                                onError={onFileUploadError}
                                                onUploadStart={onUploadStart}
                                                className="hidden"
                                            />
                                        </div>

                                        {formData.imageUrl ? (
                                            <>
                                                <Image
                                                    src={formData.imageUrl}
                                                    alt="Preview"
                                                    fill
                                                    unoptimized
                                                    className="object-cover animate-in fade-in zoom-in duration-500"
                                                />
                                                <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); processImage(""); }}
                                                        className="px-8 py-4 bg-white text-emerald-950 font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        Change Asset
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className={`text-center p-12 transition-all duration-500 ${isDragging ? 'scale-110' : ''}`}>
                                                {isUploading ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                                                        <p className="text-emerald-900 font-black text-xl animate-pulse">Uploading to CDN...</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-6 transition-all duration-500 shadow-2xl ${isDragging ? 'bg-emerald-600 text-white animate-pulse' : 'bg-white text-emerald-600'}`}>
                                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-emerald-950 font-black text-2xl tracking-tight mb-2">Drop or Click to Upload</p>
                                                        <p className="text-zinc-500 font-medium">ImageKit Powered CDN Storage</p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="lg:col-span-2 space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-emerald-900 uppercase tracking-widest ml-1">Asset Identity</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="What is this moment?"
                                            className="w-full px-7 py-5 rounded-3xl bg-zinc-100/50 border border-zinc-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-emerald-950 font-bold placeholder:text-zinc-400"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-emerald-900 uppercase tracking-widest ml-1">Context Category</label>
                                        <div className="relative">
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-7 py-5 rounded-3xl bg-zinc-100/50 border border-zinc-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-emerald-950 font-bold appearance-none"
                                            >
                                                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-emerald-900 uppercase tracking-widest ml-1">Digital Source (URL)</label>
                                        <input
                                            type="url"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://ik.imagekit.io/..."
                                            className="w-full px-7 py-5 rounded-3xl bg-zinc-100/50 border border-zinc-200 focus:border-emerald-500 focus:bg-white outline-none transition-all text-emerald-950 font-bold placeholder:text-zinc-400"
                                        />
                                        <p className="text-[10px] text-zinc-400 font-medium ml-1">Upload an image or paste a direct CDN link.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.imageUrl || isUploading}
                                    className="px-12 py-6 bg-emerald-800 text-white font-black rounded-3xl hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-900/40 disabled:opacity-50 disabled:shadow-none active:scale-95 group/save"
                                >
                                    {isSubmitting ? "Processing..." : "Publish to Gallery"}
                                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-10 py-6 bg-zinc-100 text-zinc-600 font-bold rounded-3xl hover:bg-zinc-200 transition-all active:scale-95"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 bg-zinc-100/50 p-3 rounded-[32px] w-fit border border-zinc-100">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 mr-2">Filter View</span>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-8 py-3.5 rounded-2xl text-sm font-black transition-all duration-300 ${activeFilter === cat
                            ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 scale-105'
                            : 'text-zinc-500 hover:text-emerald-700 hover:bg-white tracking-tight'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {loading ? (
                    <div className="col-span-full py-40 text-center">
                        <div className="w-16 h-16 border-[6px] border-emerald-50 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-zinc-400 font-black italic tracking-[0.2em] uppercase text-xs">Loading Digital Archives</p>
                    </div>
                ) : error ? (
                    <div className="col-span-full py-32 text-center bg-red-50 rounded-[48px] border-2 border-red-100">
                        <p className="text-red-500 font-black text-xl italic">{error}</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="col-span-full py-40 text-center bg-zinc-50 rounded-[64px] border-4 border-dashed border-zinc-100 group">
                        <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-10 h-10 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="text-zinc-400 font-black italic tracking-[0.3em] uppercase text-sm">No Assets Found</p>
                        <p className="text-zinc-300 mt-2 font-medium italic">Begin by adding your first showcase.</p>
                    </div>
                ) : (
                    filteredItems.map((item, idx) => (
                        <div
                            key={item._id}
                            style={{ animationDelay: `${idx * 100}ms` }}
                            className="group relative aspect-[4/5] bg-zinc-200 rounded-[48px] overflow-hidden border-8 border-white shadow-lg hover:shadow-[0_30px_70px_rgba(6,95,70,0.25)] transition-all duration-700 animate-in fade-in slide-in-from-bottom-6"
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />

                            <div className="absolute inset-x-4 bottom-4 bg-white/20 backdrop-blur-3xl rounded-[36px] p-6 border border-white/30 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300 mb-1.5 block drop-shadow-sm">{item.category}</span>
                                        <h4 className="text-white font-black text-xl leading-tight truncate drop-shadow-sm">{item.title}</h4>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="w-12 h-12 bg-white/30 hover:bg-red-500 text-white rounded-2xl flex items-center justify-center transition-all group/del active:scale-90 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-6 left-6 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/20 group-hover:opacity-0 transition-opacity">
                                <span className="text-[9px] font-black text-white uppercase tracking-widest">{item.category}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    if (!publicKey || !urlEndpoint) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-900 animate-in fade-in duration-500">
                <div className="p-12 bg-zinc-800 rounded-[48px] border-2 border-emerald-500/20 text-center max-w-md shadow-2xl">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h2 className="text-white font-black text-3xl tracking-tight mb-4">Storage Keys Missing</h2>
                    <p className="text-zinc-400 font-medium mb-8">Please configure your ImageKit public key and URL endpoint in `.env.local` to enable uploads.</p>
                </div>
            </div>
        );
    }

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            {renderContent()}
        </ImageKitProvider>
    );
}
