import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans pt-20">
            {/* Page Header */}
            <section className="relative py-24 px-6 bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" data-editable="header-title" data-page="about">
                            About Our School
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto" data-editable="header-subtitle" data-page="about">
                            Nurturing Excellence through Integrated Academic and Moral Education.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* School Overview */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-emerald-800 mb-8" data-editable="who-we-are-heading" data-page="about">Who We Are</h2>
                        <div className="space-y-6 text-lg text-zinc-600 leading-relaxed text-left">
                            <p data-editable="who-we-are-text-1" data-page="about">
                                Founded on the principles of academic discipline and spiritual growth, our institution serves as a cornerstone for students pursuing their +1 and +2 education. We provide an integrated environment where the curriculum is meticulously designed to meet modern educational standards while remaining deeply rooted in Islamic values.
                            </p>
                            <p data-editable="who-we-are-text-2" data-page="about">
                                Our approach goes beyond traditional teaching; we focus on the holistic development of every student, ensuring they are not just exam-ready, but life-ready. With a specialization in integrated coaching for competitive exams, we empower our students to achieve their highest potential within a safe and supportive community.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 px-6 bg-zinc-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
                        {/* Vision */}
                        <ScrollReveal className="flex flex-col">
                            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mb-8">
                                <Image
                                    src="/images/school_vision_academic_1768116074071.png"
                                    alt="Our Vision"
                                    fill
                                    className="object-cover"
                                    data-editable="vision-image"
                                    data-page="about"
                                />
                                <div className="absolute inset-0 bg-emerald-900/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-3xl font-bold text-white uppercase tracking-widest" data-editable="vision-title" data-page="about">Our Vision</h3>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm flex-grow">
                                <p className="text-lg text-zinc-600 leading-relaxed italic" data-editable="vision-text" data-page="about">
                                    "To be a leading center of educational excellence that produces globally competent citizens anchored in Islamic ethics and character, contributing positively to society and the Ummah."
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Mission */}
                        <ScrollReveal delay={200} className="flex flex-col">
                            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mb-8">
                                <Image
                                    src="/images/school_mission_growth_1768116094993.png"
                                    alt="Our Mission"
                                    fill
                                    className="object-cover"
                                    data-editable="mission-image"
                                    data-page="about"
                                />
                                <div className="absolute inset-0 bg-emerald-900/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-3xl font-bold text-white uppercase tracking-widest" data-editable="mission-title" data-page="about">Our Mission</h3>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-emerald-50 shadow-sm flex-grow">
                                <ul className="space-y-4 text-lg text-zinc-600 list-disc pl-5">
                                    <li>Deliver rigorous academic training integrated with competitive exam coaching.</li>
                                    <li>Foster an environment that prioritizes moral discipline and spiritual awareness.</li>
                                    <li>Provide state-of-the-art facilities that support both interactive and independent learning.</li>
                                    <li>Engage experienced faculty who serve as mentors and role models.</li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <ScrollReveal className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4" data-editable="why-choose-us-heading" data-page="about">Why Choose Us</h2>
                    <p className="text-zinc-600 text-lg" data-editable="why-choose-us-subtitle" data-page="about">Commitment to excellence in every aspect of student life.</p>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Strict Discipline", icon: "⚖️" },
                        { title: "Entrance Focused", icon: "🎯" },
                        { title: "Secure Campus", icon: "🛡️" },
                        { title: "Individual Mentorship", icon: "🤝" }
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 100} className="p-8 bg-emerald-50/20 rounded-2xl border border-emerald-100 hover:bg-white hover:shadow-xl hover:border-emerald-300 transition-all group">
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                            <h3 className="text-xl font-bold text-emerald-900">{item.title}</h3>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-24 px-6 bg-emerald-900/5 relative overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/images/principal_portrait_placeholder_1768116114971.png"
                                alt="Principal"
                                fill
                                className="object-cover"
                                data-editable="principal-image"
                                data-page="about"
                            />
                        </div>
                        <div className="md:col-span-7">
                            <ScrollReveal>
                                <div className="relative">
                                    <span className="text-7xl text-emerald-200 absolute -top-10 -left-6 opacity-50 font-serif">"</span>
                                    <h2 className="text-3xl font-bold text-emerald-800 mb-8 relative z-10" data-editable="principal-heading" data-page="about">Principal's Message</h2>
                                    <div className="space-y-6 text-lg text-zinc-700 leading-relaxed italic relative z-10">
                                        <p data-editable="principal-message-1" data-page="about">
                                            At our school, we believe that education is the most powerful tool for positive change. Our mission is to provide an environment where students don't just achieve academic success, but also grow into principled and compassionate human beings.
                                        </p>
                                        <p data-editable="principal-message-2" data-page="about">
                                            We are committed to maintaining the highest standards of safety, discipline, and academic rigor. Our faculty works tirelessly to ensure that every student receives the guidance and support they need to navigate their +1 and +2 years effectively and prepare for their future careers.
                                        </p>
                                        <div className="mt-10">
                                            <p className="font-bold text-emerald-900 not-italic" data-editable="principal-name" data-page="about">Mrs. Sarah Johnson</p>
                                            <p className="text-zinc-500 not-italic" data-editable="principal-role" data-page="about">Principal, Integrated School</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-20 px-6 bg-emerald-900 text-white text-center">
                <ScrollReveal className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6" data-editable="final-cta-heading" data-page="about">Join Our Community</h2>
                    <p className="text-emerald-100 text-lg mb-10" data-editable="final-cta-text" data-page="about">Discover a place where academic dreams meet moral values.</p>
                    <button className="px-10 py-4 bg-white text-emerald-900 font-bold rounded-lg shadow-xl hover:scale-105 transition-transform text-lg">
                        Contact Admissions
                    </button>
                </ScrollReveal>
            </section>
        </div>
    );
}
