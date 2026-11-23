import React from "react";
import { stackData } from "@/../content/stack";

export function StackContent() {
  return (
    <div className="win">
      <div className="win-bar">
        <span className="dots" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span>~/stack</span>
      </div>
      <div className="win-body" style={{ gap: 0 }}>
        {stackData.map((row, idx) => (
          <div
            className="srow"
            key={row.category}
            style={idx === 0 ? { borderTop: 0 } : undefined}
          >
            <h4>{row.category}</h4>
            {row.chips && (
              <ul className="chips">
                {row.chips.map((chip, cIdx) => (
                  <li key={cIdx}>{chip}</li>
                ))}
              </ul>
            )}
            {row.paragraph && <p>{row.paragraph}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
