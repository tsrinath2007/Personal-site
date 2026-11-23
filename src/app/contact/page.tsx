"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ContactDrawer } from "@/components/desk/ContactDrawer";

export default function ContactPage() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper, #fbf6ed)",
        backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        color: "var(--ink, #1e2536)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* Top Header */}
      <header
        style={{
          border: "none",
          borderBottom: "none",
          background: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: "none",
          position: "relative",
          zIndex: 50
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link
              href="/"
              className="brand"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.35rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                textDecoration: "none"
              }}
            >
              SES.Builds
            </Link>
            <span style={{ color: "var(--line)", fontSize: "1.1rem", fontWeight: 300 }}>/</span>
            <span style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 600 }}>Contact</span>
          </div>

          {/* Right pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div
              className="top-available-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: "#ffffff",
                border: "1px solid #dfd8cc",
                borderRadius: 999,
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "#1c212d",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#2f9e5f"
                }}
              />
              <span>Available</span>
              <span style={{ fontSize: 11, color: "#8c92a4" }}>↗</span>
            </div>

            <Link
              href="/"
              className="sh-x"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                background: "#ffffff",
                border: "1.5px solid #1c212d",
                borderRadius: 999,
                fontFamily: "var(--mono)",
                fontSize: 12,
                fontWeight: 600,
                color: "#1c212d",
                textDecoration: "none"
              }}
            >
              <span>Back to desk</span>
              <kbd
                className="desktop-kbd"
                style={{
                  padding: "1px 5px",
                  fontSize: 10,
                  background: "#f0eae0",
                  borderRadius: 4,
                  border: "1px solid #dcd3c5",
                  color: "#6b7285"
                }}
              >
                ESC
              </kbd>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: 1120,
          width: "100%",
          margin: "44px auto",
          padding: "0 24px"
        }}
      >
        <ContactDrawer isFullPage={true} />
      </main>

      {/* Page Bottom Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--line, #d9cec0)",
          background: "transparent",
          padding: "20px 24px",
          fontFamily: "var(--mono)",
          fontSize: 12,
          color: "#8c92a4"
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12
          }}
        >
          <span>Designed with a cozy desk aesthetic &amp; built for builders.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>&copy; {new Date().getFullYear()} Srinath</span>
            <span>·</span>
            <button
              type="button"
              onClick={scrollToTop}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "inherit",
                fontSize: "inherit",
                color: "inherit",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
