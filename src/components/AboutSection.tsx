"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users2, Compass, Zap } from "lucide-react";

export function AboutSection() {
  const traits = [
    {
      icon: <GraduationCap size={20} className="text-gold-accent" />,
      title: "CS AT MANIPAL",
      description: "Pursuing Computer Science at Manipal Academy of Higher Education (MAHE). Grounding product engineering in core systems and algorithms."
    },
    {
      icon: <Zap size={20} className="text-gold-accent" />,
      title: "VIBE CODING SPEED",
      description: "A fast, iterative product builder. Leveraging modern developer agents and LLMs to transition ideas into deployable mockups in hours."
    },
    {
      icon: <Users2 size={20} className="text-gold-accent" />,
      title: "HACKATHON TEAM PLAYER",
      description: "Thrives in tight-knit 3-person hackathon crews. Bridges the gap between complex backend architectures and high-fidelity UIs under intense pressure."
    },
    {
      icon: <Compass size={20} className="text-gold-accent" />,
      title: "GAMIFIED & AVIATION UI",
      description: "Fascinated by high-density cockpits and game mechanics. Infusing rich dashboard controls and flight instrument motifs into everyday productivity software."
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
              Merging deep tech with intuitive UI.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              CS student and founder who cares less about flashy demos and more about solutions people will actually use.
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I'm currently all-in on GoFocusGen — turning study sessions into something people actually want to show up for — alongside AI copilots and edge IoT systems I've built along the way.
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
