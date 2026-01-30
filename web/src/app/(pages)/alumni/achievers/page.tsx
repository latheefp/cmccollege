"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Achiever {
    _id: string;
    name: string;
    batch: string;
    achievement: string;
    description: string;
    image: string;
}

export default function AlumniAchieversPage() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievers = async () => {
            try {
                const response = await fetch("/api/alumni/achievers");
                const data = await response.json();
                if (data.success) {
                    setAchievers(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch achievers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-zinc-200/40 border border-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-serif text-zinc-900 mb-8 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                            <Trophy className="w-5 h-5" />
                        </span>
                        Alumni Achievers
                    </h3>

                    <div className="space-y-6">
                        {achievers.length === 0 ? (
                            <p className="text-zinc-500 text-center py-10">No achievers found yet.</p>
                        ) : (
                            achievers.map((person, idx) => (
                                <motion.div
                                    key={person._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-gradient-to-br from-zinc-50 to-white border border-zinc-100 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 relative group hover:shadow-lg hover:shadow-emerald-900/5 transition-all"
                                >
                                    <div className="absolute top-6 right-6 text-amber-400 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <Star size={24} fill="currentColor" />
                                    </div>

                                    <div className="w-32 h-40 shrink-0 overflow-hidden rounded-xl border-4 border-white shadow-sm bg-zinc-200">
                                        <Image
                                            src={person.image}
                                            alt={person.name}
                                            width={200}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold text-zinc-900 mb-1">{person.name}</h4>
                                        <p className="text-sm font-medium text-emerald-600 mb-3 block bg-emerald-50 w-fit px-3 py-1 rounded-full">{person.batch}</p>
                                        <p className="text-zinc-800 font-semibold mb-2">{person.achievement}</p>
                                        <p className="text-zinc-600 text-sm leading-relaxed">{person.description}</p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
