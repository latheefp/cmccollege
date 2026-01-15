"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Target,
    Lightbulb,
    Award,
    Layout,
    History,
    UserCheck,
    Quote,
    Menu,
    X
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal"; // Ensure we use the shared component if available, or keep using similar logic

// --- SIDEBAR NAVIGATION ITEMS ---
const navItems = [
    { id: "history", label: "History", icon: <History size={18} /> },
    { id: "about-college", label: "About College", icon: <Layout size={18} /> },
    { id: "vision-mission", label: "Vision & Mission", icon: <Target size={18} /> },
    { id: "principal-message", label: "Principal's Message", icon: <UserCheck size={18} /> },
];

export default function AboutPage() {
    const [activeSection, setActiveSection] = useState("history");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll Spy & Header Offset Calculation
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // Increased offset for better triggers

            for (const item of navItems) {
                const section = document.getElementById(item.id);
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(item.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            // Adjust offset based on screen size (header height)
            const headerOffset = window.innerWidth < 1024 ? 180 : 180;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 font-sans text-zinc-900 pt-[120px] lg:pt-[140px]">

            {/* --- HERO HEADER (Condensed) --- */}
            <section className="relative bg-[#7B0046] text-white py-12 md:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">About Us</h1>
                    <nav className="flex items-center justify-center gap-2 text-sm font-medium text-rose-100/80">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">About</span>
                    </nav>
                </div>
            </section>

            {/* --- MOBILE STICKY NAV (Horizontal Scroll) --- */}
            <div className="lg:hidden sticky top-[100px] z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex items-center px-4 h-14 min-w-max gap-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`text-sm font-semibold whitespace-nowrap px-3 py-1.5 rounded-full transition-all
                                ${activeSection === item.id
                                    ? "bg-[#7B0046] text-white shadow-md"
                                    : "text-zinc-500 hover:text-[#7B0046] hover:bg-rose-50"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* --- DESKTOP SIDEBAR (Col 3) --- */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-44 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
                                <div className="bg-[#7B0046] px-6 py-5">
                                    <h3 className="text-white font-bold text-lg tracking-wide">Quick Links</h3>
                                </div>
                                <nav className="flex flex-col p-2">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-xl transition-all mb-1
                                                ${activeSection === item.id
                                                    ? "bg-rose-50 text-[#7B0046] translate-x-1 font-bold"
                                                    : "text-zinc-600 hover:bg-zinc-50 hover:pl-6"
                                                }`}
                                        >
                                            <span className={`${activeSection === item.id ? "text-[#7B0046]" : "text-zinc-400"}`}>
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Contact Widget */}
                            <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[#7B0046] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                <div className="relative z-10 space-y-4">
                                    <h4 className="font-bold text-lg">Admissions Open</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Join our vibrant community for the upcoming academic year.</p>
                                    <Link href="/admissions" className="inline-block w-full text-center px-4 py-3 bg-white text-zinc-900 text-sm font-bold rounded-lg hover:bg-rose-50 transition-all transform hover:scale-105">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CONTENT AREA (Col 9) --- */}
                    <div className="lg:col-span-9 space-y-16">

                        {/* 1. HISTORY SECTION */}
                        <section id="history" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#7B0046]"></div>
                                    <div className="mb-6">
                                        <h2 className="text-2xl md:text-3xl font-bold text-[#7B0046] mb-2">History</h2>
                                        <div className="h-1 w-20 bg-rose-100 rounded-full"></div>
                                    </div>
                                    <div className="prose prose-lg text-zinc-600 max-w-none text-justify space-y-4">
                                        <p className="indent-8 first-letter:text-3xl first-letter:font-bold first-letter:text-[#7B0046] first-letter:mr-1">
                                            Responding to the call and understanding of the formidable challenges that may have to be faced in the future, visionaries and social engineers shared the idea of establishing an educational cluster to facilitate the upliftment of the minority community.
                                        </p>
                                        <p>
                                            In pursuance of this, CM College of Arts and Science was established with a vision to create leaders in different fields and promote higher education in emerging areas of arts, science, and humanities. The institution was founded on the principles of academic discipline and spiritual growth, serving as a cornerstone for students pursuing their +1 and +2 education since 2010.
                                        </p>
                                        <p>
                                            Over the years, the college has grown into a premier institution in Wayanad, providing an integrated environment where the curriculum is meticulously designed to meet modern educational standards while remaining deeply rooted in moral values.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* 2. ABOUT COLLEGE SECTION */}
                        <section id="about-college" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#7B0046]"></div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl md:text-3xl font-bold text-[#7B0046] mb-2">About College</h2>
                                        <div className="h-1 w-20 bg-rose-100 rounded-full"></div>
                                    </div>

                                    <div className="relative h-[250px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-md mb-8 group">
                                        <Image
                                            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2572&auto=format&fit=crop"
                                            alt="College Campus View"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                    </div>

                                    <div className="prose prose-lg text-zinc-600 max-w-none text-justify space-y-4">
                                        <p>
                                            CM College of Arts and Science offers a unique blend of modern education and traditional values. Located in the serene landscape of Nadavayal, Wayanad, our campus provides an ideal atmosphere for academic pursuits. The institution is affiliated with the state education board and offers specialized coaching for competitive exams like NEET, JEE, and KEAM.
                                        </p>
                                        <p>
                                            Our approach goes beyond traditional teaching; we focus on the holistic development of every student. We have state-of-the-art laboratories, a well-stocked library, and smart classrooms that enhance the learning experience. The campus culture is vibrant, inclusive, and discipline-oriented.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* 3. VISION & MISSION SECTION */}
                        <section id="vision-mission" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Vision Card */}
                                    <div className="group bg-white p-8 rounded-2xl border-l-4 border-l-[#7B0046] shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-[#7B0046] mb-6 group-hover:bg-[#7B0046] group-hover:text-white transition-colors">
                                            <Lightbulb size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 mb-4">Our Vision</h3>
                                        <p className="text-zinc-600 leading-relaxed">
                                            "To be a center of excellence in higher education, fostering intellectual growth, ethical values, and social responsibility, thereby creating enlightened individuals capable of contributing positively to society."
                                        </p>
                                    </div>

                                    {/* Mission Card */}
                                    <div className="group bg-white p-8 rounded-2xl border-l-4 border-l-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-800 mb-6 group-hover:bg-zinc-800 group-hover:text-white transition-colors">
                                            <Award size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 mb-4">Our Mission</h3>
                                        <ul className="space-y-3 text-zinc-600">
                                            <li className="flex items-start gap-3">
                                                <div className="min-w-[6px] h-1.5 mt-2 rounded-full bg-[#7B0046]" />
                                                <span className="text-sm">Provide accessible, high-quality education.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="min-w-[6px] h-1.5 mt-2 rounded-full bg-[#7B0046]" />
                                                <span className="text-sm">Inculcate moral and ethical values alongside academics.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="min-w-[6px] h-1.5 mt-2 rounded-full bg-[#7B0046]" />
                                                <span className="text-sm">Foster innovation and critical thinking.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* 4. PRINCIPAL'S MESSAGE SECTION */}
                        <section id="principal-message" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="bg-gradient-to-br from-[#7B0046] to-[#50002d] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-12 opacity-10">
                                        <Quote size={200} />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center relative z-10">
                                        <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-full border-4 border-white/20 shadow-2xl overflow-hidden">
                                            <Image
                                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                                                alt="Dr. Abdul Rahman"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="text-center md:text-left space-y-6">
                                            <div>
                                                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-1">Principal's Message</h2>
                                                <p className="text-rose-200 font-medium">Leading with Vision & Values</p>
                                            </div>
                                            <p className="text-rose-50/90 leading-relaxed text-lg italic">
                                                "Education is not merely the acquisition of knowledge; it is the shaping of character and the refinement of the soul. At CM College, we strive to provide an environment where students can discover their potential and develop into responsible citizens."
                                            </p>
                                            <div>
                                                <p className="font-bold text-xl">Dr. Abdul Rahman</p>
                                                <p className="text-rose-200 text-sm">Principal, CM College</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                    </div>
                </div>
            </div>

        </main>
    );
}
