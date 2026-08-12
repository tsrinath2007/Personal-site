"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users2, Target, Zap } from "lucide-react";

export function AboutSection() {
  const traits = [
    {
      icon: <GraduationCap size={20} className="text-gold-accent" />,
      title: "CS AT MANIPAL",
      description: "Pursuing Computer Science at Manipal Academy of Higher Education (MAHE), 2025–2029. Based in Bengaluru, grounding product engineering in core systems and algorithms."
    },
    {
      icon: <Zap size={20} className="text-gold-accent" />,
      title: "VIBE CODING SPEED",
      description: "A fast, iterative product builder. Vibe-codes the apps and sites he actually needs — leveraging modern developer agents and LLMs to turn ideas into deployable products in hours."
    },
    {
      icon: <Users2 size={20} className="text-gold-accent" />,
      title: "HACKATHON TEAM PLAYER",
      description: "Steps up to lead when it counts, especially under pressure. Hardworking to a fault — shows up, puts in the hours, and never skips on effort, no matter how tight the deadline."
    },
    {
      icon: <Target size={20} className="text-gold-accent" />,
      title: "BUILDS FOR REAL USE",
      description: "Cares less about impressive demos, more about whether something actually gets used. Every project starts with a real problem, not a cool tech stack."
    }
  ];

  return (
    <section id="about" className="py-24 relative border-b border-border-gold bg-[#111113]">
      <div className="absolute inset-0 bg-[#0A0A0C]/50 pointer-events-none" />
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            04 // OPERATIONAL CONTEXT
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            About Srinath
          </h2>
          <div className="h-[1px] w-24 bg-gold-accent/40" />
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-offwhite leading-relaxed">
              Building things people actually need.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I am Thota Sai Eswar Srinath (often known simply as Srinath), a CS student based in Bengaluru (2025–2029) and a builder at heart.
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I vibe-code the apps and sites I actually need — shipping fast, keeping what's useful, cutting what isn't. Whether it's spacecraft life-support modules or a study platform I'm turning into a startup, my goal is software that feels substantial, responsive, and genuinely useful.
            </p>
          </motion.div>

          {/* Traits List */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {traits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-[#0A0A0C] border border-border-gold/20 hover:border-gold-accent/40 rounded-lg p-6 transition-all duration-300 gold-glow flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 border-b border-border-dark pb-3">
                  <span className="p-2 bg-[#111113] border border-border-dark rounded-md">
                    {trait.icon}
                  </span>
                  <h4 className="font-heading text-xs font-bold tracking-[0.15em] text-text-offwhite uppercase">
                    {trait.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {trait.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
