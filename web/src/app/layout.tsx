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
  title: "CM College of Art and Science – Nadavayal, Wayanad",
  description: "Welcome to CM College of Arts and Science, I am proud to lead an institution that stands for better quality education, good discipline, and strong human values.",
  keywords: ["CM College", "Arts and Science", "Nadavayal", "Wayanad", "Education", "Kerala College", "Higher Education"],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "CM College of Art and Science – Nadavayal, Wayanad",
    description: "Welcome to CM College of Arts and Science, a premier institution for higher education in Wayanad.",
    url: "https://cmcollege.edu.in",
    siteName: "CM College of Art and Science",
    images: [
      {
        url: "/favicon.png", // Ideally should be a larger OG image
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "CM College of Art and Science",
                "alternateName": "CM College",
                "url": "https://cmcollege.edu.in",
                "logo": "https://cmcollege.edu.in/favicon.png",
                "description": "Welcome to CM College of Arts and Science, a premier institution for higher education in Wayanad.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Nadavayal",
                  "addressLocality": "Wayanad",
                  "addressRegion": "Kerala",
                  "postalCode": "670721",
                  "addressCountry": "IN"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9072462310",
                  "contactType": "admissions",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Malayalam"]
                },
                "sameAs": [
                  "https://www.facebook.com/cmcollege",
                  "https://www.instagram.com/cmcollege"
                ]
              })
            }}
          />
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
