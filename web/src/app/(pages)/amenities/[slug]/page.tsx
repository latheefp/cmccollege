"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, ArrowRight, Bus, MapPin, Play, Flag, Timer, Users, Bed, Cpu, Layers, AlertCircle, ChevronDown, ChevronUp, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { AMENITIES_DATA } from "@/data/amenities";
import AmenitiesSidebar from "@/components/AmenitiesSidebar";

export default function AmenityDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = AMENITIES_DATA[slug];
    const [activeHostelTab, setActiveHostelTab] = useState<'boys' | 'girls'>('boys');
    const [activeBusTab, setActiveBusTab] = useState<'morning' | 'evening'>('morning');
    const [expandedRoutes, setExpandedRoutes] = useState<number[]>([]);

    const toggleRoute = (index: number) => {
        setExpandedRoutes(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    if (!data) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-zinc-900 pt-[112px]">
            {/* Header / Hero */}
            <section className="relative py-20 px-6 bg-gradient-to-br from-[#5D1035] via-[#4a0d2a] to-[#2a0616] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-6">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-3 text-sm font-medium text-white/60">
                            <Link href="/amenities" className="hover:text-white transition-colors flex items-center gap-1 group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Amenities
                            </Link>
                            <span className="opacity-50">/</span>
                            <span className="text-white">{data.title}</span>
                        </div>

                        <ScrollReveal>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight font-serif text-white mb-2 leading-tight">
                                {data.heading || data.title}
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
                                {data.description.split('.')[0]}.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    {/* Sidebar - Sticky Wrapper */}
                    <div className="hidden lg:block w-80 shrink-0 sticky top-32 self-start">
                        <AmenitiesSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full min-w-0 space-y-16">

                        {/* Featured Image & Gallery */}
                        <div className="space-y-6">
                            <ScrollReveal className="relative h-[300px] md:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-[#5D1035]/10 group">
                                <Image
                                    src={data.image}
                                    alt={data.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                            </ScrollReveal>

                            {data.gallery && data.gallery.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {data.gallery.map((img, i) => (
                                        <ScrollReveal key={i} delay={100 + (i * 100)} className="group relative h-24 sm:h-32 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all">
                                            <Image
                                                src={img}
                                                alt={`${data.title} gallery ${i}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Overview & Features */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                            <ScrollReveal>
                                <h2 className="text-3xl font-bold text-[#5D1035] mb-6 font-serif flex items-center gap-3">
                                    <span className="w-8 h-1 bg-[#5D1035] rounded-full"></span>
                                    Overview
                                </h2>
                                <p className="text-lg text-zinc-600 leading-relaxed text-left text-justify">
                                    {data.description}
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={200} className="bg-white p-8 rounded-3xl shadow-xl shadow-zinc-100 border border-zinc-100/50">
                                <h3 className="text-xl font-bold text-zinc-900 mb-6 font-serif">Key Highlights</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group">
                                            <div className="w-8 h-8 rounded-full bg-[#5D1035]/5 flex items-center justify-center text-[#5D1035] mt-1 shrink-0 group-hover:bg-[#5D1035] group-hover:text-white transition-all duration-300">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-zinc-700 font-medium text-sm leading-relaxed pt-1.5 border-b border-transparent group-hover:border-zinc-200 transition-colors pb-1">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollReveal>
                        </div>

                        {/* Librarian Section */}
                        {data.librarian && (
                            <ScrollReveal delay={300} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-zinc-100 border border-zinc-100 overflow-hidden relative group hover:border-[#5D1035]/20 transition-all">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-[#5D1035]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                                    {/* Profile Image */}
                                    <div className="shrink-0 relative group-hover:scale-[1.02] transition-transform duration-500">
                                        <div className="w-48 h-56 md:w-56 md:h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-white relative z-10">
                                            <Image
                                                src={data.librarian.image}
                                                alt={data.librarian.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Decorative elements behind image */}
                                        <div className="absolute -inset-4 bg-[#5D1035]/5 rounded-2xl -z-10 rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                                        <div className="absolute -inset-4 bg-[#5D1035]/5 rounded-2xl -z-10 -rotate-3 group-hover:-rotate-6 transition-transform duration-500 delay-75"></div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 text-center md:text-left pt-2">
                                        <div className="inline-block px-3 py-1 bg-[#5D1035]/10 text-[#5D1035] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                            {data.librarian.designation}
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-zinc-900 mb-2">
                                            {data.librarian.name}
                                        </h3>
                                        {data.librarian.qualification && (
                                            <div className="text-base sm:text-lg font-medium text-zinc-500 mb-6 flex items-center justify-center md:justify-start gap-2">
                                                <span className="w-8 h-px bg-zinc-300"></span>
                                                {data.librarian.qualification}
                                                <span className="w-8 h-px bg-zinc-300 md:hidden"></span>
                                            </div>
                                        )}

                                        {data.librarian.message && (
                                            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 relative">
                                                <svg className="absolute top-6 left-6 w-8 h-8 text-[#5D1035]/10 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"></path></svg>
                                                <p className="text-zinc-600 italic leading-relaxed relative z-10 pl-4">
                                                    "{data.librarian.message}"
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {data.busSchedules && (
                            <ScrollReveal delay={300}>
                                <div className="bg-[#5D1035] rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-[#5D1035]/20">
                                    {/* Background decorative elements */}
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
                                            <div>
                                                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">Transportation Schedule</h2>
                                                <div className="flex bg-white/10 p-1 rounded-full relative w-fit mb-4">
                                                    <div
                                                        className={`absolute inset-y-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ${activeBusTab === 'evening' ? 'translate-x-[98%]' : 'translate-x-0'}`}
                                                    ></div>
                                                    <button
                                                        onClick={() => setActiveBusTab('morning')}
                                                        className={`relative z-10 px-6 py-1.5 rounded-full text-xs font-bold transition-colors text-center whitespace-nowrap ${activeBusTab === 'morning' ? 'text-[#5D1035]' : 'text-white hover:text-white/80'}`}
                                                    >
                                                        Morning
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveBusTab('evening')}
                                                        className={`relative z-10 px-6 py-1.5 rounded-full text-xs font-bold transition-colors text-center whitespace-nowrap ${activeBusTab === 'evening' ? 'text-[#5D1035]' : 'text-white hover:text-white/80'}`}
                                                    >
                                                        Evening
                                                    </button>
                                                </div>
                                                <p className="text-white/80 font-light text-lg">Daily shuttle services for {activeBusTab} commute.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {(activeBusTab === 'morning' ? data.busSchedules : data.eveningSchedules)?.map((schedule, idx) => {
                                                const isExpanded = expandedRoutes.includes(idx);
                                                const startStop = schedule.stops[0];
                                                const endStop = schedule.stops[schedule.stops.length - 1];

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`bg-white/10 backdrop-blur-md rounded-3xl border transition-all duration-300 overflow-hidden ${isExpanded ? "border-white/20 bg-white/15" : "border-white/10 hover:bg-white/15"}`}
                                                    >
                                                        {/* Card Header / Summary View */}
                                                        <div
                                                            onClick={() => toggleRoute(idx)}
                                                            className="p-6 cursor-pointer"
                                                        >
                                                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                                                {/* Bus Info */}
                                                                <div className="flex items-center gap-4 w-full md:w-auto">
                                                                    <div className="w-14 h-14 rounded-2xl bg-white text-[#5D1035] flex items-center justify-center shadow-lg shrink-0">
                                                                        <Bus className="w-7 h-7" />
                                                                    </div>
                                                                    <div className="text-left">
                                                                        <h3 className="text-xl font-bold">{schedule.busName}</h3>
                                                                        <div className="flex items-center gap-3 text-sm text-white/70">
                                                                            <span className="bg-black/20 px-2 py-0.5 rounded text-xs font-mono">ID: {101 + idx}</span>
                                                                            {schedule.stops[0].driver && (
                                                                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {schedule.stops[0].driver.split(' ')[1]}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Route Summary (Collapsed) */}
                                                                <div className="flex-1 w-full md:w-auto flex items-center justify-between md:justify-center gap-4 md:gap-12 px-4">
                                                                    <div className="text-center">
                                                                        <div className="text-xl font-bold">{startStop.time}</div>
                                                                        <div className="text-xs text-white/60 font-medium uppercase tracking-wide truncate max-w-[100px]">{startStop.route}</div>
                                                                    </div>

                                                                    <div className="flex-1 md:flex-none flex flex-col items-center px-4 relative">
                                                                        <div className="h-0.5 w-full md:w-24 bg-white/20 relative">
                                                                            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-white"></div>
                                                                            <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-white"></div>
                                                                        </div>
                                                                        <div className="text-[10px] text-white/50 mt-1">{schedule.stops.length} Stops</div>
                                                                    </div>

                                                                    <div className="text-center">
                                                                        <div className="text-xl font-bold">{endStop.time}</div>
                                                                        <div className="text-xs text-white/60 font-medium uppercase tracking-wide truncate max-w-[100px]">{endStop.route}</div>
                                                                    </div>
                                                                </div>

                                                                {/* Expand Action */}
                                                                <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isExpanded ? "bg-white text-[#5D1035] rotate-180" : "bg-transparent text-white hover:bg-white/10"}`}>
                                                                    <ChevronDown className="w-5 h-5" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Expanded Timeline View */}
                                                        <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                                            <div className="overflow-hidden">
                                                                <div className="p-6 md:p-8 pt-2 border-t border-white/10 mt-2">
                                                                    <div className="space-y-0">
                                                                        {schedule.stops.map((stop, sIdx) => {
                                                                            const isStart = sIdx === 0;
                                                                            const isEnd = sIdx === schedule.stops.length - 1;

                                                                            return (
                                                                                <div key={sIdx} className="grid grid-cols-[80px_40px_1fr] md:grid-cols-[100px_60px_1fr] items-stretch group relative">
                                                                                    {/* Time Column */}
                                                                                    <div className={`text-right py-4 pr-4 border-r border-white/10 font-mono text-sm md:text-base ${isStart || isEnd ? "text-white font-bold" : "text-white/60"}`}>
                                                                                        {stop.time}
                                                                                    </div>

                                                                                    {/* Timeline Node Column */}
                                                                                    <div className="relative flex flex-col items-center justify-center">
                                                                                        {/* Connecting Line (conditionally rendered to not stick out top/bottom) */}
                                                                                        {!isStart && (
                                                                                            <div className="absolute top-0 bottom-1/2 w-0.5 bg-white/20"></div>
                                                                                        )}
                                                                                        {!isEnd && (
                                                                                            <div className="absolute top-1/2 bottom-0 w-0.5 bg-white/20"></div>
                                                                                        )}

                                                                                        {/* Node/Icon */}
                                                                                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isStart || isEnd ? "bg-white border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)] text-[#5D1035]" : "bg-[#5D1035] border-white/40 text-transparent group-hover:bg-white group-hover:border-white"
                                                                                            }`}>
                                                                                            {isStart ? (
                                                                                                <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
                                                                                            ) : isEnd ? (
                                                                                                <MapPin className="w-3 h-3" fill="currentColor" />
                                                                                            ) : (
                                                                                                <div className="w-2 h-2 rounded-full bg-white/80" />
                                                                                            )}
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* Details Column */}
                                                                                    <div className="py-4 pl-4 flex items-center">
                                                                                        <div className={`px-4 py-2 rounded-xl transition-all w-full md:w-auto ${isStart || isEnd ? "bg-white/15 border border-white/20" : "group-hover:bg-white/5 border border-transparent"}`}>
                                                                                            <span className={`text-sm md:text-base block ${isStart || isEnd ? "font-bold text-white" : "font-medium text-white/90"}`}>
                                                                                                {stop.route}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Hostel Specific UI */}
                        {data.hostelDetails && (
                            <ScrollReveal delay={300} className="space-y-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-3xl shadow-lg border border-zinc-100">
                                    <div>
                                        <h2 className="text-2xl font-bold font-serif text-[#5D1035]">Hostel Facilities</h2>
                                        <p className="text-zinc-500 text-sm">Select wing to view details</p>
                                    </div>
                                    <div className="flex bg-zinc-100 p-1.5 rounded-full relative w-full sm:w-auto">
                                        <div
                                            className={`absolute inset-y-1.5 w-1/2 bg-[#5D1035] rounded-full shadow-sm transition-all duration-300 ${activeHostelTab === 'girls' ? 'translate-x-[98%]' : 'translate-x-0'}`}
                                        ></div>
                                        <button
                                            onClick={() => setActiveHostelTab('boys')}
                                            className={`relative z-10 flex-1 sm:flex-none px-6 sm:px-8 py-2.5 rounded-full text-sm font-bold transition-colors text-center whitespace-nowrap ${activeHostelTab === 'boys' ? 'text-white' : 'text-zinc-600 hover:text-[#5D1035]'}`}
                                        >
                                            Boys Wing
                                        </button>
                                        <button
                                            onClick={() => setActiveHostelTab('girls')}
                                            className={`relative z-10 flex-1 sm:flex-none px-6 sm:px-8 py-2.5 rounded-full text-sm font-bold transition-colors text-center whitespace-nowrap ${activeHostelTab === 'girls' ? 'text-white' : 'text-zinc-600 hover:text-[#5D1035]'}`}
                                        >
                                            Girls Wing
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Stats Cards */}
                                    <div className="bg-white p-6 rounded-3xl shadow-md border border-zinc-100 flex flex-col items-center justify-center text-center group hover:border-[#5D1035]/20 transition-all">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div className="text-3xl font-bold text-zinc-900 mb-1">
                                            {data.hostelDetails[activeHostelTab].capacity}
                                        </div>
                                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Capacity</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-3xl shadow-md border border-zinc-100 flex flex-col items-center justify-center text-center group hover:border-[#5D1035]/20 transition-all">
                                        <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Bed className="w-6 h-6" />
                                        </div>
                                        <div className="text-3xl font-bold text-zinc-900 mb-1">
                                            {data.hostelDetails[activeHostelTab].vacancies}
                                        </div>
                                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Available Spots</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-3xl shadow-md border border-zinc-100 flex flex-col items-center justify-center text-center group hover:border-[#5D1035]/20 transition-all">
                                        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div className="text-lg font-bold text-zinc-900 mb-1 truncate px-2">
                                            {data.hostelDetails[activeHostelTab].warden}
                                        </div>
                                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Warden In-Charge</div>
                                    </div>
                                </div>

                                <div className="bg-[#5D1035] rounded-3xl p-8 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                    <h3 className="text-xl font-bold font-serif mb-6 relative z-10 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        Hostel Rules & Regulations
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                        {data.hostelDetails.rules.map((rule, idx) => (
                                            <div key={idx} className="flex items-start gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></div>
                                                <span className="text-sm font-medium leading-relaxed opacity-90">{rule}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Computer Lab Specific UI */}
                        {data.labDetails && (
                            <ScrollReveal delay={300} className="space-y-12">
                                <div>
                                    <h2 className="text-3xl font-bold font-serif text-zinc-900 mb-8 flex items-center gap-3">
                                        <Cpu className="w-8 h-8 text-[#5D1035]" />
                                        System Configuration
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {data.labDetails.specs.map((spec, idx) => (
                                            <div key={idx} className="bg-white p-6 rounded-3xl shadow-xl shadow-zinc-100 border border-zinc-100 duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5D1035]/5 group">
                                                <div className="flex items-center justify-between mb-6">
                                                    <span className="bg-[#5D1035] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                        Workstation Type {idx + 1}
                                                    </span>
                                                    <Layers className="w-5 h-5 text-zinc-300 group-hover:text-[#5D1035] transition-colors" />
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 group-hover:bg-[#5D1035] group-hover:text-white transition-all">
                                                            <Cpu className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-zinc-500 font-bold uppercase">Processor</div>
                                                            <div className="font-bold text-zinc-900">{spec.cpu}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 group-hover:bg-[#5D1035] group-hover:text-white transition-all delay-75">
                                                            <Layers className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-zinc-500 font-bold uppercase">Memory</div>
                                                            <div className="font-bold text-zinc-900">{spec.ram}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 group-hover:bg-[#5D1035] group-hover:text-white transition-all delay-100">
                                                            <Users className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-zinc-500 font-bold uppercase">Graphics</div>
                                                            <div className="font-bold text-zinc-900">{spec.gpu}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold font-serif mb-8 text-center">Installed Software Suite</h3>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {data.labDetails.software.map((sw, idx) => (
                                                <div key={idx} className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all cursor-default font-medium">
                                                    {sw}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Achievements Section (Sports etc.) */}
                        {data.achievements && (
                            <ScrollReveal delay={300} className="space-y-8">
                                <h2 className="text-3xl font-bold font-serif text-[#5D1035] flex items-center gap-3">
                                    <span className="w-8 h-1 bg-[#5D1035] rounded-full"></span>
                                    Achievements & Glory
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {data.achievements.map((item, idx) => (
                                        <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-100">
                                            {/* Image */}
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute bottom-3 left-3 text-white">
                                                    <span className="bg-[#5D1035] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-1 inline-block">
                                                        {item.date}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-bold text-zinc-900 leading-tight group-hover:text-[#5D1035] transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    {/* Rank Badge */}
                                                    <div className={`shrink-0 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${item.rank.toLowerCase().includes('gold') || item.rank.toLowerCase().includes('winner')
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : item.rank.toLowerCase().includes('silver') || item.rank.toLowerCase().includes('runner')
                                                            ? 'bg-zinc-100 text-zinc-600'
                                                            : 'bg-orange-50 text-orange-600'
                                                        }`}>
                                                        {item.rank}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-zinc-500 font-medium">
                                                    {item.event}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </div>

            {/* Other Amenities Navigation (Footer Style) */}
            <section className="bg-white py-16 px-6 border-t border-zinc-100 lg:hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-zinc-900 font-serif">More to Explore</h3>
                        <Link href="/amenities" className="text-[#5D1035] font-bold text-sm hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(AMENITIES_DATA)
                            .filter(([key]) => key !== slug)
                            .slice(0, 4)
                            .map(([key, item]) => (
                                <Link key={key} href={`/amenities/${key}`} className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                                        <div className="flex items-center gap-2 text-xs font-medium text-white/80 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            View Details <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
