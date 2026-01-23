"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useAdmissionStatus } from "@/hooks/useAdmissionStatus";

export default function AdmissionsPage() {
    const { isAdmissionOpen } = useAdmissionStatus();

    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-[112px]">
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Admissions
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
                            Integrated +1 / +2 Programme: A Journey of Academic and Spiritual Growth.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Admission Overview */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-emerald-800 mb-8">Admission Philosophy</h2>
                        <div className="space-y-6 text-lg text-zinc-600 leading-relaxed text-left">
                            <p>
                                At our institution, admissions are more than just a process; they are the start of a partnership. We look for students who are eager to excel academically while embracing the moral and spiritual values that define our community.
                            </p>
                            <p>
                                Our integrated programme is designed to provide a seamless transition into higher secondary education, ensuring that students are well-prepared for both competitive entrance exams and the challenges of life, all within a disciplined and nurturing environment.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Eligibility Criteria */}
            <section className="py-24 px-6 bg-zinc-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Eligibility Criteria</h2>
                        <p className="text-zinc-600 text-lg">Requirements for joining our integrated programmes.</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* +1 Eligibility */}
                        <ScrollReveal className="bg-white p-10 rounded-2xl shadow-sm border border-emerald-50 border-t-4 border-t-emerald-800">
                            <h3 className="text-2xl font-bold text-emerald-900 mb-6">+1 Integrated Programme</h3>
                            <ul className="space-y-4 text-lg text-zinc-600">
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Successful completion of Class 10/SSLC or equivalent.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Minimum percentage required as per current year guidelines.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Proficiency in English (Medium of Instruction).
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Commitment to follow the code of conduct and moral values.
                                </li>
                            </ul>
                        </ScrollReveal>

                        {/* +2 Eligibility */}
                        <ScrollReveal delay={200} className="bg-white p-10 rounded-2xl shadow-sm border border-emerald-50 border-t-4 border-t-emerald-800">
                            <h3 className="text-2xl font-bold text-emerald-900 mb-6">+2 Integrated Programme</h3>
                            <ul className="space-y-4 text-lg text-zinc-600">
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Successful completion of Class 11 in the respective stream.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Transfer Certificate from a recognized institution.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Entrance interview performance (if applicable).
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-800 font-bold">✓</span>
                                    Willingness to join our integrated entrance coaching.
                                </li>
                            </ul>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Admission Process</h2>
                    <p className="text-zinc-600 text-lg">Your step-by-step guide to joining our school.</p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { step: 1, title: "Submit Enquiry", desc: "Fill out the online enquiry form or visit our campus office.", icon: "📝" },
                        { step: 2, title: "Counseling", desc: "Attend a personalized session to understand our integrated approach.", icon: "💬" },
                        { step: 3, title: "Document Verification", desc: "Submit all required documents for formal verification.", icon: "📁" },
                        { step: 4, title: "Confirmation", desc: "Receive admission confirmation and complete fee formalities.", icon: "✅" }
                    ].map((step, i) => (
                        <ScrollReveal key={i} delay={i * 150} className="relative p-8 rounded-2xl bg-white border border-emerald-50 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                            <div className="absolute -right-4 -top-4 text-8xl font-bold text-emerald-50 opacity-50 group-hover:text-emerald-100 transition-colors">
                                {step.step}
                            </div>
                            <div className="text-4xl mb-6 relative z-10">{step.icon}</div>
                            <h3 className="text-xl font-bold text-emerald-900 mb-4 relative z-10">Step {step.step}: {step.title}</h3>
                            <p className="text-zinc-600 leading-relaxed relative z-10">{step.desc}</p>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Document Images / Process Detail */}
            <section className="py-24 px-6 bg-emerald-900/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <ScrollReveal className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                            <Image
                                src="/images/admission_counseling_session_1768116369318.png"
                                alt="Counseling"
                                fill
                                className="object-cover"
                            />
                        </ScrollReveal>
                        <ScrollReveal delay={200} className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                            <Image
                                src="/images/document_verification_office_1768116391105.png"
                                alt="Document Verification"
                                fill
                                className="object-cover"
                            />
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Required Documents */}
            <section className="py-24 px-6 max-w-4xl mx-auto">
                <ScrollReveal>
                    <div className="bg-emerald-900 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-10 text-center">Required Documents</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                "Transfer Certificate (Original)",
                                "Class 10 Mark List (Copy)",
                                "Passport Size Photos (4 Nos)",
                                "ID Proof (Aadhar/Passport Copy)",
                                "Conduct Certificate",
                                "Community Certificate (if applicable)"
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white">✓</div>
                                    <span className="text-emerald-50 font-medium">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Final Admission Hero / CTA */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-8">
                                {isAdmissionOpen
                                    ? "Ready to Start Your Journey?"
                                    : "Admissions Currently Closed"}
                            </h2>
                            <p className="text-xl text-zinc-600 mb-10 leading-relaxed">
                                {isAdmissionOpen
                                    ? "Admissions are currently open for the current academic session. Join a community where your academic potential and character are nurtured together."
                                    : "Thank you for your interest. Admissions for the current academic year are closed. Please contact us for information regarding the next academic session."}
                            </p>
                            <a href={isAdmissionOpen ? "#enquire" : "/contact"}>
                                <button className="px-12 py-5 bg-emerald-800 text-white font-bold rounded-xl shadow-xl hover:bg-emerald-900 hover:scale-105 active:scale-95 transition-all text-xl cursor-pointer">
                                    {isAdmissionOpen ? "Enquire Now" : "Contact Us"}
                                </button>
                            </a>
                        </ScrollReveal>
                        <ScrollReveal delay={200} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-50">
                            <Image
                                src="/images/admissions_open_hero_1768116412312.png"
                                alt="Admissions Open"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-emerald-100 shadow-xl">
                                    <p className="text-emerald-900 font-bold text-xl mb-2 italic">
                                        {isAdmissionOpen
                                            ? "\"A New Beginning Awaits!\""
                                            : "\"Plan Your Future Today!\""}
                                    </p>
                                    <p className="text-zinc-600">
                                        {isAdmissionOpen
                                            ? "Limited seats available for the upcoming session."
                                            : "Connect with us to stay updated on future openings."}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
