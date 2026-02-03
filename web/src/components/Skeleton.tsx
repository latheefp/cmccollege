"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
    variant?: "rect" | "circle" | "text" | "rounded";
}

export default function Skeleton({ className = "", variant = "rect" }: SkeletonProps) {
    const variants = {
        rect: "rounded-none",
        circle: "rounded-full",
        text: "rounded-md h-4 w-full",
        rounded: "rounded-2xl"
    };

    return (
        <div
            className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 ${variants[variant]} ${className}`}
        >
            <motion.div
                className="absolute inset-0"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                }}
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
            />
        </div>
    );
}
