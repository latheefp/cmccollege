"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Search } from "lucide-react";

import TopBar from "./TopBar";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        return null;
    }

    return (
        <header className="fixed w-full z-50 top-[var(--ticker-height,0px)] flex flex-col shadow-lg">
            <TopBar />
            <nav className="w-full bg-gradient-to-r from-white via-white to-blue-50 border-b border-zinc-100">
                <div className="w-full px-4 xl:px-8">
                    <div className="flex justify-between items-center h-22 py-2">
                        {/* Logo (Left) */}
                        <Link href="/" className="flex items-center">
                            <div className="relative w-36 lg:w-40 2xl:w-56 h-12 2xl:h-18">
                                <Image
                                    src="/images/logo.png"
                                    alt="School Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>

                        {/* Right Section: Navigation & Socials */}
                        <div className="hidden lg:flex items-center gap-4 2xl:gap-12">
                            {/* Desktop Navigation */}
                            <div className="flex items-center gap-2 lg:gap-3 2xl:gap-8">
                                {[
                                    { name: "HOME", href: "/" },
                                    { name: "ABOUT US", href: "/about" },
                                    { name: "DEPARTMENTS", href: "/academics" },
                                    { name: "CAMPUS LIFE", href: "/campus-life" },
                                    { name: "AMENITIES", href: "/facilities" },
                                    { name: "GALLERY", href: "/gallery" },
                                    { name: "CONTACT", href: "/contact" },
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-[10px] lg:text-[11px] 2xl:text-[13px] font-black text-zinc-800 hover:text-[#5D1035] transition-colors uppercase tracking-widest relative group whitespace-nowrap"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5D1035] transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                ))}

                                {/* Admission Button with Shine Effect */}
                                <Link href="/admissions">
                                    <button className="relative px-5 py-2.5 bg-[#5D1035] text-white text-[10px] lg:text-[11px] 2xl:text-[13px] font-bold uppercase tracking-widest rounded overflow-hidden group hover:bg-[#4a0d2a] transition-colors shadow-sm hover:cursor-pointer">
                                        <span className="relative z-10">Admissions</span>
                                        {/* Shine Effect */}
                                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                                    </button>
                                </Link>
                            </div>

                            {/* Separator */}
                            <div className="h-6 w-px bg-zinc-200"></div>

                            {/* Social Icons & Search */}
                            <div className="flex items-center gap-3">
                                <Link href="https://facebook.com" target="_blank" className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Facebook className="w-5 h-5" />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Instagram className="w-5 h-5" />
                                </Link>
                                <button className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-zinc-600 hover:text-emerald-800 transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                        <div className="lg:hidden py-6 border-t border-emerald-50 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                            {[
                                { name: "HOME", href: "/" },
                                { name: "ABOUT US", href: "/about" },
                                { name: "DEPARTMENTS", href: "/departments" },
                                { name: "ACADEMICS", href: "/academics" },
                                { name: "ADMISSION", href: "/admissions" },
                                { name: "STUDENTS ZONE", href: "/students-zone" },
                                { name: "CAMPUS LIFE", href: "/campus-life" },
                                { name: "AMENITIES", href: "/facilities" },
                                { name: "GALLERY", href: "/gallery" },
                                { name: "CONTACT", href: "/contact" },
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-bold text-zinc-800 hover:text-emerald-800 transition-colors px-2 uppercase"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
