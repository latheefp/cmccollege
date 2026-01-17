"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { usePageContent } from "@/hooks/usePageContent";

export default function AcademicsPage() {
    const { getText, getImage } = usePageContent("academics");

    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-[112px]">
            {/* Hero Section */}
            <section className="relative py-24 px-6 bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" data-editable="header-title" data-page="academics">
                            {getText("header-title", "Academic Programs")}
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed" data-editable="header-desc" data-page="academics">
                            {getText("header-desc", "Integrated +1 and +2 education combining rigorous academic excellence with Islamic values and professional entrance coaching.")}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Academic Philosophy */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8" data-editable="philosophy-heading" data-page="academics">{getText("philosophy-heading", "Integrated Learning Approach")}</h2>
                        <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
                            <p data-editable="philosophy-text-1" data-page="academics">
                                {getText("philosophy-text-1", "At our institution, we believe that academic success and moral integrity go hand in hand. Our unique **Integrated Program** is designed to provide students with a comprehensive learning experience that prepares them for both higher education and life.")}
                            </p>
                            <p data-editable="philosophy-text-2" data-page="academics">
                                {getText("philosophy-text-2", "We don't just follow the standard curriculum; we enhance it with systematic entrance exam preparation, spiritual mentorship, and high-discipline study environments.")}
                            </p>
                            <ul className="space-y-4 pt-4">
                                {[
                                    "Regular Syllabus Coverage",
                                    "Integrated NEET/JEE/CA Foundation Coaching",
                                    "Daily Quranic & Moral Values Training",
                                    "Supervised Night Study Sessions"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-emerald-900">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200} className="relative h-[500px] rounded-[60px] overflow-hidden shadow-2xl border border-emerald-50">
                        <Image
                            src={getImage("philosophy-image", "/images/classroom_learning_1768115518451.png")}
                            alt="Interactive Learning"
                            fill
                            className="object-cover"
                            data-editable="philosophy-image"
                            data-page="academics"
                        />
                    </ScrollReveal>
                </div>
            </section>

            {/* Academic Streams */}
            <section className="py-24 px-6 bg-zinc-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4" data-editable="streams-main-heading" data-page="academics">{getText("streams-main-heading", "Academic Streams")}</h2>
                        <p className="text-zinc-600 text-lg max-w-2xl mx-auto" data-editable="streams-main-desc" data-page="academics">{getText("streams-main-desc", "Focused tracks tailored to help every student achieve their professional goals with moral clarity.")}</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Science Stream */}
                        <ScrollReveal className="bg-white p-10 rounded-[40px] shadow-sm border border-emerald-50 hover:border-emerald-200 transition-all hover:shadow-xl group">
                            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🔬</div>
                            <h3 className="text-2xl font-bold text-emerald-900 mb-4 uppercase tracking-wide" data-editable="science-title" data-page="academics">{getText("science-title", "Science Stream")}</h3>
                            <p className="text-zinc-600 mb-8 leading-relaxed" data-editable="science-desc" data-page="academics">
                                {getText("science-desc", "Our Science stream is engineered for students aiming for careers in Medicine, Engineering, and Research. We provide intensive training in core subjects with integrated coaching modules for national level examinations.")}
                            </p>
                            <div className="space-y-4">
                                <h4 className="font-bold text-emerald-800">Key Subjects:</h4>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {["Physics", "Chemistry", "Biology", "Mathematics", "English"].map((s, i) => (
                                        <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <p className="text-sm font-bold text-emerald-800 mb-2 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span data-editable="science-focus-label" data-page="academics">{getText("science-focus-label", "Entrance Focus")}</span>
                                </p>
                                <p className="text-emerald-900 text-sm italic font-medium" data-editable="science-focus-text" data-page="academics">{getText("science-focus-text", "Systematic NEET & JEE preparation integrated within the weekly schedule.")}</p>
                            </div>
                        </ScrollReveal>

                        {/* Commerce Stream */}
                        <ScrollReveal delay={200} className="bg-white p-10 rounded-[40px] shadow-sm border border-orange-50 hover:border-emerald-200 transition-all hover:shadow-xl group">
                            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">📊</div>
                            <h3 className="text-2xl font-bold text-emerald-900 mb-4 uppercase tracking-wide" data-editable="commerce-title" data-page="academics">{getText("commerce-title", "Commerce Stream")}</h3>
                            <p className="text-zinc-600 mb-8 leading-relaxed" data-editable="commerce-desc" data-page="academics">
                                {getText("commerce-desc", "Designed for future entrepreneurs and financial experts, our Commerce stream emphasizes practical business knowledge, financial literacy, and ethical trade practices.")}
                            </p>
                            <div className="space-y-4">
                                <h4 className="font-bold text-emerald-800">Key Subjects:</h4>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {["Accountancy", "Business Studies", "Economics", "Computer Science", "English"].map((s, i) => (
                                        <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <p className="text-sm font-bold text-emerald-800 mb-2 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span data-editable="commerce-focus-label" data-page="academics">{getText("commerce-focus-label", "Professional Focus")}</span>
                                </p>
                                <p className="text-emerald-900 text-sm italic font-medium" data-editable="commerce-focus-text" data-page="academics">{getText("commerce-focus-text", "Foundation training for CA, CS, and CMA integrated within the curriculum.")}</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Methodology & Exam Prep */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4 tracking-tight" data-editable="methodology-heading" data-page="academics">{getText("methodology-heading", "How We Prepare You")}</h2>
                    <p className="text-zinc-600 text-lg" data-editable="methodology-desc" data-page="academics">{getText("methodology-desc", "Our systematic approach to excellence.")}</p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { step: "01", title: "Core Mastery", desc: "Solid foundation in NCERT and standard board syllabus." },
                        { step: "02", title: "Critical Testing", desc: "Weekly mock tests and OMR-based practice sessions." },
                        { step: "03", title: "Moral Clarity", desc: "Daily ethics classes to maintain focus and character." },
                        { step: "04", title: "Personal Prep", desc: "One-on-one doubt clearing and progress monitoring." }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 100} className="relative p-8 bg-white border-l-4 border-emerald-800 shadow-sm hover:shadow-md transition-all">
                            <span className="text-4xl font-black text-emerald-100 absolute top-4 right-4">{item.step}</span>
                            <h4 className="text-xl font-bold text-emerald-900 mb-3 relative z-10">{item.title}</h4>
                            <p className="text-zinc-600 leading-relaxed relative z-10">{item.desc}</p>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-emerald-900 text-white text-center rounded-[100px] mx-6 mb-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>
                <ScrollReveal className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 italic" data-editable="cta-heading" data-page="academics">{getText("cta-heading", "Ready to transform your future?")}</h2>
                    <p className="text-emerald-100 text-lg mb-12 opacity-80 leading-relaxed font-medium" data-editable="cta-desc" data-page="academics">{getText("cta-desc", "Join our next batch of high achievers. Limited seats available for both Science and Commerce streams.")}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/admissions">
                            <button className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-2xl shadow-2xl hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all text-lg cursor-pointer">
                                Apply for Admission
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg cursor-pointer">
                                Enquire Now
                            </button>
                        </Link>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
