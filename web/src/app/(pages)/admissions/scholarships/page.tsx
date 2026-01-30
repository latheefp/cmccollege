"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, Award, Building } from "lucide-react";

// Mock Data
const GOVERNMENT_SCHOLARSHIPS = [
    {
        title: "Post-Matric Scholarship",
        amount: "₹6,000 - ₹10,000 / year",
        eligibility: "Students from minority communities with >50% marks in previous exam.",
        description: "Supports meritorious students belonging to economically weaker sections of minority communities."
    },
    {
        title: "Central Sector Scheme of Scholarship",
        amount: "₹10,000 / year",
        eligibility: "Students above 80th percentile in Class 12.",
        description: "Provided by the Department of Higher Education for college and university students."
    },
    {
        title: "State Merit Scholarship",
        amount: "₹5,000 / year",
        eligibility: "Top performers in Higher Secondary Examination within the state.",
        description: "Encourages students to pursue higher education by rewarding academic brilliance."
    },
    {
        title: "District Merit Scholarship",
        amount: "₹4,000 / year",
        eligibility: "Top scorers at the district level in SSLC/HSE.",
        description: "Recognizes and supports talented students at the district level."
    },
    {
        title: "Higher Education Scholarship",
        amount: "₹12,000 - ₹20,000 / year",
        eligibility: "First year degree students from BPL families engaging in Science/Humanities.",
        description: "Substantial financial aid for pursuing degrees in non-professional courses."
    },
    {
        title: "Single Girl Child Scholarship",
        amount: "₹2,000 / month",
        eligibility: "Only girl child in the family pursuing PG.",
        description: "UGC scheme to support education of single girl children in families."
    },
];

const MANAGEMENT_SCHOLARSHIPS = [
    {
        title: "CM Merit Scholarship",
        amount: "50% Tuition Fee Waiver",
        eligibility: "Students with >90% in Class 12.",
        description: "Awarded to high achievers to recognize and promote academic excellence."
    },
    {
        title: "Founder's Memorial Scholarship",
        amount: "Full Tuition Fee Waiver",
        eligibility: "Economically challenged students with excellent academic record.",
        description: "In memory of our founder to support deserving students in need."
    },
    {
        title: "Sports Excellence Grant",
        amount: "₹15,000 / year",
        eligibility: "State or National level representation in sports.",
        description: "Supports athletes in balancing their academic and sporting careers."
    },
    {
        title: "Arts & Cultural Scholarship",
        amount: "₹10,000 / year",
        eligibility: "Winners of state-level arts festivals.",
        description: "Encourages talents in music, dance, and other fine arts."
    },
    {
        title: "Economically Weaker Section Aid",
        amount: "variable",
        eligibility: "Family income below defined threshold.",
        description: "Financial assistance to ensure education is accessible to all."
    },
    {
        title: "Alumni Association Scholarship",
        amount: "₹8,000 / year",
        eligibility: "Selected based on interview and academic potential.",
        description: "Sponsored by the CM College Alumni Association for bright students."
    },
    {
        title: "Principal's Special Award",
        amount: "One-time ₹5,000",
        eligibility: "Best outgoing student or exemplary conduct.",
        description: "Discretionary award for outstanding character and leadership."
    },
    {
        title: "Academic Topper Prize",
        amount: "₹5,000 / semester",
        eligibility: "Semester toppers in each department.",
        description: "Rewards consistent academic performance throughout the course."
    },
    {
        title: "Student Leadership Grant",
        amount: "₹3,000 / year",
        eligibility: "Active members of the Student Council.",
        description: "For students demonstrating exceptional leadership skills."
    },
    {
        title: "Community Service Award",
        amount: "₹4,000 / year",
        eligibility: "Volunteers with >100 hours of NSS/NCC service.",
        description: "Recognizes contributions to social service and community building."
    },
];

export default function ScholarshipsPage() {
    const [activeTab, setActiveTab] = useState<"govt" | "mgmt">("govt");

    return (
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-zinc-100 min-h-[80vh]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-emerald-900 mb-2 font-serif">Scholarships & Financial Aid</h1>
                <p className="text-zinc-600">
                    We believe financial constraints should not be a barrier to education. Explore our range of government and management scholarships.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-zinc-100 rounded-xl mb-8 w-full md:w-fit">
                <button
                    onClick={() => setActiveTab("govt")}
                    className={cn(
                        "flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all flex-1 md:flex-initial",
                        activeTab === "govt"
                            ? "bg-white text-emerald-900 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-700"
                    )}
                >
                    <Building className="w-4 h-4" />
                    Government ({GOVERNMENT_SCHOLARSHIPS.length})
                </button>
                <button
                    onClick={() => setActiveTab("mgmt")}
                    className={cn(
                        "flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all flex-1 md:flex-initial",
                        activeTab === "mgmt"
                            ? "bg-white text-emerald-900 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-700"
                    )}
                >
                    <Award className="w-4 h-4" />
                    Management ({MANAGEMENT_SCHOLARSHIPS.length})
                </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(activeTab === "govt" ? GOVERNMENT_SCHOLARSHIPS : MANAGEMENT_SCHOLARSHIPS).map((sch, idx) => (
                    <div
                        key={idx}
                        className="p-5 rounded-2xl border border-zinc-100 hover:border-emerald-200 hover:shadow-md transition-all bg-white group flex items-center gap-4"
                    >
                        <div className="p-3 bg-emerald-50 rounded-xl shrink-0">
                            <GraduationCap className="w-6 h-6 text-emerald-900" />
                        </div>

                        <h3 className="font-bold text-lg text-zinc-900 group-hover:text-emerald-900 transition-colors">
                            {sch.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
