import React from "react";
import { hackathons } from "@/../content/hackathons";

export function HackathonsContent() {
  return (
    <div className="win">
      <div className="win-bar">
        <span className="dots" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span>~/hackathons</span>
      </div>
      <div className="win-body">
        {hackathons.map((item) => (
          <article className="item" key={item.id}>
            <p className="kick">{item.kick}</p>
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}

            {item.subItems &&
              item.subItems.map((sub, sIdx) => (
                <div className="sub" key={sIdx}>
                  <h4>{sub.title}</h4>
                  <p>{sub.description}</p>
                  {sub.links && sub.links.length > 0 && (
                    <p className="links">
                      {sub.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </p>
                  )}
                </div>
              ))}

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

            {item.relatedBlogSlug && (
              <p className="links" style={{ marginTop: 6 }}>
                <a
                  href={`/blog/${item.relatedBlogSlug}`}
                  style={{
                    color: "var(--accent, #e05252)",
                    fontWeight: 600,
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  📖 Read Blog: {item.relatedBlogTitle || "Engineering breakdown"} ↗
                </a>
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
