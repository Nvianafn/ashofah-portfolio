"use client";

import { useI18n } from "@/lib/i18n";
import { PROJECTS, L } from "@/lib/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  if (status === "live")
    return (
      <span className="proj-status live">
        <span className="pd" />
        {t("live")}
      </span>
    );
  if (status === "wip")
    return (
      <span className="proj-status wip">
        <span className="pd" />
        {t("inProgress")}
      </span>
    );
  return <span className="proj-status">{t("shipped")}</span>;
}

export function Projects() {
  const { t, lang } = useI18n();
  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>{t("projH")}</h2>
          <p>{t("projSub")}</p>
        </Reveal>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.slug}
              className={"proj" + (p.featured ? " feat" : "")}
              delay={(i % 2) * 0.06}
            >
              <div className="card">
                <div className="proj-top">
                  <span className="proj-name">{p.name}</span>
                  <StatusBadge status={p.status} />
                </div>
                <p className="proj-desc">{L(p.desc, lang)}</p>
                <div className="proj-tags">
                  {p.tech.map((x) => (
                    <span className="tag" key={x}>
                      {x}
                    </span>
                  ))}
                </div>
                <div className="proj-links">
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      <Icon slug="arrowup" />{" "}
                      {p.live.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    <Icon slug="github" /> repo
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
