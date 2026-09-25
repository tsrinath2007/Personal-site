"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { PROJECTS, Project } from "@/data/projects";

export function ProjectGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = (index: number) => ({
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -120 : 120, 
      scale: 0.95,
      rotate: index % 2 === 0 ? -2 : 2
    },
    show: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      rotate: 0, 
      transition: { type: "spring" as const, stiffness: 85, damping: 12, mass: 0.9 } 
    },
  });

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Live":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Prototype":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Hackathon Build":
        return "bg-gold-accent/10 text-gold-accent border-gold-accent/20";
      default:
        return "bg-text-muted/10 text-text-muted border-border-dark";
    }
  };

  return (
    <section id="projects" className="py-24 relative border-b border-border-gold bg-[#0A0A0C]">
      {/* Decorative vertical grid lines on container edges */}
      <div className="absolute inset-y-0 left-6 border-l border-border-gold/5 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-6 border-r border-border-gold/5 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            01 // WEB-SHOOTER PROTOTYPES & DEPLOYMENTS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            Featured Projects
          </h2>
          <div className="h-[1px] w-24 bg-gold-accent/40" />
        </div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={itemVariants(idx)}
              className="group bg-[#111113] border border-border-gold/30 hover:border-gold-accent/40 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 gold-glow-hover relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Meta details header */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-2.5 py-1 rounded border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    {project.award && (
                      <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2.5 py-1 rounded border border-gold-accent/30 bg-gold-accent/5 text-gold-accent flex items-center gap-1">
                        <Award size={10} />
                        {project.award}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-text-muted">{project.date}</span>
                </div>

                {/* Project Header */}
                <div className="space-y-1">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-offwhite group-hover:text-gold-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-heading text-xs font-medium text-gold-accent/80 tracking-wide">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-text-muted font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Technical highlights code block */}
                <div className="bg-[#0A0A0C] border border-border-dark p-3.5 rounded font-mono text-[11px] text-text-muted space-y-2 relative">
                  <div className="absolute top-2 right-3 text-[9px] text-gold-accent/40 font-semibold tracking-wider flex items-center gap-1">
                    <Terminal size={8} /> SUIT_TELEMETRY.LOG
                  </div>
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <span className="text-gold-accent/50 shrink-0">&gt;</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack and Action Links */}
              <div className="mt-6 space-y-4 pt-4 border-t border-border-dark">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-text-offwhite/70 bg-[#16161A] border border-border-dark px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-2">
                  <div className="font-mono text-[10px] text-text-muted uppercase">
                    {project.event ? (project.event.startsWith("STARTUP") ? project.event : `Event: ${project.event}`) : `Dev Build`}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-gold-accent transition-colors flex items-center gap-1.5 font-heading text-xs tracking-wider"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <GithubIcon size={14} />
                        <span>SRC</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-accent hover:text-[#F3C63F] hover:underline transition-all flex items-center gap-1.5 font-heading text-xs tracking-wider"
                        aria-label={`${project.title} Live URL`}
                      >
                        <ExternalLink size={14} />
                        <span>LIVE</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
