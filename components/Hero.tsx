"use client";

import { useI18n } from "@/lib/i18n";
import { BIO, L } from "@/lib/content";
import { Terminal } from "./Terminal";

export function Hero() {
  const { lang, t } = useI18n();
  const firstName = String(BIO.name).split(" ")[0];

  return (
    <section className="hero" id="about">
      <div className="wrap">
        <div className="hero-copy">
          <div className="hero-role">
            <span className="bar" />
            <span>{L(BIO.role, lang)}</span>
          </div>
          <h1>
            <span className="hero-hello">{lang === "id" ? "Hai, gue" : "Hey, I’m"}</span>
            <span className="hero-name">{firstName}<span className="hero-dot">.</span></span>
          </h1>
          <p className="hero-bio">{L(BIO.bio, lang)}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              {t("cta.work")} <span aria-hidden="true">↗</span>
            </a>
            <a className="btn" href="#contact">
              {t("cta.hire")}
            </a>
          </div>
          <div className="hero-meta">
            {(BIO.meta as { value: string; label: { en: string; id: string } }[]).map((m) => (
              <span key={m.value}><b>{m.value}</b> · {L(m.label, lang)}</span>
            ))}
          </div>
        </div>

        <div className="hero-aside">
          <div className="hero-scene" aria-hidden="true">
            <span className="float-star">✳</span>
            <span className="float-note one">build → ship → repeat</span>
            <div className="hero-orbit">
              <div className="hero-core">NA</div>
            </div>
            <span className="float-note two">status: shipping ✦</span>
          </div>
          <div className="hero-terminal">
            <div className="term-intro">
              <span><strong>{t("terminal.title")}</strong> · {t("terminal.subtitle")}</span>
              <span className="term-live">{t("terminal.live")}</span>
            </div>
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
