import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ceramelle — Handcrafted Contemporary Indian Ceramics",
  description: "Premium handcrafted ceramics designed for slow mornings, beautiful tables, and everyday rituals. Meticulously shaped and fired in India.",
  metadataBase: new URL("https://ceramelle.in"),
  openGraph: {
    title: "Ceramelle — Handcrafted Contemporary Indian Ceramics",
    description: "Premium handcrafted ceramics designed for slow mornings, beautiful tables, and everyday rituals.",
    siteName: "Ceramelle",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-espresso selection:bg-clay/10 selection:text-clay">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
