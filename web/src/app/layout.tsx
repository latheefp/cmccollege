import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomTicker from "@/components/BottomTicker";
import AdmissionPopup from "@/components/AdmissionPopup";
import UserSync from "@/components/UserSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Name | Academic Excellence with Islamic Values",
  description: "Integrated +1 / +2 School offering Science and Commerce streams with Islamic moral training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased pt-[var(--ticker-height,0px)]`}
        >
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <BottomTicker />
          <AdmissionPopup />
          <UserSync />
        </body>
      </html>
    </ClerkProvider>
  );
}
