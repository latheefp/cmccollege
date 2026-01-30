"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Report {
    _id: string;
    title: string;
    fileUrl: string;
    date: string;
}

export default function AlumniReportPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("/api/alumni/reports");
                const data = await response.json();
                if (data.success) {
                    setReports(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch reports", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-zinc-200/40 border border-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-serif text-zinc-900 mb-8 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800">
                            <FileText className="w-5 h-5" />
                        </span>
                        Reports & Documents
                    </h3>

                    <div className="space-y-4">
                        {reports.length === 0 ? (
                            <p className="text-zinc-500 text-center py-10">No reports available yet.</p>
                        ) : (
                            reports.map((report, idx) => (
                                <motion.div
                                    key={report._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-md hover:border-emerald-100 transition-all gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-xl border border-zinc-100 text-red-500 shadow-sm">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 text-lg leading-tight mb-1">{report.title}</h4>
                                            <div className="flex items-center gap-4 text-sm text-zinc-500">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={14} />
                                                    {report.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={report.fileUrl}
                                        target="_blank"
                                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-emerald-600 text-white rounded-xl transition-colors text-sm font-medium shrink-0"
                                    >
                                        <Download size={16} />
                                        <span>Download</span>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
