"use client";

import React, { useEffect, useRef } from "react";
import { TITLES, DrawerOpenOptions, OpenDrawerFn } from "@/../content/desk";
import { BlogPost } from "@/lib/blog";
import { LaptopDrawer } from "./LaptopDrawer";
import { BlogDrawer } from "./BlogDrawer";
import { NowDrawer } from "./NowDrawer";
import { PhotosDrawer } from "./PhotosDrawer";
import { AboutDrawer } from "./AboutDrawer";
import { ContactDrawer } from "./ContactDrawer";

interface DeskDrawerProps {
  isOpen: boolean;
  activeName: string;
  options?: DrawerOpenOptions;
  onClose: () => void;
  onOpen: OpenDrawerFn;
  returnTo: HTMLElement | null;
  blogPosts: BlogPost[];
  isSessionCharged: boolean;
  onSessionChargedChange: (charged: boolean) => void;
}

export function DeskDrawer({
  isOpen,
  activeName,
  options = {},
  onClose,
  onOpen,
  returnTo,
  blogPosts,
  isSessionCharged,
  onSessionChargedChange
}: DeskDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.classList.add("lock");
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.classList.remove("lock");
        if (returnTo && returnTo.focus) {
          try {
            returnTo.focus({ preventScroll: true });
          } catch {
            // Focus error ignored
          }
        }
      }
    }
  }, [isOpen, returnTo]);

  const handleDialogClose = () => {
    document.body.classList.remove("lock");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const title = TITLES[activeName] || "";

  return (
    <dialog
      ref={dialogRef}
      id="sheet"
      aria-labelledby="shT"
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
    >
      <div className={`sheet ${activeName === "laptop" ? "wide" : ""}`} id="sheetPanel">
        <div className="sh-head">
          <div className="sh-head-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                onClick={onClose}
                className="brand"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "var(--serif)",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  textDecoration: "none"
                }}
                aria-label="Back to desk"
              >
                SES.Builds
              </button>
              <span style={{ color: "var(--line)", fontSize: "1.1rem", fontWeight: 300 }}>/</span>
              <h2 id="shT" style={{ margin: 0, fontSize: "1.2rem", fontWeight: 600 }}>{title}</h2>
            </div>
            <button type="button" className="sh-x" id="shX" onClick={onClose}>
              Back to desk <kbd aria-hidden="true">Esc</kbd>
            </button>
          </div>
        </div>
        <div className="sh-body" id="shBody">
          {activeName === "laptop" && (
            <LaptopDrawer
              initialFolder={options.folder || "projects"}
              skipCharging={options.skip || false}
              isSessionCharged={isSessionCharged}
              onSessionChargedChange={onSessionChargedChange}
            />
          )}
          {activeName === "blog" && <BlogDrawer posts={blogPosts} />}
          {activeName === "now" && <NowDrawer onOpen={onOpen} />}
          {activeName === "photos" && <PhotosDrawer />}
          {activeName === "about" && <AboutDrawer onOpen={onOpen} />}
          {activeName === "contact" && <ContactDrawer />}
        </div>
      </div>
    </dialog>
  );
}
