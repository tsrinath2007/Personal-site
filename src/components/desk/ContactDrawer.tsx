"use client";

import React, { useState } from "react";
import Link from "next/link";
import { contactData } from "@/../content/contact";

export function ContactDrawer({ isFullPage = false }: { isFullPage?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(contactData.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    const subject = encodeURIComponent(`Note from ${name} via sesbuilds.dev`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || "Hi Srinath, let's collaborate on an AI project or grab a coffee!"}`
    );
    window.open(`mailto:${contactData.email}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: isFullPage ? 1040 : 640,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isFullPage ? "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" : "1fr",
        gap: isFullPage ? 32 : 24,
        alignItems: "start",
        paddingBottom: isFullPage ? 40 : 16
      }}
    >
      {/* LEFT COLUMN: DIRECT INQUIRIES, PRESENCE & AVAILABILITY */}
      <div style={{ display: "grid", gap: 24 }}>
        {/* CARD 1: DIRECT INQUIRIES (TAPED PAPER) */}
        <div
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: 14,
            padding: "26px 26px 22px",
            boxShadow: "0 10px 28px -6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(217, 206, 192, 0.6)"
          }}
        >
          {/* Tape strip */}
          <div
            style={{
              position: "absolute",
              top: -9,
              left: "50%",
              transform: "translateX(-50%) rotate(-0.8deg)",
              width: 80,
              height: 18,
              background: "rgba(224, 214, 196, 0.75)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              pointerEvents: "none"
            }}
          />

          <span
            style={{
              display: "block",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8c92a4",
              fontWeight: 600,
              marginBottom: 8
            }}
          >
            DIRECT INQUIRIES
          </span>

          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "clamp(1.2rem, 3.5vw, 1.55rem)",
              fontWeight: 700,
              color: "#151821",
              marginBottom: 20,
              wordBreak: "break-all"
            }}
          >
            {contactData.email}
          </div>

          {/* Action Buttons Row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            {/* Round Copy Email Button */}
            <button
              type="button"
              onClick={handleCopy}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#1c212d",
                color: "#ffffff",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(28, 33, 45, 0.25)",
                transition: "transform 0.15s ease, background-color 0.15s ease"
              }}
              title="Copy email to clipboard"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span style={{ fontSize: 9, fontFamily: "var(--mono)", fontWeight: 500 }}>
                {copied ? "Copied!" : "Copy email"}
              </span>
            </button>

            {/* Compose Mail Pill */}
            <a
              href={`mailto:${contactData.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 22px",
                borderRadius: 999,
                border: "1.5px solid #1c212d",
                background: "#ffffff",
                color: "#1c212d",
                fontFamily: "var(--mono)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background-color 0.15s ease"
              }}
            >
              <span>Compose mail</span>
              <span aria-hidden="true">↗</span>
            </a>

            {/* 15-min Coffee Sync Dashed Pill */}
            <a
              href={`mailto:${contactData.email}?subject=${encodeURIComponent("15-min Coffee Sync")}&body=${encodeURIComponent("Hi Srinath,\n\nI'd like to schedule a quick 15-min coffee sync to chat about...")}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                borderRadius: 999,
                border: "1.5px dashed #c2baaf",
                background: "transparent",
                color: "#6b7285",
                fontFamily: "var(--mono)",
                fontSize: 12,
                fontWeight: 500,
                textDecoration: "none"
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#e8a21a",
                  display: "inline-block"
                }}
              />
              <span>15-min Coffee Sync</span>
            </a>
          </div>
        </div>

        {/* SECTION 2: PRESENCE & NETWORKS */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 10,
              paddingRight: 6
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8c92a4",
                fontWeight: 600
              }}
            >
              PRESENCE &amp; NETWORKS
            </span>
            <span
              style={{
                fontFamily: "var(--hand)",
                fontSize: "1.45rem",
                color: "#4e5467",
                transform: "rotate(-2deg)",
                display: "inline-block"
              }}
            >
              find me online
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: 12
            }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/tsrinath2007"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                border: "1px solid #dfd8cc",
                borderRadius: 14,
                padding: "18px 8px 14px",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "transform 0.15s ease, border-color 0.15s ease"
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#151821" }}>GitHub</span>
              <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#8c92a4" }}>code &amp; repos</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/tses/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                border: "1px solid #dfd8cc",
                borderRadius: 14,
                padding: "18px 8px 14px",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "transform 0.15s ease, border-color 0.15s ease"
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#151821" }}>LinkedIn</span>
              <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#8c92a4" }}>experience</span>
            </a>

            {/* X */}
            <a
              href="https://x.com/sesbuilds"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                border: "1px solid #dfd8cc",
                borderRadius: 14,
                padding: "18px 8px 14px",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "transform 0.15s ease, border-color 0.15s ease"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#151821" }}>X</span>
              <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#8c92a4" }}>thoughts</span>
            </a>

            {/* Résumé */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                border: "1px solid #dfd8cc",
                borderRadius: 14,
                padding: "18px 8px 14px",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                transition: "transform 0.15s ease, border-color 0.15s ease"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#151821" }}>Résumé</span>
              <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "#8c92a4" }}>PDF [2026]</span>
            </a>
          </div>
        </div>

        {/* SECTION 3: AVAILABILITY STATUS (STICKY NOTE WITH ORANGE PIN) */}
        <div
          style={{
            position: "relative",
            background: "#fbf2d3",
            borderRadius: 10,
            padding: "20px 22px 18px",
            boxShadow: "0 8px 20px -4px rgba(180, 160, 110, 0.3), 0 2px 4px rgba(0,0,0,0.05)",
            transform: "rotate(-0.6deg)",
            border: "1px solid rgba(220, 200, 140, 0.5)"
          }}
        >
          {/* Orange pushpin */}
          <div
            style={{
              position: "absolute",
              top: -7,
              left: "50%",
              transform: "translateX(-50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #ff8a4c 0%, #c94f1c 100%)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.35)",
              pointerEvents: "none"
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--mono)",
              fontSize: 11,
              fontWeight: 700,
              color: "#b45309",
              letterSpacing: "0.08em",
              marginBottom: 8
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b45309", display: "inline-block" }} />
            <span>AVAILABILITY STATUS</span>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: "#3d382d",
              fontFamily: "var(--sans, system-ui)"
            }}
          >
            Currently hacking on generative AI agents and full-stack software systems. Open to Fall / Spring
            internships &amp; high-impact engineer positions.
          </p>

          <div
            style={{
              marginTop: 10,
              textAlign: "right",
              fontFamily: "var(--hand)",
              fontSize: "1.3rem",
              color: "#786d52"
            }}
          >
            ~ Srinath
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: "LEAVE A NOTE" PAPER SHEET */}
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          borderRadius: 14,
          padding: "32px 30px 26px",
          boxShadow: "0 14px 34px -8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(217, 206, 192, 0.6)"
        }}
      >
        {/* Soft Blue Washi Tape Strip */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%) rotate(0.6deg)",
            width: 90,
            height: 20,
            background: "rgba(180, 205, 230, 0.72)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            pointerEvents: "none"
          }}
        />

        {/* Air Mail Stamp */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            border: "2px dashed #9fb5d6",
            borderRadius: 4,
            padding: "5px 9px",
            textAlign: "center",
            background: "rgba(240, 246, 255, 0.5)"
          }}
        >
          <div style={{ fontSize: 13, color: "#4a6894", lineHeight: 1 }}>✈</div>
          <div style={{ fontSize: 8, fontFamily: "var(--mono)", fontWeight: 700, color: "#4a6894", letterSpacing: "0.08em", marginTop: 2 }}>
            AIR MAIL
          </div>
          <div style={{ fontSize: 7, fontFamily: "var(--mono)", color: "#778fae" }}>
            BLR · DEV
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 24, paddingRight: 64 }}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(1.75rem, 4vw, 2.2rem)",
              fontWeight: 600,
              color: "#151821",
              margin: "0 0 4px"
            }}
          >
            Leave a note
          </h2>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              color: "#737c94",
              margin: 0
            }}
          >
            I&apos;ll route straight to my terminal
          </p>
        </div>

        {/* Note Form */}
        {sent ? (
          <div
            style={{
              padding: "32px 20px",
              textAlign: "center",
              background: "#f7faf7",
              border: "1px solid #b8e2b8",
              borderRadius: 8,
              margin: "20px 0"
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>✉️</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#238636", margin: "0 0 6px" }}>
              Message Ready!
            </h3>
            <p style={{ fontSize: 13, color: "#555", margin: "0 0 16px" }}>
              Your mail client has been opened to transmit to <strong>{contactData.email}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setMessage("");
              }}
              style={{
                padding: "8px 18px",
                background: "#1c212d",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                cursor: "pointer"
              }}
            >
              Write another note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} style={{ display: "grid", gap: 18 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#737c94",
                  marginBottom: 6,
                  fontWeight: 600
                }}
              >
                YOUR NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "#ffffff",
                  border: "1px solid #dcd7ce",
                  borderRadius: 6,
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "#151821",
                  outline: "none"
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#737c94",
                  marginBottom: 6,
                  fontWeight: 600
                }}
              >
                YOUR EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "#ffffff",
                  border: "1px solid #dcd7ce",
                  borderRadius: 6,
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "#151821",
                  outline: "none"
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#737c94",
                  marginBottom: 6,
                  fontWeight: 600
                }}
              >
                WHAT ARE WE BUILDING?
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hey Srinath, let's collaborate on an AI project or grab a coffee..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "#ffffff",
                  border: "1px solid #dcd7ce",
                  borderRadius: 6,
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "#151821",
                  resize: "vertical",
                  outline: "none",
                  lineHeight: 1.5
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px 20px",
                background: "#151821",
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                fontFamily: "var(--mono)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 6,
                boxShadow: "0 4px 12px rgba(21, 24, 33, 0.2)"
              }}
            >
              <span>Send Message</span>
              <span style={{ fontSize: 10, lineHeight: 1 }}>■</span>
            </button>
          </form>
        )}

        {/* Card Sub-footer */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid #f0eae1",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            color: "#8c92a4"
          }}
        >
          <span style={{ fontFamily: "var(--mono)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 11 }}>🔒</span> Encrypted in transit
          </span>
          <span
            style={{
              fontFamily: "var(--hand)",
              fontSize: "1.25rem",
              color: "#5b6276"
            }}
          >
            somewhere at the desk ♡
          </span>
        </div>
      </div>
    </div>
  );
}
