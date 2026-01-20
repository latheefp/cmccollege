"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    Search, Menu, X, ChevronDown, Facebook, Instagram
} from "lucide-react";

import TopBar from "./TopBar";
import SearchOverlay from "./SearchOverlay";
import { useAdmissionStatus } from "@/hooks/useAdmissionStatus";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        return null;
    }

    const navigation = [
        { name: "Home", href: "/" },
        {
            name: "About Us",
            href: "/about",
            dropdown: [
                { name: "Management", href: "/about/management" },
                { name: "Administrative Council", href: "/about/council" },
                { name: "Principal", href: "/about/principal" },
            ]
        },
        {
            name: "Departments",
            href: "/departments",
            dropdown: [
                { name: "Computer Science", href: "/departments/computer-science" },
                { name: "Management", href: "/departments/management" },
                { name: "Mass Communication", href: "/departments/mass-communication" },
                { name: "Economics", href: "/departments/economics" },
                { name: "English", href: "/departments/english" },
                { name: "Commerce", href: "/departments/commerce" },
                { name: "Statistics", href: "/departments/statistics" },
                { name: "Psychology", href: "/departments/psychology" },
            ]
        },
        { name: "Academics", href: "/academics" },
        { name: "Students Zone", href: "/students-zone" },
        { name: "Campus Life", href: "/campus-life" },
        { name: "Amenities", href: "/amenities" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="fixed w-full z-50 top-[var(--ticker-height,0px)] flex flex-col shadow-sm">
            <TopBar />
            <nav className="w-full bg-white/95 backdrop-blur-md border-b border-zinc-100">
                <div className="w-full px-4 lg:px-8">
                    <div className="flex justify-between items-center h-20 lg:h-24">
                        {/* Logo (Left) */}
                        <Link href="/" className="flex items-center ml-0 lg:ml-[50px]">
                            <div className="relative w-44 lg:w-52 2xl:w-64 h-16 lg:h-20 2xl:h-24">
                                <Image
                                    src="https://ik.imagekit.io/5c6j602yp/Home/images/logo2.png"
                                    alt="College Logo"
                                    fill
                                    className="object-contain scale-[1.7]"
                                />
                            </div>
                        </Link>

                        {/* Right Section: Navigation & Socials */}
                        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                            {/* Desktop Navigation */}
                            <div className="flex items-center gap-0.5 xl:gap-1">
                                {navigation.map((link) => (
                                    <div
                                        key={link.name}
                                        className="relative group h-24 flex items-center"
                                        onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                                        onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`px-2 py-2 text-[13px] xl:text-[14px] font-bold uppercase tracking-wide transition-colors relative z-10 flex items-center gap-1
                                                ${pathname === link.href || (link.dropdown && pathname.startsWith(link.href)) ? "text-[#7a0b3a]" : "text-zinc-700 hover:text-[#7a0b3a]"}`}
                                        >
                                            {link.name}
                                            {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />}
                                        </Link>

                                        {/* Hover Underline */}
                                        <span className={`absolute bottom-6 left-3 right-3 h-0.5 bg-[#7a0b3a] transition-all duration-300 origin-left scale-x-0 
                                            ${(pathname === link.href || activeDropdown === link.name) ? "scale-x-100" : "group-hover:scale-x-100"}`}
                                        />

                                        {/* Dropdown Menu */}
                                        {link.dropdown && (
                                            <AnimatePresence>
                                                {activeDropdown === link.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                                                        animate={{ opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                                                        exit={{ opacity: 0, y: 10, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="absolute top-full left-0 min-w-[200px] bg-[#7a0b3a] rounded-lg shadow-xl overflow-hidden py-2"
                                                    >
                                                        {link.dropdown.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="block px-4 py-2.5 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors font-medium border-l-2 border-transparent hover:border-white"
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-8 w-px bg-zinc-200"></div>

                            {/* Search & Socials */}
                            <div className="flex items-center gap-1">
                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                    className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-50 text-[#7a0b3a] hover:shadow-md hover:shadow-[#7a0b3a]/10 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[#7a0b3a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <Facebook size={18} className="relative z-10 transition-colors duration-300 group-hover:text-white" />
                                </Link>

                                <Link
                                    href="https://www.instagram.com/cm_college_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-50 text-[#7a0b3a] hover:shadow-md hover:shadow-[#7a0b3a]/10 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[#7a0b3a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <Instagram size={18} className="relative z-10 transition-colors duration-300 group-hover:text-white" />
                                </Link>

                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-50 text-[#7a0b3a] hover:shadow-md hover:shadow-[#7a0b3a]/10 transition-all duration-300 overflow-hidden ml-1"
                                >
                                    <div className="absolute inset-0 bg-[#7a0b3a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <Search size={18} className="relative z-10 transition-colors duration-300 group-hover:text-white" />
                                </button>

                                <div className="ml-2">
                                    <AdmissionButton />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="lg:hidden flex items-center gap-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-zinc-600 hover:text-[#7a0b3a] transition-colors"
                            >
                                <Search size={22} />
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-zinc-800 hover:text-[#7a0b3a] transition-colors"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                                className="lg:hidden overflow-hidden border-t border-zinc-100"
                            >
                                <div className="py-6 space-y-1">
                                    {navigation.map((link) => (
                                        <div key={link.name}>
                                            <div className="flex flex-col">
                                                {link.dropdown ? (
                                                    // Mobile Dropdown Toggle
                                                    <div className="overflow-hidden">
                                                        <button
                                                            onClick={() => activeDropdown === link.name ? setActiveDropdown(null) : setActiveDropdown(link.name)}
                                                            className={`flex items-center justify-between w-full px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors
                                                                ${pathname.startsWith(link.href) ? "text-[#7a0b3a] bg-[#7a0b3a]/5" : "text-zinc-600 hover:bg-zinc-50"}`}
                                                        >
                                                            <span>{link.name}</span>
                                                            <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                                                        </button>

                                                        {/* Nested Mobile Links */}
                                                        <AnimatePresence>
                                                            {activeDropdown === link.name && (
                                                                <motion.div
                                                                    initial={{ height: 0 }}
                                                                    animate={{ height: "auto" }}
                                                                    exit={{ height: 0 }}
                                                                    className="bg-[#7a0b3a]/5"
                                                                >
                                                                    {link.dropdown.map(subItem => (
                                                                        <Link
                                                                            key={subItem.name}
                                                                            href={subItem.href}
                                                                            onClick={() => setIsOpen(false)}
                                                                            className="block px-8 py-3 text-sm text-[#7a0b3a] font-medium border-l-2 border-[#7a0b3a]/20 ml-4 hover:border-[#7a0b3a] transition-colors"
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors
                                                            ${pathname === link.href ? "text-[#7a0b3a] bg-[#7a0b3a]/5 border-r-4 border-[#7a0b3a]" : "text-zinc-600 hover:bg-zinc-50"}`}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Mobile Admission Button */}
                                    <div className="p-4 mt-4">
                                        <AdmissionButton fullWidth />
                                    </div>
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

function AdmissionButton({ fullWidth = false }: { fullWidth?: boolean }) {
    const { isAdmissionOpen } = useAdmissionStatus();

    return (
        <Link href="/admissions" className={fullWidth ? "block w-full" : "block"}>
            <button className={`
                relative bg-[#7a0b3a] text-white font-bold uppercase tracking-widest rounded-md overflow-hidden group hover:bg-[#60082d] transition-colors shadow-md hover:shadow-lg
                ${fullWidth ? "w-full py-4 text-sm" : "px-6 py-2.5 text-xs"}
            `}>
                <span className="relative z-10">{isAdmissionOpen ? "Admissions Open" : "Admission"}</span>
                {/* Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </button>
        </Link>
    );
}
