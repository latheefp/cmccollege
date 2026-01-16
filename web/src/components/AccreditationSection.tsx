"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck } from "lucide-react";

export default function AccreditationSection() {
    return (
        <section className="py-20 bg-emerald-50/50 border-t border-emerald-100/20">
            <div className="container mx-auto px-4 md:px-6">
                <ScrollReveal>
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-emerald-100/50 flex flex-col md:flex-row gap-10 items-start hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">

                        {/* Decorative Accent */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-800"></div>

                        {/* Icon Area */}
                        <div className="shrink-0">
                            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 border border-emerald-100">
                                <ShieldCheck size={40} strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-6 flex-1">
                            <div className="flex flex-wrap items-center gap-4">
                                <h2 className="text-3xl font-bold font-serif text-zinc-900">Accreditation & Recognition</h2>
                                <span className="px-4 py-1.5 bg-emerald-100/50 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                                    UGC Recognized
                                </span>
                            </div>

                            <div className="prose prose-xl max-w-none text-justify leading-relaxed text-zinc-900 font-medium">
                                <p>
                                    Our college has been recognized by the <strong>University Grants Commission (UGC)</strong> under <strong>Section 2(f) of the Act 1957</strong>. This recognition signifies that our college is eligible to receive central funding and participate in various central government schemes and initiatives related to higher education.
                                </p>
                                <p className="text-lg text-emerald-900 bg-emerald-50 p-6 rounded-xl border border-emerald-200 font-semibold italic shadow-sm">
                                    "Section 2(f) of the UGC Act 1957 defines a university as “a university established or incorporated by or under a Central Act, a Provincial Act or a State Act, and includes any such institution as may, in consultation with the University concerned, be recognized by the Commission in accordance with the regulations made in this behalf under this Act.”"
                                </p>
                                <p>
                                    In summary, our college’s recognition by the UGC under Section 2(f) of the Act 1957 is a testament to our commitment to providing quality education and our dedication to meeting the standards set by the regulatory body. It provides us with access to central funding and other government schemes, thereby enabling us to enhance the overall educational experience for our students.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
