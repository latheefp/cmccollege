"use client";

import { Download, BookOpen } from "lucide-react";

export default function ProspectusPage() {
    return (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
            <h1 className="text-3xl font-bold text-[#004d40] mb-6 font-serif">College Prospectus 2024-25</h1>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 bg-zinc-100 rounded-xl aspect-[3/4] flex items-center justify-center border border-zinc-200">
                    <BookOpen className="w-24 h-24 text-zinc-300" />
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-zinc-800 mb-4">Your Guide to Academic Excellence</h2>
                    <p className="text-zinc-600 mb-6 leading-relaxed">
                        The College Prospectus contains detailed information about admission procedures, course structures, fee details, and general rules and regulations. It is an essential guide for all prospective students and parents.
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                            <h3 className="font-semibold text-emerald-900 mb-1">Key Information:</h3>
                            <ul className="list-disc list-inside text-sm text-emerald-800 space-y-1">
                                <li>Admission Eligibility & Criteria</li>
                                <li>Detailed Course Syllabus Outlines</li>
                                <li>Fee Structure & Payment Options</li>
                                <li>Code of Conduct & Discipline</li>
                            </ul>
                        </div>

                        <a
                            href="/downloads/college_prospectus.pdf"
                            download
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#003d33] transition-all hover:-translate-y-1 shadow-lg shadow-emerald-900/10 w-full md:w-auto"
                        >
                            <Download className="w-5 h-5" />
                            Download Prospectus (PDF)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
