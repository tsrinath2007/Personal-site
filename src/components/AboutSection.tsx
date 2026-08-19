"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users2, Target, Zap } from "lucide-react";

export function AboutSection() {
  const traits = [
    {
      icon: <GraduationCap size={20} className="text-gold-accent" />,
      title: "CS DEPT ENGINEER @ MANIPAL",
      description: "Computer Science at Manipal Academy of Higher Education (MAHE), 2025–2029. Based in Bengaluru, anchoring product engineering in systems and clean transit algorithms."
    },
    {
      icon: <Zap size={20} className="text-gold-accent" />,
      title: "RAPID TRANSIT CODE",
      description: "A fast, iterative product builder. Swiftly designs systems and modular code under tight hackathon schedules — leveraging automated agents and quick deployment reflexes."
    },
    {
      icon: <Users2 size={20} className="text-gold-accent" />,
      title: "COACH COORDINATOR",
      description: "Steps up to coordinate systems and teams during tight schedules. Dedicated to shipping fast, keeping departments aligned, and meeting the transit deadline."
    },
    {
      icon: <Target size={20} className="text-gold-accent" />,
      title: "SAFETY PROTOCOLS FIRST",
      description: "Believes that great code must serve real commuters. Every project starts with a real system need, ensuring robust logic that runs safely on every deployment loop."
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
            04 // PASSENGER BIO & DEPT CONTEXT
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
              Engineering solutions that run on time.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I am Thota Sai Eswar Srinath, a CS student based in Bengaluru (2025–2029) and a builder at heart. 
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I build systems and modular code that commuters actually need — shipping fast, keeping what&apos;s useful, and resolving structural bottlenecks. Whether it&apos;s spacecraft life-support telemetry or study platform algorithms, my goal is software that runs smoothly, handles load, and remains stable.
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
