"use client";

import Image from "next/image";

const partners = [
    { name: "MMU", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/mmu-logo.png?updatedAt=1768844964283" },
    { name: "Oman", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/oman-logo.png" },
    { name: "Tally", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/tally-logo.png" },
    { name: "Keltron", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/keltron-logo.png" },
];

const programs = [
    { name: "Queens Drive", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/queens-drive.png" },
    { name: "Plant Up", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/plant-up.png" },
    { name: "Meet the Professional", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/meet-professional.png" },
    { name: "Chirakukal", logo: "https://ik.imagekit.io/5c6j602yp/Home/images/chirakukal.png" },
];

const MarqueeRow = ({ title, items, reverse = false, fit = "contain" }: { title: string, items: typeof partners, reverse?: boolean, fit?: "contain" | "cover" }) => {
    return (
        <div className="flex flex-col md:flex-row items-stretch border-b border-zinc-100 last:border-b-0 py-8">
            {/* Side Label */}
            <div className="w-full md:w-64 md:flex-shrink-0 p-4 md:p-6 flex items-center justify-center">
                <div className="relative w-full overflow-hidden rounded-2xl bg-emerald-900/10 to-blue-50/20 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(93,16,53,0.1)] transition-all duration-500 group/card">
                    {/* Maroon Accent Strip */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#5D1035] via-[#851E4E] to-[#5D1035]"></div>

                    {/* Glass Shine */}
                    <div className="absolute -top-[50%] -right-[50%] w-full h-full bg-gradient-to-b from-white/40 to-transparent transform rotate-45 pointer-events-none transition-transform duration-700 group-hover/card:translate-x-full"></div>

                    <div className="p-4 md:p-8 flex items-center justify-center min-h-[80px] md:min-h-[120px] relative z-10">
                        <h3 className="text-[12px] md:text-sm font-agency font-bold text-[#5D1035] uppercase text-center leading-relaxed">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Marquee Area */}
            <div className="flex-1 overflow-hidden relative py-8 md:py-10 bg-white group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div
                    className="flex items-center gap-6 md:gap-10 flex-nowrap min-w-full animate-marquee"
                    style={{ width: "fit-content", animationDirection: reverse ? "reverse" : "normal" }}
                >
                    {[...items, ...items, ...items, ...items].map((item, index) => (
                        <div
                            key={index}
                            className="relative w-28 h-16 md:w-40 md:h-24 flex-shrink-0 flex items-center justify-center p-1.5 md:p-2 bg-white rounded-lg border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.logo}
                                    alt={`${item.name} logo`}
                                    fill
                                    className={`object-${fit} filter grayscale-0 opacity-90 hover:opacity-100 transition-opacity`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Collaborations() {
    return (
        <section className="bg-white border-t border-zinc-100">
            <div className="max-w-7xl mx-auto">
                <MarqueeRow title="Industry & Academic Partners" items={partners} />
                <MarqueeRow title="College Programs" items={programs} reverse fit="cover" />
            </div>
        </section>
    );
}
