"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Calendar, Save, Megaphone, Loader2, CheckCircle2, XCircle, X, ArrowRight, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const getApiUrl = () => {
    return "/api";
};
const API_URL = getApiUrl();

type AdmissionSettings = {
    _id?: string;
    startDate: string;
    endDate: string;
    academicYear: string;
    isActive: boolean;
    title: string;
    description: string;
};

// --- SUCCESS POPUP COMPONENT ---
const SuccessPopup = ({ onClose }: { onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl max-w-sm mx-4 text-center"
            >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    >
                        <CheckCircle2 size={48} className="text-emerald-600" />
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-emerald-400 rounded-full opacity-20"
                    />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Saved Successfully!</h3>
                <p className="text-zinc-500">Your admission settings have been updated.</p>
            </motion.div>
        </motion.div>
    );
};

// --- PREVIEW MODAL COMPONENT ---
const PreviewModal = ({ settings, onClose }: { settings: AdmissionSettings; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-0"
        >
            {/* Modal Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden w-full sm:max-w-lg border border-emerald-100"
            >
                <div className="absolute top-0 left-0 right-0 bg-zinc-900 text-white text-xs font-bold py-1 text-center z-20">
                    PREVIEW MODE
                </div>

                {/* Decorative Header Bar */}
                <div className="h-2 bg-gradient-to-r from-emerald-800 to-emerald-600 w-full mt-6" />

                <div className="p-6 sm:p-8 relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-full transition-colors z-30 cursor-pointer"
                        title="Close Preview"
                    >
                        <X size={24} />
                    </button>

                    {/* Content */}
                    <div className="space-y-6 text-center">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                                </span>
                                {settings.title || "Admissions Open"}
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900">
                                Apply for {settings.academicYear || "Upcoming Year"}
                            </h2>

                            <p className="text-gray-600 max-w-md mx-auto">
                                {settings.description || "Secure your future with our specialized Undergraduate (UG) and Postgraduate (PG) programs combined with Islamic values."}
                            </p>
                        </div>

                        {/* Date Highlight */}
                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-800 bg-emerald-50/50 py-2 rounded-lg">
                            <Calendar size={18} />
                            <span>Applications closing soon for Phase 1</span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <div className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-800 text-white font-medium py-3 px-6 rounded-xl shadow-lg opacity-90 cursor-default hover:cursor-pointer">
                                Apply Now
                                <ArrowRight size={18} />
                            </div>

                            <div className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl cursor-default hover:cursor-pointer">
                                View Prospectus
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function AdmissionSettingsPage() {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const [settings, setSettings] = useState<AdmissionSettings>({
        startDate: "",
        endDate: "",
        academicYear: "",
        isActive: true,
        title: "",
        description: "",
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${API_URL}/admission/settings`);
                if (!res.ok) throw new Error("Failed to fetch settings");
                const data = await res.json();

                const formatDate = (dateString: string) => {
                    if (!dateString) return "";
                    return new Date(dateString).toISOString().split('T')[0];
                };

                setSettings({
                    ...data,
                    startDate: formatDate(data.startDate),
                    endDate: formatDate(data.endDate),
                });
            } catch (error) {
                console.error("Error fetching settings:", error);
                toast.error("Failed to load admission settings");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleToggle = (checked: boolean) => {
        setSettings((prev) => ({ ...prev, isActive: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = await getToken();
            const res = await fetch(`${API_URL}/admission/settings`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(settings),
            });

            if (!res.ok) throw new Error("Failed to update settings");

            const data = await res.json();

            // Show Success Animation
            setShowSuccess(true);

            const formatDate = (dateString: string) => {
                if (!dateString) return "";
                return new Date(dateString).toISOString().split('T')[0];
            };

            setSettings({
                ...data,
                startDate: formatDate(data.startDate),
                endDate: formatDate(data.endDate),
            });

        } catch (error) {
            console.error("Error updating settings:", error);
            toast.error("Failed to update admission settings");
        } finally {
            setSaving(false);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        // Automatically open the preview after success popup closes
        setTimeout(() => setShowPreview(true), 300);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {showSuccess && <SuccessPopup onClose={handleSuccessClose} />}
                {showPreview && <PreviewModal settings={settings} onClose={() => setShowPreview(false)} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto space-y-8"
            >
                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700">
                            <Megaphone size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Admission Popup Settings</h1>
                            <p className="text-zinc-500 mt-1">Manage admission announcements and popup visibility.</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowPreview(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-medium rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                        <Eye size={18} />
                        Preview Popup
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Status Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-6 rounded-2xl border transition-all duration-300 ${settings.isActive ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' : 'bg-white border-zinc-200 shadow-sm'}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-zinc-900 flex items-center gap-2">
                                    Popup Status
                                    {settings.isActive ? (
                                        <span className="text-emerald-600 text-sm font-medium bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <CheckCircle2 size={12} /> Active
                                        </span>
                                    ) : (
                                        <span className="text-zinc-500 text-sm font-medium bg-zinc-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <XCircle size={12} /> Inactive
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-zinc-500">Enable or disable the global admission popup.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={settings.isActive}
                                    onChange={(e) => handleToggle(e.target.checked)}
                                />
                                <div className="w-14 h-7 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600 shadow-inner"></div>
                            </label>
                        </div>
                    </motion.div>

                    {/* Configuration Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3 group">
                                <label className="text-sm font-semibold text-zinc-700 group-focus-within:text-emerald-600 transition-colors">
                                    Academic Year
                                </label>
                                <input
                                    type="text"
                                    name="academicYear"
                                    value={settings.academicYear}
                                    onChange={handleChange}
                                    placeholder="e.g. 2026-27"
                                    className="w-full px-4 py-3 text-zinc-900 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-3 group">
                                <label className="text-sm font-semibold text-zinc-700 group-focus-within:text-emerald-600 transition-colors">
                                    Popup Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={settings.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Admissions Open"
                                    className="w-full px-4 py-3 text-zinc-900 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2 space-y-3 group">
                                <label className="text-sm font-semibold text-zinc-700 group-focus-within:text-emerald-600 transition-colors">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={settings.description}
                                    onChange={handleChange}
                                    placeholder="Enter a inviting description for prospective students..."
                                    rows={3}
                                    className="w-full px-4 py-3 text-zinc-900 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none font-medium leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-100 pt-8">
                            <div className="space-y-3 group">
                                <label className="text-sm font-semibold text-zinc-700 group-focus-within:text-emerald-600 transition-colors flex items-center gap-2">
                                    <Calendar size={16} /> Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={settings.startDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-zinc-600"
                                    required
                                />
                            </div>
                            <div className="space-y-3 group">
                                <label className="text-sm font-semibold text-zinc-700 group-focus-within:text-emerald-600 transition-colors flex items-center gap-2">
                                    <Calendar size={16} /> End Date
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={settings.endDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium text-zinc-600"
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-end pt-4"
                    >
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-8 py-3.5 bg-zinc-900 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </>
    );
}
