import React from "react";
import { nowData } from "@/../content/now";
import { OpenDrawerFn } from "@/../content/desk";

interface NowDrawerProps {
  onOpen: OpenDrawerFn;
}

export function NowDrawer({ onOpen }: NowDrawerProps) {
  return (
    <>
      <article className="pass">
        <div className="pass-main">
          <p className="k">{nowData.header}</p>
          <div className="route">
            <div>
              <b>{nowData.origin.code}</b>
              <span className="c">{nowData.origin.city}</span>
            </div>
            <svg
              className="plane"
              viewBox="0 0 160 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M2 12h120" strokeDasharray="3 6" />
              <path d="M128 12h28M148 5l8 7-8 7" />
            </svg>
            <div>
              <b>{nowData.destination.code}</b>
              <span className="c">{nowData.destination.city}</span>
            </div>
          </div>
          <dl className="fields">
            {nowData.fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="pass-stub stub" aria-hidden="true">
          <div className="bars"></div>
          <span>{nowData.stubText}</span>
        </div>
      </article>

      <section className="focus">
        <h3>{nowData.focus.title}</h3>
        <ul>
          {nowData.focus.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="row">
        <button
          type="button"
          className="btn solid"
          onClick={() => onOpen("contact")}
        >
          Say hello
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => onOpen("laptop", { folder: "projects", skip: true })}
        >
          See what I built
        </button>
      </div>
    </>
  );
}
