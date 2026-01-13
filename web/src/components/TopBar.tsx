import Link from "next/link";

export default function TopBar() {
    return (
        <div className="w-full bg-emerald-900 text-white py-2 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] md:text-xs font-medium tracking-wider uppercase">
                {/* Left Side */}
                <div className="flex items-center">
                    <span>Centre for Competitive Examination</span>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4 text-emerald-100/80">
                    <Link href="/research" className="hover:text-white transition-colors">Research</Link>
                    <span className="hidden md:inline text-emerald-800">|</span>
                    <Link href="/iqac" className="hover:text-white transition-colors">IQAC</Link>
                    <span className="hidden md:inline text-emerald-800">|</span>
                    <Link href="/alumni" className="hover:text-white transition-colors">Alumni</Link>
                    <span className="hidden md:inline text-emerald-800">|</span>
                    <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                </div>
            </div>
        </div>
    );
}
