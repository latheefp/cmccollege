"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calendarData, CalendarEvent, MonthData, EventType } from "@/data/academic-calendar";
import { Download, Printer, ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Clock, MapPin, Info } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils"; // Assuming you have a utils file, if not I'll define a helper or remove.
// If cn is not available, I will just use template strings.

// --- Helper Functions ---
const getMonthIndex = (monthName: string) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(monthName);
};

const getDaysInMonth = (year: number, monthIndex: number) => {
    return new Date(year, monthIndex + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, monthIndex: number) => {
    return new Date(year, monthIndex, 1).getDay(); // 0 = Sunday
};

// --- Components ---

const EventTypeBadge = ({ type, className }: { type?: EventType; className?: string }) => {
    if (!type) return null;

    const styles: Record<string, string> = {
        university: "bg-red-100 text-red-800 border-red-200",
        internal: "bg-blue-100 text-blue-800 border-blue-200",
        registration: "bg-purple-100 text-purple-800 border-purple-200",
        deadline: "bg-orange-100 text-orange-800 border-orange-200",
        holiday: "bg-pink-100 text-pink-800 border-pink-200",
        milestone: "bg-emerald-100 text-emerald-900 border-emerald-200",
        general: "bg-zinc-100 text-zinc-800 border-zinc-200",
    };

    const labels: Record<string, string> = {
        university: "University Exam",
        internal: "Internal Exam",
        registration: "Registration",
        deadline: "Deadline",
        holiday: "Holiday",
        milestone: "Milestone",
        general: "General",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type] || styles.general} ${className}`}>
            {labels[type] || type}
        </span>
    );
};

const EventModal = ({ events, onClose }: { events: CalendarEvent[] | null; onClose: () => void }) => {
    if (!events || events.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[85vh] flex flex-col"
                >
                    <div className="relative h-32 bg-gradient-to-br from-emerald-900 to-emerald-800 p-6 flex items-end shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div>
                            <div className="flex -space-x-2 mb-2 overflow-hidden">
                                {events.map((e, i) => (
                                    <EventTypeBadge key={i} type={e.type} className={`bg-white/90 border-transparent shadow-sm ring-2 ring-emerald-800`} />
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-white leading-tight">{events[0].date}</h3>
                            {events.length > 1 && (
                                <p className="text-emerald-200 text-sm font-medium mt-1">{events.length} Events</p>
                            )}
                        </div>
                    </div>

                    <div className="p-6 space-y-6 overflow-y-auto">
                        {events.map((event, index) => (
                            <div key={index} className={`relative ${index !== 0 ? 'pt-6 border-t border-zinc-100' : ''}`}>
                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-700 shrink-0">
                                        <Info size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <EventTypeBadge type={event.type} />
                                        </div>
                                        <h4 className="font-semibold text-zinc-900 text-lg mb-1 leading-snug">{event.description}</h4>
                                    </div>
                                </div>

                                {event.endDate && (
                                    <div className="flex items-center gap-3 text-sm text-zinc-500 bg-zinc-50 p-3 rounded-lg border border-zinc-100 mt-3 ml-14">
                                        <Clock size={16} />
                                        <span>Ends on <span className="font-semibold text-zinc-900">{event.endDate}</span></span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end shrink-0">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 bg-white border border-zinc-200 text-zinc-700 font-medium rounded-xl hover:bg-zinc-100 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default function AcademicCalendarPage() {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // Index in calendarData array
    const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[] | null>(null);

    const activeMonthData = calendarData[currentMonthIndex];
    if (!activeMonthData) return null;

    const monthIndex = getMonthIndex(activeMonthData.month);
    const year = parseInt(activeMonthData.year);

    const daysInMonth = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blankDays = Array.from({ length: firstDay }, (_, i) => i);

    const handlePrint = () => window.print();

    // Scroll to active month tab logic could go here if needed

    return (
        <div className="min-h-screen bg-zinc-50 font-sans print:bg-white pt-[100px] lg:pt-[110px]">
            {/* Print Styles */}

            <EventModal events={selectedEvents} onClose={() => setSelectedEvents(null)} />

            {/* Header Section */}
            <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 px-6 overflow-hidden print:hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold tracking-tight mb-2"
                        >
                            Academic Calendar
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-emerald-200/80 text-lg md:text-xl font-medium"
                        >
                            2025–2026 Academic Year
                        </motion.p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-xl text-white transition-all text-sm font-medium">
                            <Printer size={16} />
                            <span>Print</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-900/20 rounded-xl transition-all text-sm font-bold">
                            <Download size={16} />
                            <span>Download PDF</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Month Navigation (Sticky) */}
            <div className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200 no-print">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto scroller-none">
                    <div className="flex items-center gap-2 py-4 min-w-max">
                        {calendarData.map((data, idx) => (
                            <button
                                key={`${data.month}-${data.year}`}
                                onClick={() => setCurrentMonthIndex(idx)}
                                className={`
                                    px-5 py-2 rounded-full text-sm font-bold transition-all
                                    ${currentMonthIndex === idx
                                        ? "bg-emerald-900 text-white shadow-md scale-105"
                                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"}
                                `}
                            >
                                {data.month} <span className={`text-xs ml-1 ${currentMonthIndex === idx ? "text-emerald-200" : "text-zinc-400"}`}>{data.year}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12 print-full">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 items-start">

                    {/* Calendar Grid */}
                    <motion.div
                        key={activeMonthData.month}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden print-break"
                    >
                        <div className="p-8 border-b border-zinc-200 flex justify-between items-baseline">
                            <h2 className="text-3xl font-bold text-zinc-900">{activeMonthData.month}</h2>
                            <span className="text-zinc-400 text-xl font-medium">{activeMonthData.year}</span>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-7 border-b border-zinc-100 bg-zinc-50/50">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="py-3 text-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 auto-rows-[1fr]">
                            {blankDays.map((day) => (
                                <div key={`blank-${day}`} className="min-h-[100px] bg-zinc-50/30 border-b border-r border-zinc-100/50" />
                            ))}

                            {daysArray.map((day) => {
                                const dateStr = `${day.toString().padStart(2, '0')}/${(monthIndex + 1).toString().padStart(2, '0')}/${year}`;
                                const dayEvents = activeMonthData.events.filter(e => e.date === dateStr || (e.endDate && e.date <= dateStr && e.endDate >= dateStr)); // Simple range check logic (simplified for string dates)

                                // Better Range check:
                                const activeEvents = activeMonthData.events.filter(e => {
                                    // Exact match
                                    if (e.date === dateStr) return true;
                                    // Range match (Using simple string comparison for DD/MM/YYYY is risky without parsing, but let's try strict exact match for start date on calendar visual for simplicity first, 
                                    // or properly parse dates. Given the prompt constraints, we'll parse.)

                                    // Quick parse for range detection visual
                                    if (e.endDate) {
                                        const parse = (s: string) => {
                                            const [d, m, y] = s.split('/').map(Number);
                                            return new Date(y, m - 1, d).getTime();
                                        };
                                        const current = parse(dateStr);
                                        const start = parse(e.date);
                                        const end = parse(e.endDate);
                                        return current >= start && current <= end;
                                    }
                                    return false;
                                });

                                const isToday = false; // TODO: Real today check
                                const hasEvents = activeEvents.length > 0;

                                return (
                                    <div
                                        key={day}
                                        onClick={() => hasEvents && setSelectedEvents(activeEvents)}
                                        className={`
                                            min-h-[100px] p-2 border-b border-r border-zinc-100 relative group transition-colors
                                            ${hasEvents ? "cursor-pointer hover:bg-emerald-50/30" : ""}
                                            ${day % 7 === 0 || (day + firstDay) % 7 === 1 ? "bg-zinc-50/20" : ""} 
                                        `}
                                    >
                                        <span className={`
                                            text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                                            ${isToday ? "bg-emerald-600 text-white" : "text-zinc-700"}
                                        `}>
                                            {day}
                                        </span>

                                        <div className="mt-2 space-y-1">
                                            {activeEvents.slice(0, 3).map((event, i) => (
                                                <div
                                                    key={i}
                                                    className={`
                                                        text-[10px] px-1.5 py-0.5 rounded truncate font-medium
                                                        ${event.type === 'university' ? 'bg-red-100 text-red-700' :
                                                            event.type === 'internal' ? 'bg-blue-100 text-blue-700' :
                                                                event.type === 'holiday' ? 'bg-rose-100 text-rose-700' :
                                                                    'bg-emerald-100 text-emerald-800'}
                                                    `}
                                                >
                                                    {event.description}
                                                </div>
                                            ))}
                                            {activeEvents.length > 3 && (
                                                <div className="text-[10px] text-zinc-400 pl-1">+ {activeEvents.length - 3} more</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Side Panel: Month Events List */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
                            <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                <CalendarIcon className="text-emerald-600" size={20} />
                                <span>Events in {activeMonthData.month}</span>
                            </h3>

                            <div className="space-y-4">
                                {activeMonthData.events.length === 0 ? (
                                    <p className="text-zinc-400 text-center py-8">No scheduled events.</p>
                                ) : (
                                    activeMonthData.events.map((event, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => setSelectedEvents([event])}
                                            className="group cursor-pointer p-4 rounded-2xl border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all bg-zinc-50/50"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-zinc-900">{event.date}</span>
                                                    {event.endDate && <span className="text-xs text-zinc-500">to {event.endDate}</span>}
                                                </div>
                                                <div className={`w-2 h-2 rounded-full mt-1.5
                                                    ${event.type === 'university' ? 'bg-red-500' :
                                                        event.type === 'internal' ? 'bg-blue-500' :
                                                            event.type === 'holiday' ? 'bg-pink-500' :
                                                                'bg-emerald-500'}
                                                `} />
                                            </div>
                                            <p className="text-sm text-zinc-600 font-medium leading-snug group-hover:text-emerald-900 transition-colors">
                                                {event.description}
                                            </p>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Legend</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "University Exam", color: "bg-red-100 text-red-800" },
                                    { label: "Internal Exam", color: "bg-blue-100 text-blue-800" },
                                    { label: "Holiday", color: "bg-pink-100 text-pink-800" },
                                    { label: "Milestone", color: "bg-emerald-100 text-emerald-900" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className={`w-3 h-3 rounded-full ${item.color.split(' ')[0].replace('bg-', 'bg-').replace('100', '500')}`} />
                                        <span className="text-sm text-zinc-600 font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
