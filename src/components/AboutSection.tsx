"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users2, Target, Zap } from "lucide-react";

export function AboutSection() {
  const traits = [
    {
      icon: <GraduationCap size={20} className="text-gold-accent" />,
      title: "THE SCIENCE MAJOR",
      description: "Pursuing Computer Science at Manipal Academy of Higher Education (MAHE), 2025–2029. Based in Bengaluru, grounding web formulations in core systems, algorithms, and clean engineering."
    },
    {
      icon: <Zap size={20} className="text-gold-accent" />,
      title: "SPIDER-REFLEXES",
      description: "A fast, iterative product builder. Swiftly codes the apps and grids he actually needs under pressure — using developer agents and quick reflexes to ship products in record time."
    },
    {
      icon: <Users2 size={20} className="text-gold-accent" />,
      title: "TEAM-UP READY",
      description: "Steps up to lead when the city needs it, especially under pressure. Hardworking to a fault — shows up, puts in the hours, and never skips out on a team rescue."
    },
    {
      icon: <Target size={20} className="text-gold-accent" />,
      title: "GREAT RESPONSIBILITY",
      description: "Believes that with great developer power comes great responsibility. Every project starts with a real-world problem. If it doesn't solve a user need, it doesn't get built."
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
            04 // ORIGIN STORY & SUIT SPECS
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-offwhite leading-relaxed">
              Weaving solutions that make an impact.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I am Thota Sai Eswar Srinath, a CS student based in Bengaluru (2025–2029) and a builder at heart. 
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I swing in to code the apps and sites I actually need — shipping fast, keeping what&apos;s useful, cutting what isn&apos;t. Whether it&apos;s spacecraft life-support modules or a study platform taking flight, my goal is software that feels substantial, responsive, and genuinely useful to the neighborhood.
            </p>
          </motion.div>

          {/* Traits List */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {traits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 90, damping: 13, delay: index * 0.12 }}
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
