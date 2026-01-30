"use client";

import { Download, FileText } from "lucide-react";

export default function BrochurePage() {
    return (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
            <h1 className="text-3xl font-bold text-emerald-900 mb-6 font-serif">College Brochure</h1>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 bg-zinc-100 rounded-xl aspect-3/4 flex items-center justify-center border border-zinc-200">
                    <FileText className="w-24 h-24 text-zinc-300" />
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-zinc-800 mb-4">Discover Life at our College</h2>
                    <p className="text-zinc-600 mb-6 leading-relaxed">
                        Our college brochure provides a comprehensive overview of our institution, including academic programs, campus facilities, student life, and achievements. Download the brochure to learn more about what makes our college a unique place for higher learning.
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                            <h3 className="font-semibold text-emerald-900 mb-1">Inside this brochure:</h3>
                            <ul className="list-disc list-inside text-sm text-emerald-800 space-y-1">
                                <li>Academic Departments & Faculty</li>
                                <li>Infrastructure & Facilities</li>
                                <li>Placement & Career Support</li>
                                <li>Student Activities & Clubs</li>
                            </ul>
                        </div>

                        <a
                            href="/downloads/college_brochure.pdf"
                            download
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-900 text-white font-bold rounded-xl hover:bg-emerald-950 transition-all hover:-translate-y-1 shadow-lg shadow-emerald-900/10 w-full md:w-auto"
                        >
                            <Download className="w-5 h-5" />
                            Download Brochure (PDF)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
