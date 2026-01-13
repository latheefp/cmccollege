"use client";

import Image from "next/image";

const partners = [
    { name: "MMU", logo: "/images/mmu-logo.png" },
    { name: "Oman", logo: "/images/oman-logo.png" },
    { name: "Tally", logo: "/images/tally-logo.png" },
    { name: "Keltron", logo: "/images/keltron-logo.png" },
];

const programs = [
    { name: "Queens Drive", logo: "/images/queens-drive.png" },
    { name: "Plant Up", logo: "/images/plant-up.png" },
    { name: "Meet the Professional", logo: "/images/meet-professional.png" },
    { name: "Chirakukal", logo: "/images/chirakukal.png" },
];

const MarqueeRow = ({ title, items, reverse = false }: { title: string, items: typeof partners, reverse?: boolean }) => {
    return (
        <div className="flex flex-col md:flex-row items-center border-b border-zinc-100 last:border-b-0">
            {/* Side Label */}
            <div className="w-full md:w-64 md:flex-shrink-0 p-6 md:p-10 border-b md:border-b-0 md:border-r border-zinc-100 bg-zinc-50/50 flex items-center justify-center md:justify-start">
                <h3 className="text-sm font-bold text-[#7B0046] uppercase tracking-widest text-center md:text-left leading-relaxed">
                    {title}
                </h3>
            </div>

            {/* Marquee Area */}
            <div className="flex-1 overflow-hidden relative py-8 md:py-10 bg-white group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div
                    className="flex items-center gap-12 flex-nowrap min-w-full animate-marquee"
                    style={{ width: "fit-content", animationDirection: reverse ? "reverse" : "normal" }}
                >
                    {[...items, ...items, ...items, ...items].map((item, index) => (
                        <div
                            key={index}
                            className="relative w-40 h-20 flex-shrink-0 flex items-center justify-center p-3 bg-white rounded-lg border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.logo}
                                    alt={`${item.name} logo`}
                                    fill
                                    className="object-contain p-2 filter grayscale-0 opacity-90 hover:opacity-100 transition-opacity"
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
                <MarqueeRow title="College Programs" items={programs} reverse />
            </div>
        </section>
    );
}
