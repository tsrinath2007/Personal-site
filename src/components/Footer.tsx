"use client";

import React from "react";
import { Mail, FileText, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0C] border-t border-border-gold/30 py-16 relative overflow-hidden">
      {/* Decorative vertical border lines on bottom edges */}
      <div className="absolute inset-y-0 left-6 border-l border-border-gold/5 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-6 border-r border-border-gold/5 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-border-dark">
          {/* Tag and Email */}
          <div className="space-y-4 max-w-md">
            <span className="font-heading text-[10px] font-semibold tracking-[0.25em] text-gold-accent uppercase block">
              05 // COLLABORATIVE CONSOLE
            </span>
            <h3 className="font-heading text-2xl font-bold text-text-offwhite">
              Let's build something substantial.
            </h3>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              If you want to collaborate on AI pipelines, interactive frontends, hackathon teams, or full-stack products, drop a transmission.
            </p>
            <a
              href="mailto:tsrinath2007@gmail.com"
              className="inline-flex items-center gap-2 border border-border-gold bg-[#111113]/40 hover:bg-bg-card-hover hover:border-gold-accent text-gold-accent px-4 py-2.5 rounded font-heading text-xs tracking-wider transition-colors duration-300"
            >
              <Mail size={14} />
              <span>TRANSMIT: tsrinath2007@gmail.com</span>
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="space-y-3">
              <h4 className="font-heading text-xs font-bold tracking-wider text-text-offwhite uppercase">
                DIRECTORY
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a href="#projects" className="text-text-muted hover:text-gold-accent transition-colors">
                    /projects
                  </a>
                </li>
                <li>
                  <a href="#hackathons" className="text-text-muted hover:text-gold-accent transition-colors">
                    /hackathons
                  </a>
                </li>
                <li>
                  <a href="#stack" className="text-text-muted hover:text-gold-accent transition-colors">
                    /stack
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-text-muted hover:text-gold-accent transition-colors">
                    /about
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-heading text-xs font-bold tracking-wider text-text-offwhite uppercase">
                NETWORKS
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a
                    href="https://github.com/tsrinath2007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-gold-accent transition-colors"
                  >
                    /github
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/tsrinath2007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-gold-accent transition-colors"
                  >
                    /linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/tsrinath2007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-gold-accent transition-colors"
                  >
                    /twitter
                  </a>
                </li>
                <li>
                  <a
                    href="/resume.pdf"
                    download
                    className="text-gold-accent hover:text-[#F3C63F] hover:underline transition-colors flex items-center gap-1.5"
                  >
                    <FileText size={12} />
                    <span>/resume</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono text-text-muted">
          <div>
            &copy; {new Date().getFullYear()} Srinath Srinivas. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <div>BUILD: V2.8.5 // ENV: PRODUCTION</div>
            
            <button
              onClick={scrollToTop}
              className="p-2 border border-border-gold/30 hover:border-gold-accent/60 bg-[#111113] rounded text-text-muted hover:text-gold-accent transition-colors"
              aria-label="Scroll to top of page"
            >
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
