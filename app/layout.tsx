import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Questly — Interactive Learning & Quiz Platform",
    template: "%s | Questly",
  },
  description:
    "Platform interaktif dengan gamifikasi untuk membuat dan mengerjakan modul pembelajaran, kuis, dan asesmen. Dilengkapi berbagai tipe soal, pelacakan progres, dan sistem XP.",
  keywords: [
    "questly",
    "quiz platform",
    "learning platform",
    "interactive quiz",
    "gamified learning",
    "assessment",
    "education",
    "e-learning",
  ],
  authors: [{ name: "Questly" }],
  creator: "Questly",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Questly",
    title: "Questly — Interactive Learning & Quiz Platform",
    description:
      "Platform interaktif dengan gamifikasi untuk modul pembelajaran, kuis, dan asesmen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Questly — Interactive Learning & Quiz Platform",
    description:
      "Platform interaktif dengan gamifikasi untuk modul pembelajaran, kuis, dan asesmen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Questly",
    description:
      "Platform interaktif dengan gamifikasi untuk modul pembelajaran, kuis, dan asesmen.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
  };

  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
