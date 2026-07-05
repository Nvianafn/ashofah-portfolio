"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PROJECTS, L, Project } from "@/lib/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { ProjectModal } from "./ProjectModal";

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

function ProjShot({
  src,
  name,
  label,
  hint,
}: {
  src?: string;
  name: string;
  label: string;
  hint: string;
}) {
  const [broken, setBroken] = useState(false);
  const showImg = Boolean(src) && !broken;
  return (
    <div className="proj-shot">
      <div className="shot-bar">
        <i />
        <i />
        <i />
        <span className="shot-url">{label}</span>
      </div>
      <div className="shot-frame">
        {showImg ? (
          <img
            src={src}
            alt={name + " preview"}
            loading="lazy"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="shot-ph">
            <Icon slug="terminal" />
            <span className="ph-slug">{name}</span>
          </div>
        )}
        <span className="proj-open-hint">
          <Icon slug="external" /> {hint}
        </span>
      </div>
    </div>
  );
}

export function Projects() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>{t("projH")}</h2>
          <p>{t("projSub")}</p>
        </Reveal>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => {
            const label = p.live
              ? p.live.replace(/^https?:\/\//, "")
              : "~/projects/" + p.slug;
            return (
              <Reveal
                key={p.slug}
                className={"proj" + (p.featured ? " feat" : "")}
                delay={(i % 2) * 0.06}
              >
                <div
                  className="card"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActive(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(p);
                    }
                  }}
                >
                  <ProjShot
                    src={p.images?.[0]}
                    name={p.name}
                    label={label}
                    hint={t("preview")}
                  />
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
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon slug="arrowup" /> {label}
                      </a>
                    ) : null}
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon slug="github" /> repo
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
