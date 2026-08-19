"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Lightbulb, CheckCircle2 } from "lucide-react";
import { SKILL_GROUPS } from "@/data/projects";

export function SkillsDashboard() {
  return (
    <section id="stack" className="py-24 relative border-b border-border-gold bg-[#0A0A0C]">
      {/* Absolute Tech Lines */}
      <div className="absolute inset-y-0 left-6 border-l border-border-gold/5 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-6 border-r border-border-gold/5 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            03 // TRANSIT TECH DEPARTMENTS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            Languages & Technologies
          </h2>
          <div className="h-[1px] w-24 bg-gold-accent/40" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_GROUPS.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 14, delay: index * 0.12 }}
              className="bg-[#111113] border border-border-gold/25 hover:border-gold-accent/35 rounded-lg p-6 transition-all duration-300 gold-glow"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-dark">
                <Cpu size={16} className="text-gold-accent" />
                <h3 className="font-heading text-sm font-bold tracking-wider text-text-offwhite uppercase">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono text-text-muted hover:text-gold-accent hover:border-gold-accent/40 bg-[#0A0A0C] border border-border-dark px-3 py-1.5 rounded transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning / Experimenting Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#111113] border border-border-gold/30 rounded-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between gold-glow relative overflow-hidden"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-accent/5 rounded-full blur-2xl" />

          <div className="flex items-center gap-4">
            <span className="p-3 bg-gold-accent/5 border border-border-gold/40 rounded-lg text-gold-accent shrink-0">
              <Lightbulb size={24} className="animate-pulse" />
            </span>
            <div className="space-y-1">
              <h4 className="font-heading text-sm font-bold tracking-wider text-text-offwhite uppercase">
                BMRCL Lab R&D // Next-Gen Signals & Traction
              </h4>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Currently deploying automated signal communication models, multi-core telemetry ingestion systems, and high-frequency edge accelerometer calibration patterns.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded shrink-0">
            <CheckCircle2 size={12} />
            <span>SIGNALS ACTIVE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
