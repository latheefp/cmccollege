'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const professionals = [
    {
        name: "Dr. A. Rahman",
        role: "Professor",
        department: "Computer Science",
        experience: "15+ years experience",
        image: "/images/principal_portrait_placeholder_1768116114971.png"
    },
    {
        name: "Ms. Fathima K",
        role: "Lecturer",
        department: "Mathematics",
        experience: "8+ years experience",
        image: "/images/principal_portrait_placeholder_1768116114971.png"
    },
    {
        name: "Mr. Salman P",
        role: "Head of Department",
        department: "Commerce",
        experience: "12+ years experience",
        image: "/images/principal_portrait_placeholder_1768116114971.png"
    },
    {
        name: "Dr. N. Hameed",
        role: "Principal",
        department: "Academic Leadership",
        experience: "Administration",
        image: "/images/Principal.jpeg"
    }
];

export default function Professionals() {
    return (
        <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-3 tracking-tight"
                    >
                        Meet Our Professionals
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg max-w-2xl mx-auto text-center font-medium"
                    >
                        Experienced educators dedicated to shaping future leaders
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {professionals.map((prof, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Profile Image */}
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-zinc-50 shadow-inner">
                                    <Image
                                        src={prof.image}
                                        alt={prof.name}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-zinc-900 mb-1 group-hover:text-emerald-800 transition-colors">
                                    {prof.name}
                                </h3>
                                <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-1">
                                    {prof.role}
                                </p>
                                <p className="text-sm text-zinc-500 font-medium mb-3">
                                    {prof.department}
                                </p>
                                <div className="inline-block px-3 py-1 bg-zinc-50 rounded-full text-xs font-medium text-zinc-400">
                                    {prof.experience}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
