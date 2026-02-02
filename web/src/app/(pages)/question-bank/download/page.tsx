"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle, ArrowLeft, FileText, Share2, Printer, Loader2 } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function DownloadPage() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("preparing"); // preparing, downloading, completed

    useEffect(() => {
        // Simulate preparing phase
        const prepTimer = setTimeout(() => {
            setStatus("downloading");
        }, 1500);

        return () => clearTimeout(prepTimer);
    }, []);

    useEffect(() => {
        if (status === "downloading") {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus("completed");
                        return 100;
                    }
                    return prev + Math.random() * 15;
                });
            }, 300);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 font-sans pt-[104px] lg:pt-[112px]">
            {/* Header Section */}
            <section className="relative py-12 px-6 bg-[#7a0b3a] text-white">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/question-bank"
                        className="inline-flex items-center gap-2 text-pink-200/70 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-sm">Back to Question Bank</span>
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                        Document Center
                    </h1>
                    <p className="text-pink-100/60 font-medium uppercase tracking-widest text-sm">
                        Academic Resource Download
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="bg-white rounded-[40px] shadow-2xl border border-zinc-100 overflow-hidden">
                            {/* Card Header */}
                            <div className="p-8 md:p-12 border-b border-zinc-50 bg-zinc-50/50 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-24 h-24 rounded-3xl bg-[#7a0b3a] flex items-center justify-center text-white shadow-xl shadow-maroon-900/20">
                                    <FileText size={40} />
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 mb-2 leading-tight">
                                        Data Structures & Algorithms
                                    </h2>
                                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2">
                                        Subject Code: <span className="text-[#7a0b3a]">BCS3B04</span> • 2023 Main Exam
                                    </p>
                                </div>
                            </div>

                            {/* Download Interface */}
                            <div className="p-8 md:p-12">
                                {status !== "completed" ? (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                                                {status === "preparing" ? "Preparing File..." : "Downloading Resources"}
                                            </span>
                                            <span className="text-lg font-black text-[#7a0b3a]">
                                                {Math.round(progress)}%
                                            </span>
                                        </div>

                                        {/* Progress Bar Container */}
                                        <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden p-1 shadow-inner relative">
                                            <motion.div
                                                className="h-full bg-linear-to-r from-[#7a0b3a] to-pink-600 rounded-full relative"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ ease: "easeOut" }}
                                            >
                                                {/* Animated Glint */}
                                                <motion.div
                                                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent w-20"
                                                    animate={{ left: ["-100%", "100%"] }}
                                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="flex items-center gap-4 text-zinc-500 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                            {status === "preparing" ? (
                                                <Loader2 size={20} className="animate-spin text-[#7a0b3a]" />
                                            ) : (
                                                <Download size={20} className="text-emerald-600" />
                                            )}
                                            <p className="text-sm font-medium">
                                                {status === "preparing"
                                                    ? "Authenticating access and generating secure download link..."
                                                    : "Transferring PDF data from academic archives..."}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8"
                                    >
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100/50">
                                            <CheckCircle size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-zinc-800 mb-2">Download Complete!</h3>
                                            <p className="text-zinc-500 max-w-sm mx-auto">
                                                The question paper has been successfully saved to your device.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <a
                                                href="/assets/sample-paper.txt"
                                                download="BCS3B04-QuestionPaper.pdf"
                                                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#7a0b3a] text-white rounded-2xl font-bold hover:bg-[#60082d] transition-all hover:scale-105 shadow-xl shadow-maroon-900/10 cursor-pointer"
                                            >
                                                <Download size={18} />
                                                Download Now
                                            </a>
                                            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-zinc-100 text-zinc-800 rounded-2xl font-bold hover:bg-zinc-200 transition-all hover:scale-105 cursor-pointer">
                                                <Share2 size={18} />
                                                Share with Peers
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "File Format", value: "PDF Document", icon: FileText },
                                { title: "File Size", value: "2.4 MB", icon: Download },
                                { title: "Quality", value: "HQ Scan", icon: CheckCircle },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#7a0b3a] flex items-center justify-center shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-sm font-bold text-zinc-800">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
