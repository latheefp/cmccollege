'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, X, FileText, Loader2, Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface QuestionPaper {
    _id: string;
    title: string;
    code: string;
    department: string;
    semester: string;
    year: string;
    type: string;
    pdfUrl: string;
}

const departments = [
    "Computer Science",
    "Management",
    "Mass Communication",
    "Economics",
    "English",
    "Commerce",
];

const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];
const types = ["Main Exam", "Supplementary", "Internal"];

export default function AdminQuestionBankPage() {
    const [papers, setPapers] = useState<QuestionPaper[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<QuestionPaper | null>(null);
    const { getToken } = useAuth();
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<QuestionPaper>();

    const fetchPapers = async () => {
        try {
            const res = await fetch("/api/question-papers");
            const data = await res.json();
            if (data.success) setPapers(data.data);
        } catch (error) {
            console.error('Failed to fetch papers:', error);
            toast.error("Failed to load question papers");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPapers();
    }, []);

    const onSubmit = async (data: QuestionPaper) => {
        try {
            const token = await getToken();
            const method = editingItem ? 'PUT' : 'POST';
            const url = editingItem
                ? `/api/question-papers/${editingItem._id}`
                : `/api/question-papers`;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                toast.success(editingItem ? "Paper updated successfully" : "Paper added successfully");
                setShowModal(false);
                reset();
                setEditingItem(null);
                fetchPapers();
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Operation failed");
            }
        } catch (error) {
            console.error('Operation failed:', error);
            toast.error("An error occurred");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this question paper?')) return;
        try {
            const token = await getToken();
            const res = await fetch(`/api/question-papers/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success("Paper deleted");
                fetchPapers();
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error("Error deleting paper");
        }
    };

    const openEdit = (item: QuestionPaper) => {
        setEditingItem(item);
        setValue('title', item.title);
        setValue('code', item.code);
        setValue('department', item.department);
        setValue('semester', item.semester);
        setValue('year', item.year);
        setValue('type', item.type);
        setValue('pdfUrl', item.pdfUrl);
        setShowModal(true);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">Question Bank Management</h1>
                    <p className="text-zinc-500 mt-1">Manage library of previous year question papers</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        reset();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-[#7a0b3a] text-white px-6 py-3 rounded-xl hover:bg-[#60082d] transition-all shadow-lg shadow-maroon-900/20 active:scale-95 font-bold"
                >
                    <Plus size={20} />
                    Add Question Paper
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-maroon-600" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {papers.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow group relative"
                        >
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-[#7a0b3a]">
                                    <FileText size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-[#7a0b3a] px-2 py-0.5 bg-pink-50 rounded-full uppercase tracking-wider mb-1 inline-block">
                                        {item.code}
                                    </span>
                                    <h3 className="font-bold text-zinc-900 truncate leading-tight">{item.title}</h3>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-400 font-medium">Department</span>
                                    <span className="text-zinc-700 font-bold">{item.department}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-400 font-medium">Semester</span>
                                    <span className="text-zinc-700 font-bold">{item.semester}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-400 font-medium">Exam Year</span>
                                    <span className="text-zinc-700 font-bold">{item.year}</span>
                                </div>
                            </div>

                            <a
                                href={item.pdfUrl.startsWith('http') ? item.pdfUrl : `https://${item.pdfUrl}`}
                                target="_blank"
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-600 font-bold text-sm hover:bg-zinc-100 transition-colors"
                            >
                                <ExternalLink size={14} />
                                View Document
                            </a>
                        </motion.div>
                    ))}
                    {papers.length === 0 && (
                        <div className="col-span-full py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400">
                            <FileText size={48} className="mb-4 opacity-20" />
                            <p className="font-medium">No question papers added yet</p>
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-[#7a0b3a] text-white">
                                <h2 className="text-xl font-bold">{editingItem ? 'Edit Paper' : 'Add Question Paper'}</h2>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Subject Title</label>
                                        <input {...register('title', { required: true })} className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#7a0b3a] transition-all outline-none text-zinc-900 placeholder:text-zinc-400 font-semibold" placeholder="e.g., Data Structures" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Course Code</label>
                                        <input {...register('code', { required: true })} className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#7a0b3a] transition-all outline-none text-zinc-900 placeholder:text-zinc-400 font-semibold" placeholder="e.g., BCS3B04" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Exam Year</label>
                                        <input {...register('year', { required: true })} className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#7a0b3a] transition-all outline-none text-zinc-900 placeholder:text-zinc-400 font-semibold" placeholder="2023" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Department</label>
                                        <select {...register('department', { required: true })} className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#7a0b3a] transition-all outline-none appearance-none font-semibold text-zinc-900">
                                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Semester</label>
                                        <select {...register('semester', { required: true })} className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#7a0b3a] transition-all outline-none appearance-none font-semibold text-zinc-900">
                                            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Exam Type</label>
                                        <select {...register('type', { required: true })} className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#7a0b3a] transition-all outline-none appearance-none font-semibold text-zinc-900">
                                            {types.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Google Drive / PDF Link</label>
                                        <input {...register('pdfUrl', { required: true })} className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#7a0b3a] transition-all outline-none text-zinc-900 placeholder:text-zinc-400 font-semibold" placeholder="Paste shared link here..." />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-6">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-xl border border-zinc-200 text-zinc-500 font-bold hover:bg-zinc-50 transition-all">Cancel</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-2 py-4 rounded-xl bg-[#7a0b3a] text-white font-bold hover:bg-[#60082d] transition-all shadow-lg shadow-maroon-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : editingItem ? 'Update Paper' : 'Add to Collection'}
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
