"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["#about", t("nav.about")],
    ["#stack", t("nav.stack")],
    ["#projects", t("nav.projects")],
    ["#contact", t("nav.contact")],
  ];

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap">
        <a className="brand" href="#top">
          <span className="dot" />
          <span>
            ~/novian<b>.ashofah</b>
          </span>
        </a>
        <div className={"nav-links" + (open ? " open" : "")}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span className="hash">#</span> <span>{label}</span>
            </a>
          ))}
          <div className="lang-toggle">
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={lang === "id" ? "active" : ""}
              onClick={() => setLang("id")}
            >
              ID
            </button>
          </div>
        </div>
        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          [ {t("menu")} ]
        </button>
      </div>
    </nav>
  );
}
