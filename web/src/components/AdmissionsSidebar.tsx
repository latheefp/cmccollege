"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    GraduationCap,
    BookOpen,
    FileText,
    ChevronRight,
    Globe
} from "lucide-react";

const menuItems = [
    {
        label: "Scholarships",
        href: "/admissions/scholarships",
        icon: GraduationCap,
    },
    {
        label: "College Brochure",
        href: "/admissions/brochure",
        icon: BookOpen,
    },
    {
        label: "College Prospectus",
        href: "/admissions/prospectus",
        icon: FileText,
    },
    {
        label: "Apply Online",
        href: "https://cmc.embase.in/admission",
        icon: Globe,
    },
];

export default function AdmissionsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full">
            <div className="bg-[#fcf9f5] rounded-xl border border-[#e5e0d8] overflow-hidden shadow-sm sticky top-28">
                <div className="p-6 bg-emerald-900 text-white">
                    <h3 className="font-bold font-serif text-xl tracking-wide">Admissions</h3>
                </div>
                <nav className="p-3">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isExternal = item.href.startsWith("http");
                            const isActive = pathname === item.href;

                            const Icon = item.icon;

                            const commonClasses = cn(
                                "flex items-center justify-between px-4 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 border-l-4 group w-full text-left",
                                isActive
                                    ? "bg-white border-emerald-900 text-emerald-900 shadow-sm"
                                    : "border-transparent text-zinc-700 hover:bg-zinc-100 hover:text-emerald-900"
                            );

                            const content = (
                                <>
                                    <div className="flex items-center gap-3">
                                        <Icon className={cn("w-5 h-5", isActive ? "text-emerald-900" : "text-zinc-400 group-hover:text-emerald-900")} />
                                        <span>{item.label}</span>
                                    </div>
                                    {isActive && (
                                        <ChevronRight className="w-4 h-4 text-emerald-900" />
                                    )}
                                </>
                            );

                            return (
                                <li key={item.label}>
                                    {isExternal ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={commonClasses}
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={commonClasses}
                                        >
                                            {content}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Quick Help Box */}
                    <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Need Help?</p>
                        <p className="text-sm text-zinc-600 mb-3">Contact our admission office for guidance.</p>
                        <Link href="/contact" className="text-sm font-semibold text-emerald-900 hover:underline">
                            Contact Us &rarr;
                        </Link>
                    </div>
                </nav>
            </div>
        </aside>
    );
}
