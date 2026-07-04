"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SOCIALS } from "@/lib/content";
import { Reveal } from "./Reveal";

type Day = { level: number };

function fallbackDays(): Day[] {
  // deterministic pattern used only if the live API is unreachable
  let seed = 7;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const out: Day[] = [];
  for (let i = 0; i < 53 * 7; i++) {
    const r = rnd();
    const level = r > 0.82 ? 4 : r > 0.66 ? 3 : r > 0.45 ? 2 : r > 0.26 ? 1 : 0;
    out.push({ level });
  }
  return out;
}

export function Contributions() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const url =
      "https://github-contributions-api.jogruber.de/v4/" +
      SOCIALS.githubUser +
      "?y=last";
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!alive) return;
        const contribs = (data.contributions || []) as {
          count: number;
          level: number;
        }[];
        const last = contribs.slice(-371).map((d) => ({ level: d.level }));
        const sum = contribs.reduce((a, d) => a + (d.count || 0), 0);
        setDays(last.length ? last : fallbackDays());
        setTotal(sum);
      })
      .catch(() => {
        if (!alive) return;
        const fb = fallbackDays();
        setDays(fb);
        setTotal(fb.reduce((a, d) => a + d.level, 0) * 6 + 120);
      });
    return () => {
      alive = false;
    };
  }, []);

  const cells = days || fallbackDays();

  return (
    <section className="sec" id="contrib">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>{t("contribH")}</h2>
          <p>{t("contribSub")}</p>
        </Reveal>
        <Reveal className="contrib-card">
          <div className="contrib-head">
            <span className="who">
              @<b>{SOCIALS.githubUser}</b> / {year}
            </span>
            <span className="contrib-total">
              {total != null ? (
                <>
                  <b>{total.toLocaleString()}</b> {t("contribTotal")}
                </>
              ) : (
                <span className="skeleton-txt" />
              )}
            </span>
          </div>
          <div className="graph">
            {cells.map((d, i) => (
              <span
                key={i}
                className={"cell" + (d.level ? " l" + d.level : "")}
              />
            ))}
          </div>
          <div className="contrib-legend">
            <span>{t("less")}</span>
            <span className="cell" />
            <span className="cell l1" />
            <span className="cell l2" />
            <span className="cell l3" />
            <span className="cell l4" />
            <span>{t("more")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
