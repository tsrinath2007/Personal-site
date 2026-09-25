import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thota Sai Eswar Srinath | CS Student & Founder — GoFocusGen",
  description: "Personal portfolio of Thota Sai Eswar Srinath, CS student at MAHE Bengaluru and Founder of GoFocusGen, building spacecraft ECLSS copilots, railway safety sensors, and applied AI systems.",
  metadataBase: new URL("https://srinathdev.vercel.app"),
  openGraph: {
    title: "Thota Sai Eswar Srinath | CS Student & Founder — GoFocusGen",
    description: "CS Student at MAHE Bengaluru & Founder of GoFocusGen. Portfolio featuring telemetry dashboards, moving railway models, and study flight paths.",
    siteName: "Srinath's Namma Metro Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-bg-dark text-text-offwhite selection:bg-gold-accent/20 selection:text-gold-accent font-sans">
        {children}
      </body>
    </html>
  );
}

