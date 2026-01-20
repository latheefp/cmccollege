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
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column (in this context) - About Text */}
                <div className="lg:col-span-2 space-y-8">
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

                    <ScrollReveal delay={100}>
                        <div className="bg-[#5D1035]/5 p-8 rounded-[2rem] border border-[#5D1035]/10 relative">
                            <div className="absolute top-4 left-6 text-6xl text-[#5D1035]/10 font-serif font-black select-none pointer-events-none">
                                &quot;
                            </div>
                            <h3 className="text-xl font-bold mb-4 font-serif text-[#5D1035] relative z-10">
                                Message from Head of Department
                            </h3>
                            <p className="text-zinc-700 font-medium leading-relaxed italic relative z-10 pl-2">
                                &quot;{data.hod.quote}&quot;
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Right Column - HOD Card */}
                <div className="lg:col-span-1 sticky top-32">
                    <ScrollReveal delay={200}>
                        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50">
                            <div className="relative h-80 w-full overflow-hidden group bg-zinc-200">
                                <Image
                                    src={data.hod.img}
                                    alt="HOD Portrait"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#5D1035]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="p-8 text-center relative">
                                <span className="inline-block py-1 px-4 rounded-full bg-[#5D1035]/10 text-[#5D1035] text-[10px] font-black tracking-widest uppercase mb-4">
                                    Head of Department
                                </span>
                                <h3 className="text-3xl font-bold text-zinc-900 mb-1">{data.hod.name}</h3>
                                <p className="text-[#5D1035] font-medium italic text-sm">{data.hod.qualification}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
