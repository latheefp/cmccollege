"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function DepartmentCTA() {
    return (
        <section className="py-20 px-6 lg:px-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <div className="relative bg-gradient-to-br from-[#5D1035] to-[#1A0410] rounded-[3rem] p-12 md:p-24 text-center overflow-hidden group">
                        {/* Animated Background Gradients */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-30">
                            <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_50%)] from-white/20 animate-pulse" />
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <motion.h2
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                className="text-4xl md:text-6xl font-bold font-serif text-white mb-8 leading-tight"
                            >
                                Ready to start your journey?
                            </motion.h2>
                            <p className="text-white/70 text-lg md:text-xl mb-12 font-light">
                                Join a community of innovators and leaders. Admissions are currently open for the academic year 2026.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link
                                    href="/admissions"
                                    className="w-full sm:w-auto px-10 py-5 bg-white text-[#5D1035] font-black rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm"
                                >
                                    Apply for Admission
                                </Link>
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black rounded-xl hover:bg-white/5 transition-all duration-300 uppercase tracking-widest text-sm"
                                >
                                    Inquiry Form
                                </Link>
                            </div>
                        </div>

                        {/* Decorative Icon */}
                        <div className="absolute -bottom-20 -right-20 text-white/5 rotate-12 scale-150">
                            <GraduationCap className="w-96 h-96" />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
