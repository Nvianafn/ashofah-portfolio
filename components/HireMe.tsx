"use client";

import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { BIO, SOCIALS, L } from "@/lib/content";
import { Reveal } from "./Reveal";

export function HireMe() {
  const { t, lang } = useI18n();
  const btnRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };

  return (
    <section className="hire" id="contact">
      <div className="wrap">
        <Reveal className="hire-inner">
          <div className="avail">
            <span className="pd" />
            <span>{L(BIO.availability, lang)}</span>
          </div>
          <h2>{t("hireH")}</h2>
          <p>{t("hireP")}</p>
          <div className="hire-cta" onPointerMove={onMove} onPointerLeave={onLeave}>
            <a
              ref={btnRef}
              className="btn btn-primary magnet"
              href={"mailto:" + SOCIALS.email}
            >
              <span>{t("cta.hire")}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
