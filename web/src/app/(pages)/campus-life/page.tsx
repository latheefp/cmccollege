"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Users, Trophy, Coffee, Clock } from 'lucide-react';
import ScrollReveal from "@/components/ScrollReveal";

export default function CampusLifePage() {
    return (
        <div className="min-h-screen bg-zinc-50 pt-[112px]">
            {/* Hero Header */}
            <section className="py-24 px-6 bg-white border-b border-zinc-100 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100">
                            <Sparkles size={14} className="animate-pulse" />
                            Discover CM College
                        </div>
                        <h1 className="text-5xl md:text-7xl font-agency font-bold text-emerald-900 mb-6 uppercase tracking-tight">
                            Campus <span className="text-[#7B0046]">Life</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            Experience the vibrant energy, culture, and community that makes life at CM College truly exceptional.
                        </p>
                    </ScrollReveal>

                    {/* Floating Decorative Icons */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] overflow-hidden">
                        <Camera className="absolute top-10 left-[10%] w-24 h-24 rotate-12" />
                        <Users className="absolute bottom-10 right-[15%] w-32 h-32 -rotate-12" />
                        <Trophy className="absolute top-20 right-[5%] w-20 h-20 rotate-45" />
                        <Coffee className="absolute bottom-1/2 left-[5%] w-16 h-16 -rotate-45" />
                    </div>
                </div>
            </section>

            {/* Coming Soon Content */}
            <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
                <ScrollReveal>
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white shadow-2xl flex items-center justify-center mx-auto mb-12 border border-zinc-100"
                        >
                            <Clock size={48} className="text-[#7B0046] animate-spin-slow" />
                        </motion.div>

                        {/* Status Label */}
                        <div className="inline-block px-8 py-4 bg-[#7B0046] text-white rounded-2xl shadow-xl shadow-[#7B0046]/20 mb-8">
                            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em]">Updating Soon</h2>
                        </div>

                        <div className="max-w-md mx-auto">
                            <h3 className="text-2xl font-bold text-zinc-800 mb-4">We are curating the best moments.</h3>
                            <p className="text-zinc-500 leading-relaxed italic">
                                Our team is currently designing a rich, interactive showcase of our campus facilities, student organizations, and daily activities. Check back shortly to see the full experience.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Decorative Grid of Placeholders */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-20 filter grayscale blur-[1px] pointer-events-none">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-zinc-200 rounded-2xl"></div>
                    ))}
                </div>
            </section>
        </div>
    );
}
