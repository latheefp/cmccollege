import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomeMap() {
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.1791483701704!2d76.1184646750565!3d11.752426588461985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5e04811c1dbdd%3A0x5d4927c6b73bcc2!2sCM%20College!5e0!3m2!1sen!2sin!4v1768847350815!5m2!1sen!2sin";
    const locationLink = "https://maps.app.goo.gl/YourMapLinkHere"; // Would need actual link for QR, using placeholder/search link for now if exact CID link isn't handy. 
    // Actually, I'll use the search link or just coordinates for QR.
    const qrData = "https://maps.google.com/?q=C.M+College+of+Arts+and+Science,+Nadavayal,+Wayanad";
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}&color=5D1035`;

    return (
        <section className="bg-white border-b border-gray-100">
            <div className="flex flex-col lg:flex-row h-[500px] lg:h-[450px]">
                {/* Left: Map (Takes full width on mobile, flexible on desktop) */}
                <div className="relative w-full lg:flex-grow h-full">
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="transition-all duration-700"
                    ></iframe>
                </div>

                {/* Right: QR Code (Hidden on mobile) */}
                <div className="hidden lg:flex w-[400px] bg-[#fdfdfd] flex-col items-center justify-center p-8 text-center border-l border-gray-100 shadow-inner">
                    <ScrollReveal>
                        <div className="mb-6">
                            <span className="inline-block p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <Image
                                    src={qrCodeUrl}
                                    alt="Scan for Location"
                                    width={200}
                                    height={200}
                                    className="rounded-xl"
                                    unoptimized
                                />
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#5D1035] mb-2 uppercase tracking-wide">Find Us on Map</h3>
                        <p className="text-zinc-500 text-sm max-w-[250px] mx-auto leading-relaxed">
                            Scan the QR code to open the college location directly on your phone.
                        </p>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
