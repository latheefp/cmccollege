"use client";

import { motion } from "framer-motion";
import AdmissionsSidebar from "@/components/AdmissionsSidebar";

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-zinc-50 text-zinc-900 pt-[112px]">
            {/* --- HEADER SECTION (Shared across all admissions pages) --- */}
            <section className="relative py-24 px-6 bg-[#004d40] text-white overflow-hidden mb-12">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-emerald-100 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-6 border border-emerald-500/30">
                            Admissions Open 2024-25
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-serif">
                            Begin Your Journey With Us
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
                            Explore our diverse range of programs and take the first step towards a bright career. Apply to your preferred department today.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="w-full px-4 md:px-[30px] max-w-7xl mx-auto pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* SIDEBAR */}
                    <div className="lg:col-span-3 lg:sticky lg:top-28">
                        <AdmissionsSidebar />
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-9 space-y-8">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
