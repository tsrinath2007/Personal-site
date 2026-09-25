"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Lightbulb, Zap, Sparkles } from "lucide-react";
import { SKILL_GROUPS, APPROACH_DETAILS } from "@/data/projects";

export function SkillsDashboard() {
  return (
    <section id="stack" className="py-24 relative border-b border-border-gold bg-[#0A0A0C]">
      {/* Absolute Tech Lines */}
      <div className="absolute inset-y-0 left-6 border-l border-border-gold/5 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-6 border-r border-border-gold/5 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-[#008450] uppercase block">
            03 // TRANSIT TECH DEPARTMENTS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            Languages & Technologies
          </h2>
          <div className="h-[1px] w-24 bg-[#5A2D82]/40" />
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
              className="bg-[#111113] border border-border-gold/25 hover:border-[#8B5CF6]/35 rounded-lg p-6 transition-all duration-300 gold-glow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-dark">
                  <Cpu size={16} className="text-[#8B5CF6]" />
                  <h3 className="font-heading text-sm font-bold tracking-wider text-text-offwhite uppercase">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono text-text-muted hover:text-text-offwhite hover:border-[#8B5CF6]/40 bg-[#0A0A0C] border border-border-dark px-3 py-1.5 rounded transition-all duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Approach & Currently Learning Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Approach Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111113] border border-border-gold/30 rounded-lg p-6 gold-glow relative overflow-hidden flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <span className="p-2.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-lg text-[#8B5CF6] shrink-0 mt-0.5">
                <Zap size={20} />
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-xs font-bold tracking-wider text-text-offwhite uppercase">
                    Approach & Methodology
                  </h4>
                  <span className="font-mono text-[9px] text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 px-2 py-0.5 rounded">
                    VIBE CODING
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {APPROACH_DETAILS.approach}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Currently Learning Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#111113] border border-border-gold/30 rounded-lg p-6 gold-glow relative overflow-hidden flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <span className="p-2.5 bg-[#008450]/10 border border-[#008450]/30 rounded-lg text-[#008450] shrink-0 mt-0.5">
                <Lightbulb size={20} className="animate-pulse" />
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-xs font-bold tracking-wider text-text-offwhite uppercase">
                    Currently Learning
                  </h4>
                  <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                    <Sparkles size={8} /> ACTIVE R&D
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                  {APPROACH_DETAILS.currentlyLearning}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
