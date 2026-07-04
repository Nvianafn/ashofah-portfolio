"use client";

import { useI18n } from "@/lib/i18n";
import { BIO, L } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Statement() {
  const { lang } = useI18n();
  const s = BIO.statement;
  return (
    <section className="statement" id="statement">
      <div className="wrap">
        <Reveal>
          <p>
            <span className="lead">{L(s.lead, lang)}</span>{" "}
            <span className="hl">{L(s.tail, lang)}</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="sub">{L(s.sub, lang)}</p>
        </Reveal>
      </div>
    </section>
  );
}
