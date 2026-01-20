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
        { name: "Courses Offered", href: `${baseUrl}/courses` },
        { name: "Faculty", href: `${baseUrl}/faculty` },
        { name: "Gallery", href: `${baseUrl}/gallery` },
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
                <div className="bg-[#fcf9f5] rounded-xl border border-[#e5e0d8] overflow-hidden shadow-sm">
                    <div className="p-6 bg-[#5D1035] text-white">
                        <h3 className="font-bold font-serif text-xl tracking-wide">In this Section</h3>
                    </div>
                    <nav className="p-3">
                        <ul className="space-y-1">
                            {sidebarItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`block px-4 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 border-l-4 
                                            ${isActive(item.href, item.exact)
                                                ? "bg-white border-[#5D1035] text-[#5D1035] shadow-sm"
                                                : "border-transparent text-zinc-700 hover:bg-zinc-100 hover:text-[#5D1035]"
                                            }`}
                                        onClick={() => setIsMobileOpen(false)}
                                    >
                                        {item.name}
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
