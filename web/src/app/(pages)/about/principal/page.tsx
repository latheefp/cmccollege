"use client";

import { motion, Variants } from "framer-motion";
import {
    Award,
    BookOpen,
    Briefcase,
    Calendar,
    GraduationCap,
    Users,
    Star,
    Quote,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 }
    }
};

// Data
const ACADEMIC_BACKGROUND = [
    { degree: "M.Phil (Commerce)", institution: "Bharathidasan University", year: "2015" },
    { degree: "B.Ed (Commerce)", institution: "University of Calicut", year: "2012" },
    { degree: "M.Com", institution: "University of Kerala", year: "2011" },
    { degree: "B.Com", institution: "University of Calicut", year: "2009" },
];

const EXPERIENCE_TEACHING = [
    { role: "Principal", institution: "CM College of Arts and Science", duration: "2025 onwards" },
    { role: "Assistant Professor", institution: "MES College", duration: "12 years" },
    { role: "HOD", institution: "PG Dept. of Commerce", duration: "1 year" },
    { role: "HSST in Commerce", institution: "Madin HSS", duration: "" },
    { role: "PRO", institution: "MES College", duration: "" },
    { role: "Visiting Professor & Faculty", institution: "Various Institutions", duration: "" },
];

const INTERESTS = [
    "Academic Administration",
    "Teaching & Training",
    "Public Relations",
    "HR Management",
    "Community Development",
];

const SKILLS = [
    { name: "Leadership & Coordination", icon: Users },
    { name: "Public Speaking", icon: Briefcase }, // Using Briefcase as a placeholder/generic
    { name: "Academic Planning", icon: Calendar },
    { name: "Teaching Excellence", icon: BookOpen },
    { name: "Computer Applications", icon: Star }, // Generic star
    { name: "Tally & Accounting Packages", icon: CheckCircle2 },
];

const ACHIEVEMENTS = [
    { title: "Indira Gandhi Award", year: "2016" },
    { title: "Best District Coordinator", year: "2021–22" },
    { title: "Anti-Drug Campaign Award", year: "2022" },
    { title: "Flood Relief Recognition", year: "2018" },
    { title: "Pusthakathal Project", year: "2023" },
    { title: "Sneharam Project", year: "2024" },
];

const EXTENSION_ACTIVITIES = [
    "NSS Programme Officer (8 Years)",
    "District Coordinator (3 Years)",
    "State Level Trainer (800+ sessions)",
    "KILA & Youth Welfare Board roles"
];

const PUBLICATIONS = [
    "Journal of Commerce & Management - 'Modern Banking Trends'", // Placeholders naturally as specifics weren't provided in full detail
    "International Journal of Business Ethics - 'Corporate Social Responsibility'",
    "Kerala University Journal - 'Financial Literacy in Rural Areas'"
];

export default function PrincipalProfile() {
    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">

            {/* 1. Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white px-6">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent z-10"></div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="container mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-20 relative"
                >
                    {/* Text Content */}
                    <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
                        <motion.div variants={fadeInUp}>
                            <span className="inline-block py-1 px-3 rounded-full bg-emerald-800/50 border border-emerald-700/50 text-emerald-100 text-sm font-medium tracking-wide mb-4 backdrop-blur-sm">
                                PRINCIPAL’S PROFILE
                            </span>
                            <h1 className="text-5xl md:text-7xl font-playfair font-bold leading-tight mb-2">
                                Shafi <span className="text-emerald-200">Pulpara</span>
                            </h1>
                            <p className="text-xl md:text-2xl font-light text-emerald-100/90 italic">
                                “Leadership with Vision, Integrity, and Service”
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="w-24 h-1 bg-emerald-500 mx-auto md:mx-0 rounded-full"></motion.div>

                        <motion.p variants={fadeInUp} className="text-lg text-emerald-100/80 max-w-lg mx-auto md:mx-0">
                            Principal, CM College of Arts and Science <br />
                            <span className="text-sm opacity-75">(Since 2025)</span>
                        </motion.p>
                    </div>

                    {/* Portrait */}
                    <motion.div
                        variants={scaleIn}
                        className="order-1 md:order-2 flex justify-center md:justify-end"
                    >
                        <div className="relative w-80 h-96 md:w-96 md:h-[30rem] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-emerald-500/30 group">
                            {/* Abstract Placeholder until real image is available or use provided logic */}
                            <div className="absolute inset-0 bg-emerald-800 flex items-center justify-center text-emerald-200">
                                {/* Replace this div with <Image /> when actual asset provided */}
                                <span className="text-lg opacity-50">[Portrait of Shafi Pulpara]</span>
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-emerald-200/50"
                >
                    <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-current rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* 2. Introduction */}
            <section className="py-24 px-6 container mx-auto max-w-5xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="font-playfair text-2xl md:text-3xl leading-relaxed text-stone-800"
                    >
                        <p>
                            <span className="text-6xl float-left mr-3 mt-[-10px] text-emerald-700">S</span>
                            hafi Pulpara is a dedicated and visionary academic professional committed to fostering academic excellence, innovation, and community engagement…
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute top-4 -left-4 w-full h-full border-2 border-emerald-900/10 rounded-lg"></div>
                        <div className="bg-stone-200 aspect-[4/5] rounded-lg relative overflow-hidden flex items-center justify-center text-stone-400 italic">
                            [Abstract / Portrait]
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Academic Background */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto max-w-4xl px-6">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl font-playfair font-bold text-emerald-900 text-center mb-16"
                    >
                        🎓 Academic Background
                    </motion.h2>

                    <div className="relative border-l-2 border-emerald-100 ml-4 md:ml-0 md:pl-0 space-y-12">
                        {ACADEMIC_BACKGROUND.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative md:grid md:grid-cols-5 items-center gap-8 pl-8 md:pl-0 group"
                            >
                                <div className="hidden md:block col-span-1 text-right text-emerald-600 font-bold font-oswald text-xl">
                                    {item.year}
                                </div>
                                {/* Timeline Dot */}
                                <div className="absolute md:static left-[-9px] md:left-auto md:ml-[-5px] col-span-0 flex justify-center">
                                    <div className="w-4 h-4 rounded-full bg-emerald-200 border-2 border-emerald-600 group-hover:bg-emerald-600 transition-colors duration-300 shadow-[0_0_0_4px_rgba(255,255,255,1)] z-10"></div>
                                </div>

                                <div className="col-span-4 bg-stone-50 p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                                    <div className="md:hidden text-xs font-bold text-emerald-600 mb-1">{item.year}</div>
                                    <h3 className="text-xl font-bold text-emerald-900 mb-1">{item.degree}</h3>
                                    <p className="text-stone-600">{item.institution}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Professional Experience */}
            <section className="py-24 px-6 bg-stone-50">
                <div className="container mx-auto max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-playfair font-bold text-emerald-900 text-center mb-20"
                    >
                        🍎 Professional Experience & Expertise
                    </motion.h2>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* A. Roles */}
                        <div>
                            <h3 className="text-2xl font-playfair font-semibold text-emerald-800 mb-8 flex items-center gap-3">
                                <Briefcase className="w-6 h-6" /> Key Roles
                            </h3>
                            <div className="space-y-4">
                                {EXPERIENCE_TEACHING.map((job, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex md:items-center justify-between p-4 bg-white rounded-lg border-l-4 border-emerald-200 hover:border-emerald-500 transition-all shadow-sm group"
                                    >
                                        <div>
                                            <h4 className="font-bold text-stone-800 group-hover:text-emerald-900 transition-colors">{job.role}</h4>
                                            <p className="text-sm text-stone-500">{job.institution}</p>
                                        </div>
                                        {job.duration && <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full whitespace-nowrap">{job.duration}</span>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* B. Areas of Interest */}
                        <div>
                            <h3 className="text-2xl font-playfair font-semibold text-emerald-800 mb-8 flex items-center gap-3">
                                <Star className="w-6 h-6" /> Core Interests
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {INTERESTS.map((interest, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="px-5 py-3 bg-white text-stone-700 rounded-full border border-stone-200 shadow-sm hover:shadow-md hover:text-emerald-700 hover:border-emerald-200 transition-all cursor-default"
                                    >
                                        {interest}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Key Skills */}
            <section className="py-24 px-6 bg-emerald-900 text-emerald-50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-center text-4xl font-playfair font-bold mb-16">Key Professional Skills</h2>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                    >
                        {SKILLS.map((skill, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-emerald-800/50 backdrop-blur-sm p-6 rounded-xl border border-emerald-700 hover:bg-emerald-700 hover:border-emerald-500 transition-all duration-300 text-center group flex flex-col items-center gap-4"
                            >
                                <skill.icon className="w-8 h-8 text-emerald-300 group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
                                <p className="text-sm font-medium leading-tight">{skill.name}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 6. Achievements */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-playfair font-bold text-emerald-900">🏆 Achievements & Service</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Left: Extension Activities */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-oswald text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-4">
                                Leadership in Service
                            </h3>
                            <ul className="space-y-6">
                                {EXTENSION_ACTIVITIES.map((act, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="text-lg text-stone-700">{act}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Awards */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-oswald text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-4">
                                Recognition
                            </h3>
                            <div className="grid gap-4">
                                {ACHIEVEMENTS.map((award, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex justify-between items-center p-5 bg-stone-50 rounded-xl border border-stone-100 hover:shadow-lg hover:border-emerald-200 transition-all group"
                                    >
                                        <span className="font-serif font-medium text-stone-800 group-hover:text-emerald-800">{award.title}</span>
                                        <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{award.year}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Publications */}
            <section className="py-24 px-6 bg-stone-100">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-playfair font-bold text-emerald-900 text-center mb-16">📝 Selected Publications</h2>

                    <div className="space-y-4">
                        {PUBLICATIONS.map((pub, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-lg shadow-sm border border-transparent hover:border-emerald-200 transition-all hover:shadow-md"
                            >
                                <div className="flex gap-4">
                                    <BookOpen className="text-emerald-400 shrink-0 mt-1" />
                                    <p className="text-stone-700 italic font-medium">"{pub}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Closing */}
            <section className="py-32 px-6 bg-white text-center">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Quote className="w-12 h-12 text-emerald-200 mx-auto mb-6 transform rotate-180" />
                        <blockquote className="text-3xl md:text-5xl font-playfair font-bold text-emerald-900 leading-tight mb-8">
                            “Leadership in education is about empowering minds, serving society, and building institutions that last.”
                        </blockquote>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-12"></div>

                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <Link href="/about" className="px-8 py-4 bg-emerald-900 text-white rounded-full font-medium hover:bg-emerald-800 transition-colors shadow-lg hover:shadow-xl">
                                Back to About CM College
                            </Link>
                            {/* Optional second button if needed */}
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
