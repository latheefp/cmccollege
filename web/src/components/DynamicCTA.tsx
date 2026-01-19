import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useAdmissionStatus } from "@/hooks/useAdmissionStatus";

interface DynamicCTAProps {
    className?: string;
    description?: string; // Optional override for closed state description
}

export default function DynamicCTA({ className = "py-20 px-6 bg-emerald-900 text-white text-center", description }: DynamicCTAProps) {
    const { isAdmissionOpen } = useAdmissionStatus();

    return (
        <section className={className}>
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-agency font-bold mb-6 text-white text-center">
                    {isAdmissionOpen ? "Ready to begin your journey?" : "Plan Your Future With Us"}
                </h2>
                <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    {isAdmissionOpen
                        ? "Join a community dedicated to excellence. Apply today or request a prospectus to learn more about our programs."
                        : (description || "Explore our academic programs and facilities. Contact us to know about the next admission cycle.")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href={isAdmissionOpen ? "/admissions" : "/contact"}>
                        <button className="px-8 py-3 bg-white text-[#7B0046] font-bold rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-transform text-base cursor-pointer">
                            {isAdmissionOpen ? "Apply Now" : "Contact Us"}
                        </button>
                    </Link>
                    {isAdmissionOpen && (
                        <Link href="/contact">
                            <button className="px-8 py-3 bg-transparent border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 hover:scale-105 active:scale-95 transition-all text-base cursor-pointer backdrop-blur-sm">
                                Request Prospectus
                            </button>
                        </Link>
                    )}
                </div>
            </ScrollReveal>
        </section>
    );
}
