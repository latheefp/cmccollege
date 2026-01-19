"use client";

import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    CheckCircle2,
    Cpu,
    Users,
    Building2,
    Mail,
    Phone,
    GraduationCap,
    Lightbulb,
    Target,
    BookOpen,
    TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, use } from "react";
import ScrollReveal from "@/components/ScrollReveal";

import { DEPARTMENT_DATA } from "@/data/departments";

const CourseItem = ({ title, description }: { title: string, description: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group cursor-pointer overflow-hidden"
        >
            <div className="p-5 flex items-center justify-between gap-4">
                <h4 className="font-bold text-white flex items-center gap-3 text-lg leading-snug">
                    <CheckCircle2 className="w-5 h-5 text-white/90 shrink-0 group-hover:text-white transition-colors" />
                    {title}
                </h4>
                <ChevronDown className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="text-white/80 text-base leading-relaxed font-light px-5 pb-5 pl-[3.25rem]">
                            {description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [[page, direction], setPage] = useState([0, 0]);
    const deptName = data.displayName || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
        setCurrentSlide(Math.abs((page + newDirection) % data.gallery.length));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [page]);

    return (
        <main className="min-h-screen bg-[#FDFCFB] text-zinc-900 pt-[112px]">
            {/* --- HERO / HEADER SECTION --- */}
            <section className="relative py-16 md:py-24 px-6 lg:px-24 bg-white border-b border-zinc-100 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-zinc-400 mb-8 font-medium"
                    >
                        <Link href="/" className="hover:text-[#5D1035] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/departments" className="hover:text-[#5D1035] transition-colors">Departments</Link>
                        <span>/</span>
                        <span className="text-zinc-900">{deptName}</span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-zinc-900 mb-6 leading-tight"
                            >
                                Department of <br />
                                <span className="text-[#5D1035] italic relative inline-block">
                                    {deptName}
                                    <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#5D1035]/20 rounded-full" />
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed"
                            >
                                Empowering students through innovation, rigorous research, and total career readiness for the global landscape.
                            </motion.p>
                        </div>

                        {/* <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-[#5D1035] text-white font-bold rounded-xl shadow-xl shadow-[#5D1035]/20 hover:bg-[#4a0d2a] transition-all duration-300 self-start md:self-end group"
                        >
                            <Download className="w-5 h-5 group-hover:animate-bounce" />
                            Download Curriculum
                        </motion.button> */}
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none" />
            </section>

            {/* --- DETAILED CONTENT SECTION --- */}
            <section className="py-20 px-6 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-7 space-y-12">

                            {/* About Section */}
                            <ScrollReveal>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 font-serif text-[#5D1035] flex items-center gap-3">
                                        <BookOpen className="w-6 h-6" /> About the Department
                                    </h3>
                                    <p className="text-zinc-600 leading-relaxed text-lg font-light text-justify">
                                        {data.about}
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Vision & Objectives Grid */}
                            <div className="grid grid-cols-1 gap-8">
                                <ScrollReveal delay={100}>
                                    <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100/50">
                                        <h3 className="text-xl font-bold mb-3 font-serif text-emerald-900 flex items-center gap-2">
                                            <Target className="w-5 h-5" /> Vision
                                        </h3>
                                        <p className="text-zinc-700 italic font-medium leading-relaxed">
                                            &quot;{data.vision}&quot;
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={150}>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3 font-serif text-[#5D1035] flex items-center gap-2">
                                            <Lightbulb className="w-5 h-5" /> Objectives
                                        </h3>
                                        <p className="text-zinc-600 leading-relaxed text-justify">
                                            {data.objectives}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Mission Section */}
                            <ScrollReveal delay={200}>
                                <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-200/40">
                                    <h3 className="text-2xl font-bold mb-6 font-serif text-[#5D1035] flex items-center gap-3">
                                        <Target className="w-6 h-6" /> Mission
                                    </h3>
                                    <ul className="space-y-4">
                                        {data.mission.map((item, idx) => (
                                            <li key={idx} className="flex gap-4 items-start group">
                                                <div className="shrink-0 w-6 h-6 rounded-full bg-[#5D1035]/10 flex items-center justify-center text-[#5D1035] mt-1 group-hover:bg-[#5D1035] group-hover:text-white transition-colors">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                <p className="text-zinc-700 leading-relaxed">{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>

                            {/* Courses & Highlights */}
                            <ScrollReveal delay={250}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Courses */}
                                    <div className={`bg-[#5D1035] p-8 rounded-[2rem] text-white relative overflow-hidden ${Array.isArray(data.courses) ? "md:col-span-2" : ""}`}>
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold mb-6 font-serif flex items-center gap-2">
                                                <GraduationCap className="w-6 h-6" /> Courses Offered
                                            </h3>

                                            {Array.isArray(data.courses) ? (
                                                <div className="flex flex-col gap-4">
                                                    {data.courses.map((course, idx) => (
                                                        <CourseItem key={idx} title={course.title} description={course.description} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-white/90 leading-relaxed font-light">
                                                    {data.courses}
                                                </p>
                                            )}
                                        </div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                    </div>

                                    {/* Highlights */}
                                    <div className={`bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-lg ${Array.isArray(data.courses) ? "md:col-span-2" : ""}`}>
                                        <h3 className="text-xl font-bold mb-4 font-serif text-[#5D1035] flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5" /> Key Highlights
                                        </h3>
                                        <ul className={`grid gap-6 ${Array.isArray(data.courses) ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4" : "space-y-4"}`}>
                                            {data.highlights.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-base font-bold text-zinc-700 leading-snug">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#5D1035] shrink-0 mt-1.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Academic Strengths (Previously existed, keeping relevant parts) */}
                            {/* <ScrollReveal delay={300}>
                                <div>
                                    <h3 className="text-xl font-bold mb-6 font-serif text-zinc-900">Core Competencies</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data.strengths.map((item, idx) => (
                                            <li key={idx} className="flex gap-4 p-4 rounded-xl bg-zinc-50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-zinc-100">
                                                <div className="shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#5D1035]">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-zinc-900 text-sm">{item.text}</p>
                                                    <p className="text-xs text-zinc-500">{item.sub}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal> */}

                        </div>

                        {/* Right Column - HOD Card (Sticky) */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <ScrollReveal delay={200}>
                                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50">
                                    <div className="relative h-80 w-full overflow-hidden group">
                                        <Image
                                            src={data.hod.img} // Corrected property access
                                            alt="HOD Portrait"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#5D1035]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                    <div className="p-10 text-center relative">
                                        <span className="inline-block py-1 px-4 rounded-full bg-[#5D1035]/10 text-[#5D1035] text-[10px] font-black tracking-widest uppercase mb-4">
                                            Head of Department
                                        </span>
                                        <h3 className="text-3xl font-bold text-zinc-900 mb-1">{data.hod.name}</h3>
                                        <p className="text-[#5D1035] font-medium mb-6 italic text-sm">{data.hod.qualification}</p>

                                        <div className="relative mb-8">
                                            <span className="text-5xl text-[#5D1035]/10 font-serif absolute -top-10 left-1/2 -translate-x-1/2">&quot;</span>
                                            <p className="text-zinc-600 font-light leading-relaxed italic relative z-10">
                                                &quot;{data.hod.quote}&quot;
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FACULTY SECTION --- */}
            <section className="py-24 px-6 lg:px-24 bg-zinc-50/50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="mb-16">
                        <span className="text-[#5D1035] text-sm font-black tracking-widest uppercase mb-4 block">Mentorship</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Our Distinguished Faculty</h2>
                        <div className="w-20 h-1 bg-[#5D1035] rounded-full" />
                    </ScrollReveal>

                    <div className="flex flex-wrap justify-center gap-8">
                        {data.faculty.map((member, idx) => (
                            <ScrollReveal key={idx} delay={idx * 100}>
                                <div className="group bg-white p-8 rounded-[2rem] border border-zinc-100 hover:border-[#5D1035]/30 transition-all duration-500 text-center hover:shadow-xl hover:shadow-[#5D1035]/5">
                                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-zinc-50 group-hover:border-[#5D1035]/20 transition-all">
                                        <Image
                                            src={member.img}
                                            alt={member.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <h4 className="text-xl font-bold text-zinc-900 mb-1">{member.name}</h4>
                                    <p className="text-[#5D1035] text-xs font-bold uppercase tracking-wider mb-2">{member.role}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- LEARNING FACILITIES --- */}
            <section className="py-24 px-6 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-zinc-900">Department Gallery</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto font-light">
                            A visual journey through our specialized labs, collaborative spaces, and the vibrant academic life within the department.
                        </p>
                    </ScrollReveal>

                    <div className="relative mx-auto max-w-4xl">
                        <div className="aspect-[4/3] md:aspect-[16/9] w-full bg-white rounded-[2.5rem] p-3 md:p-4 shadow-2xl overflow-hidden relative border border-zinc-200">
                            <div className="w-full h-full relative rounded-[2rem] overflow-hidden bg-zinc-50">
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.div
                                        key={page}
                                        custom={direction}
                                        variants={{
                                            enter: (direction: number) => ({
                                                x: direction > 0 ? 1000 : -1000,
                                                opacity: 0
                                            }),
                                            center: {
                                                zIndex: 1,
                                                x: 0,
                                                opacity: 1
                                            },
                                            exit: (direction: number) => ({
                                                zIndex: 0,
                                                x: direction < 0 ? 1000 : -1000,
                                                opacity: 0
                                            })
                                        }}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 }
                                        }}
                                        className="absolute inset-0"
                                    >
                                        {/* Ambient Background Blur */}
                                        <div className="absolute inset-0 z-0">
                                            <Image
                                                src={data.gallery[currentSlide].img}
                                                alt="Background blur"
                                                fill
                                                className="object-cover blur-md scale-110 opacity-40 grayscale-[20%]"
                                                priority
                                            />
                                        </div>

                                        {/* Main Image */}
                                        <Image
                                            src={data.gallery[currentSlide].img}
                                            alt={`Gallery image ${currentSlide}`}
                                            fill
                                            className="object-contain z-10 relative transition-transform duration-700 hover:scale-105 drop-shadow-2xl"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                <div className="absolute bottom-4 right-4 flex gap-3 z-20">
                                    <button
                                        onClick={() => paginate(-1)}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 transition-all active:scale-95"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => paginate(1)}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 transition-all active:scale-95"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION (BOTTOM) --- */}
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
        </main>
    );
}
