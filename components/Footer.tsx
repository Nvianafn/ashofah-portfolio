"use client";

import { useI18n } from "@/lib/i18n";
import { BIO, SOCIALS } from "@/lib/content";
import { Icon } from "./Icon";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const socials: [string, string][] = [
    ["github", SOCIALS.github],
    ["linkedin", SOCIALS.linkedin],
    ["gmail", "mailto:" + SOCIALS.email],
  ];
  return (
    <footer className="foot">
      <div className="wrap">
        <span className="cp">
          {t("footBuilt")} <b>{BIO.name}</b> / {year}
        </span>
        <div className="foot-soc">
          {socials
            .filter((s) => s[1])
            .map((s) => (
              <a
                key={s[0]}
                href={s[1]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s[0]}
              >
                <Icon slug={s[0]} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
