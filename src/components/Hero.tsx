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
      
      {/* Technical ambient gold glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Technical Info overlay on corners */}
      <div className="absolute bottom-6 left-6 hidden lg:block text-left font-mono text-[10px] text-text-muted/60 leading-relaxed border-l border-border-gold/30 pl-3">
        <div>LOC // MANIPAL ACADEMY OF HIGHER EDUCATION</div>
        <div>IP // 172.16.8.109</div>
        <div>SYS // DARWIN X86_64</div>
      </div>

      <div className="absolute bottom-6 right-6 hidden lg:block text-right font-mono text-[10px] text-text-muted/60 leading-relaxed border-r border-border-gold/30 pr-3">
        <div>ENV // PRODUCTION</div>
        <div>BUILD // V2.8.5-LATEST</div>
        <div>PING // 14MS VERCEL-DELHI</div>
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
            FOUNDER, GOFOCUSGEN // CS STUDENT @ MANIPAL
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
            I build things people <span className="text-text-offwhite font-medium border-b border-gold-accent/40 pb-0.5">actually need</span> — right now, that's GoFocusGen, a gamified study platform I'm building into a startup.
          </motion.p>
        </div>

        {/* Punchy Details */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs sm:text-sm text-text-muted/80 max-w-xl mx-auto font-light"
        >
          Fast-paced product engineer specialized in rapid prototyping, complex API integrations, and robust real-time communication stacks. Focused on creating immersive user interfaces.
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
            View Projects
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
        <span className="font-heading text-[8px] tracking-[0.3em] uppercase">SCROLL ENGINE</span>
        <ArrowDown size={12} />
      </div>
    </section>
  );
}
