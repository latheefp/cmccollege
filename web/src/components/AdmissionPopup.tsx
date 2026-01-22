"use client";

import { useEffect, useState } from "react";
import { X, Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// CONFIGURATION
export default function AdmissionPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [config, setConfig] = useState({
        startDate: new Date(),
        endDate: new Date(),
        academicYear: "",
        title: "Admissions Open",
        description: "Secure your future with our specialized Undergraduate (UG) and Postgraduate (PG) programs combined with Islamic values."
    });

    useEffect(() => {
        setIsMounted(true);

        const fetchSettingsAndCheckVisibility = async () => {
            try {
                // Fetch settings from API
                const res = await fetch("/api/admission/settings");
                if (!res.ok) return;

                const data = await res.json();

                if (!data.isActive) return;

                const startDate = new Date(data.startDate);
                const endDate = new Date(data.endDate);

                // Update local config
                setConfig({
                    startDate,
                    endDate,
                    academicYear: data.academicYear,
                    title: data.title || "Admissions Open",
                    description: data.description || "Secure your future with our specialized Undergraduate (UG) and Postgraduate (PG) programs combined with Islamic values."
                });

                const now = new Date();
                const hasClosedPopup = sessionStorage.getItem("admission-popup-closed");

                if (!hasClosedPopup && now >= startDate && now <= endDate) {
                    setIsVisible(true);
                }
            } catch (error) {
                console.error("Failed to load admission popup settings", error);
            }
        };

        fetchSettingsAndCheckVisibility();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem("admission-popup-closed", "true");
    };

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[100] bg-black/20 flex items-center justify-center p-4 sm:p-0"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed z-[100] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden
                       top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[calc(100%-2rem)] sm:w-full sm:max-w-lg border border-emerald-100"
                    >
                        {/* Decorative Header Bar */}
                        <div className="h-2 bg-gradient-to-r from-emerald-800 to-emerald-600 w-full" />

                        <div className="p-6 sm:p-8 relative">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Close popup"
                            >
                                <X size={20} />
                            </button>

                            {/* Content */}
                            <div className="space-y-6 text-center">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                                        </span>
                                        {config.title}
                                    </div>

                                    <h2 className="text-3xl font-bold text-gray-900">
                                        Apply for {config.academicYear}
                                    </h2>

                                    <p className="text-gray-600 max-w-md mx-auto">
                                        {config.description}
                                    </p>
                                </div>

                                {/* Date Highlight */}
                                <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-800 bg-emerald-50/50 py-2 rounded-lg">
                                    <Calendar size={18} />
                                    <span>Applications closing soon for Phase 1</span>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <Link
                                        href="/admissions"
                                        onClick={handleClose}
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/20 active:scale-95 group"
                                    >
                                        Apply Now
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </Link>

                                    <button
                                        onClick={handleClose}
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors active:scale-95"
                                    >
                                        View Prospectus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
