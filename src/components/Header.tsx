"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X } from "lucide-react";

const TrainIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width="16"
    height="16"
  >
    {/* Metro Train Front Silhouette */}
    <path d="M4,16 C4,19 6,20 12,20 C18,20 20,19 20,16 L20,6 C20,3 17,2 12,2 C7,2 4,3 4,6 L4,16 Z" />
    {/* Windshield */}
    <path d="M6,5 C6,4.5 7,4 12,4 C17,4 18,4.5 18,5 L18,9 L6,9 L6,5 Z" fill="#0A0A0C" />
    {/* Headlights */}
    <circle cx="8" cy="15" r="1" fill="#F4B223" />
    <circle cx="16" cy="15" r="1" fill="#F4B223" />
    {/* BMRCL stripe */}
    <rect x="6" y="10" width="12" height="1.5" fill="#008450" />
    <rect x="6" y="11.5" width="12" height="1.5" fill="#5A2D82" />
  </svg>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "PROJECTS", href: "#projects" },
    { label: "HACKATHONS", href: "#hackathons" },
    { label: "STACK", href: "#stack" },
    { label: "ABOUT", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#0A0A0C]/90 backdrop-blur-md border-border-gold py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Console Label */}
        <a
          href="#"
          className="flex items-center gap-2 group font-heading font-bold text-lg tracking-wider text-text-offwhite hover:text-gold-accent transition-colors"
        >
          <Terminal size={18} className="text-gold-accent group-hover:rotate-12 transition-transform duration-300" />
          <span>
            SRINATH<span className="text-gold-accent font-light">.METRO</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-heading text-xs font-semibold tracking-[0.2em] text-text-muted hover:text-gold-accent transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Technical Status Indicator */}
        <div className="hidden md:flex items-center gap-3 border border-border-gold bg-[#111113] py-1.5 px-3.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-heading text-[10px] tracking-[0.1em] font-semibold text-emerald-400 uppercase">
            BMRCL: Purple & Green Lines Active
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-text-offwhite hover:text-gold-accent transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0C] border-b border-border-gold py-6 px-6 space-y-4 flex flex-col items-start gold-glow animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-sm font-semibold tracking-[0.2em] text-text-muted hover:text-gold-accent transition-colors duration-300 w-full py-2"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-3 border border-border-gold bg-[#111113] py-2 px-4 rounded-full w-full mt-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-heading text-[10px] tracking-[0.1em] font-semibold text-emerald-400 uppercase">
              BMRCL: Purple & Green Lines Active
            </span>
          </div>
        </div>
      )}

      {/* Web Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-visible">
        <div
          className="h-full bg-gradient-to-r from-[#5A2D82] to-[#008450] transition-all duration-75 relative"
          style={{ width: `${scrollPercent}%` }}
        >
          {scrollPercent > 0 && (
            <div
              className="absolute -right-2 -top-[7px] text-[#F4B223]"
            >
              <TrainIcon />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
