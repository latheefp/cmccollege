"use client";

import { Star, CheckCircle2, Sparkles } from "lucide-react";
import { use } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { DEPARTMENT_DATA } from "@/data/departments";

export default function KeyHighlightsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];

    // If no highlights exist or empty array, show a fallback message or just return null?
    // Based on other pages, it seems better to show what we have.
    const highlights = data.highlights || [];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b border-zinc-100 pb-8">
                <h2 className="text-3xl font-bold font-serif text-[#5D1035] mb-4 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-[#5D1035]" />
                    Key Highlights
                </h2>
                <p className="text-xl text-zinc-600 leading-relaxed font-light">
                    Discover what makes our department unique and exceptional.
                </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 gap-6">
                {highlights.map((highlight, index) => (
                    <ScrollReveal key={index} delay={index * 100}>
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex gap-5 items-start">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-[#5D1035]/10 flex items-center justify-center text-[#5D1035]">
                                <Star className="w-6 h-6 fill-current" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-800 mb-2">
                                    Highlight {index + 1}
                                </h3>
                                <p className="text-zinc-600 leading-relaxed font-medium">
                                    {highlight}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}

                {highlights.length === 0 && (
                    <div className="text-zinc-500 italic">No specific highlights listed for this department yet.</div>
                )}
            </div>
        </div>
    );
}
