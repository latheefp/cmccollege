"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Smartphone, Mail } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        return null;
    }

    return (
        <footer className="bg-[#7B0046] text-white py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
                {/* College Info */}
                <div className="flex flex-col items-start md:items-center lg:items-start text-left md:text-center lg:text-left md:col-span-2 lg:col-span-1">
                    <div className="relative w-full max-w-[280px] h-24 mb-6 md:mx-auto lg:mx-0">
                        <Image
                            src="https://ik.imagekit.io/5c6j602yp/Home/images/Logo-footer"
                            alt="College Logo"
                            fill
                            className="object-contain object-left md:object-center lg:object-left"
                            priority
                        />
                    </div>
                    <p className="text-white/80 leading-relaxed mb-8 text-sm font-medium max-w-sm md:mx-auto lg:mx-0">
                        Affiliated to The University Of Calicut <br />
                        Recognized by UGC under Section 2(f) of the Act 1957
                        <span className="block font-bold mt-2 text-white/90">Unit of CM Centre Madavoor</span>
                    </p>
                    <div className="flex gap-4 md:justify-center lg:justify-start w-full">
                        <a href="https://www.facebook.com/cmcwayanad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-700/50 hover:border-emerald-500/50 transition-all hover:-translate-y-1" aria-label="Facebook">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                        </a>
                        <a href="https://www.instagram.com/cmcollege_nadavayal" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-700/50 hover:border-emerald-500/50 transition-all hover:-translate-y-1" aria-label="Instagram">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259 0 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="https://www.youtube.com/@CMCollegeofArtsandScience" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-700/50 hover:border-emerald-500/50 transition-all hover:-translate-y-1" aria-label="YouTube">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-start text-left">
                    <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Navigation</h4>
                    <ul className="space-y-3 text-white/70">
                        <li>
                            <Link href="/about" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/administration" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Administrative Council
                            </Link>
                        </li>
                        <li>
                            <Link href="/academics" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Academic Programs
                            </Link>
                        </li>
                        <li>
                            <Link href="/admissions" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Admissions
                            </Link>
                        </li>
                        <li>
                            <Link href="/amenities" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Amenities
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div className="flex flex-col items-start text-left">
                    <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Portal</h4>
                    <ul className="space-y-3 text-white/70">
                        <li>
                            <Link href="/gallery" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Student Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Latest News
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.hsslive.in/2017/06/general-educational-calendar.html" target="_blank" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Academic Calendar
                            </Link>
                        </li>
                        <li>
                            <Link href="/careers" className="hover:text-emerald-300 transition-colors inline-block py-0.5">
                                Join our Faculty
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-start text-left uppercase md:col-span-2 lg:col-span-1">
                    <h4 className="text-white font-bold mb-6 text-lg tracking-tight uppercase">Get in Touch</h4>
                    <ul className="space-y-5 text-white/70">
                        <li className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/20 transition-colors">
                                <MapPin size={18} className="text-emerald-400 font-bold" />
                            </div>
                            <span className="text-sm font-bold normal-case">
                                Mount Razi, Nadavayal (P.O) <br />
                                Wayanad-670646, Kerala
                            </span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                <Phone size={18} className="text-emerald-400 font-bold" />
                            </div>
                            <div className="flex flex-col normal-case">
                                <span className="text-sm font-bold">04936 210 178</span>
                                <span className="text-[11px] text-white/40 uppercase tracking-wider font-bold">Office Line</span>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                <Smartphone size={18} className="text-emerald-400 font-bold" />
                            </div>
                            <div className="flex flex-col normal-case">
                                <span className="text-sm font-bold text-white tracking-widest">+91 7594 888 203</span>
                                <span className="text-sm font-bold text-white tracking-widest">+91 7594 888 202</span>
                                <span className="text-[11px] text-white/40 uppercase tracking-wider font-bold">Mobile Support</span>
                            </div>
                        </li>
                        <li className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                <Mail size={18} className="text-emerald-400 font-bold" />
                            </div>
                            <a href="mailto:info@cmcollege.edu.in" className="text-sm hover:text-emerald-300 transition-colors font-bold lowercase tracking-wide">info@cmcollege.edu.in</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-white/10 text-center text-sm text-emerald-100/60">
                <p>&copy; {new Date().getFullYear()} CM College. All rights reserved.</p>
            </div>
        </footer >
    );
}
