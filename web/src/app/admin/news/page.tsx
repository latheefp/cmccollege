'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

interface NewsItem {
    _id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    tag: string;
}

export default function AdminNewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
    const { getToken } = useAuth();
    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<NewsItem>();

    const fetchNews = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
            const data = await res.json();
            if (data.success) setNews(data.data);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const onSubmit = async (data: NewsItem) => {
        try {
            const token = await getToken();
            const method = editingItem ? 'PUT' : 'POST';
            const url = editingItem
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/news/${editingItem._id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/news`;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setShowModal(false);
                reset();
                setEditingItem(null);
                fetchNews();
            }
        } catch (error) {
            console.error('Operation failed:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchNews();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const openEdit = (item: NewsItem) => {
        setEditingItem(item);
        setValue('title', item.title);
        setValue('description', item.description);
        setValue('date', item.date.split('T')[0]); // Format date for input
        setValue('tag', item.tag);
        setValue('image', item.image);
        setShowModal(true);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">News & Events</h1>
                    <p className="text-zinc-500 mt-1">Manage latest updates and campus happenings</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        reset();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <Plus size={20} />
                    Add New
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="relative h-48 bg-zinc-100">
                                <Image
                                    src={item.image || '/placeholder.png'}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-emerald-800 uppercase">
                                    {item.tag}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs text-zinc-400 font-medium">
                                        {new Date(item.date).toLocaleDateString()}
                                    </span>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEdit(item)} className="p-1 hover:bg-zinc-100 rounded text-blue-600">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="p-1 hover:bg-zinc-100 rounded text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-bold text-zinc-900 line-clamp-1 mb-1">{item.title}</h3>
                                <p className="text-sm text-zinc-500 line-clamp-2">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl border border-white/20 relative flex flex-col max-h-[90vh]"
                        >
                            {/* Decorative Background Blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="p-8 border-b border-zinc-100 flex justify-between items-center relative z-10">
                                <div>
                                    <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                                        {editingItem ? 'Edit News Event' : 'Create News Event'}
                                    </h2>
                                    <p className="text-zinc-500 text-sm font-medium mt-1">Share the latest highlights with the campus.</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-3 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 relative z-10 overflow-y-auto">
                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 ml-1">Event Title</label>
                                        <input
                                            {...register('title', { required: "Title is required" })}
                                            className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold text-zinc-800 placeholder:text-zinc-400"
                                            placeholder="e.g., Annual Sports Meet 2026"
                                        />
                                        {errors.title && <p className="text-red-500 text-xs mt-1 ml-1">{errors.title.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 ml-1">Event Date</label>
                                            <input
                                                type="date"
                                                {...register('date', { required: "Date is required" })}
                                                className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium text-zinc-800"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 ml-1">Category Tag</label>
                                            <div className="relative">
                                                <select
                                                    {...register('tag', { required: true })}
                                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium text-zinc-800 appearance-none cursor-pointer"
                                                >
                                                    <option value="General">General</option>
                                                    <option value="Seminar">Seminar</option>
                                                    <option value="Sports">Sports</option>
                                                    <option value="Cultural">Cultural</option>
                                                    <option value="Academic">Academic</option>
                                                    <option value="Workshop">Workshop</option>
                                                    <option value="Events">Events</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 ml-1">Brief Description</label>
                                        <textarea
                                            {...register('description', { required: "Description is required" })}
                                            rows={3}
                                            className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium text-zinc-800 placeholder:text-zinc-400 resize-none"
                                            placeholder="Summarize the event in a few sentences..."
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 ml-1">Cover Image</label>
                                        <div className="bg-zinc-50 p-2 rounded-2xl border-2 border-zinc-100">
                                            <Controller
                                                name="image"
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field: { value, onChange } }) => (
                                                    <ImageUpload
                                                        currentImage={value}
                                                        onUploadComplete={(url) => {
                                                            onChange(url);
                                                        }}
                                                        folder="/news"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.image && <p className="text-red-500 text-xs mt-1 ml-1">{errors.image.message}</p>}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-zinc-100 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-6 py-4 border-2 border-zinc-100 text-zinc-600 font-bold rounded-2xl hover:bg-zinc-50 hover:text-zinc-900 transition-all active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        {editingItem ? 'Save Updates' : 'Publish Event'}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
