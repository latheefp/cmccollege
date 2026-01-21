"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DepartmentSidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Extract slug from pathname: /departments/[slug]/...
    // Example: /departments/computer-science/vision
    const segments = pathname.split("/");
    const slug = segments[2]; // segments[0] is "", [1] is "departments", [2] is slug

    if (!slug) return null;

    const baseUrl = `/departments/${slug}`;

    const sidebarItems = [
        { name: "About the Department", href: baseUrl, exact: true },
        { name: "Vision & Mission", href: `${baseUrl}/vision-mission` },
        { name: "Key Highlights", href: `${baseUrl}/key-highlights` },
        { name: "Courses Offered", href: `${baseUrl}/courses` },
        { name: "Faculty", href: `${baseUrl}/faculty` },
        { name: "Gallery", href: `${baseUrl}/gallery` }
    ];

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
                    className="w-full flex items-center justify-between bg-[#5D1035] text-white p-4 rounded-lg shadow-md font-bold uppercase tracking-wider"
                >
                    <span>Department Menu</span>
                    {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar Content */}
            <div className={`lg:block ${isMobileOpen ? "block" : "hidden"}`}>
                <div className="bg-white rounded-2xl p-2 border border-zinc-100 shadow-xl shadow-zinc-200/50">
                    <div className="px-5 py-4 border-b border-zinc-50 mb-2">
                        <h3 className="font-bold font-serif text-lg text-zinc-800 tracking-tight">In this Section</h3>
                    </div>
                    <nav className="space-y-1">
                        <ul className="space-y-1">
                            {sidebarItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`group relative block px-5 py-4 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden
                                            ${isActive(item.href, item.exact)
                                                ? "bg-[#5D1035] text-white shadow-lg shadow-[#5D1035]/20 translate-x-1"
                                                : "text-zinc-600 hover:bg-[#5D1035]/5 hover:text-[#5D1035] hover:pl-7"
                                            }`}
                                        onClick={() => setIsMobileOpen(false)}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        {/* Hover Indicator */}
                                        {!isActive(item.href, item.exact) && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5D1035] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
}
