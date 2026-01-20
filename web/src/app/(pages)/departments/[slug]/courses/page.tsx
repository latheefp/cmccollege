"use client";

import { GraduationCap, TrendingUp, CheckCircle2, ChevronDown } from "lucide-react";
import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function CoursesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];

    return (
        <div className="space-y-8">
            <div className="border-b border-zinc-100 pb-8">
                <h2 className="text-3xl font-bold font-serif text-[#5D1035] mb-4">Courses Offered</h2>
                <p className="text-xl text-zinc-600 leading-relaxed font-light">
                    Comprehensive academic programs selected for rigorous professional development.
                </p>
            </div>

            <ScrollReveal>
                <div className="space-y-8">
                    {/* Courses */}
                    <div className="bg-[#5D1035] p-8 rounded-[2rem] text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-6 font-serif flex items-center gap-2">
                                <GraduationCap className="w-6 h-6" /> Our Programs
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
                    <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 font-serif text-[#5D1035] flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" /> Key Highlights
                        </h3>
                        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2">
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
        </div>
    );
}
