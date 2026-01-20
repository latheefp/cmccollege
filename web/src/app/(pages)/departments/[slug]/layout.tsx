import Link from "next/link";
import { DEPARTMENT_DATA } from "@/data/departments";
import DepartmentSidebar from "@/components/DepartmentSidebar";
import DepartmentCTA from "@/components/DepartmentCTA";

export default async function DepartmentLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = DEPARTMENT_DATA[slug] || DEPARTMENT_DATA["computer-science"];
    const deptName = data.displayName || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <main className="min-h-screen bg-[#FDFCFB] text-zinc-900 pt-[112px]">
            {/* --- HERO / HEADER SECTION --- */}
            <section className="relative py-16 md:py-24 px-6 lg:px-24 bg-white border-b border-zinc-100 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8 font-medium">
                        <Link href="/" className="hover:text-[#5D1035] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/departments" className="hover:text-[#5D1035] transition-colors">Departments</Link>
                        <span>/</span>
                        <span className="text-zinc-900">{deptName}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-zinc-900 mb-6 leading-tight">
                                Department of <br />
                                <span className="text-[#5D1035] italic relative inline-block">
                                    {deptName}
                                    <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#5D1035]/20 rounded-full" />
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                                Empowering students through innovation, rigorous research, and total career readiness for the global landscape.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none" />
            </section>

            {/* --- CONTENT WITH SIDEBAR --- */}
            <div className="py-20 px-6 lg:px-24">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar */}
                    <DepartmentSidebar />

                    {/* Right Content */}
                    <div className="flex-1 w-full min-w-0">
                        {children}
                    </div>
                </div>
            </div>

            {/* --- CTA SECTION --- */}
            <DepartmentCTA />
        </main>
    );
}
