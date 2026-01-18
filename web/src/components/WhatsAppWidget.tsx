"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";
import Image from "next/image";

// Replace with actual college number
const WHATSAPP_NUMBER = "916282592895";
const DEFAULT_MESSAGE = "Hi, I would like to know more about admissions.";

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = () => {
        const text = message.trim() || DEFAULT_MESSAGE;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
        setMessage("");
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">

            {/* Chat Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="w-[320px] sm:w-[360px] bg-[#E9E9EB] dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-[#075E54] p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-white/20">
                                        <Image
                                            src="/favicon.png" // Using logo as avatar
                                            alt="Support"
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#075E54]"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight">CM College Support</h3>
                                    <p className="text-[10px] sm:text-xs text-green-100 opacity-90">Typically replies instantly</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body (Chat Area) */}
                        <div className="flex-1 p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-20 min-h-[250px] flex flex-col justify-end gap-3">

                            {/* System Message */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="self-start max-w-[85%] bg-white dark:bg-zinc-800 p-3 rounded-b-xl rounded-tr-xl shadow-sm text-sm text-zinc-800 dark:text-zinc-200"
                            >
                                <p>Hi there! 👋 <br /> How can we help you today?</p>
                                <span className="text-[9px] text-zinc-400 block text-right mt-1">10:00 AM</span>
                            </motion.div>

                        </div>

                        {/* Footer (Input) */}
                        <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#25D366] transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="w-10 h-10 flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full transition-all shadow-sm flex-shrink-0"
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center z-50 group hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-shadow duration-300"
            >
                {/* Pulse Animation */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-tippy-pulse"></span>

                {isOpen ? (
                    <X className="w-7 h-7 sm:w-8 sm:h-8" />
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471.148-.67.445-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                )}

                {/* Notification Dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="w-full h-full animate-ping bg-red-500 rounded-full opacity-75 absolute inline-flex"></span>
                    </span>
                )}
            </motion.button>

        </div>
    );
}
