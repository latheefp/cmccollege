"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Accent from theme */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#7B0046_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7B0046]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Animated Icon Container */}
                    <div className="relative inline-block mb-12">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] border-2 border-zinc-100 flex items-center justify-center bg-white shadow-xl relative z-10"
                        >
                            <Clock size={64} className="text-[#7B0046] opacity-80" />
                        </motion.div>

                        {/* Floating elements around the icon */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-lg text-emerald-600"
                        >
                            <Sparkles size={24} />
                        </motion.div>
                    </div>

                    {/* Pre-title Label */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B0046]/5 border border-[#7B0046]/10 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7B0046] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B0046]">Experience Refresh In Progress</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6 uppercase">
                        Content <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B0046] to-pink-600">Updating Soon</span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto font-medium leading-relaxed mb-12">
                        Something exceptional is being built here. We're currently updating our digital experience to better serve our campus community.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="w-full sm:w-auto px-10 py-4 rounded-2xl border border-zinc-200 text-zinc-600 font-bold hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Return Back
                        </button>

                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#7B0046] text-white font-bold hover:bg-[#60082d] hover:shadow-2xl hover:shadow-maroon-900/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Back to Campus
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-100 to-transparent" />
        </div>
    );
}
