"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomTicker from "./BottomTicker";
import SmoothScroll from "./SmoothScroll";
import AdmissionPopup from "./AdmissionPopup";
import WhatsAppWidget from "./WhatsAppWidget";
import UserSync from "./UserSync";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </main>
            <Footer />
            <BottomTicker />
            <AdmissionPopup />
            <WhatsAppWidget />
            <UserSync />
        </>
    );
}
