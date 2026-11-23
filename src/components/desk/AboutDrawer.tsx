import React from "react";
import { aboutData } from "@/../content/about";
import { OpenDrawerFn } from "@/../content/desk";

interface AboutDrawerProps {
  onOpen: OpenDrawerFn;
}

export function AboutDrawer({ onOpen }: AboutDrawerProps) {
  return (
    <div className="about">
      <p className="lead">{aboutData.lead}</p>
      {aboutData.paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
      <ul className="meta">
        {aboutData.meta.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <div className="row">
        <button
          type="button"
          className="btn solid"
          onClick={() => onOpen("contact")}
        >
          Get in touch
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => onOpen("laptop", { folder: "projects", skip: true })}
        >
          See my projects
        </button>
      </div>
    </div>
  );
}
