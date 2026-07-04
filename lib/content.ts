import bio from "@/content/bio.json";
import projects from "@/content/projects.json";
import stack from "@/content/stack.json";
import socials from "@/content/socials.json";

export type Lang = "en" | "id";
export type Localized = { en: string; id: string };

export type Project = {
  slug: string;
  name: string;
  featured: boolean;
  status: "live" | "wip" | "done";
  desc: Localized;
  tech: string[];
  live: string;
  repo: string;
};

export type StackGroup = {
  key: string;
  label: Localized;
  items: { name: string; slug: string }[];
};

export const BIO = bio as any;
export const PROJECTS = projects as Project[];
export const STACK = stack as StackGroup[];
export const SOCIALS = socials as {
  domain: string;
  email: string;
  github: string;
  githubUser: string;
  linkedin: string;
  whatsapp: string;
};

export function L(obj: Localized | undefined, lang: Lang): string {
  if (!obj) return "";
  return obj[lang] != null ? obj[lang] : obj.en;
}
