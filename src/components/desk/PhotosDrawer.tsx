import React from "react";
import Image from "next/image";
import { photos } from "@/../content/photos";

export function PhotosDrawer() {
  return (
    <>
      <p className="lead">A few pictures from outside the code.</p>
      <div className="polas">
        {photos.map((item) => {
          const hasImage = Boolean(item.src);
          return (
            <div
              key={item.id}
              className={`pola ${hasImage ? "has" : ""}`}
              style={{ "--tilt": item.tilt } as React.CSSProperties}
            >
              <span className="ph">
                {!hasImage && (
                  <svg viewBox="0 0 48 40" aria-hidden="true">
                    <rect x="3" y="8" width="42" height="28" rx="4" />
                    <circle cx="24" cy="22" r="7" />
                    <path d="M16 8l3-5h10l3 5" />
                  </svg>
                )}
                {hasImage && item.src && (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, 200px"
                    style={{ objectFit: "cover" }}
                  />
                )}
                {!hasImage && <span className="add">Photo</span>}
              </span>
              <span className="cap">{item.caption}</span>
              {item.description && (
                <span
                  style={{
                    display: "block",
                    fontSize: "0.76rem",
                    color: "var(--ink-2)",
                    marginTop: 4,
                    lineHeight: 1.3,
                    textAlign: "center"
                  }}
                >
                  {item.description}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="k">Photos from outside the code. Add pictures in content/photos.ts.</p>
    </>
  );
}
