import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useAdmissionStatus } from "@/hooks/useAdmissionStatus";

interface DynamicCTAProps {
    className?: string;
    description?: string; // Optional override for closed state description
    variant?: "default" | "glass"; // New prop for visual style
}

export default function DynamicCTA({
    className,
    description,
    variant = "default"
}: DynamicCTAProps) {
    const { isAdmissionOpen } = useAdmissionStatus();

    // Default styles (Dark)
    const baseStyles = className || "py-12 md:py-20 px-6 bg-emerald-900 text-white text-center";
    const titleColor = variant === "glass" ? "text-emerald-900" : "text-white";
    const descColor = variant === "glass" ? "text-emerald-800/80" : "text-emerald-100";

    // Button Styles
    const primaryBtnStyles = variant === "glass"
        ? "px-8 py-3 bg-emerald-900/10 backdrop-blur-md border border-emerald-900/10 text-emerald-900 font-bold rounded-lg shadow-sm hover:bg-emerald-900/20 hover:scale-105 active:scale-95 transition-all text-base cursor-pointer"
        : "px-8 py-3 bg-white text-[#7B0046] font-bold rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-transform text-base cursor-pointer";

    const secondaryBtnStyles = variant === "glass"
        ? "px-8 py-3 bg-white/40 backdrop-blur-md border border-emerald-900/20 text-emerald-900 font-bold rounded-lg hover:bg-white/60 hover:scale-105 active:scale-95 transition-all text-base cursor-pointer"
        : "px-8 py-3 bg-transparent border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 hover:scale-105 active:scale-95 transition-all text-base cursor-pointer backdrop-blur-sm";

    return (
        <section className={variant === "glass" ? "py-24 px-6 bg-emerald-50 text-center relative overflow-hidden" : baseStyles}>
            {variant === "glass" && (
                <div className="absolute inset-0 pointer-events-none opacity-40"
                    style={{ backgroundImage: "radial-gradient(#064e3b 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}
                />
            )}

            <ScrollReveal className="relative z-10">
                <h2 className={`text-3xl md:text-5xl font-agency font-bold mb-6 ${titleColor} text-center`}>
                    {isAdmissionOpen ? "Ready to begin your journey?" : "Plan Your Future With Us"}
                </h2>
                <p className={`${descColor} text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed`}>
                    {isAdmissionOpen
                        ? "Join a community dedicated to excellence. Apply today or request a prospectus to learn more about our programs."
                        : (description || "Explore our academic programs and facilities. Contact us to know about the next admission cycle.")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href={isAdmissionOpen ? "/admissions" : "/contact"}>
                        <button className={primaryBtnStyles}>
                            {isAdmissionOpen ? "Apply Now" : "Contact Us"}
                        </button>
                    </Link>
                    {isAdmissionOpen && (
                        <Link href="/contact">
                            <button className={secondaryBtnStyles}>
                                Request Prospectus
                            </button>
                        </Link>
                    )}
                </div>
            </ScrollReveal>
        </section>
    );
}
