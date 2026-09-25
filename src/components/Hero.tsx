"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Code2, Award, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/BrandIcons";
import { useIntro } from "@/components/IntroLogo";

export function Hero() {
  const { isContentVisible, introPlayed, isMobile } = useIntro();

  // Parent variants container with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.06 : 0.08,
        delayChildren: 0.02,
      },
    },
  };

  // Child variant for each item: fade + slide up from y: 20
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 grid-bg border-b border-border-gold">
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

      <motion.div
        variants={containerVariants}
        initial={introPlayed ? "visible" : "hidden"}
        animate={isContentVisible ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8"
      >
        {/* CS Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 border border-border-gold/40 bg-bg-card/60 backdrop-blur-sm py-1 px-3 rounded-full"
        >
          <Code2 size={12} className="text-gold-accent animate-pulse" />
          <span className="font-heading text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-gold-accent uppercase">
            WEB-SLINGER // SUIT ENGINEER // CS @ MAHE
          </span>
        </motion.div>

        {/* 1. "Hello" Heading */}
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-gold-accent uppercase block">
            Hello, World // I am
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-offwhite">
            Thota Sai Eswar <span className="text-gold-accent">Srinath</span>
          </h1>
        </motion.div>

        {/* 2. Intro Paragraph */}
        <motion.div variants={itemVariants} className="space-y-3 max-w-2xl mx-auto">
          <p className="font-heading text-lg sm:text-xl font-light text-text-muted leading-relaxed">
            I swing in to build things people <span className="text-text-offwhite font-medium border-b border-gold-accent/40 pb-0.5">actually need</span> — founder of <span className="text-text-offwhite font-medium">GoFocusGen</span>, a gamified focus platform taking flight.
          </p>
          <p className="text-xs sm:text-sm text-text-muted/80 font-light leading-relaxed">
            CS student at MAHE Bengaluru building applied, real-world software across startup ed-tech, spacecraft ECLSS telemetry copilots, and IoT railway monitors.
          </p>
        </motion.div>

        {/* 3. Hero Stat Counters */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto py-2"
        >
          <div className="bg-[#111113] border border-border-gold/25 rounded-lg p-3 text-center gold-glow">
            <div className="font-heading text-xl sm:text-2xl font-bold text-text-offwhite">5+</div>
            <div className="font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
              Live Projects
            </div>
          </div>
          <div className="bg-[#111113] border border-border-gold/25 rounded-lg p-3 text-center gold-glow">
            <div className="font-heading text-xl sm:text-2xl font-bold text-gold-accent flex items-center justify-center gap-1">
              <Award size={16} /> 1st
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
              Aero-Hack
            </div>
          </div>
          <div className="bg-[#111113] border border-border-gold/25 rounded-lg p-3 text-center gold-glow">
            <div className="font-heading text-xl sm:text-2xl font-bold text-spidey-blue">7.25</div>
            <div className="font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
              MAHE CGPA
            </div>
          </div>
          <div className="bg-[#111113] border border-border-gold/25 rounded-lg p-3 text-center gold-glow">
            <div className="font-heading text-xl sm:text-2xl font-bold text-emerald-400 flex items-center justify-center gap-1">
              <Zap size={14} /> &lt;250ms
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
              AI Latency
            </div>
          </div>
        </motion.div>

        {/* 4. Hero Visual: Action CTAs & Telemetry */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
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
          variants={itemVariants}
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
      </motion.div>

      {/* Scroll Down Technical Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-muted/40 animate-pulse pointer-events-none">
        <span className="font-heading text-[8px] tracking-[0.3em] uppercase">SWING DOWN</span>
        <ArrowDown size={12} />
      </div>
    </section>
  );
}
