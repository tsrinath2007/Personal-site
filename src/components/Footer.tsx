"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-sand/30 border-t border-beige-border pt-16 pb-8 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Editorial Brand Intro */}
        <div className="space-y-4">
          <Link href="/" className="font-editorial text-2xl font-semibold tracking-wider text-espresso">
            CERAMELLE
          </Link>
          <p className="font-functional text-xs text-espresso/60 leading-relaxed max-w-sm">
            Handcrafted ceramics designed for slow mornings, beautiful tables, and everyday rituals. Made with love and fire in India.
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="https://www.instagram.com/ceramelle.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-espresso/60 hover:text-clay transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-[18px] h-[18px] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="#"
              className="text-espresso/60 hover:text-clay transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-[18px] h-[18px] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="mailto:studio@ceramelle.in"
              className="text-espresso/60 hover:text-clay transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Column 1: Shop */}
        <div>
          <h3 className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/45 mb-4">
            Shop
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/shop?category=mugs" className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors">
                Mugs & Cups
              </Link>
            </li>
            <li>
              <Link href="/shop?category=dinnerware" className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors">
                Salad Plates
              </Link>
            </li>
            <li>
              <Link href="/shop?category=bowls" className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors">
                Noodle Bowls
              </Link>
            </li>
            <li>
              <Link href="/shop?category=vases" className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors">
                Sculptural Vases
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Information */}
        <div>
          <h3 className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/45 mb-4">
            Our Studio
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/story" className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/story#journal" className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors">
                The Journal
              </Link>
            </li>
            <li>
              <Link href="/story#craft" className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors">
                The Process
              </Link>
            </li>
            <li>
              <button
                onClick={() => alert("Free shipping on orders above ₹2,500 across India. Delivered securely in plastic-free packaging.")}
                className="font-functional text-xs text-espresso/70 hover:text-clay transition-colors text-left"
              >
                Shipping & Returns
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Editorial Newsletter */}
        <div className="space-y-4">
          <h3 className="font-functional text-[10px] font-bold tracking-widest uppercase text-espresso/45 mb-1">
            Studio Journal
          </h3>
          <p className="font-functional text-xs text-espresso/60 leading-relaxed">
            Subscribe for early access to kiln openings, studio stories, and new collections.
          </p>
          <form onSubmit={handleSubscribe} className="relative border-b border-espresso/25 pb-2 flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full font-functional text-xs bg-transparent border-none outline-none text-espresso placeholder:text-espresso/30 pr-8"
              required
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-espresso hover:text-clay transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={14} />
            </button>
          </form>
          {subscribed && (
            <p className="font-functional text-[10px] text-clay font-medium animate-fade-in">
              Thank you. You will hear from us soon.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-beige-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-functional text-espresso/40">
        <p className="mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Ceramelle. Design for slow living.
        </p>
        <div className="flex space-x-6">
          <button onClick={() => alert("Privacy Policy simulated.")} className="hover:text-clay transition-colors">Privacy Policy</button>
          <button onClick={() => alert("Terms of Service simulated.")} className="hover:text-clay transition-colors">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};
