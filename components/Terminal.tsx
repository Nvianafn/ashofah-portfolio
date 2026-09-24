"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { BIO, L, PROJECTS, SOCIALS, STACK } from "@/lib/content";

type Line = { text: string; kind: "system" | "command" | "output" | "error" };

export function Terminal() {
  const { lang, t } = useI18n();
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { text: "Hi! Pick a shortcut below or type help.", kind: "system" },
  ]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLines([{ text: lang === "id" ? "Halo! Pilih tombol di bawah atau ketik help." : "Hi! Pick a shortcut below or type help.", kind: "system" }]);
  }, [lang]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const command = raw.trim();
    if (!command) return;
    const normalized = command.toLowerCase();
    if (normalized === "clear") {
      setLines([]);
      setValue("");
      return;
    }

    const output: Line[] = [];
    const add = (text: string, kind: Line["kind"] = "output") => output.push({ text, kind });
    const parts = normalized.split(/\s+/);
    const action = parts[0];

    if (action === "help") {
      add(lang === "id" ? "Coba salah satu:" : "Try one of these:");
      add("about · projects · stack · contact · open <project>");
    } else if (action === "about" || action === "whoami" || (action === "cat" && parts[1] === "about.txt")) {
      add(String(BIO.name) + " — " + L(BIO.role, lang));
      add(L(BIO.tagline, lang));
      add(L(BIO.bio, lang));
    } else if (action === "projects" || action === "ls") {
      add(lang === "id" ? "Project yang bisa lu jelajahi:" : "Projects you can explore:");
      PROJECTS.forEach((p) => add("↳ " + p.slug + " — " + p.name));
    } else if (action === "stack") {
      STACK.forEach((group) => add(L(group.label, lang) + ": " + group.items.map((item) => item.name).join(", ")));
    } else if (action === "contact") {
      add(lang === "id" ? "Kirim email ke " + SOCIALS.email : "Email me at " + SOCIALS.email);
      add(lang === "id" ? "Atau buka bagian kontak di bawah halaman." : "Or use the contact section at the bottom of the page.");
    } else if (action === "open" && parts[1]) {
      const project = PROJECTS.find((item) => item.slug === parts[1]);
      if (project) {
        const url = project.live || project.repo;
        add("Opening " + project.name + " ↗");
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        add(lang === "id" ? "Project nggak ketemu. Ketik projects buat lihat daftarnya." : "Project not found. Type projects to see the list.", "error");
      }
    } else {
      add(lang === "id" ? "Command belum dikenal. Ketik help atau pakai tombol di bawah." : "I don’t know that command. Type help or use a shortcut below.", "error");
    }

    setLines((current) => [...current, { text: "$ " + command, kind: "command" }, ...output]);
    setValue("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(value);
    inputRef.current?.focus();
  };

  const shortcuts = [
    { command: "about", label: lang === "id" ? "Tentang gue" : "About me" },
    { command: "projects", label: "Projects" },
    { command: "stack", label: "Stack" },
    { command: "contact", label: "Contact" },
  ];

  return (
    <div className="term">
      <div className="term-bar">
        <div className="term-btns" aria-hidden="true"><i /><i /><i /></div>
        <span className="term-title"><b>novian@ashofah</b>: ~/portfolio</span>
      </div>
      <div className="term-body" ref={bodyRef} aria-live="polite">
        {lines.map((line, index) => <div key={index} className={"term-line " + line.kind}>{line.text}</div>)}
      </div>
      <form className="term-input-row" onSubmit={submit}>
        <span className="term-prompt" aria-hidden="true">$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t("terminal.placeholder")}
          aria-label={t("terminal.input")}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button className="term-submit" type="submit" aria-label={t("terminal.run")}>↵</button>
      </form>
      <div className="term-chips" aria-label={t("terminal.shortcuts")}>
        {shortcuts.map((item) => <button key={item.command} type="button" onClick={() => run(item.command)}>{item.label}</button>)}
        <button type="button" onClick={() => run("clear")}>{lang === "id" ? "Bersihkan" : "Clear"}</button>
      </div>
      <div className="term-hint">{t("terminal.hint")}</div>
    </div>
  );
}
