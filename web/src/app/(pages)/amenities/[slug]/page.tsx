"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { AMENITIES_DATA } from "@/data/amenities";
import AmenitiesSidebar from "@/components/AmenitiesSidebar";

export default function AmenityDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = AMENITIES_DATA[slug];

    if (!data) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 pt-[112px]">
            {/* Header / Hero */}
            <section className="relative py-20 px-6 bg-[#5D1035] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <Link href="/amenities" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Amenities
                    </Link>
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-serif">
                            {data.title}
                        </h1>
                    </ScrollReveal>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Sidebar */}
                    <AmenitiesSidebar />

                    {/* Main Content */}
                    <div className="flex-1 w-full min-w-0 space-y-12">
                        {/* Images */}
                        <div className="space-y-8">
                            <ScrollReveal>
                                <div className="relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100">
                                    <Image
                                        src={data.image}
                                        alt={data.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </ScrollReveal>

                            {data.gallery && (
                                <div className="grid grid-cols-2 gap-4">
                                    {data.gallery.slice(0, 2).map((img, i) => (
                                        <ScrollReveal key={i} delay={100 + (i * 100)} className="relative h-40 rounded-xl overflow-hidden shadow-md">
                                            <Image
                                                src={img}
                                                alt={`${data.title} gallery ${i}`}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-500"
                                            />
                                        </ScrollReveal>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <ScrollReveal delay={200}>
                            <h2 className="text-3xl font-bold text-[#5D1035] mb-6 font-serif">Overview</h2>
                            <p className="text-xl text-zinc-600 leading-relaxed mb-10 text-justify">
                                {data.description}
                            </p>

                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100/50">
                                        <div className="w-6 h-6 rounded-full bg-[#5D1035]/10 flex items-center justify-center text-[#5D1035] mt-0.5 shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-zinc-700 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {data.busSchedules && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                                    {data.busSchedules.map((schedule, sIdx) => (
                                        <div key={sIdx}>
                                            <h3 className="text-2xl font-bold text-zinc-800 mb-8 font-serif">{schedule.busName} Schedule</h3>
                                            <div className="relative">
                                                {/* Vertical Guide Line */}
                                                <div className="absolute left-[6.5rem] top-2 bottom-2 w-0.5 bg-[#5D1035]/20 hidden md:block" />

                                                <div className="space-y-8">
                                                    {schedule.stops.map((item, idx) => (
                                                        <div key={idx} className="flex flex-col md:flex-row gap-6 relative group">
                                                            {/* Time (Left) */}
                                                            <div className="w-full md:w-24 shrink-0 md:text-right pt-0.5">
                                                                <span className="text-xl font-bold text-[#5D1035]">{item.time}</span>
                                                            </div>

                                                            {/* Dot (Center) */}
                                                            <div className="hidden md:flex flex-col items-center">
                                                                <div className="w-4 h-4 rounded-full border-[3px] border-[#5D1035] bg-white z-10 group-hover:scale-125 transition-transform duration-300" />
                                                            </div>

                                                            {/* Details (Right) */}
                                                            <div className="flex-1 pb-2">
                                                                <h4 className="text-lg font-bold text-zinc-800 mb-1">{item.route}</h4>
                                                                {item.driver && (
                                                                    <p className="text-sm text-zinc-500 font-medium uppercase tracking-wide">
                                                                        DRIVER: {item.driver}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Other Amenities Navigation */}
            <section className="bg-zinc-50 py-16 px-6 border-t border-zinc-100">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-bold text-zinc-800 mb-8 font-serif">Explore Other Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(AMENITIES_DATA)
                            .filter(([key]) => key !== slug)
                            .slice(0, 4)
                            .map(([key, item]) => (
                                <Link key={key} href={`/amenities/${key}`} className="group bg-white p-5 rounded-xl border border-zinc-200 hover:border-[#5D1035] transition-all shadow-sm hover:shadow-md">
                                    <h4 className="font-bold text-zinc-800 group-hover:text-[#5D1035] mb-2">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium group-hover:translate-x-1 transition-transform">
                                        View Details <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
