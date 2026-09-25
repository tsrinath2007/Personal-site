"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Users, ExternalLink, Zap } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { HACKER_HOUSE_GOA } from "@/data/projects";

export function HackerHouseSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-20 relative border-b border-border-gold bg-[#0E0E11]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Block with Team Note Callout */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-heading text-xs font-bold tracking-[0.25em] text-gold-accent uppercase">
              01.B // SPECIAL DEPLOYMENT SPRINT
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border border-gold-accent/40 bg-gold-accent/10 text-gold-accent font-semibold">
              {HACKER_HOUSE_GOA.badge}
            </span>
            {HACKER_HOUSE_GOA.liveUrl && (
              <a
                href={HACKER_HOUSE_GOA.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-semibold flex items-center gap-1.5 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE // hhgoa.vercel.app</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-offwhite">
                {HACKER_HOUSE_GOA.title}
              </h2>
              <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                {HACKER_HOUSE_GOA.blurb}
              </p>
            </div>

            {/* Note at top: Team of 3, built with Antigravity + Groq free tier */}
            <div className="shrink-0 bg-[#0A0A0C] border border-border-gold/40 px-3.5 py-2 rounded flex items-center gap-2.5 text-xs font-mono text-gold-accent shadow-sm">
              <Users size={14} className="text-gold-accent shrink-0" />
              <span className="text-[11px] tracking-wide font-medium">
                {HACKER_HOUSE_GOA.teamNote}
              </span>
            </div>
          </div>

          <div className="h-[1px] w-24 bg-gold-accent/40" />
        </div>

        {/* Compact 3-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {HACKER_HOUSE_GOA.tasks.map((task) => (
            <motion.div
              key={task.id}
              variants={itemVariants}
              className="group bg-[#111113] border border-border-gold/25 hover:border-gold-accent/40 rounded-lg p-5 flex flex-col justify-between transition-all duration-300 gold-glow relative"
            >
              <div className="space-y-3.5">
                {/* Task Badge & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    task.status === "Live"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-spidey-blue/30 bg-spidey-blue/10 text-spidey-blue"
                  }`}>
                    {task.status}
                  </span>
                  <div className="text-[10px] font-mono text-text-muted/60 flex items-center gap-1">
                    <Zap size={10} className="text-gold-accent" />
                    <span>SPRINT TASK</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="font-heading text-base font-bold text-text-offwhite group-hover:text-gold-accent transition-colors">
                    {task.title}
                  </h3>
                  <p className="font-heading text-[11px] font-medium text-gold-accent/80 leading-snug">
                    {task.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  {task.description}
                </p>

                {/* Telemetry Highlights Log */}
                <div className="bg-[#0A0A0C] border border-border-dark p-3 rounded font-mono text-[10px] text-text-muted space-y-1.5 relative">
                  <div className="text-[8px] text-gold-accent/40 font-semibold tracking-wider flex items-center gap-1 mb-1">
                    <Terminal size={8} /> SUIT_TELEMETRY.LOG
                  </div>
                  {task.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-1.5 items-start">
                      <span className="text-gold-accent/50 shrink-0">&gt;</span>
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack & Action Links Footer */}
              <div className="mt-5 pt-3.5 border-t border-border-dark/60 space-y-3">
                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5">
                  {task.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono text-text-offwhite/80 bg-[#16161A] border border-border-dark px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* External Links (only shown if provided) */}
                {(task.githubUrl || task.liveUrl) && (
                  <div className="flex items-center justify-end gap-3 pt-1">
                    {task.githubUrl && (
                      <a
                        href={task.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-gold-accent transition-colors flex items-center gap-1 font-heading text-[11px] tracking-wider"
                      >
                        <GithubIcon size={12} />
                        <span>SRC</span>
                      </a>
                    )}
                    {task.liveUrl && (
                      <a
                        href={task.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-accent hover:text-[#F3C63F] hover:underline transition-all flex items-center gap-1 font-heading text-[11px] tracking-wider"
                      >
                        <ExternalLink size={12} />
                        <span>LIVE</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
