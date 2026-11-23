import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"]
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "SES.Builds",
  description: "Srinath, CS student at MAHE Bengaluru and founder of GoFocusGen and Bujji. Voice RAG, on-device AI privacy and edge computing.",
  metadataBase: new URL("https://sesbuilds.vercel.app"),
  openGraph: {
    title: "SES.Builds",
    description: "Srinath, CS student at MAHE Bengaluru and founder of GoFocusGen and Bujji. Voice RAG, on-device AI privacy and edge computing.",
    url: "https://sesbuilds.vercel.app",
    siteName: "SES.Builds",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SES.Builds - Painted desk workspace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SES.Builds",
    description: "Srinath, CS student at MAHE Bengaluru and founder of GoFocusGen and Bujji. Voice RAG, on-device AI privacy and edge computing.",
    images: ["/og-image.png"],
    creator: "@sesbuilds"
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
      className={`${newsreader.variable} ${ibmPlexMono.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
