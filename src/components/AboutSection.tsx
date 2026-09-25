"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, Target, Zap, MapPin, Award } from "lucide-react";
import { EDUCATION_HISTORY } from "@/data/projects";

export function AboutSection() {
  const traits = [
    {
      icon: <Rocket size={18} className="text-[#8B5CF6]" />,
      title: "FOUNDER — GOFOCUSGEN",
      description: "Founded a gamified productivity startup mapping study durations to domestic flight routes. Built with Next.js & Mapbox GL JS; won 1st Place (Aviation Innovation) at Manipal Aero-Hack."
    },
    {
      icon: <Zap size={18} className="text-[#008450]" />,
      title: "AI-ASSISTED VIBE CODING",
      description: "Rapid prototyping and shipping with modern AI tools. Swiftly builds resilient products under tight timelines — moving from ideation to production-deployed apps in record time."
    },
    {
      icon: <Target size={18} className="text-[#F4B223]" />,
      title: "TELEMETRY & EDGE SYSTEMS",
      description: "Engineered ISRO Gaganyaan spacecraft ECLSS telemetry copilots with sub-250ms LLM streaming and railway vibration monitors integrating into Indian Railways' Kavach beacon network."
    },
    {
      icon: <GraduationCap size={18} className="text-text-offwhite" />,
      title: "CS AT MAHE BENGALURU",
      description: "B.Tech in Computer Science at Manipal Academy of Higher Education (2025–2029, CGPA: 7.25). Grounded in systems, algorithms, and applied machine learning."
    }
  ];

  return (
    <section id="about" className="py-24 relative border-b border-border-gold bg-[#111113]">
      <div className="absolute inset-0 bg-[#0A0A0C]/50 pointer-events-none" />
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-[#008450] uppercase block">
            04 // PASSENGER BIO & DEPT CONTEXT
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            About Srinath
          </h2>
          <div className="h-[1px] w-24 bg-[#5A2D82]/40" />
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
              Building applied, real-world software rather than demo-ware.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              I am <span className="text-text-offwhite font-medium">Thota Sai Eswar Srinath</span>, a Computer Science student at MAHE Bengaluru (2025–2029) and founder of <span className="text-[#8B5CF6] font-medium">GoFocusGen</span>.
            </p>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              Spanning startup product development, AI/ML pipelines, and full-stack engineering, I have a proven hackathon track record shipping production-deployed projects across gamified ed-tech, spacecraft telemetry monitoring, and IoT edge systems.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-text-muted">
              <MapPin size={12} className="text-[#008450]" />
              <span>BENGALURU, INDIA // TSES</span>
            </div>
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
                className="bg-[#0A0A0C] border border-border-gold/20 hover:border-[#5A2D82]/40 rounded-lg p-6 transition-all duration-300 gold-glow flex flex-col gap-3"
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

        {/* Education & Academic Route */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-[#F4B223]" />
            <h3 className="font-heading text-sm font-bold tracking-[0.2em] text-text-offwhite uppercase">
              Academic Route // Education
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION_HISTORY.map((edu, idx) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0A0A0C] border border-border-gold/20 hover:border-[#5A2D82]/40 rounded-lg p-5 flex flex-col justify-between gap-4 gold-glow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-text-muted">{edu.duration}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#008450]/10 text-[#008450] border border-[#008450]/30 flex items-center gap-1">
                      <Award size={10} />
                      {edu.score}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm font-bold text-text-offwhite">
                    {edu.institution}
                  </h4>
                  <p className="text-xs text-[#8B5CF6] font-medium font-sans">
                    {edu.degree}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-text-muted/70 border-t border-border-dark pt-3">
                  <MapPin size={10} />
                  <span>{edu.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
