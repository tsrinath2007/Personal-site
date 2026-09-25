"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, CheckCircle2, Sparkles, MapPin, Clock } from "lucide-react";

export function ConnectSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Trigger user's mail client with prefilled details
    const subject = encodeURIComponent(`Transmission from ${name} via Portfolio`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || "Hi Srinath, let's connect!"}`
    );
    window.open(`mailto:tsrinath2020@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setIsSubmitted(true);
  };

  return (
    <section id="connect" className="py-24 relative border-b border-border-gold bg-[#0A0A0C]">
      {/* Decorative vertical grid lines on container edges */}
      <div className="absolute inset-y-0 left-6 border-l border-border-gold/5 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-6 border-r border-border-gold/5 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-gold-accent uppercase block">
            05 // WEB-LINE COMMS // INITIATE TRANSMISSION
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-offwhite">
            Let&apos;s Connect
          </h2>
          <div className="h-[1px] w-24 bg-gold-accent/40" />
        </div>

        {/* Form & Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Connect Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#111113] border border-border-gold/30 hover:border-gold-accent/40 rounded-lg p-6 sm:p-8 transition-all duration-300 gold-glow relative"
          >
            <div className="space-y-2 mb-6">
              <h3 className="font-heading text-xl font-bold text-text-offwhite">
                Transmit a Signal
              </h3>
              <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                Have an opportunity, hackathon invite, or want to collaborate on applied AI systems? Drop your details below.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0A0A0C] border border-emerald-500/30 rounded-lg p-6 text-center space-y-3"
              >
                <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                <h4 className="font-heading text-lg font-bold text-text-offwhite">
                  Transmission Dispatched!
                </h4>
                <p className="text-xs text-text-muted font-mono max-w-sm mx-auto">
                  Thank you, <span className="text-gold-accent">{name}</span>. Your mail client has opened to route this directly to <span className="text-text-offwhite font-medium">tsrinath2020@gmail.com</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="mt-4 text-xs font-heading font-semibold tracking-wider text-gold-accent hover:underline uppercase"
                >
                  Send another transmission &rarr;
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="connect-name" className="block font-mono text-xs text-text-offwhite tracking-wider uppercase">
                    Your Name <span className="text-gold-accent">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/60" />
                    <input
                      id="connect-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Peter Parker"
                      className="w-full bg-[#0A0A0C] border border-border-gold/30 focus:border-gold-accent text-text-offwhite text-sm rounded px-10 py-3 outline-none transition-colors font-sans placeholder:text-text-muted/40"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label htmlFor="connect-email" className="block font-mono text-xs text-text-offwhite tracking-wider uppercase">
                    Email Address <span className="text-gold-accent">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/60" />
                    <input
                      id="connect-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. peter@starkindustries.com"
                      className="w-full bg-[#0A0A0C] border border-border-gold/30 focus:border-gold-accent text-text-offwhite text-sm rounded px-10 py-3 outline-none transition-colors font-sans placeholder:text-text-muted/40"
                    />
                  </div>
                </div>

                {/* Optional Message */}
                <div className="space-y-1.5">
                  <label htmlFor="connect-message" className="block font-mono text-xs text-text-offwhite tracking-wider uppercase">
                    Message / Collaboration Note
                  </label>
                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-text-muted/60" />
                    <textarea
                      id="connect-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Let's build something people actually need..."
                      className="w-full bg-[#0A0A0C] border border-border-gold/30 focus:border-gold-accent text-text-offwhite text-sm rounded pl-10 pr-3.5 py-3 outline-none transition-colors font-sans placeholder:text-text-muted/40 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gold-accent text-bg-dark font-heading text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-[#F3C63F] hover:shadow-lg hover:shadow-gold-accent/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Direct Telemetry & Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Signal Card */}
            <div className="bg-[#111113] border border-border-gold/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gold-accent uppercase tracking-wider">
                <Sparkles size={14} />
                <span>COMMS_CHANNEL // DIRECT</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-text-muted font-mono">PRIMARY INBOX:</div>
                <a
                  href="mailto:tsrinath2020@gmail.com"
                  className="font-heading text-lg font-bold text-text-offwhite hover:text-gold-accent transition-colors block break-all"
                >
                  tsrinath2020@gmail.com
                </a>
              </div>
              <div className="h-[1px] bg-border-dark" />
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-text-muted flex items-center gap-1">
                    <MapPin size={11} className="text-gold-accent" />
                    <span>BASE:</span>
                  </div>
                  <div className="text-text-offwhite font-medium mt-0.5">Bengaluru, IN</div>
                </div>
                <div>
                  <div className="text-text-muted flex items-center gap-1">
                    <Clock size={11} className="text-gold-accent" />
                    <span>LATENCY:</span>
                  </div>
                  <div className="text-text-offwhite font-medium mt-0.5">&lt; 24h Response</div>
                </div>
              </div>
            </div>

            {/* Status Telemetry Badge */}
            <div className="bg-[#0A0A0C] border border-border-gold/20 rounded-lg p-5 font-mono text-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-emerald-400 font-semibold tracking-wider uppercase text-[11px]">
                  STATUS: OPEN TO OPPORTUNITIES
                </span>
              </div>
              <p className="text-[11px] text-text-muted font-light leading-relaxed">
                Currently exploring software engineering, AI/ML systems, and startup roles. Available for hackathons, engineering contracts, and collaborative prototyping sprints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
