"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X } from "lucide-react";

const SpiderIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width="12"
    height="12"
  >
    {/* Body */}
    <circle cx="12" cy="10" r="2.5" />
    <circle cx="12" cy="14.5" r="3.5" />
    {/* Head */}
    <circle cx="12" cy="6.5" r="1.5" />
    {/* Eyes */}
    <circle cx="11.2" cy="5.8" r="0.4" fill="white" />
    <circle cx="12.8" cy="5.8" r="0.4" fill="white" />
    {/* Legs Left */}
    <path d="M9.5,8.5 C8,7.5 7,9 7,9" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M9.2,11 C7.5,10.5 6.5,12 6.5,12" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M9.2,13.5 C7.5,14 6.5,15.5 6.5,15.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M9.8,16 C8.5,17.5 7.5,19 7.5,19" stroke="currentColor" strokeWidth="0.8" fill="none" />
    {/* Legs Right */}
    <path d="M14.5,8.5 C16,7.5 17,9 17,9" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M14.8,11 C16.5,10.5 17.5,12 17.5,12" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M14.8,13.5 C16.5,14 17.5,15.5 17.5,15.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M14.2,16 C15.5,17.5 16.5,19 16.5,19" stroke="currentColor" strokeWidth="0.8" fill="none" />
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
            SRINATH<span className="text-gold-accent font-light">.WEB</span>
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-accent"></span>
          </span>
          <span className="font-heading text-[10px] tracking-[0.1em] font-semibold text-gold-accent uppercase">
            System: Spider-Sense Active // Patrolling
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-accent"></span>
            </span>
            <span className="font-heading text-[10px] tracking-[0.1em] font-semibold text-gold-accent uppercase">
              System: Spider-Sense Active // Patrolling
            </span>
          </div>
        </div>
      )}

      {/* Web Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 overflow-visible">
        <div
          className="h-full bg-gold-accent transition-all duration-75 relative"
          style={{ width: `${scrollPercent}%` }}
        >
          {scrollPercent > 0 && (
            <div
              className="absolute -right-1.5 -top-[5.5px] text-gold-accent"
              style={{ transform: "rotate(90deg)" }}
            >
              <SpiderIcon />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
