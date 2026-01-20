"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-zinc-50 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-3xl"
                />
            </div>

            <div className="relative z-10 text-center max-w-2xl px-4">
                {/* Floating 404 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <motion.h1
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-[120px] md:text-[200px] font-bold text-zinc-900 leading-none tracking-tighter select-none"
                    >
                        404
                    </motion.h1>

                    {/* Decorative ghost/search icon floating nearby */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute -top-4 -right-4 md:top-4 md:right-12 bg-white p-4 rounded-2xl shadow-lg border border-zinc-100 hidden md:block"
                    >
                        <Search className="w-8 h-8 text-zinc-400" />
                    </motion.div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-6 space-y-4"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
                        Oops! You've wandered off campus.
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-md mx-auto">
                        The page you are looking for doesn't exist or has been moved. Let's get you back to safety.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto px-8 py-3 rounded-full border border-zinc-200 text-zinc-600 font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-3 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>

            {/* Footer Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 text-sm text-zinc-400"
            >
                Lost? Contact us at <a href="mailto:info@cmcollege.edu.in" className="text-zinc-600 hover:underline">info@cmcollege.edu.in</a>
            </motion.p>
        </div>
    );
}
