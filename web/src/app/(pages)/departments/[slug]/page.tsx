"use client";

import Image from "next/image";
import { BookOpen, Target } from "lucide-react";
import { use } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { DEPARTMENT_DATA } from "@/data/departments";

export default function DepartmentAboutPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            {/* Center Column - Content & Message */}
            <div className="lg:col-span-2 space-y-12">
                <ScrollReveal>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-[#5D1035] mb-2">
                            <span className="p-2 bg-[#5D1035]/5 rounded-lg">
                                <BookOpen className="w-6 h-6" />
                            </span>
                            <h2 className="text-2xl font-bold font-serif tracking-tight">About the Department</h2>
                        </div>
                        <p className="text-zinc-600 leading-relaxed text-lg font-light text-left">
                            {data.about}
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div className="bg-[#5D1035]/5 rounded-2xl p-8 md:p-10 border border-[#5D1035]/10 relative overflow-hidden group hover:border-[#5D1035]/20 transition-colors duration-500">
                        {/* Watermark Icon */}
                        <div className="absolute -right-4 -bottom-4 text-[#5D1035]/5 group-hover:text-[#5D1035]/10 group-hover:scale-110 transition-all duration-700">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                            </svg>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px bg-[#5D1035]/20 flex-1" />
                                <span className="text-[#5D1035] text-xs font-bold uppercase tracking-widest bg-[#5D1035]/10 px-3 py-1 rounded-full">
                                    Message from HOD
                                </span>
                                <div className="h-px bg-[#5D1035]/20 flex-1" />
                            </div>
                            <blockquote className="text-xl md:text-2xl font-serif text-[#5D1035] leading-relaxed italic text-center">
                                &quot;{data.hod.quote}&quot;
                            </blockquote>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Right Column - HOD Card (Elevated) */}
            <div className="lg:col-span-1 sticky top-32 max-w-sm md:max-w-none mx-auto md:mx-0 w-full lg:w-auto">
                <ScrollReveal delay={200}>
                    <div className="group relative">
                        {/* Card Backdrop/Decoration */}
                        <div className="absolute inset-x-4 top-4 bottom-0 bg-zinc-900/5 rounded-[2.5rem] blur-xl transform translate-y-4 group-hover:translate-y-6 transition-transform duration-500" />

                        <div className="relative bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50">
                                <Image
                                    src={data.hod.img}
                                    alt={data.hod.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#5D1035]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                {/* Badge on Image */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md text-[#5D1035] text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg border border-white/50">
                                        <Target className="w-3 h-3" />
                                        Head of Dept
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 text-center bg-white relative">
                                <div className="mb-2">
                                    <h3 className="text-2xl font-bold text-zinc-900 font-serif leading-tight group-hover:text-[#5D1035] transition-colors duration-300">
                                        {data.hod.name}
                                    </h3>
                                </div>
                                <div className="inline-block relative">
                                    <p className="text-zinc-500 font-medium text-sm tracking-wide">
                                        {data.hod.qualification}
                                    </p>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#5D1035]/20 rounded-full group-hover:w-full transition-all duration-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
