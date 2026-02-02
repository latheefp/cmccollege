"use client";

import { motion } from "framer-motion";
import {
    Users,
    HeartHandshake,
    Flag,
    Trophy,
    Book,
    ShieldAlert,
    CreditCard,
    Sparkles,
    MessageSquareWarning,
    Link as LinkIcon,
    ChevronRight,
    GraduationCap
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const studentServices = [
    {
        title: "Student Support",
        desc: "Guidance, counseling, and academic help desk for all students.",
        icon: HeartHandshake,
        link: "/students-zone/support",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "NSS",
        desc: "National Service Scheme - fostering social responsibility through service.",
        icon: Flag,
        link: "/students-zone/nss",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "Students Union",
        desc: "The representative body for students, organizing events and initiatives.",
        icon: Users,
        link: "/students-zone/union",
        color: "text-[#7a0b3a]",
        bg: "bg-pink-50"
    },
    {
        title: "College Magazine",
        desc: "Annual publication showcasing the creative talents of CM College.",
        icon: Book,
        link: "/students-zone/magazine",
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        title: "Alumni",
        desc: "Connecting our past graduates with the current campus community.",
        icon: GraduationCap,
        link: "/alumni",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        title: "SC/ST Cell",
        desc: "Equal opportunity cell ensuring inclusive growth and support.",
        icon: ShieldAlert,
        link: "/students-zone/sc-st-cell",
        color: "text-rose-600",
        bg: "bg-rose-50"
    },
    {
        title: "Clubs & Forums",
        desc: "Diverse cultural, technical and literal clubs for holistic development.",
        icon: Trophy,
        link: "/students-zone/clubs",
        color: "text-cyan-600",
        bg: "bg-cyan-50"
    },
    {
        title: "Anti-Drug Cell",
        desc: "Promoting a drug-free campus through awareness and vigilance.",
        icon: ShieldAlert,
        link: "/students-zone/anti-drug-cell",
        color: "text-red-600",
        bg: "bg-red-50"
    },
    {
        title: "Pay Fees",
        desc: "Fast and secure online fee payment portal for all courses.",
        icon: CreditCard,
        link: "/students-zone/pay-fees",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "Prayukti",
        desc: "Our flagship technical and cultural fest showcase.",
        icon: Sparkles,
        link: "/students-zone/prayukti",
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        title: "Grievance Redressal",
        desc: "A formal platform to file and track your campus concerns.",
        icon: MessageSquareWarning,
        link: "/students-zone/grievance",
        color: "text-zinc-600",
        bg: "bg-zinc-100"
    }
];

export default function StudentsZonePage() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 pt-[112px]">
            {/* Hero Section */}
            <section className="relative py-24 px-6 bg-[#7a0b3a] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                            <Sparkles size={14} className="text-pink-300" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Student Life</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase">
                            Students <span className="text-pink-200/50 italic font-light">Zone</span>
                        </h1>
                        <p className="text-lg md:text-xl text-pink-100/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            A centralized hub designed to provide every resource, support system, and opportunity needed to thrive at CM College.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {studentServices.map((service, i) => (
                            <ScrollReveal key={i} delay={i * 50}>
                                <Link
                                    href={service.link}
                                    className="group h-full bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-maroon-900/5 transition-all duration-500 hover:-translate-y-1.5 flex flex-col items-start"
                                >
                                    <div className={`w-14 h-14 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                        <service.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-800 mb-3 group-hover:text-[#7a0b3a] transition-colors uppercase tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                                        {service.desc}
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 text-[#7a0b3a] text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x--2 group-hover:translate-x-0">
                                        Launch Portal
                                        <ChevronRight size={14} />
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Support Banner */}
            <section className="pb-24 px-6">
                <div className="container mx-auto">
                    <div className="bg-zinc-900 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="relative z-10 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Need Immediate Assistance?</h2>
                            <p className="text-zinc-400 text-lg md:text-xl max-w-xl font-light">
                                Our student support cell is available 24/7 for academic and personal guidance. Reach out to our dedicated counselors anytime.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
                            <Link href="/contact" className="px-8 py-4 bg-[#7a0b3a] text-white rounded-2xl font-bold hover:bg-[#60082d] transition-all text-center hover:scale-105 shadow-xl shadow-maroon-900/20">
                                Contact Helpdesk
                            </Link>
                            <Link href="/students-zone/grievance" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all text-center">
                                File a Grievance
                            </Link>
                        </div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#7a0b3a]/20 rounded-full blur-[100px]" />
                    </div>
                </div>
            </section>
        </div>
    );
}
