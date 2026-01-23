"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import DynamicCTA from "@/components/DynamicCTA";

export default function FacilitiesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-[112px]">
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-[#7B0046] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Our Facilities
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
                            Modern infrastructure designed to foster academic excellence and moral growth.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Academic Facilities */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Academic Infrastructure</h2>
                    <p className="text-zinc-600 text-lg">State-of-the-art learning environments for students.</p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Modern Classrooms",
                            desc: "Spacious, well-ventilated classrooms equipped with interactive learning tools.",
                            image: "/images/classroom_learning_1768115518451.png"
                        },
                        {
                            title: "Science Laboratories",
                            desc: "Advanced labs for Physics, Chemistry, and Biology to encourage practical learning.",
                            image: "/images/modern_science_lab_1768116682208.png"
                        },
                        {
                            title: "Rich Library",
                            desc: "A vast collection of academic and spiritual resources to broaden horizons.",
                            image: "/images/school_library_1768115599802.png"
                        }
                    ].map((facility, i) => (
                        <ScrollReveal key={i} delay={i * 150} className="flex flex-col group">
                            <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-lg border border-emerald-50">
                                <Image
                                    src={facility.image}
                                    alt={facility.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-emerald-900 mb-3">{facility.title}</h3>
                            <p className="text-zinc-600 leading-relaxed">{facility.desc}</p>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Residential & Support Facilities */}
            <section className="py-24 px-6 bg-emerald-900/5">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Residential & Support</h2>
                        <p className="text-zinc-600 text-lg">A home away from home with essential support systems.</p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            {
                                title: "Student Hostel",
                                desc: "Secure and disciplined living environment with dedicated mentorship.",
                                image: "/images/school_hostel_1768115536813.png"
                            },
                            {
                                title: "School Masjid",
                                desc: "The heart of our spiritual growth, providing a space for five daily prayers.",
                                image: "/images/school_masjid_1768115559090.png"
                            },
                            {
                                title: "Hygienic Dining",
                                desc: "Clean and nutritious food served in a spacious, airy environment.",
                                image: "/images/school_dining_hall_1768116701071.png"
                            },
                            {
                                title: "Computer Lab",
                                desc: "Digital resources to keep students updated with modern technology.",
                                image: "/images/science_lab_1768115578614.png"
                            }
                        ].map((facility, i) => (
                            <ScrollReveal key={i} delay={i * 100} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-emerald-50 hover:shadow-xl transition-all group flex flex-col md:flex-row h-full">
                                <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                                    <Image
                                        src={facility.image}
                                        alt={facility.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 grow flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-emerald-900 mb-4">{facility.title}</h3>
                                    <p className="text-zinc-600 text-lg leading-relaxed">{facility.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safety & Discipline Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-7">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-5xl font-bold text-emerald-900 mb-8">Safety & Discipline</h2>
                            <p className="text-xl text-zinc-600 mb-10 leading-relaxed">
                                We prioritize a safe and orderly environment. Our campus is monitored around the clock to ensure student security and maintain the high standards of discipline our institution is known for.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: "24/7 Security", icon: "🛡️" },
                                    { title: "CCTV Surveillance", icon: "📹" },
                                    { title: "First Aid Facility", icon: "🩹" },
                                    { title: "Strict Code of Conduct", icon: "⚖️" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:border-emerald-200 hover:bg-white transition-all">
                                        <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                        <span className="font-bold text-emerald-900">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                    <div className="lg:col-span-5">
                        <ScrollReveal delay={200} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-50">
                            <Image
                                src="/images/school_security_surveillance_1768116718250.png"
                                alt="Security and Safety"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-emerald-950/40 to-transparent" />
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <DynamicCTA className="py-20 px-6 bg-emerald-900 text-white text-center" />
        </div>
    );
}
