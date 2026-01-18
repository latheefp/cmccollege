"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    Instagram, Search, Menu, X, Facebook, Youtube,
    Home, Info, LayoutGrid, GraduationCap, UserPlus,
    Users, Sparkles, Building2, Image as ImageIcon, Phone
} from "lucide-react";

import TopBar from "./TopBar";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();

    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        return null;
    }

    return (
        <header className="fixed w-full z-50 top-[var(--ticker-height,0px)] flex flex-col shadow-lg">
            <TopBar />
            <nav className="w-full bg-gradient-to-r from-white via-white to-blue-50 border-b border-zinc-100">
                <div className="w-full px-4 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-22 py-2">
                        {/* Logo (Left) */}
                        <Link href="/" className="flex items-center ml-0 lg:ml-[50px]">
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
                                    { name: "DEPARTMENTS", href: "/departments" },
                                    { name: "CAMPUS LIFE", href: "/campus-life" },
                                    { name: "AMENITIES", href: "/facilities" },
                                    { name: "GALLERY", href: "/gallery" },
                                    { name: "CONTACT", href: "/contact" },
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-[10px] lg:text-[11px] 2xl:text-[13px] font-black uppercase tracking-widest relative group whitespace-nowrap transition-colors
                                            ${pathname === link.href ? "text-[#5D1035]" : "text-zinc-800 hover:text-[#5D1035]"}`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#5D1035] transition-all duration-300 
                                            ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`}></span>
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
                            <div className="h-6 w-[2px] bg-emerald-900"></div>

                            {/* Social Icons & Search */}
                            <div className="flex items-center gap-3">
                                <Link href="https://facebook.com" target="_blank" className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Facebook className="w-5 h-5" />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" className="text-[#5D1035] hover:opacity-80 transition-opacity">
                                    <Instagram className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-[#5D1035] hover:opacity-80 transition-opacity"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Buttons */}
                        <div className="lg:hidden flex items-center gap-2">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-zinc-600 hover:text-[#5D1035] transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-6 h-6" />
                            </button>
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

                    {/* Mobile Navigation Drawer */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="lg:hidden overflow-hidden"
                            >
                                <div className="py-6 px-4 bg-white/95 backdrop-blur-md border-t border-emerald-50 rounded-b-[2.5rem] shadow-2xl mb-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { name: "Home", href: "/", icon: Home },
                                            { name: "About", href: "/about", icon: Info },
                                            { name: "Academics", href: "/academics", icon: GraduationCap },
                                            { name: "Admission", href: "/admissions", icon: UserPlus },
                                            { name: "Departments", href: "/departments", icon: LayoutGrid },
                                            { name: "Campus Life", href: "/campus-life", icon: Sparkles },
                                            { name: "Students", href: "/students-zone", icon: Users },
                                            { name: "Amenities", href: "/facilities", icon: Building2 },
                                            { name: "Gallery", href: "/gallery", icon: ImageIcon },
                                            { name: "Contact", href: "/contact", icon: Phone },
                                        ].map((link, index) => (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.03 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all border ${pathname === link.href
                                                        ? "bg-[#5D1035] border-[#5D1035] text-white shadow-lg"
                                                        : "bg-emerald-50/50 border-emerald-100/50 text-zinc-600 active:bg-emerald-100"
                                                        }`}
                                                >
                                                    <link.icon className={`w-6 h-6 mb-2 ${pathname === link.href ? "text-white" : "text-[#5D1035]"}`} />
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-center">{link.name}</span>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Mobile Social Icons */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="mt-8 pt-8 border-t border-zinc-100 flex items-center justify-between px-2"
                                    >
                                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Connect with us</span>
                                        <div className="flex items-center gap-4">
                                            <Link href="https://instagram.com" target="_blank" className="p-3 bg-emerald-50 rounded-xl text-[#5D1035]">
                                                <Instagram className="w-6 h-6" />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsSearchOpen(true);
                                                }}
                                                className="p-3 bg-emerald-50 rounded-xl text-[#5D1035]"
                                            >
                                                <Search className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
}
