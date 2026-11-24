"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OpenDrawerFn } from "@/../content/desk";

interface DeskHeaderProps {
  onOpen?: OpenDrawerFn;
  onHome: () => void;
}

export function DeskHeader({ onOpen, onHome }: DeskHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userTime, setUserTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUserTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNav = (target: string, opts?: { folder?: "projects" | "hackathons" | "stack"; skip?: boolean }) => {
    setMobileMenuOpen(false);
    if (onOpen) {
      onOpen(target, opts);
    }
  };

  return (
    <>
      <header
        className="top"
        style={{
          background: "transparent",
          border: "none",
          borderBottom: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: "none",
          pointerEvents: "none"
        }}
      >
        <div
          className="top-in"
          style={{
            paddingBlock: "18px 8px",
            paddingInline: "max(24px, env(safe-area-inset-left, 0px))",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <button
            type="button"
            onClick={onHome}
            className="brand"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "var(--serif)",
              fontSize: "1.45rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              boxShadow: "none"
            }}
            aria-label="SES.Builds home"
          >
            SES.Builds
          </button>

          {/* Live User Time (visible on phone/mobile screens) */}
          {userTime && (
            <div className="mobile-live-time" aria-label={`Current time: ${userTime}`}>
              <span className="live-clock-dot" aria-hidden="true" />
              <span>{userTime}</span>
            </div>
          )}

          {/* Mobile Hamburger Menu Button (visible on mobile only) */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            style={{
              background: "#ffffff",
              border: "1.5px solid var(--line, #d9cec0)",
              borderRadius: "999px",
              width: 44,
              height: 44,
              display: "none", // enabled via CSS on mobile
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              color: "var(--ink)"
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(30, 37, 54, 0.45)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <div
            className="mobile-nav-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(320px, 85vw)",
              height: "100%",
              background: "var(--paper, #fbf6ed)",
              borderLeft: "1px solid var(--line, #d9cec0)",
              padding: "24px 20px max(32px, env(safe-area-inset-bottom, 0px))",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 28px rgba(0, 0, 0, 0.15)",
              overflowY: "auto"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 600, color: "var(--ink)" }}>
                  SES.Builds
                </span>
                {userTime && (
                  <span style={{ fontSize: "0.78rem", fontFamily: "var(--mono)", color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="live-clock-dot" style={{ width: 6, height: 6 }} />
                    {userTime}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 22,
                  color: "var(--ink-2)",
                  cursor: "pointer",
                  padding: 4
                }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav style={{ display: "grid", gap: 8, flex: 1 }}>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onHome();
                }}
              >
                <span className="icon">🏠</span>
                <span className="title">Desk Home</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("laptop", { folder: "projects", skip: true })}
              >
                <span className="icon">💻</span>
                <span className="title">Projects</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("laptop", { folder: "hackathons", skip: true })}
              >
                <span className="icon">🏆</span>
                <span className="title">Hackathons</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("blog")}
              >
                <span className="icon">📚</span>
                <span className="title">Notes &amp; Writing</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("photos")}
              >
                <span className="icon">📷</span>
                <span className="title">Photos &amp; Polaroids</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("now")}
              >
                <span className="icon">🎯</span>
                <span className="title">Current Focus</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("now")}
              >
                <span className="icon">✈️</span>
                <span className="title">Where I Am</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("contact")}
              >
                <span className="icon">✉️</span>
                <span className="title">Leave a note</span>
              </button>

              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => handleNav("about")}
              >
                <span className="icon">👤</span>
                <span className="title">About Srinath</span>
              </button>
            </nav>

            <div style={{ paddingTop: 20, borderTop: "1px solid var(--line)", marginTop: "auto" }}>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-2)", marginBottom: 8 }}>
                DIRECT INQUIRIES
              </div>
              <a
                href="mailto:sesbuilds@gmail.com"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontFamily: "var(--mono)",
                  fontWeight: 600,
                  color: "var(--ink)",
                  textDecoration: "none"
                }}
              >
                sesbuilds@gmail.com ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
