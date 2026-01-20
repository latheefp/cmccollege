"use client";

import Image from "next/image";
import { use } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { DEPARTMENT_DATA } from "@/data/departments";

export default function FacultyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];

    return (
        <div className="space-y-8">
            <div className="border-b border-zinc-100 pb-8">
                <h2 className="text-3xl font-bold font-serif text-[#5D1035] mb-4">Our Faculty</h2>
                <p className="text-xl text-zinc-600 leading-relaxed font-light">
                    Meet the mentors shaping the next generation of leaders.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.faculty.map((member, idx) => (
                    <ScrollReveal key={idx} delay={idx * 100}>
                        <div className="group bg-white p-8 rounded-[2rem] border border-zinc-100 hover:border-[#5D1035]/30 transition-all duration-500 text-center hover:shadow-xl hover:shadow-[#5D1035]/5">
                            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-zinc-50 group-hover:border-[#5D1035]/20 transition-all">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-1">{member.name}</h4>
                            <p className="text-[#5D1035] text-xs font-bold uppercase tracking-wider mb-2">{member.role}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    );
}
