"use client";

import { Target, Lightbulb, CheckCircle2 } from "lucide-react";
import { use } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { DEPARTMENT_DATA } from "@/data/departments";

export default function VisionMissionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b border-zinc-100 pb-8">
                <h2 className="text-3xl font-bold font-serif text-[#5D1035] mb-4">Vision & Mission</h2>
                <p className="text-xl text-zinc-600 leading-relaxed font-light">
                    Guiding principles and objectives that shape our academic journey.
                </p>
            </div>

            {/* Vision & Objectives Grid */}
            <div className="grid grid-cols-1 gap-8">
                <ScrollReveal>
                    <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100/50">
                        <h3 className="text-xl font-bold mb-3 font-serif text-emerald-900 flex items-center gap-2">
                            <Target className="w-5 h-5" /> Vision
                        </h3>
                        <p className="text-zinc-700 italic font-medium leading-relaxed">
                            &quot;{data.vision}&quot;
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div>
                        <h3 className="text-xl font-bold mb-3 font-serif text-[#5D1035] flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" /> Objectives
                        </h3>
                        <p className="text-zinc-600 leading-relaxed text-justify">
                            {data.objectives}
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* Mission Section */}
            <ScrollReveal delay={200}>
                <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-200/40">
                    <h3 className="text-2xl font-bold mb-6 font-serif text-[#5D1035] flex items-center gap-3">
                        <Target className="w-6 h-6" /> Mission
                    </h3>
                    <ul className="space-y-4">
                        {data.mission.map((item, idx) => (
                            <li key={idx} className="flex gap-4 items-start group">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-[#5D1035]/10 flex items-center justify-center text-[#5D1035] mt-1 group-hover:bg-[#5D1035] group-hover:text-white transition-colors">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <p className="text-zinc-700 leading-relaxed">{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </ScrollReveal>
        </div>
    );
}
