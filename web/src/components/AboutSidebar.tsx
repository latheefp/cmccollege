"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
    { name: "About College", href: "/about", exact: true },
    { name: "Vision and Mission", href: "/about/vision" },
    { name: "Institutional Distinctiveness", href: "/about/institutional-distinctiveness" },
    { name: "Growth and Expansion", href: "/about/growth-expansion" },
    {
        name: "Administration",
        href: "#",
        subItems: [
            { name: "Principal", href: "/about/principal" },
            { name: "Vice Principal", href: "/about/vice-principal" },
            { name: "Administrative Council", href: "/about/administration/council" },
            { name: "Office Administration", href: "/about/administration/office" },
        ]
    },
    { name: "Management", href: "/about/management" },
    { name: "Statutory Bodies", href: "/about/statutory-bodies" },
    { name: "College Committees", href: "/about/committees" },
    { name: "Accreditations & Ranking", href: "/about/accreditations" },
    { name: "Recognitions", href: "/about/recognitions" },
    { name: "Policy Documents", href: "/about/policies" },
    { name: "Sister Institutions", href: "/about/sister-institutions" },
];

export default function AboutSidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSections, setOpenSections] = useState<string[]>(["Administration"]); // Default keep Administration open or closed? Let's keep it open if active.

    const toggleSection = (name: string) => {
        setOpenSections(prev =>
            prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
        );
    };

    const isActive = (href: string, exact = false) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-32 lg:self-start h-fit">
            {/* Mobile Toggle */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="w-full flex items-center justify-between bg-[#7a0b3a] text-white p-4 rounded-lg shadow-md font-bold uppercase tracking-wider"
                >
                    <span>In this section</span>
                    {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar Content */}
            <div className={`lg:block ${isMobileOpen ? "block" : "hidden"}`}>
                <div className="bg-[#fcf9f5] rounded-xl border border-[#e5e0d8] overflow-hidden shadow-sm">
                    <div className="p-6 bg-[#7a0b3a] text-white">
                        <h3 className="font-bold font-serif text-xl tracking-wide">About Us</h3>
                    </div>
                    <nav className="p-3">
                        <ul className="space-y-1">
                            {sidebarItems.map((item) => {
                                const active = item.exact
                                    ? pathname === item.href
                                    : (item.subItems ? item.subItems.some(sub => pathname.startsWith(sub.href)) : pathname.startsWith(item.href));

                                const isExpanded = openSections.includes(item.name);

                                return (
                                    <li key={item.name}>
                                        {item.subItems ? (
                                            <div>
                                                <button
                                                    onClick={() => toggleSection(item.name)}
                                                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-200
                                                        ${active ? "bg-[#7a0b3a]/5 text-[#7a0b3a]" : "text-zinc-700 hover:bg-zinc-100"}`}
                                                >
                                                    {item.name}
                                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                </button>
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.ul
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden ml-4 pl-2 border-l-2 border-zinc-200 mt-1 space-y-1"
                                                        >
                                                            {item.subItems.map(sub => {
                                                                const subActive = pathname === sub.href;
                                                                return (
                                                                    <li key={sub.name}>
                                                                        <Link
                                                                            href={sub.href}
                                                                            className={`block px-4 py-2.5 text-sm rounded-md transition-colors w-full text-left
                                                                                ${subActive
                                                                                    ? "bg-[#7a0b3a] text-white shadow-md font-medium"
                                                                                    : "text-zinc-600 hover:text-[#7a0b3a] hover:bg-zinc-50"
                                                                                }`}
                                                                            onClick={() => setIsMobileOpen(false)}
                                                                        >
                                                                            {sub.name}
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`block px-4 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 border-l-4 
                                                    ${isActive(item.href, item.exact)
                                                        ? "bg-white border-[#7a0b3a] text-[#7a0b3a] shadow-sm"
                                                        : "border-transparent text-zinc-700 hover:bg-zinc-100 hover:text-[#7a0b3a]"
                                                    }`}
                                                onClick={() => setIsMobileOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
}
