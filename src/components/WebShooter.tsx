"use client";

import React, { useEffect, useRef } from "react";

interface WebStrand {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number; // 0 to 1
  life: number;     // 1 to 0
  state: "shooting" | "stuck" | "decaying";
  vibration: number;
  sideLines: { lengthRatio: number; angleOffset: number; waveOffset: number }[];
  particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[];
}

export function WebShooter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const websRef = useRef<WebStrand[]>([]);
  const nextIdRef = useRef(0);
  const handToggleRef = useRef(false); // Alternates between left and right shooters

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas sizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Click handler to shoot web
    const handleClick = (e: MouseEvent) => {
      // Ignore click if it's on a interactive item we don't want to visually cover, but allow it on backgrounds/cards
      // Actually shooting everywhere is more fun and doesn't block standard clicks
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Alternate shooter origin: bottom-left and bottom-right
      const startX = handToggleRef.current ? width * 0.15 : width * 0.85;
      const startY = height;
      handToggleRef.current = !handToggleRef.current;

      const targetX = e.clientX;
      const targetY = e.clientY;

      // Define some secondary sub-strands radiating outward at the hit point
      const sideLines = Array.from({ length: 6 }).map((_, i) => ({
        lengthRatio: 0.1 + Math.random() * 0.15,
        angleOffset: (i * Math.PI) / 3 + (Math.random() * 0.3 - 0.15),
        waveOffset: Math.random() * Math.PI * 2,
      }));

      const newWeb: WebStrand = {
        id: nextIdRef.current++,
        startX,
        startY,
        targetX,
        targetY,
        progress: 0,
        life: 1.0,
        state: "shooting",
        vibration: 15,
        sideLines,
        particles: [],
      };

      websRef.current.push(newWeb);
    };

    window.addEventListener("mousedown", handleClick);

    // Drawing & Animation loop
    let animationFrameId: number;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      websRef.current = websRef.current.filter((web) => {
        // 1. UPDATE STATE
        if (web.state === "shooting") {
          web.progress += 0.15; // Speed of web shooting out
          if (web.progress >= 1) {
            web.progress = 1;
            web.state = "stuck";
            
            // Spawn web impact particles
            for (let i = 0; i < 15; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 1 + Math.random() * 3;
              web.particles.push({
                x: web.targetX,
                y: web.targetY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1.0,
                size: 1 + Math.random() * 1.5,
              });
            }
          }
        } else if (web.state === "stuck") {
          web.vibration *= 0.85; // Dampen web string vibration
          web.life -= 0.035;     // Hold time
          if (web.life <= 0.75) {
            web.state = "decaying";
          }
        } else if (web.state === "decaying") {
          web.life -= 0.06;      // Dissolve speed
          
          // Generate falling particles along the web line
          if (Math.random() < 0.3) {
            const ratio = Math.random();
            const px = web.startX + (web.targetX - web.startX) * ratio;
            const py = web.startY + (web.targetY - web.startY) * ratio;
            web.particles.push({
              x: px,
              y: py,
              vx: (Math.random() - 0.5) * 1,
              vy: 0.5 + Math.random() * 1.5,
              alpha: 0.8,
              size: 0.8 + Math.random() * 1,
            });
          }
        }

        // Update particles
        web.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05; // gravity
          p.alpha -= 0.03; // fade out
        });
        web.particles = web.particles.filter((p) => p.alpha > 0);

        if (web.life <= 0 && web.particles.length === 0) {
          return false; // Remove web
        }

        // 2. RENDER WEB STRAND
        const currentTargetX = web.startX + (web.targetX - web.startX) * web.progress;
        const currentTargetY = web.startY + (web.targetY - web.startY) * web.progress;

        ctx.save();
        
        // Calculate main line normal for vibration waves
        const dx = currentTargetX - web.startX;
        const dy = currentTargetY - web.startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nx = -dy / dist;
        const ny = dx / dist;

        // Draw main white web core with a glowing blue/red shadow
        ctx.shadowBlur = web.state === "shooting" ? 8 : 4;
        ctx.shadowColor = web.id % 2 === 0 ? "rgba(226, 54, 54, 0.8)" : "rgba(0, 102, 204, 0.8)";
        
        // Render Web Particles
        web.particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        });

        // Setup stroke parameters for main web strand
        ctx.lineWidth = web.state === "shooting" ? 2.5 : 1.5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${web.life})`;
        ctx.lineCap = "round";

        // Draw the web line with vibration (wavy sin curve during impact)
        ctx.beginPath();
        ctx.moveTo(web.startX, web.startY);

        const segments = 12;
        for (let i = 1; i <= segments; i++) {
          const ratio = i / segments;
          if (ratio > web.progress) break;

          let px = web.startX + dx * ratio;
          let py = web.startY + dy * ratio;

          // Apply elastic vibration wave
          if (web.state === "stuck" || web.state === "decaying") {
            const wave = Math.sin(ratio * Math.PI * 4) * web.vibration * Math.sin(Date.now() / 30);
            px += nx * wave * (1 - ratio); // Wave tapers off towards the target
            py += ny * wave * (1 - ratio);
          }

          ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Draw secondary outer thin fibers spiraling around the main line
        if (web.life > 0.3) {
          ctx.shadowBlur = 0; // Disable shadow for sub-fibers
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${web.life * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(web.startX, web.startY);

          for (let i = 1; i <= segments; i++) {
            const ratio = i / segments;
            if (ratio > web.progress) break;

            let px = web.startX + dx * ratio;
            let py = web.startY + dy * ratio;

            // Spiral offset waves
            const waveX = Math.sin(ratio * Math.PI * 8 + Date.now() / 60) * 3;
            const waveY = Math.cos(ratio * Math.PI * 8 + Date.now() / 60) * 3;
            px += nx * waveX;
            py += ny * waveY;

            ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

        // 3. DRAW IMPACT SPLAT (Spidey Net on sticky wall)
        if (web.state !== "shooting") {
          ctx.shadowBlur = 5;
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
          
          // Draw Concentric splat circles
          ctx.strokeStyle = `rgba(255, 255, 255, ${web.life * 0.6})`;
          const maxRadius = 25;
          const circles = 3;

          for (let c = 1; c <= circles; c++) {
            const radius = (maxRadius * c) / circles;
            ctx.beginPath();
            
            // Draw irregular circle to look organic
            for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.3) {
              const r = radius * (0.85 + Math.sin(a * 5 + web.id) * 0.15);
              const px = web.targetX + Math.cos(a) * r;
              const py = web.targetY + Math.sin(a) * r;
              if (a === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          // Draw radiating anchor lines
          ctx.beginPath();
          web.sideLines.forEach((line) => {
            const length = 40 * line.lengthRatio;
            const endX = web.targetX + Math.cos(line.angleOffset) * length;
            const endY = web.targetY + Math.sin(line.angleOffset) * length;
            ctx.moveTo(web.targetX, web.targetY);
            ctx.lineTo(endX, endY);
          });
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        ctx.restore();
        return true;
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none w-full h-full"
    />
  );
}
