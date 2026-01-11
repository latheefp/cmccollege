import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-emerald-950 text-emerald-50 py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* School Info */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-emerald-950 font-bold">
                            S
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            School Name
                        </span>
                    </div>
                    <p className="text-emerald-200/80 leading-relaxed mb-6">
                        Providing high-quality integrated education with strong Islamic values to nurture the leaders of tomorrow.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholder */}
                        {["FB", "TW", "IG", "YT"].map((social) => (
                            <div
                                key={social}
                                className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
                            >
                                {social}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/about" className="hover:text-white transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/academics" className="hover:text-white transition-colors">
                                Academic Programs
                            </Link>
                        </li>
                        <li>
                            <Link href="/admissions" className="hover:text-white transition-colors">
                                Admissions
                            </Link>
                        </li>
                        <li>
                            <Link href="/facilities" className="hover:text-white transition-colors">
                                Facilities
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-white font-bold mb-6">Resources</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/gallery" className="hover:text-white transition-colors">
                                Student Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className="hover:text-white transition-colors">
                                Latest News
                            </Link>
                        </li>
                        <li>
                            <Link href="/calendar" className="hover:text-white transition-colors">
                                Academic Calendar
                            </Link>
                        </li>
                        <li>
                            <Link href="/careers" className="hover:text-white transition-colors">
                                Join our Faculty
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold mb-6">Contact Us</h4>
                    <ul className="space-y-4 text-emerald-200/80">
                        <li className="flex gap-3">
                            <span className="text-white italic">📍</span>
                            123 Educational Street, Knowledge City, State, Country
                        </li>
                        <li className="flex gap-3">
                            <span className="text-white italic">📞</span>
                            +1 234 567 890
                        </li>
                        <li className="flex gap-3">
                            <span className="text-white italic">✉️</span>
                            info@schoolname.edu
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-emerald-900/50 text-center text-sm text-emerald-200/40">
                <p>&copy; {new Date().getFullYear()} School Name. All rights reserved.</p>
            </div>
        </footer>
    );
}
