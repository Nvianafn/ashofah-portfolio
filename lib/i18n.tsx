"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./content";

type Strings = Record<string, string>;

export const UI: Record<Lang, Strings> = {
  en: {
    "nav.about": "about",
    "nav.stack": "stack",
    "nav.projects": "projects",
    "nav.contact": "contact",
    "cta.hire": "Hire me",
    "cta.work": "View projects",
    stackH: "Tech stack",
    stackSub: "The tools I reach for, grouped by where they live in the stack.",
    projH: "Selected projects",
    projSub:
      "A few things I have built and shipped. Type 'open <name>' in the terminal to jump to a repo.",
    contribH: "GitHub contributions",
    contribSub: "The last year of commits, pushes, and reviews.",
    contribTotal: "contributions this year",
    less: "less",
    more: "more",
    hireH: "Let's build something that stays up.",
    hireP:
      "Open to backend and DevOps roles, freelance, and collaborations. The fastest way to reach me is email.",
    footBuilt: "built by",
    menu: "menu",
    inProgress: "in progress",
    shipped: "shipped",
    live: "live",
  },
  id: {
    "nav.about": "about",
    "nav.stack": "stack",
    "nav.projects": "projects",
    "nav.contact": "contact",
    "cta.hire": "Hire gua",
    "cta.work": "Lihat project",
    stackH: "Tech stack",
    stackSub: "Tools yang gua pakai, dikelompokin sesuai posisinya di stack.",
    projH: "Project pilihan",
    projSub:
      "Beberapa yang udah gua bangun dan rilis. Ketik 'open <nama>' di terminal buat loncat ke repo.",
    contribH: "Kontribusi GitHub",
    contribSub: "Setahun terakhir commit, push, dan review.",
    contribTotal: "kontribusi tahun ini",
    less: "dikit",
    more: "banyak",
    hireH: "Ayo bangun sesuatu yang tetap nyala.",
    hireP:
      "Terbuka buat peran backend & DevOps, freelance, dan kolaborasi. Paling cepet dihubungin lewat email.",
    footBuilt: "dibuat oleh",
    menu: "menu",
    inProgress: "progres",
    shipped: "shipped",
    live: "live",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "en" || saved === "id") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  const t = (k: string) => UI[lang][k] ?? k;
  const value = { lang, setLang, t };

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  return useContext(I18nCtx);
}
