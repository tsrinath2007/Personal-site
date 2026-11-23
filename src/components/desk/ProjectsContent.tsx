import React from "react";
import { projects } from "@/../content/projects";

export function ProjectsContent() {
  return (
    <div className="win">
      <div className="win-bar">
        <span className="dots" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span>~/projects</span>
      </div>
      <div className="win-body">
        {projects.map((item) => (
          <article className="item" key={item.id}>
            <p className="kick">{item.kick}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.facts && item.facts.length > 0 && (
              <ul className="facts">
                {item.facts.map((fact, idx) => (
                  <li key={idx}>{fact}</li>
                ))}
              </ul>
            )}
            {item.chips && item.chips.length > 0 && (
              <ul className="chips">
                {item.chips.map((chip, idx) => (
                  <li key={idx}>{chip}</li>
                ))}
              </ul>
            )}
            {item.links && item.links.length > 0 && (
              <p className="links">
                {item.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
