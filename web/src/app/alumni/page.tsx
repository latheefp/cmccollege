"use client";

import { motion } from "framer-motion";
import { Users, Instagram, MessageCircle, Heart, Share2, Globe, ArrowRight } from "lucide-react";

export default function AlumniPage() {
    return (
        <main className="min-h-screen bg-emerald-50 pt-24 md:pt-28 pb-12 md:pb-20">

            {/* Page Header */}
            <section className="relative py-24 px-6 bg-[#5D1035] text-white overflow-hidden mb-12">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Alumni Association
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Celebrating the lifelong bond between CM College and its graduates.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="w-full px-4 md:px-[30px] max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* MAIN CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-12 space-y-8"
                    >
                        {/* Description Card */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-zinc-200/40 border border-white relative overflow-hidden group hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 group-hover:opacity-80 transition-opacity"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold font-serif text-zinc-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-2xl bg-[#7B0046]/5 flex items-center justify-center text-[#7B0046]">
                                        <Users className="w-5 h-5" />
                                    </span>
                                    Our Community
                                </h3>
                                <div className="space-y-6 text-zinc-600 leading-relaxed text-lg text-justify">
                                    <p>
                                        The alumni association of CM College of Arts and Science is a community of former students who have graduated from our college. This community is dedicated to supporting the growth and development of our college, as well as promoting networking and fellowship among our alumni.
                                    </p>
                                    <p>
                                        The alumni association of the college has established a presence on social media platforms such as Instagram and WhatsApp. Through these platforms, members of the alumni community are able to share information and reminisce about past experiences and memories related to their time at the college.
                                    </p>
                                    <p>
                                        This provides a means for alumni to stay connected and engaged with one another despite physical distance and the passage of time.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Objectives / Quick Stats Row (Optional visuals to break text) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: "Networking", icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
                                { label: "Support", icon: Heart, color: "text-[#7B0046]", bg: "bg-pink-50" },
                                { label: "Engagement", icon: Share2, color: "text-emerald-600", bg: "bg-emerald-50" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-zinc-700">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SIDEBAR - Social Connect */}


                </div>
            </div>
        </main>
    );
}
