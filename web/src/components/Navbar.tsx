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

    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <header className="fixed w-full z-50 top-[var(--ticker-height,0px)] flex flex-col shadow-lg">
            <TopBar />
            <nav className="w-full bg-gradient-to-r from-white via-white to-blue-50 border-b border-zinc-100">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <div className="flex justify-between items-center h-24">
                        {/* Logo (Left) */}
                        <Link href="/" className="flex items-center">
                            <div className="relative w-64 h-20">
                                <Image
                                    src="/images/logo.png"
                                    alt="School Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>

                        {/* Right Section: Navigation & Socials */}
                        <div className="hidden lg:flex items-center gap-12">
                            {/* Desktop Navigation */}
                            <div className="flex items-center gap-6 xl:gap-8">
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
                                        className="text-[11px] xl:text-[12px] font-black text-zinc-800 hover:text-[#5D1035] transition-colors uppercase tracking-widest relative group whitespace-nowrap"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5D1035] transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </div>

                            {/* Separator */}
                            <div className="h-6 w-px bg-zinc-200"></div>

                            {/* Social Icons & Search */}
                            <div className="flex items-center gap-6">
                                <Link href="https://facebook.com" target="_blank" className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Facebook className="w-5 h-5" />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Instagram className="w-5 h-5" />
                                </Link>
                                <Link href="https://youtube.com" target="_blank" className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Youtube className="w-6 h-6" />
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
