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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center z-50 group hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-300"
            >
                {/* Continuous Pulse Animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping"></span>
                <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-30 animate-pulse"></span>

                {isOpen ? (
                    <X className="w-8 h-8 text-white relative z-10" />
                ) : (
                    <div className="relative w-full h-full p-0.5">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            alt="WhatsApp"
                            fill
                            className="object-contain drop-shadow-md"
                        />
                    </div>
                )}

                {/* Red Notification Badge */}
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm z-20">
                        <span className="text-[10px] font-bold text-white">1</span>
                    </div>
                )}
            </motion.button>

        </div>
    );
}
