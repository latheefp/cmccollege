import Link from "next/link";

export default function TopBar() {
    return (
        <div className="w-full bg-[#5D1035] text-white py-1.5 px-6 border-b border-white/10 relative overflow-hidden">
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] md:text-xs font-medium tracking-widest uppercase relative z-10">
                {/* Left Side */}
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
                    <span className="opacity-90 font-semibold text-white/90">Incubation Center</span>
                </div>

                {/* Right Side */}
                <div className="flex items-center font-bold gap-6 text-white/80 text-[12px]">
                    <Link href="/research" className="hover:text-white hover:scale-105 transition-all duration-300">Research</Link>
                    <Link href="/iqac" className="hover:text-white hover:scale-105 transition-all duration-300">IQAC</Link>
                    <Link href="/alumni" className="hover:text-white hover:scale-105 transition-all duration-300">Alumni</Link>
                    <Link href="/careers" className="hover:text-white hover:scale-105 transition-all duration-300">Careers</Link>
                </div>
            </div>
        </div>
    );
}
