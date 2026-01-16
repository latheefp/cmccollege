"use client";

import Image from "next/image";
import Link from "next/link";
import { 
    BookOpen, 
    Target, 
    Heart, 
    Leaf, 
    Microscope, 
    Library, 
    Monitor, 
    ArrowRight, 
    Quote 
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            
            {/* 1. HERO SECTION - Institutional Identity */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <ScrollReveal>
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-100/50 text-emerald-800 text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-emerald-200/50">
                            Est. 2010
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-serif text-zinc-900 mb-6 tracking-tight leading-tight">
                            Institutional <span className="text-emerald-800 italic">Excellence</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-zinc-600 max-w-3xl mx-auto font-light leading-relaxed">
                            Fostering a legacy of academic rigor, moral integrity, and relentless innovation in a world-class learning environment.
                        </p>
                    </ScrollReveal>
                </div>
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                    <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-100/30 blur-3xl"></div>
                    <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-rose-100/30 blur-3xl"></div>
                </div>
            </section>

            {/* 2. OUR STORY SECTION - Split Layout */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        {/* Left: Image with Floating Badge */}
                        <ScrollReveal>
                            <div className="relative">
                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2586&auto=format&fit=crop"
                                        alt="Campus Life"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-xl shadow-xl border border-emerald-50 max-w-[200px] animate-fade-in-up">
                                    <div className="text-4xl font-bold text-emerald-800 mb-1">15+</div>
                                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Years of Academic Excellence</div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Text Block */}
                        <ScrollReveal delay={200}>
                            <div className="space-y-6 md:pl-10">
                                <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase">Our Story</span>
                                <h2 className="text-3xl md:text-5xl font-bold font-serif text-zinc-900 leading-tight">
                                    A Tradition of <br/> Intellectual Growth
                                </h2>
                                <p className="text-zinc-600 text-lg leading-relaxed">
                                    Founded with a vision to bridge the gap between traditional values and modern education, CM College has grown into a premier institution. We believe in nurturing not just students, but future leaders who are grounded in ethics and skilled for the global stage.
                                </p>
                                
                                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-zinc-100">
                                    <div>
                                        <div className="text-3xl font-bold text-zinc-900 mb-1">A+</div>
                                        <div className="text-sm text-zinc-500 font-medium">Accreditation Score</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-zinc-900 mb-1">5k+</div>
                                        <div className="text-sm text-zinc-500 font-medium">Alumni Network</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 3. GUIDED BY VISIONARIES */}
            <section className="py-20 bg-emerald-50/30">
                <div className="container mx-auto px-4 md:px-6">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold font-serif text-zinc-900 mb-4">Guided by Visionaries</h2>
                            <p className="text-zinc-500 max-w-2xl mx-auto">Leadership that inspires excellence and integrity in every endeavor.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        
                        {/* Principal's Message Card */}
                        <ScrollReveal delay={100}>
                            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-emerald-100/50 h-full flex flex-col">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-100 relative shrink-0">
                                        <Image
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                                            alt="Principal"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900">Principal's Message</h3>
                                        <p className="text-emerald-600/80 text-sm font-medium">Leading with Heart</p>
                                    </div>
                                </div>
                                <blockquote className="text-zinc-600 italic mb-8 flex-1 leading-relaxed">
                                    "Education is the kindling of a flame, not the filling of a vessel. At CM College, we strive to ignite the passion for learning in every student..."
                                </blockquote>
                                <Link 
                                    href="/principal-message" 
                                    className="inline-flex items-center text-emerald-800 font-bold text-sm tracking-wide hover:gap-2 transition-all group-hover:text-emerald-600"
                                >
                                    Read Full Message <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </ScrollReveal>

                        {/* Administrative Council Card */}
                        <ScrollReveal delay={200}>
                            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-emerald-100/50 h-full flex flex-col">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 border-2 border-emerald-100 shrink-0">
                                        <Quote size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900">Administrative Council</h3>
                                        <p className="text-emerald-600/80 text-sm font-medium">Governance & Vision</p>
                                    </div>
                                </div>
                                <p className="text-zinc-600 mb-8 flex-1 leading-relaxed">
                                    Meet the distinguished members of our board who guide the strategic direction and policy of our institution, ensuring we stay true to our mission.
                                </p>
                                <Link 
                                    href="/administration" 
                                    className="inline-flex items-center text-emerald-800 font-bold text-sm tracking-wide hover:gap-2 transition-all group-hover:text-emerald-600"
                                >
                                    Meet the Council <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </ScrollReveal>

                    </div>
                </div>
            </section>

            {/* 4. VISION · MISSION · CORE VALUES */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Vision */}
                        <ScrollReveal delay={0}>
                            <div className="bg-emerald-50/50 rounded-2xl p-8 hover:bg-emerald-50 transition-colors duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-800 mb-6">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-zinc-900 mb-3">Our Vision</h3>
                                <p className="text-zinc-600 leading-relaxed text-sm">
                                    To be a center of excellence that empowers students with knowledge, skills, and values to contribute meaningfully to society and the nation.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Mission */}
                        <ScrollReveal delay={100}>
                            <div className="bg-emerald-50/50 rounded-2xl p-8 hover:bg-emerald-50 transition-colors duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-800 mb-6">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-zinc-900 mb-3">Our Mission</h3>
                                <p className="text-zinc-600 leading-relaxed text-sm">
                                    To provide holistic education that balances academic excellence with moral uprightness, fostering innovation, critical thinking, and social responsibility.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Values */}
                        <ScrollReveal delay={200}>
                            <div className="bg-emerald-50/50 rounded-2xl p-8 hover:bg-emerald-50 transition-colors duration-300">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-800 mb-6">
                                    <Heart size={24} />
                                </div>
                                <h3 className="text-xl font-bold font-serif text-zinc-900 mb-3">Core Values</h3>
                                <p className="text-zinc-600 leading-relaxed text-sm">
                                    Integrity, Excellence, Inclusivity, and Service. We nurture a community where every individual is respected and encouraged to reach their potential.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 5. WORLD-CLASS HIGHLIGHTS */}
            <section className="py-20 border-t border-zinc-100">
                <div className="container mx-auto px-4 md:px-6">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-serif text-zinc-900 mb-2">World-Class Highlights</h2>
                                <p className="text-zinc-500">Facilities designed to inspire and enable learning.</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: Leaf, title: "Eco-friendly Campus", desc: "Sustainable green environment" },
                            { icon: Microscope, title: "Advanced Labs", desc: "State-of-the-art research" },
                            { icon: Library, title: "Rich Library", desc: "Extensive digital resources" },
                            { icon: Monitor, title: "Digital Classrooms", desc: "Smart learning enabled" },
                        ].map((item, idx) => (
                            <ScrollReveal key={idx} delay={idx * 100}>
                                <div className="group p-6 rounded-2xl border border-zinc-100 hover:border-emerald-100 hover:bg-emerald-50/20 hover:shadow-lg transition-all duration-300 text-center cursor-default">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-50 text-zinc-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 mb-4">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-zinc-900 mb-1">{item.title}</h3>
                                    <p className="text-xs text-zinc-500">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION - Strong Ending */}
            <section className="py-24 bg-emerald-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 tracking-tight">Ready to begin your journey?</h2>
                        <p className="text-emerald-200/80 text-lg mb-10 max-w-2xl mx-auto">
                            Join a community dedicated to excellence. Apply today or request a prospectus to learn more about our programs.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                                href="/admissions" 
                                className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-950 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
                            >
                                Apply Now
                            </Link>
                            <Link 
                                href="/prospectus" 
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-colors"
                            >
                                Request Prospectus
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </main>
    );
}
