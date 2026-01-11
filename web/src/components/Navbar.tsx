"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            S
                        </div>
                        <span className="text-xl font-bold text-emerald-900 tracking-tight">
                            School Name
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-zinc-600 hover:text-emerald-800 font-medium transition-colors">
                            Home
                        </Link>
                        <Link href="/about" className="text-zinc-600 hover:text-emerald-800 font-medium transition-colors">
                            About
                        </Link>
                        <Link href="/academics" className="text-zinc-600 hover:text-emerald-800 font-medium transition-colors">
                            Academics
                        </Link>
                        <Link href="/facilities" className="text-zinc-600 hover:text-emerald-800 font-medium transition-colors">
                            Facilities
                        </Link>
                        <Link href="/contact" className="text-zinc-600 hover:text-emerald-800 font-medium transition-colors">
                            Contact
                        </Link>
                        <button className="px-6 py-2.5 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-colors shadow-sm">
                            Admissions
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
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
                    <div className="md:hidden py-6 border-t border-emerald-50 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-zinc-600 hover:text-emerald-800 transition-colors px-2"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-zinc-600 hover:text-emerald-800 transition-colors px-2"
                        >
                            About
                        </Link>
                        <Link
                            href="/academics"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-zinc-600 hover:text-emerald-800 transition-colors px-2"
                        >
                            Academics
                        </Link>
                        <Link
                            href="/facilities"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-zinc-600 hover:text-emerald-800 transition-colors px-2"
                        >
                            Facilities
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-zinc-600 hover:text-emerald-800 transition-colors px-2"
                        >
                            Contact
                        </Link>
                        <button className="w-full mt-2 px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-colors shadow-sm">
                            Admissions
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
