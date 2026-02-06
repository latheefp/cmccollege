"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';
import ImageKit from 'imagekit-javascript';
import { Loader2, Trash2, Upload, Plus } from 'lucide-react';

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

interface Achiever {
    _id: string;
    name: string;
    batch: string;
    achievement: string;
    description: string;
    image: string;
}

export default function AdminAchieversPage() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ikUploadRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        batch: "",
        achievement: "",
        description: "",
        image: "",
        fileId: ""
    });

    const ikClient = useMemo(() => {
        if (!publicKey || !urlEndpoint) return null;
        return new ImageKit({
            publicKey,
            urlEndpoint
        });
    }, []);

    const fetchAchievers = async () => {
        try {
            const response = await fetch("/api/alumni/achievers");
            const data = await response.json();
            if (data.success) {
                setAchievers(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onFileUploadSuccess = (res: any) => {
        setIsUploading(false);
        setFormData(prev => ({ ...prev, image: res.url, fileId: res.fileId }));
    };

    const onFileUploadError = (err: any) => {
        setIsUploading(false);
        console.error("Upload error", err);
        alert("Upload failed");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) return alert("Please upload an image");

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/alumni/achievers", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                setAchievers(prev => [data.data, ...prev]);
                setShowForm(false);
                setFormData({ name: "", batch: "", achievement: "", description: "", image: "", fileId: "" });
            }
        } catch (error) {
            alert("Failed to save");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this achiever?")) return;
        try {
            const response = await fetch(`/api/alumni/achievers/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setAchievers(prev => prev.filter(item => item._id !== id));
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
                    <h1 className="text-3xl font-bold text-zinc-900">Alumni Achievers</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Achiever
                    </button>
                </div>

                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto text-zinc-900">
                            <h2 className="text-2xl font-bold mb-6 text-zinc-900">Add New Achiever</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex gap-6">
                                    <div
                                        onClick={() => ikUploadRef.current?.click()}
                                        className={`w-32 h-40 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer shrink-0 overflow-hidden relative ${formData.image ? 'border-emerald-500' : 'border-zinc-300 hover:border-emerald-500'}`}
                                    >
                                        <IKUpload
                                            ref={ikUploadRef}
                                            folder="Alumni/Achievers"
                                            onSuccess={onFileUploadSuccess}
                                            onError={onFileUploadError}
                                            onUploadStart={() => setIsUploading(true)}
                                            className="hidden"
                                        />
                                        {isUploading ? (
                                            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                                        ) : formData.image ? (
                                            <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                        ) : (
                                            <div className="text-center p-2">
                                                <Upload className="w-6 h-6 mx-auto mb-2 text-zinc-400" />
                                                <span className="text-xs text-zinc-500">Upload Photo</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4 grow">
                                        <input
                                            name="name"
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 placeholder:text-zinc-400"
                                            required
                                        />
                                        <input
                                            name="batch"
                                            placeholder="Batch (e.g. 2015-2019)"
                                            value={formData.batch}
                                            onChange={handleInputChange}
                                            className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 placeholder:text-zinc-400"
                                            required
                                        />
                                        <input
                                            name="achievement"
                                            placeholder="Achievement/Role"
                                            value={formData.achievement}
                                            onChange={handleInputChange}
                                            className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 placeholder:text-zinc-400"
                                            required
                                        />
                                    </div>
                                </div>
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32 text-zinc-900 placeholder:text-zinc-400"
                                    required
                                />
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
                                        disabled={isSubmitting || isUploading}
                                        className="flex-1 py-3 font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save Achiever'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-zinc-400">Loading...</div>
                    ) : achievers.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 flex gap-4 relative group">
                            <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden relative bg-zinc-100">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-zinc-900">{item.name}</h3>
                                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit mb-1">{item.batch}</div>
                                <p className="text-sm text-zinc-600 font-medium line-clamp-1">{item.achievement}</p>
                                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{item.description}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </ImageKitProvider>
    );
}
