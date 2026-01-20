import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
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
          className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${oswald.variable} antialiased pt-[var(--ticker-height,0px)]`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

