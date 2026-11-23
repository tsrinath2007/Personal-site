"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LaptopDrawer } from "@/components/desk/LaptopDrawer";

export default function LaptopPage() {
  const router = useRouter();
  const [isSessionCharged, setIsSessionCharged] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="sheet full-page">
      <div className="sh-head">
        <div className="sh-head-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 600 }}>Laptop</h2>
          </div>
          <Link href="/" className="sh-x">
            Back to desk <kbd aria-hidden="true">Esc</kbd>
          </Link>
        </div>
      </div>
      <div className="sh-body">
        <LaptopDrawer
          initialFolder="projects"
          skipCharging={false}
          isSessionCharged={isSessionCharged}
          onSessionChargedChange={setIsSessionCharged}
        />
      </div>
    </div>
  );
}
