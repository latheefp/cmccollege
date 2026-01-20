"use client";

import { motion } from "framer-motion";
import { calendarData, CalendarEvent, MonthData } from "@/data/academic-calendar";
import { Download, Printer } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const EventTypeBadge = ({ type }: { type?: CalendarEvent["type"] }) => {
    if (!type || type === "general") return null;

    const styles: Record<string, string> = {
        university: "bg-emerald-800 text-white",
        internal: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        registration: "bg-blue-50 text-blue-800 border border-blue-100",
        deadline: "bg-orange-50 text-orange-800 border border-orange-100",
        holiday: "bg-red-50 text-red-800 border border-red-100",
        milestone: "bg-emerald-50 text-emerald-900 border border-emerald-100 px-3 py-1 font-bold",
    };

    const labels: Record<string, string> = {
        university: "University Exam",
        internal: "Internal Exam",
        registration: "Registration",
        deadline: "Deadline",
        holiday: "Holiday",
        milestone: "Milestone",
    };

    return (
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full whitespace-nowrap ${styles[type] || "bg-gray-100 text-gray-600"}`}>
            {labels[type] || type}
        </span>
    );
};

export default function AcademicCalendarPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans print:bg-white pt-[100px] lg:pt-[110px]">


            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white py-20 px-6 overflow-hidden print:hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Academic Calendar 2025–2026</h1>
                        <p className="text-lg md:text-xl text-emerald-100 opacity-90 max-w-2xl mx-auto leading-relaxed">
                            Key Academic Milestones, Examinations, and Semester Schedules
                        </p>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-1 bg-emerald-400 mx-auto mt-6 rounded-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Utility Bar */}
            <div className="max-w-5xl mx-auto px-6 py-8 flex justify-end gap-4 no-print">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-emerald-100 rounded-xl text-emerald-900 hover:bg-emerald-50 hover:border-emerald-200 transition-all font-medium text-sm shadow-sm hover:shadow-md cursor-pointer"
                >
                    <Printer size={16} />
                    <span>Print Calendar</span>
                </button>
                <button
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-900 text-white rounded-xl hover:bg-emerald-800 transition-all font-medium text-sm shadow-md hover:shadow-lg cursor-pointer"
                >
                    <Download size={16} />
                    <span>Download PDF</span>
                </button>
            </div>

            {/* Calendar Grid */}
            <main className="max-w-5xl mx-auto px-4 md:px-6 pb-24 print-full">
                <div className="space-y-8 md:space-y-12">
                    {calendarData.map((monthData: MonthData, index) => (
                        <ScrollReveal
                            key={`${monthData.month}-${monthData.year}`}
                            delay={index * 50}
                            className="bg-white rounded-2xl shadow-sm border border-emerald-50/50 hover:shadow-md transition-shadow duration-300 print-break overflow-hidden"
                        >
                            {/* Month Header */}
                            <div className="flex border-b border-emerald-50/50">
                                <div className="w-2 bg-emerald-800 shrink-0" /> {/* Accent Bar */}
                                <div className="px-6 py-5 bg-emerald-50/10 w-full flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-emerald-900 uppercase tracking-widest">
                                        {monthData.month} <span className="text-emerald-900/40 text-lg font-light ml-1">{monthData.year}</span>
                                    </h2>
                                    <span className="text-xs font-semibold text-emerald-900/30 border border-emerald-100 px-2 py-1 rounded bg-white hidden sm:block">
                                        {monthData.events.length} Events
                                    </span>
                                </div>
                            </div>

                            {/* Events List */}
                            <div className="divide-y divide-emerald-50">
                                {monthData.events.map((event: CalendarEvent, idx) => (
                                    <div
                                        key={idx}
                                        className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 p-5 hover:bg-emerald-50/20 transition-colors"
                                    >
                                        <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-3">
                                            <div className="font-mono text-emerald-700 font-bold text-sm md:text-base flex items-center gap-2 bg-emerald-50/50 px-3 py-1.5 rounded-lg border border-emerald-100/50 group-hover:bg-emerald-100/50 transition-colors">
                                                <span>{event.date}</span>
                                                {event.endDate && (
                                                    <>
                                                        <span className="text-emerald-300 mx-1">→</span>
                                                        <span>{event.endDate}</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="md:hidden">
                                                <EventTypeBadge type={event.type} />
                                            </div>
                                        </div>

                                        <div className="flex items-start justify-between gap-4">
                                            <p className="text-zinc-700 leading-relaxed font-medium group-hover:text-emerald-950 transition-colors">
                                                {event.description}
                                            </p>
                                            <div className="hidden md:block shrink-0">
                                                <EventTypeBadge type={event.type} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </main>
        </div>
    );
}
