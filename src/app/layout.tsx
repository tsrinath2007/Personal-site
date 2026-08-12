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
  title: "Srinath | CS Student & Hackathon Builder",
  description: "Personal portfolio of Srinath, a CS student at Manipal and builder of AI, full-stack products, and gamified web applications.",
  metadataBase: new URL("https://srinath.dev"),
  openGraph: {
    title: "Srinath | CS Student & Hackathon Builder",
    description: "CS Student at Manipal. Builder of AI agents, ECLSS space monitoring copilots, gamified learning systems, and edge IoT devices.",
    siteName: "Srinath Portfolio",
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
