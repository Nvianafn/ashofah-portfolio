import { BIO, PROJECTS, SOCIALS, STACK, L, Lang } from "./content";

export type FsFile = { type: "file"; content: string[]; hidden?: boolean };
export type FsDir = {
  type: "dir";
  children: Record<string, FsNode>;
  hidden?: boolean;
};
export type FsNode = FsFile | FsDir;

function file(content: string[], hidden = false): FsFile {
  return { type: "file", content, hidden };
}

export function buildFS(lang: Lang): FsDir {
  const skillsFiles: Record<string, FsNode> = {};
  STACK.forEach((g) => {
    skillsFiles[g.key + ".txt"] = file([
      "# " + L(g.label, lang),
      "",
      ...g.items.map((it) => "  - " + it.name),
    ]);
  });

  const projDirs: Record<string, FsNode> = {};
  PROJECTS.forEach((p) => {
    projDirs[p.slug] = {
      type: "dir",
      children: {
        "readme.md": file([
          "# " + p.name,
          "",
          L(p.desc, lang),
          "",
          "stack:  " + p.tech.join(", "),
          "status: " + p.status,
          p.live ? "live:   " + p.live : "live:   (private)",
          "repo:   " + p.repo,
          "",
          "tip: run 'open " + p.slug + "' to launch it.",
        ]),
      },
    };
  });

  return {
    type: "dir",
    children: {
      "about.txt": file([
        BIO.name,
        BIO.role[lang] || BIO.role.en,
        "",
        L(BIO.bio, lang),
        "",
        "location: Purwokerto, Indonesia",
        "status:   " + L(BIO.availability, lang),
      ]),
      skills: { type: "dir", children: skillsFiles },
      projects: { type: "dir", children: projDirs },
      experience: {
        type: "dir",
        children: {
          "timeline.txt": file([
            "# experience",
            "",
            "now   .. PMII Rayon Saintek website (in progress) [Laravel]",
            "2025  .. YASU Project, full-stack platform        [Next.js + Node.js]",
            "2025  .. KKN 97 Semali + CI/CD pipeline           [Next.js]",
            "2024  .. Rowokele 112, self-hosted on VPS         [Nginx + PM2]",
            "2024  .. GenBI Purwokerto REST API               [Laravel]",
            "2024  .. SIMPUS distributed system (4 services)   [Laravel + REST]",
          ]),
        },
      },
      "contact.txt": file([
        "# contact",
        "",
        "email:    " + SOCIALS.email,
        "github:   " + SOCIALS.github,
        "linkedin: " + SOCIALS.linkedin,
        "web:      https://" + SOCIALS.domain,
        "",
        "run 'sudo hire-me' if you like what you see.",
      ]),
      ".secrets": {
        type: "dir",
        hidden: true,
        children: {
          "flag.txt": file(
            [
              "you found the hidden directory. respect.",
              "here is a cookie: \uD83C\uDF6A  (ok, a text one)",
              "now run 'sudo hire-me'.",
            ],
            true
          ),
        },
      },
    },
  };
}
