"use client";

import React, { useState, FormEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setStatusMessage("");

        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setStatusMessage("Your enquiry has been submitted successfully!");
                setFormData({ name: "", phone: "", email: "", message: "" });
            } else {
                setStatus("error");
                setStatusMessage(data.message || "Failed to submit enquiry. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setStatusMessage("Connect error. Is the backend server running?");
        }
    };

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
                            Contact & Enquiry
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
                            We're here to help you. Reach out for any questions regarding admissions or our integrated programs.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Side: Contact Details */}
                    <div className="lg:col-span-5">
                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-emerald-800 mb-8 border-b-2 border-emerald-100 pb-4">Get in Touch</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Our Location", detail: "123 Educational Street, Knowledge City, State, Country", icon: "📍" },
                                    { title: "Phone Number", detail: "+1 234 567 890", icon: "📞" },
                                    { title: "Email Address", detail: "info@schoolname.edu", icon: "✉️" },
                                    { title: "Office Hours", detail: "Mon - Sat: 8:00 AM - 4:00 PM", icon: "⏰" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-emerald-900 text-lg">{item.title}</h3>
                                            <p className="text-zinc-600 text-lg leading-relaxed">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
                                <h4 className="font-bold text-emerald-900 mb-4">Admissions Liaison</h4>
                                <p className="text-zinc-600 italic">"Our dedicated admissions team is available for campus visits and one-on-one counseling. Feel free to call us for an appointment."</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Side: Enquiry Form */}
                    <div className="lg:col-span-7">
                        <ScrollReveal delay={200} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-emerald-50">
                            <h3 className="text-2xl font-bold text-emerald-900 mb-8">Send an Enquiry</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-zinc-700 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full px-5 py-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-zinc-900"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-bold text-zinc-700 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            className="w-full px-5 py-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-zinc-900"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-zinc-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address (optional)"
                                        className="w-full px-5 py-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-zinc-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-zinc-700 ml-1">Your Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className="w-full px-5 py-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-zinc-900 resize-none"
                                    ></textarea>
                                </div>

                                {status !== "idle" && (
                                    <div className={`p-4 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-300 ${status === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                        status === "error" ? "bg-red-50 text-red-700 border border-red-100" :
                                            "bg-zinc-50 text-zinc-600 border border-zinc-100"
                                        }`}>
                                        {status === "loading" ? "Sending your enquiry..." : statusMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className={`w-full py-5 bg-emerald-800 text-white font-bold rounded-xl shadow-xl hover:bg-emerald-900 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg flex items-center justify-center gap-3 ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {status === "loading" && (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {status === "loading" ? "Submitting..." : "Submit Enquiry"}
                                </button>
                                <p className="text-center text-zinc-400 text-sm mt-4">
                                    By submitting this form, you agree to being contacted by our admissions team.
                                </p>
                            </form>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-24 px-6 bg-zinc-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-emerald-800 mb-4">Visit Our Campus</h2>
                        <p className="text-zinc-600 text-lg">Use the map below to find the best route to our school.</p>
                    </ScrollReveal>

                    <ScrollReveal delay={200} className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white h-[450px] relative">
                        <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center">
                            {/* Placeholder for Google Map - UI only as requested */}
                            <div className="text-center">
                                <span className="text-5xl mb-4 block">🗺️</span>
                                <p className="text-zinc-500 font-medium">Google Map Placeholder</p>
                                <p className="text-zinc-400 text-sm mt-2">(Iframe integration will be added in backend phase)</p>
                            </div>
                        </div>
                        {/* Real iframe placeholder for visual weight */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44173114002!2d75.76562098671876!3d11.2587531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x321557147a375a8!2sKozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, opacity: 0.1 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </ScrollReveal>
                </div>
            </section>

            {/* FAQ/CTA Section */}
            <section className="py-20 px-6 bg-emerald-900 text-white text-center">
                <ScrollReveal className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Still have questions?</h2>
                    <p className="text-emerald-100 text-lg mb-10">Check our FAQ or call us directly for immediate assistance regarding your admission.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-10 py-5 bg-white text-emerald-900 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform text-lg">
                            View FAQ
                        </button>
                        <a href="tel:+1234567890" className="px-10 py-5 bg-emerald-800 text-white font-bold rounded-xl border border-emerald-700 hover:bg-emerald-700 transition-colors text-lg">
                            Call Now
                        </a>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
