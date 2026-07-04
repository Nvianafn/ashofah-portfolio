"use client";

import { useI18n } from "@/lib/i18n";
import { BIO, L } from "@/lib/content";
import { Terminal } from "./Terminal";
import { Chevron } from "./Icon";

export function Hero() {
  const { t, lang } = useI18n();
  const name = BIO.name as string;
  const lastSpace = name.lastIndexOf(" ");
  const first = lastSpace > -1 ? name.slice(0, lastSpace) : name;
  const last = lastSpace > -1 ? name.slice(lastSpace + 1) : "";

  return (
    <section className="hero" id="about">
      <div className="wrap">
        <div className="hero-copy">
          <div className="hero-role">
            <span className="bar" />
            <span>{L(BIO.role, lang)}</span>
          </div>
          <h1>
            {first} <span className="grad">{last}</span>
          </h1>
          <p className="hero-bio">{L(BIO.bio, lang)}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#contact">
              {t("cta.hire")}
            </a>
            <a className="btn" href="#projects">
              {t("cta.work")}
            </a>
          </div>
          <div className="hero-meta">
            {(BIO.meta as any[]).map((m, i) => (
              <span key={i}>
                <b>{m.value}</b>
                <br />
                {L(m.label, lang)}
              </span>
            ))}
          </div>
        </div>
        <Terminal />
      </div>
      <a className="scroll-hint" href="#statement" aria-label="Scroll down">
        <Chevron />
      </a>
    </section>
  );
}
