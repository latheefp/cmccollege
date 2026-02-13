"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";

interface InstitutionsCarouselProps {
    items: string[];
}

export default function InstitutionsCarousel({ items }: InstitutionsCarouselProps) {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items, ...items];

    // Using a more manual approach for precise control over the marquee
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.scrollWidth / 3);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [items]);

    // Speed control
    const baseVelocity = -1.0; // Significantly increased for noticeable speed
    const velocity = useSpring(isHovered ? baseVelocity * 0.1 : baseVelocity, {
        damping: 40,
        stiffness: 200
    });

    useAnimationFrame(() => {
        if (containerWidth === 0) return;

        let newX = x.get() + velocity.get();

        // Reset X when it reaches the end of one set of items
        if (newX <= -containerWidth) {
            newX += containerWidth;
        } else if (newX > 0) {
            newX -= containerWidth;
        }

        x.set(newX);
    });

    return (
        <div className="relative w-full overflow-hidden py-12">
            {/* Mask gradients for smooth fade out at edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#fcf9f5] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#fcf9f5] to-transparent z-10 pointer-events-none" />

            <div
                className="flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    ref={containerRef}
                    style={{ x }}
                    className="flex gap-6 md:gap-12 px-6"
                >
                    {duplicatedItems.map((logo, idx) => (
                        <div
                            key={`${idx}`}
                            className="relative shrink-0 group/card"
                        >
                            <div className="relative w-32 h-20 md:w-52 md:h-32 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm transition-all duration-500 group-hover/card:shadow-xl group-hover/card:shadow-maroon-900/5 group-hover/card:-translate-y-1 flex items-center justify-center p-4 md:p-8">
                                {/* Subtle Inner Glow on Hover */}
                                <div className="absolute inset-0 bg-linear-to-br from-white to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity rounded-2xl" />

                                <div className="relative w-full h-full">
                                    <Image
                                        src={logo}
                                        alt={`Institution Logo`}
                                        fill
                                        sizes="(max-width: 768px) 128px, 208px"
                                        className={`object-contain scale-[1.3] transition-all duration-700 opacity-90 group-hover/card:opacity-100 group-hover/card:scale-110 ${logo.includes("CM%20COLLEGE") ? "scale-125 md:scale-150" : "scale-100"
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Decorative line below on hover */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#7a0b3a]/30 rounded-full group-hover/card:w-1/2 transition-all duration-500" />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-[#7a0b3a]/5 to-transparent pointer-events-none" />
        </div>
    );
}
