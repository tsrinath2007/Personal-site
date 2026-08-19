"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Landmark } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/BrandIcons";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 grid-bg border-b border-border-gold">
      {/* Absolute tech grids & glowing effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/50 via-transparent to-[#0A0A0C]" />
      
      {/* Faint transit line background overlays */}
      <div className="absolute top-1/2 left-1/4 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-[#5A2D82]/10 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 left-2/4 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 left-3/4 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-[#008450]/10 to-transparent pointer-events-none hidden md:block" />

      {/* Dual BMRCL Purple & Green ambient glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#5A2D82]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#008450]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Scattered background halftone elements */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 dot-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-72 h-72 dot-bg opacity-15 pointer-events-none" />

      {/* Technical corner stats overlays */}
      <div className="absolute bottom-6 left-6 hidden lg:block text-left font-mono text-[10px] text-text-muted/60 leading-relaxed border-l border-border-gold/30 pl-3">
        <div>LOC // BENGALURU, IN</div>
        <div>SYS // METRO-TRAIN OS V4.0</div>
        <div>LINE // PURPLE & GREEN INTERCHANGE</div>
      </div>

      <div className="absolute bottom-6 right-6 hidden lg:block text-right font-mono text-[10px] text-text-muted/60 leading-relaxed border-r border-border-gold/30 pr-3">
        <div>STATUS // HIGH SPEED TRANSIT ACTIVE</div>
        <div>TICKET // CONTACTLESS TOKEN VERIFIED</div>
        <div>NETWORK // BMRCL MAIN OFFICE</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center space-y-10">
        
        {/* Kannada Welcomer Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-border-gold bg-[#111113]/80 backdrop-blur-sm py-1 px-4 rounded-full"
        >
          <Landmark size={12} className="text-gold-accent animate-pulse" />
          <span className="font-heading text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-gold-accent uppercase">
            ನಮ್ಮ ಮೆಟ್ರೋಗೆ ಸ್ವಾಗತ // WELCOME TO NAMMA METRO
          </span>
        </motion.div>

        {/* Scattered Typography (Delhi Metro style replica, but Bengaluru) */}
        <div className="relative w-full max-w-4xl h-[280px] sm:h-[350px] md:h-[420px] overflow-visible select-none">
          {/* Bengaluru */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-[2%] left-[2%] text-5xl sm:text-7xl md:text-8xl font-black font-heading text-[#ECECEC] tracking-tight"
          >
            Bengaluru
          </motion.div>

          {/* Metro */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-[20%] left-[26%] text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-[#C8B195]"
          >
            Metro
          </motion.div>

          {/* Mein */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-[10%] left-[64%] text-4xl sm:text-5xl md:text-6xl font-medium font-heading text-[#8EA2A2]"
          >
            Mein
          </motion.div>

          {/* Aapka */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-[48%] left-[45%] text-4xl sm:text-6xl md:text-7xl font-semibold font-heading text-[#DCA295]"
          >
            Aapka
          </motion.div>

          {/* Swagat */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-[20%] left-[4%] text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-[#A4B598]"
          >
            Swagat
          </motion.div>

          {/* Hai */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-[2%] right-[5%] text-5xl sm:text-7xl md:text-8xl font-black font-heading text-[#E8C570]"
          >
            Hai
          </motion.div>
        </div>

        {/* Subtitle description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center max-w-2xl space-y-4"
        >
          <p className="font-heading text-lg sm:text-xl font-light text-text-muted leading-relaxed">
            I build things people <span className="text-text-offwhite font-medium border-b border-[#5A2D82]/40 pb-0.5">actually need</span> — right now, that&apos;s GoFocusGen, a gamified focus platform taking flight.
          </p>
          <p className="text-xs sm:text-sm text-text-muted/70 font-light max-w-xl mx-auto">
            CS Student at Manipal & transit product engineer specialized in telemetry loops, real-time WebSockets, and building responsive user interfaces.
          </p>
        </motion.div>

        {/* Action Buttons & Card Wrapper */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full pt-4">
          
          {/* Namma Metro CSS Transit Smart Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.9 }}
            className="relative w-[300px] h-[175px] bg-[#111114] border border-zinc-800 rounded-xl p-4 shadow-2xl flex flex-col justify-between overflow-hidden group select-none hover:border-[#5A2D82]/50 hover:shadow-[#5A2D82]/10 transition-all duration-300"
          >
            {/* Diagonal Purple/Green stripe overlays */}
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-bl from-[#5A2D82]/10 via-[#008450]/10 to-transparent -skew-x-12 pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-[2px] h-full bg-[#5A2D82]/20 pointer-events-none" />
            <div className="absolute bottom-0 right-12 w-[1px] h-full bg-[#008450]/20 pointer-events-none" />

            {/* Top Row: Logo & Chip */}
            <div className="flex justify-between items-start">
              <div className="w-8 h-6 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-200 rounded border border-zinc-500 flex flex-col justify-around p-0.5">
                <div className="h-[0.5px] bg-zinc-600 w-full" />
                <div className="h-[0.5px] bg-zinc-600 w-full" />
                <div className="h-[0.5px] bg-zinc-600 w-full" />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-text-offwhite font-heading tracking-widest leading-none">BMRCL</div>
                <div className="text-[7px] text-[#008450] font-mono leading-none mt-0.5">NAMMA METRO</div>
              </div>
            </div>

            {/* Middle Row: Transit details */}
            <div className="space-y-1 font-mono text-[9px] text-text-muted mt-2">
              <div className="flex justify-between">
                <span>CARD HOLDER:</span>
                <span className="text-text-offwhite font-bold">SRINATH.DEV</span>
              </div>
              <div className="flex justify-between">
                <span>TRANSIT FARE:</span>
                <span className="text-text-offwhite">SINGLE JOURNEY</span>
              </div>
              <div className="flex justify-between">
                <span>GATE PASS:</span>
                <span className="text-emerald-400 font-bold">₹50 // ACTIVE</span>
              </div>
            </div>

            {/* Bottom Row: Contactless card label */}
            <div className="flex justify-between items-end border-t border-zinc-800/80 pt-2 text-[8px] font-mono text-text-muted/60">
              <span>BMRCL-CONTACTLESS-SMARTCARD</span>
              <span className="w-3 h-3 rounded-full border border-text-muted/40 animate-ping opacity-75" />
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.9 }}
            className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="px-8 py-3.5 bg-gradient-to-r from-[#5A2D82] to-[#008450] text-text-offwhite font-heading text-xs font-bold tracking-[0.2em] uppercase rounded hover:shadow-lg hover:shadow-[#5A2D82]/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Enter Transit
              <ArrowDown size={14} className="animate-bounce" />
            </a>
            
            <a
              href="/resume.pdf"
              download
              className="px-8 py-3.5 border border-border-gold bg-[#111113]/40 hover:bg-bg-card-hover font-heading text-xs font-bold tracking-[0.2em] uppercase rounded hover:border-gold-accent transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FileText size={14} className="text-gold-accent" />
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Social Icons Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-6 pt-2 text-text-muted"
        >
          <a
            href="https://github.com/tsrinath2007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-accent transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/tses/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-accent transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://x.com/_tsrinath_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-accent transition-colors"
            aria-label="Twitter Profile"
          >
            <XIcon size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Technical Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-muted/40 animate-pulse">
        <span className="font-heading text-[8px] tracking-[0.3em] uppercase">BOARD TRAIN</span>
        <ArrowDown size={12} />
      </div>
    </section>
  );
}
