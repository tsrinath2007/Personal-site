"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/BrandIcons";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 grid-bg border-b border-border-gold">
      {/* Absolute tech grids & glowing effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/50 via-transparent to-[#0A0A0C]" />
      
      {/* Dual Spidey Red & Blue ambient glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-spidey-blue/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Decorative Technical Info overlay on corners */}
      <div className="absolute bottom-6 left-6 hidden lg:block text-left font-mono text-[10px] text-text-muted/60 leading-relaxed border-l border-border-gold/30 pl-3">
        <div>LOC // QUEENS, NY & BENGALURU</div>
        <div>SYS // STARK-SUIT OS V3.1.2</div>
        <div>WEBS // 100% FLUID CAPACITY</div>
      </div>

      <div className="absolute bottom-6 right-6 hidden lg:block text-right font-mono text-[10px] text-text-muted/60 leading-relaxed border-r border-border-gold/30 pr-3">
        <div>PULSE // SPIDER-SENSE CALIBRATED</div>
        <div>BUILD // SPIDER-BOT.V2-LATEST</div>
        <div>PING // 14MS VERCEL-QUEENS</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        {/* CS Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 border border-border-gold/40 bg-bg-card/60 backdrop-blur-sm py-1 px-3 rounded-full"
        >
          <Code2 size={12} className="text-gold-accent animate-pulse" />
          <span className="font-heading text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-gold-accent uppercase">
            WEB-SLINGER // SUIT ENGINEER // CS @ MANIPAL
          </span>
        </motion.div>

        {/* Big Name */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-offwhite"
          >
            Thota Sai Eswar <span className="text-gold-accent">Srinath</span>
          </motion.h1>

          {/* Tagline / Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-lg sm:text-xl md:text-2xl font-light text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            I swing in to build things people <span className="text-text-offwhite font-medium border-b border-gold-accent/40 pb-0.5">actually need</span> — currently weaving GoFocusGen, a gamified focus platform taking flight.
          </motion.p>
        </div>

        {/* Punchy Details */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs sm:text-sm text-text-muted/80 max-w-xl mx-auto font-light"
        >
          Neighborhood friendly product engineer with spider-like reflexes for rapid prototyping, complex API integrations, and crafting responsive user interfaces.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-gold-accent text-bg-dark font-heading text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-[#F3C63F] hover:shadow-lg hover:shadow-gold-accent/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Shoot to Projects
            <ArrowDown size={14} className="animate-bounce" />
          </a>
          
          <a
            href="/resume.pdf"
            download
            className="w-full sm:w-auto px-8 py-3.5 border border-border-gold bg-[#111113]/40 hover:bg-bg-card-hover font-heading text-xs font-bold tracking-[0.2em] uppercase rounded hover:border-gold-accent transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FileText size={14} className="text-gold-accent" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Icons Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-6 pt-6 text-text-muted"
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
        <span className="font-heading text-[8px] tracking-[0.3em] uppercase">SWING DOWN</span>
        <ArrowDown size={12} />
      </div>
    </section>
  );
}
