'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';

const stats = [
    {
        id: 1,
        label: "FACULTIES",
        value: 45,
        suffix: "+",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        )
    },
    {
        id: 2,
        label: "STUDENTS",
        value: 600,
        suffix: "+",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )
    },
    {
        id: 3,
        label: "PROGRAMS",
        value: 11,
        suffix: "",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
    {
        id: 4,
        label: "ALUMNI",
        value: 2000,
        suffix: "+",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        )
    }
];

function Counter({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 80,
        duration: 2.5
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
        return unsubscribe;
    }, [springValue]);

    return <span ref={ref} className="tabular-nums will-change-transform">0</span>;
}

export default function StatsSection() {
    return (
        <section className="relative py-12 md:py-16 bg-[#111111] overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent opacity-40 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6">

                {/* Glass Container */}
                <div
                    className="rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md"
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                className={`flex flex-col items-center justify-center p-6 md:p-8 group relative border-white/10
                                    ${index !== stats.length - 1 ? 'border-b md:border-b-0' : ''} 
                                    ${index % 2 === 0 ? 'md:border-r lg:border-r-0' : ''}
                                    ${index < 2 ? 'md:border-b' : ''}
                                    ${index !== stats.length - 1 ? 'lg:border-r lg:border-b-0' : ''}
                                `}
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Icon with soft glow */}
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-emerald-300/90 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all duration-500 shadow-lg">
                                        {stat.icon}
                                    </div>
                                </div>

                                {/* Number */}
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight flex items-baseline gap-1 drop-shadow-sm">
                                    <Counter value={stat.value} />
                                    <span className="text-emerald-400/80 text-2xl font-light">{stat.suffix}</span>
                                </div>

                                {/* Label */}
                                <p className="text-white/60 text-xs font-bold tracking-[0.25em] uppercase transition-colors group-hover:text-white/80">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
