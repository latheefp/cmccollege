"use client";

import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function CareersPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-[112px]">
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Careers
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                            Join our team of dedicated educators and professionals committed to excellence and values.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Careers Content */}
            <section className="flex-grow py-32 px-6 flex items-center justify-center">
                <ScrollReveal className="max-w-xl mx-auto text-center">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-10 border border-emerald-100 shadow-inner">
                        💼
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-900 mb-6">No Open Positions</h2>
                    <p className="text-zinc-600 text-lg leading-relaxed mb-12">
                        Thank you for your interest in joining our institution. Currently, there are no open vacancies. However, we are always looking for passionate talent to join our mailing list for future opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <button className="px-8 py-4 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 shadow-lg hover:scale-105 active:scale-95 transition-all text-lg cursor-pointer">
                                Send Us Your Resume
                            </button>
                        </Link>
                        <Link href="/">
                            <button className="px-8 py-4 bg-transparent border-2 border-emerald-100 text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-all text-lg cursor-pointer">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                    <p className="mt-12 text-zinc-400 text-sm font-medium">Please check back later for updated recruitment notices.</p>
                </ScrollReveal>
            </section>
        </div>
    );
}
