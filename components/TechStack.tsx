"use client";

import { useI18n } from "@/lib/i18n";
import { STACK, L } from "@/lib/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function TechStack() {
  const { t, lang } = useI18n();
  return (
    <section className="sec" id="stack">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>{t("stackH")}</h2>
          <p>{t("stackSub")}</p>
        </Reveal>
        <div className="stack-groups">
          {STACK.map((g, gi) => (
            <Reveal key={g.key} className="stack-col" delay={gi * 0.08}>
              <h3>
                {L(g.label, lang)} <span className="n">({g.items.length})</span>
              </h3>
              <div className="stack-items">
                {g.items.map((it) => (
                  <div className="tech" key={it.slug + it.name}>
                    <span className="logo">
                      <Icon slug={it.slug} />
                    </span>
                    <span className="name">{it.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
