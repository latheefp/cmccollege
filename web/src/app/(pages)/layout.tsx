import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomTicker from "@/components/BottomTicker";
import AdmissionPopup from "@/components/AdmissionPopup";
import UserSync from "@/components/UserSync";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
