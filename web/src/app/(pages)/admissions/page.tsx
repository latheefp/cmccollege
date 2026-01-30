"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const DEPARTMENTS = [
    { name: "Department of Computer Science", href: "/departments/computer-science", description: "B.Sc Computer Science, BCA, and more." },
    { name: "Department of Management", href: "/departments/management", description: "BBA and Management studies." },
    { name: "Department of Mass Communication", href: "/departments/mass-communication", description: "Journalism, Mass Comm, and Media studies." },
    { name: "Department of Economics", href: "/departments/economics", description: "BA Economics and related fields." },
    { name: "Department of English", href: "/departments/english", description: "BA English Language and Literature." },
    { name: "Department of Commerce", href: "/departments/commerce", description: "B.Com Finance, Co-operation, and more." },
    { name: "Department of Statistics", href: "/departments/statistics", description: "B.Sc Statistics and Data Analysis." },
    { name: "Department of Psychology", href: "/departments/psychology", description: "B.Sc Psychology and behavioral sciences." },
    { name: "Department of Multimedia", href: "/departments/multimedia", description: "Multimedia communication and design." },
];

export default function AdmissionsPage() {
    return (
        <>
            {/* --- DEPARTMENTS GRID --- */}
            <section className="mb-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-zinc-800 mb-4">Select Your Department</h2>
                    <p className="text-zinc-500 max-w-2xl">Choose from our wide array of specialized departments to view specific admission requirements and apply.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEPARTMENTS.map((dept, index) => (
                        <ScrollReveal key={dept.name} delay={index * 50}>
                            <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 flex flex-col h-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                                <div className="mb-6">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                                        <GraduationCap className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-emerald-700 transition-colors">
                                        {dept.name}
                                    </h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2">
                                        {dept.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-zinc-50">
                                    <Link
                                        href={dept.href}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* --- OTHER ADMISSIONS / ENQUIRY --- */}
            <section className="bg-white rounded-3xl p-8 border border-zinc-200 relative overflow-hidden">
                {/* Decor elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-zinc-900 mb-3 flex items-center justify-center md:justify-start gap-3">
                            <HelpCircle className="w-6 h-6 text-emerald-600" />
                            Other Admissions?
                        </h3>
                        <p className="text-zinc-600">
                            Looking for Management Quota, Sports Quota, or have other general enquiries? We are here to assist you with all other admission categories.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all hover:-translate-y-1 shadow-lg shadow-zinc-200"
                        >
                            General Enquiry
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
