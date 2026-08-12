"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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
            SRINATH<span className="text-gold-accent font-light">.DEV</span>
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-heading text-[10px] tracking-[0.1em] font-semibold text-emerald-400 uppercase">
            System: Active // Available
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-heading text-[10px] tracking-[0.1em] font-semibold text-emerald-400 uppercase">
              System: Active // Available
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
