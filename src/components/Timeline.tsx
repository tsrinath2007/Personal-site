"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Trophy, ChevronRight } from "lucide-react";
import { HACKATHONS } from "@/data/projects";

const SpiderIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width="12"
    height="12"
  >
    {/* Body */}
    <circle cx="12" cy="10" r="2.5" />
    <circle cx="12" cy="14.5" r="3.5" />
    {/* Head */}
    <circle cx="12" cy="6.5" r="1.5" />
    {/* Legs Left */}
    <path d="M9.5,8.5 C8,7.5 7,9 7,9" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M9.2,11 C7.5,10.5 6.5,12 6.5,12" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M9.2,13.5 C7.5,14 6.5,15.5 6.5,15.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M9.8,16 C8.5,17.5 7.5,19 7.5,19" stroke="currentColor" strokeWidth="0.8" fill="none" />
    {/* Legs Right */}
    <path d="M14.5,8.5 C16,7.5 17,9 17,9" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M14.8,11 C16.5,10.5 17.5,12 17.5,12" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M14.8,13.5 C16.5,14 17.5,15.5 17.5,15.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M14.2,16 C15.5,17.5 16.5,19 16.5,19" stroke="currentColor" strokeWidth="0.8" fill="none" />
  </svg>
);

export function Timeline() {
  return (
    <section id="hackathons" className="py-24 relative border-b border-border-gold bg-[#111113]">
      <div className="absolute inset-0 dot-bg opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            02 // SPIDER-SENSE & HACKATHONS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            Hackathons & Achievements
          </h2>
          <div className="h-[1px] w-24 bg-gold-accent/40" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative border-l border-border-gold/30 ml-2 sm:ml-8 pl-6 sm:pl-10 space-y-12 py-2">
          {HACKATHONS.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 12, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Pulsing indicator dot on timeline */}
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#0A0A0C] border border-border-gold/60 group-hover:border-gold-accent group-hover:scale-110 transition-all duration-300">
                <SpiderIcon className="text-gold-accent animate-pulse" />
              </span>

              {/* Card Container */}
              <div className="bg-[#0A0A0C] border border-border-gold/20 hover:border-gold-accent/30 rounded-lg p-5 sm:p-6 transition-all duration-300 gold-glow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Event & Project */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-text-offwhite">
                      <Trophy size={14} className="text-gold-accent" />
                      <h3 className="font-heading text-base sm:text-lg font-bold">
                        {event.event}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-muted font-mono">
                      <span>PROJECT:</span>
                      <span className="text-text-offwhite/90 font-sans font-medium hover:text-gold-accent hover:underline cursor-pointer flex items-center gap-0.5">
                        {event.project}
                        <ChevronRight size={10} />
                      </span>
                    </div>
                  </div>

                  {/* Outcome Badge & Date */}
                  <div className="flex flex-row sm:flex-col sm:items-end items-center justify-between sm:justify-start gap-2">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold-accent/40 bg-gold-accent/5 text-gold-accent inline-flex items-center gap-1.5">
                      <Award size={10} />
                      {event.outcome}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-text-muted">
                      <Calendar size={11} className="text-text-muted/60" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
