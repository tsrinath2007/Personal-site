"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ProjectsContent } from "./ProjectsContent";
import { HackathonsContent } from "./HackathonsContent";
import { StackContent } from "./StackContent";

interface LaptopDrawerProps {
  initialFolder?: "projects" | "hackathons" | "stack";
  skipCharging?: boolean;
  isSessionCharged: boolean;
  onSessionChargedChange: (charged: boolean) => void;
}

const PW = 30;
const PH = 64;

const BOOT_LOG: [string, string][] = [
  ["SES OS 2.8.5", "dim"],
  ["charging ........ ok", ""],
  ["mount ~/projects", ""],
  ["mount ~/hackathons", ""],
  ["mount ~/stack", ""],
  ["ready", ""]
];

export function LaptopDrawer({
  initialFolder = "projects",
  skipCharging = false,
  isSessionCharged,
  onSessionChargedChange
}: LaptopDrawerProps) {
  const [plugged, setPlugged] = useState<boolean>(isSessionCharged || skipCharging);
  const [booted, setBooted] = useState<boolean>(isSessionCharged || skipCharging);
  const [bootLines, setBootLines] = useState<[string, string][]>([]);
  const [activeFolder, setActiveFolder] = useState<"projects" | "hackathons" | "stack">(
    initialFolder
  );
  const [batteryPercent, setBatteryPercent] = useState<number>(
    isSessionCharged || skipCharging ? 100 : 1
  );

  const [plugPos, setPlugPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cablePath, setCablePath] = useState<string>("");
  const [isNear, setIsNear] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const adapterRef = useRef<HTMLDivElement | null>(null);
  const portRef = useRef<HTMLDivElement | null>(null);
  const plugRef = useRef<HTMLButtonElement | null>(null);

  const dragRef = useRef<{
    dx: number;
    dy: number;
    moved: boolean;
    sx: number;
    sy: number;
  } | null>(null);

  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const rafRef = useRef<number>(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const rel = useCallback((el: HTMLElement) => {
    if (!stageRef.current) return { left: 0, top: 0, w: 0, h: 0, cx: 0, cy: 0 };
    const s = stageRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      left: r.left - s.left,
      top: r.top - s.top,
      w: r.width,
      h: r.height,
      cx: r.left - s.left + r.width / 2,
      cy: r.top - s.top + r.height / 2
    };
  }, []);

  const getHomePos = useCallback(() => {
    if (!stageRef.current) return { x: 80, y: 260 };
    const s = stageRef.current.getBoundingClientRect();
    if (!adapterRef.current) return { x: 80, y: s.height - PH - 30 };
    const a = rel(adapterRef.current);
    return {
      x: Math.min(s.width - PW - 10, a.cx + Math.min(110, s.width * 0.24) - PW / 2),
      y: s.height - PH - 30
    };
  }, [rel]);

  const getSnapPos = useCallback(() => {
    if (!portRef.current) return { x: 0, y: 0 };
    const p = rel(portRef.current);
    return { x: p.cx - PW / 2, y: p.top + 3 };
  }, [rel]);

  const updateCable = useCallback(
    (currentPos: { x: number; y: number }) => {
      if (!adapterRef.current) return;
      const a = rel(adapterRef.current);
      const A = { x: a.cx, y: a.top + 3 };
      const P = { x: currentPos.x + PW / 2, y: currentPos.y + PH - 2 };
      const d = Math.hypot(P.x - A.x, P.y - A.y);
      const sag = Math.min(90, 30 + d * 0.18);
      const pathStr = `M ${A.x} ${A.y} C ${A.x} ${A.y - sag} ${P.x} ${P.y + sag} ${P.x} ${P.y}`;
      setCablePath(pathStr);
    },
    [rel]
  );

  const put = useCallback(
    (p: { x: number; y: number }) => {
      posRef.current = p;
      setPlugPos(p);
      updateCable(p);
    },
    [updateCable]
  );

  const startBootSequence = useCallback(
    (animate: boolean) => {
      clearTimers();
      onSessionChargedChange(true);
      setPlugged(true);

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!animate || reduce) {
        setBooted(true);
        setBatteryPercent(100);
        return;
      }

      setBooted(false);
      setBootLines([]);
      setBatteryPercent(1);

      let delay = 250;
      BOOT_LOG.forEach((line) => {
        const timer = setTimeout(() => {
          setBootLines((prev) => [...prev, line]);
        }, delay);
        timersRef.current.push(timer);
        delay += 230;
      });

      const startTime = performance.now();
      const stepBattery = (now: number) => {
        const k = Math.min(1, (now - startTime) / 2200);
        const currentPct = Math.max(1, Math.round(100 * (1 - Math.pow(1 - k, 2))));
        setBatteryPercent(currentPct);
        if (k < 1) {
          rafRef.current = requestAnimationFrame(stepBattery);
        } else {
          rafRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(stepBattery);

      const finishTimer = setTimeout(() => {
        setBooted(true);
        setBatteryPercent(100);
      }, delay + 650);
      timersRef.current.push(finishTimer);
    },
    [clearTimers, onSessionChargedChange]
  );

  const tweenTo = useCallback(
    (target: { x: number; y: number }, ms: number, onComplete?: () => void) => {
      const from = posRef.current;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        put(target);
        if (onComplete) onComplete();
        return;
      }

      const t0 = performance.now();
      const animate = (t: number) => {
        const k = Math.min(1, (t - t0) / ms);
        const e = 1 - Math.pow(1 - k, 3);
        const cur = {
          x: from.x + (target.x - from.x) * e,
          y: from.y + (target.y - from.y) * e
        };
        put(cur);
        if (k < 1) {
          requestAnimationFrame(animate);
        } else {
          if (onComplete) onComplete();
        }
      };
      requestAnimationFrame(animate);
    },
    [put]
  );

  const connect = useCallback(() => {
    if (plugged) return;
    setIsNear(false);
    setIsDragging(false);
    const snap = getSnapPos();
    tweenTo(snap, 320, () => {
      startBootSequence(true);
    });
  }, [plugged, getSnapPos, tweenTo, startBootSequence]);

  const unplug = useCallback(() => {
    clearTimers();
    onSessionChargedChange(false);
    setPlugged(false);
    setBooted(false);
    setBootLines([]);
    setBatteryPercent(1);
    setIsNear(false);
    setIsDragging(false);

    const home = getHomePos();
    tweenTo(home, 300);
  }, [clearTimers, onSessionChargedChange, getHomePos, tweenTo]);

  // Cleanup timers only when unmounting the component
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  // Initial layout and resize observer
  useEffect(() => {
    const relayout = () => {
      if (plugged) {
        put(getSnapPos());
      } else {
        put(getHomePos());
      }
    };

    relayout();

    const stageEl = stageRef.current;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && stageEl) {
      ro = new ResizeObserver(relayout);
      ro.observe(stageEl);
    }

    window.addEventListener("resize", relayout);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", relayout);
    };
  }, [plugged, getSnapPos, getHomePos, put]);

  // Pointer dragging handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (plugged) return;
    if (!stageRef.current) return;
    const s = stageRef.current.getBoundingClientRect();
    dragRef.current = {
      dx: e.clientX - s.left - posRef.current.x,
      dy: e.clientY - s.top - posRef.current.y,
      moved: false,
      sx: e.clientX,
      sy: e.clientY
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture error
    }
    setIsDragging(true);
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current || !stageRef.current) return;
    if (Math.hypot(e.clientX - dragRef.current.sx, e.clientY - dragRef.current.sy) > 5) {
      dragRef.current.moved = true;
    }
    const s = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(s.width - PW, e.clientX - s.left - dragRef.current.dx));
    const y = Math.max(0, Math.min(s.height - PH, e.clientY - s.top - dragRef.current.dy));
    put({ x, y });

    const target = getSnapPos();
    setIsNear(Math.hypot(x - target.x, y - target.y) < 44);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current) return;
    const moved = dragRef.current.moved;
    dragRef.current = null;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer release error
    }

    const target = getSnapPos();
    if (!moved || Math.hypot(posRef.current.x - target.x, posRef.current.y - target.y) < 85) {
      connect();
    } else {
      setIsNear(false);
      tweenTo(getHomePos(), 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      connect();
    }
  };

  return (
    <div className="lapwrap">
      <div>
        <div className={`lstage ${plugged ? "is-plugged" : ""}`} ref={stageRef} id="lstage">
          <svg className="lwires" aria-hidden="true">
            <path id="lcable" d={cablePath} />
            <path id="lflow" d={cablePath} />
          </svg>

          <div className={`lap ${plugged ? "on" : ""}`} id="lap">
            <div className="lap-lid">
              <div className="lap-screen">
                {!plugged && (
                  <div className="l-off" id="loff">
                    <span className="bat" id="lbatbig">
                      <i></i>
                    </span>
                    <b>1%</b>
                    <span>
                      Battery critically low.
                      <br />
                      Plug in the charger.
                    </span>
                  </div>
                )}

                {plugged && (
                  <div className="l-os" id="los">
                    <div className="os-bar">
                      <span>ses@builds</span>
                      <span id="lpct">{batteryPercent}%</span>
                    </div>

                    {!booted && (
                      <div className="os-boot" id="lboot">
                        {bootLines.map(([text, dim], idx) => (
                          <div key={idx} className={`ln ${dim}`}>
                            &gt; {text}
                          </div>
                        ))}
                      </div>
                    )}

                    {booted && (
                      <>
                        <div className="os-icons" id="licons">
                          <button
                            type="button"
                            className="ico"
                            data-folder="projects"
                            aria-pressed={activeFolder === "projects"}
                            onClick={() => setActiveFolder("projects")}
                          >
                            <svg className="fold" viewBox="0 0 44 34" aria-hidden="true">
                              <path d="M3 6a3 3 0 0 1 3-3h10l4 4h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
                            </svg>
                            Projects
                          </button>
                          <button
                            type="button"
                            className="ico"
                            data-folder="hackathons"
                            aria-pressed={activeFolder === "hackathons"}
                            onClick={() => setActiveFolder("hackathons")}
                          >
                            <svg className="fold" viewBox="0 0 44 34" aria-hidden="true">
                              <path d="M3 6a3 3 0 0 1 3-3h10l4 4h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
                            </svg>
                            Hackathons
                          </button>
                          <button
                            type="button"
                            className="ico"
                            data-folder="stack"
                            aria-pressed={activeFolder === "stack"}
                            onClick={() => setActiveFolder("stack")}
                          >
                            <svg className="fold" viewBox="0 0 44 34" aria-hidden="true">
                              <path d="M3 6a3 3 0 0 1 3-3h10l4 4h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
                            </svg>
                            Stack
                          </button>
                        </div>

                        <div className="os-term" id="lterm" aria-hidden="true">
                          <div className="tb">
                            ses@builds:~/{activeFolder}$
                          </div>
                          <div className="tt">
                            {activeFolder === "projects" && (
                              <>
                                &gt; cd ~/projects
                                <br />
                                &gt; ls -la
                                <br />
                                <span style={{ color: "#a5d6a7" }}>• GoFocusGen</span>
                                <br />
                                <span style={{ color: "#a5d6a7" }}>• Bujji</span>
                              </>
                            )}
                            {activeFolder === "hackathons" && (
                              <>
                                &gt; cd ~/hackathons
                                <br />
                                &gt; ls -la
                                <br />
                                <span style={{ color: "#ffe082" }}>• Hacker House Goa</span>
                                <br />
                                <span style={{ color: "#ffe082" }}>• Scaler OpenEnv</span>
                              </>
                            )}
                            {activeFolder === "stack" && (
                              <>
                                &gt; cd ~/stack
                                <br />
                                &gt; cat tech.txt
                                <br />
                                <span style={{ color: "#90caf9" }}>Next.js, Python, TS</span>
                                <br />
                                <span style={{ color: "#90caf9" }}>AI/ML, Web Audio, Vercel</span>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="lap-base">
              {/* Charging port located at the end of the right */}
              <div
                className="lport"
                id="lport"
                ref={portRef}
                title="Charging port - Click to connect"
                onClick={connect}
              />
            </div>
          </div>

          <div className="lcharge">
            <div
              className="ladapter"
              id="ladapter"
              ref={adapterRef}
              onClick={connect}
              title="5V Charger Adapter"
              style={{ cursor: plugged ? "default" : "pointer" }}
            >
              <span className="led"></span>
              <span className="lbl">5V</span>
            </div>
            <p className="lnote" onClick={connect} style={{ cursor: "pointer" }}>
              grab the plug, put it in the laptop
            </p>
          </div>

          <button
            type="button"
            className={`plug ${isDragging ? "grab" : ""} ${isNear ? "near" : ""}`}
            id="lplug"
            ref={plugRef}
            aria-label={
              plugged
                ? "Charger plugged in"
                : "Charger plug. Drag it into the laptop, or press Enter to plug in."
            }
            tabIndex={plugged ? -1 : 0}
            style={{ transform: `translate(${plugPos.x}px, ${plugPos.y}px)` }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragRef.current = null;
              setIsDragging(false);
              setIsNear(false);
            }}
            onKeyDown={handleKeyDown}
          >
            <span className="tip"></span>
            <span className="pb"></span>
          </button>
        </div>

        {plugged && (
          <button type="button" className="linkbtn lunplug" id="lunplug" onClick={unplug}>
            Unplug to replay
          </button>
        )}
      </div>

      <div className="lwin" id="lwin" aria-live="polite">
        {!plugged && (
          <div className="lhint">
            <p className="big">Out of battery.</p>
            <p>
              The laptop is at 1%. Drag the plug into its port, or tap the plug, and it will
              show my projects, hackathons and stack.
            </p>
            <p>
              <button
                type="button"
                className="linkbtn"
                id="lskip"
                onClick={() => {
                  put(getSnapPos());
                  startBootSequence(false);
                }}
              >
                Skip charging and show me
              </button>
            </p>
          </div>
        )}

        {plugged && activeFolder === "projects" && <ProjectsContent />}
        {plugged && activeFolder === "hackathons" && <HackathonsContent />}
        {plugged && activeFolder === "stack" && <StackContent />}
      </div>
    </div>
  );
}
