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
    "cta.hire": "Say hello",
    "cta.work": "Explore projects",
    "terminal.title": "Interactive terminal",
    "terminal.subtitle": "explore my work",
    "terminal.live": "ready",
    "terminal.placeholder": "Try: projects, stack, contact…",
    "terminal.input": "Enter a terminal command",
    "terminal.run": "Run command",
    "terminal.shortcuts": "Suggested commands",
    "terminal.hint": "No terminal experience needed · press a shortcut or type help",
    stackH: "My toolbox",
    stackSub: "A few tools I use to build, connect, and ship reliable web systems.",
    projH: "Selected projects",
    projSub: "A few things I’ve built and shipped. Open a card to see screenshots and details.",
    contribH: "Building in public",
    contribSub: "A year of commits, pushes, and reviews.",
    contribTotal: "contributions this year",
    less: "less",
    more: "more",
    hireH: "Have something good to build?",
    hireP: "I’m open to backend and DevOps roles, freelance work, and collaborations. The fastest way to reach me is email.",
    footBuilt: "made with care by",
    menu: "menu",
    inProgress: "in progress",
    shipped: "shipped",
    live: "live",
    techUsed: "Built with",
    preview: "see project",
  },
  id: {
    "nav.about": "tentang",
    "nav.stack": "stack",
    "nav.projects": "project",
    "nav.contact": "kontak",
    "cta.hire": "Sapa gue",
    "cta.work": "Lihat project",
    "terminal.title": "Terminal interaktif",
    "terminal.subtitle": "jelajahi karya gue",
    "terminal.live": "siap",
    "terminal.placeholder": "Coba: projects, stack, contact…",
    "terminal.input": "Masukkan perintah terminal",
    "terminal.run": "Jalankan perintah",
    "terminal.shortcuts": "Perintah saran",
    "terminal.hint": "Nggak perlu paham terminal · pilih tombol atau ketik help",
    stackH: "Toolkit gue",
    stackSub: "Tools yang gue pakai buat membangun dan merilis sistem web yang andal.",
    projH: "Project pilihan",
    projSub: "Beberapa hal yang sudah gue bangun dan rilis. Buka kartu untuk lihat screenshot dan detail.",
    contribH: "Ngoding sambil berbagi",
    contribSub: "Rekam jejak commit, push, dan review selama setahun.",
    contribTotal: "kontribusi tahun ini",
    less: "sedikit",
    more: "banyak",
    hireH: "Ada hal seru yang mau dibangun?",
    hireP: "Gue terbuka buat peran backend dan DevOps, freelance, serta kolaborasi. Paling cepat hubungi gue lewat email.",
    footBuilt: "dibuat dengan sepenuh hati oleh",
    menu: "menu",
    inProgress: "dikerjakan",
    shipped: "selesai",
    live: "live",
    techUsed: "Teknologi",
    preview: "lihat project",
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
