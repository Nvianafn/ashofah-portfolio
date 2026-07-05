"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { L, Project } from "@/lib/content";
import { Icon } from "./Icon";
import { Carousel } from "./Carousel";

const overlayT = { duration: 0.22 };
const panelT = { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] };

function StatusPill({
  status,
  live,
  wip,
  shipped,
}: {
  status: string;
  live: string;
  wip: string;
  shipped: string;
}) {
  if (status === "live")
    return (
      <span className="proj-status live">
        <span className="pd" />
        {live}
      </span>
    );
  if (status === "wip")
    return (
      <span className="proj-status wip">
        <span className="pd" />
        {wip}
      </span>
    );
  return <span className="proj-status">{shipped}</span>;
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const [shown, setShown] = useState<Project | null>(project);
  const open = Boolean(project);

  useEffect(() => {
    if (project) setShown(project);
  }, [project]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const p = shown;
  const label = p
    ? p.live
      ? p.live.replace(/^https?:\/\//, "")
      : "~/projects/" + p.slug
    : "";
  const imgs = p && p.images && p.images.length ? p.images : [""];
  const slides = imgs.map((src) => ({ src, label }));

  const overlayAnimate = { opacity: open ? 1 : 0 };
  const panelAnimate = {
    opacity: open ? 1 : 0,
    y: open ? 0 : 16,
    scale: open ? 1 : 0.98,
  };
  const overlayClass = "pm-overlay" + (open ? " open" : "");

  return (
    <motion.div
      className={overlayClass}
      onClick={onClose}
      initial={false}
      animate={overlayAnimate}
      transition={overlayT}
      aria-hidden={!open}
    >
      {p ? (
        <motion.div
          className="pm-panel"
          onClick={(e) => e.stopPropagation()}
          initial={false}
          animate={panelAnimate}
          transition={panelT}
        >
          <button className="pm-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
          <div className="pm-info">
            <div className="pm-meta">
              <StatusPill
                status={p.status}
                live={t("live")}
                wip={t("inProgress")}
                shipped={t("shipped")}
              />
            </div>
            <h3 className="pm-title">{p.name}</h3>
            <p className="pm-desc">{L(p.desc, lang)}</p>
            <div className="pm-tech">
              <span className="pm-label">{t("techUsed")}</span>
              <div className="pm-tags">
                {p.tech.map((x) => (
                  <span className="tag" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div className="pm-links">
              {p.live ? (
                <a href={p.live} target="_blank" rel="noopener noreferrer">
                  <Icon slug="arrowup" /> {label}
                </a>
              ) : null}
              <a href={p.repo} target="_blank" rel="noopener noreferrer">
                <Icon slug="github" /> repo
              </a>
            </div>
          </div>
          <div className="pm-media">
            <Carousel slides={slides} autoplay={open} />
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
