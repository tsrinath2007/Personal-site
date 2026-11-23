"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { DeskItemData } from "@/../content/desk";

interface DeskNoteProps {
  item: DeskItemData | null;
  targetElement: HTMLElement | null;
  stageRef: React.RefObject<HTMLDivElement | null>;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onEnter: (item: DeskItemData) => void;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function DeskNote({
  item,
  targetElement,
  stageRef,
  scrollerRef,
  onClose,
  onEnter
}: DeskNoteProps) {
  const popRef = useRef<HTMLDivElement | null>(null);
  const enterBtnRef = useRef<HTMLButtonElement | null>(null);

  const place = useCallback(() => {
    const pop = popRef.current;
    const stage = stageRef.current;
    if (!pop || !targetElement || !stage) return;

    const isWide = window.matchMedia("(min-width: 761px)").matches;
    if (!isWide) {
      pop.style.left = "";
      pop.style.top = "";
      pop.removeAttribute("data-side");
      return;
    }

    const s = stage.getBoundingClientRect();
    const r = targetElement.getBoundingClientRect();
    const pw = pop.offsetWidth || 244;
    const ph = pop.offsetHeight || 160;
    const gap = 18;
    let side: "right" | "left" | "none" = "right";

    let x = r.right - s.left + gap;
    if (x + pw > s.width - 8) {
      x = r.left - s.left - pw - gap;
      side = "left";
    }
    if (x < 8) {
      x = clamp(r.left - s.left + r.width / 2 - pw / 2, 8, s.width - pw - 8);
      side = "none";
    }

    const cy = r.top - s.top + r.height / 2;
    const y = clamp(cy - ph / 2, 8, Math.max(8, s.height - ph - 8));
    const ny = clamp(cy - y, 24, Math.max(24, ph - 24));

    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    pop.setAttribute("data-side", side);
    pop.style.setProperty("--ny", `${ny}px`);
  }, [targetElement, stageRef]);

  useEffect(() => {
    if (!item || !targetElement) return;

    place();

    // Auto-focus the enter button
    if (enterBtnRef.current) {
      enterBtnRef.current.focus({ preventScroll: true });
    }

    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("resize", place);
    };
  }, [item, targetElement, scrollerRef, place]);

  // Handle outside clicks and Esc key
  useEffect(() => {
    if (!item) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!popRef.current) return;
      if (
        popRef.current.contains(e.target as Node) ||
        (e.target as HTMLElement).closest?.(".hot")
      ) {
        return;
      }
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        if (targetElement && targetElement.focus) {
          targetElement.focus({ preventScroll: true });
        }
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, targetElement, onClose]);

  if (!item) return null;

  return (
    <div
      ref={popRef}
      className="pop in"
      id="pop"
      role="group"
      aria-labelledby="popT"
    >
      <button
        type="button"
        className="pop-x"
        id="popX"
        aria-label="Close note"
        onClick={() => {
          onClose();
          if (targetElement) {
            targetElement.focus({ preventScroll: true });
          }
        }}
      >
        ×
      </button>

      <p className="k" id="popK">
        {item.k}
      </p>
      <h2 className="pop-t" id="popT">
        {item.t}
      </h2>

      {item.d && (
        <p className="pop-d" id="popD">
          {item.d}
        </p>
      )}

      {item.list && item.list.length > 0 && (
        <ul className="pop-l" id="popL">
          {item.list.map((txt, idx) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="pop-go"
        id="popGo"
        ref={enterBtnRef}
        aria-label={`Enter ${item.k.toLowerCase()}`}
        onClick={() => onEnter(item)}
      >
        Enter <kbd aria-hidden="true">↵</kbd>
      </button>
    </div>
  );
}
