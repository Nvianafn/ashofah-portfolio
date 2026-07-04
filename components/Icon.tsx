import {
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiMysql,
  SiLinux,
  SiNginx,
  SiPm2,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiGithub,
  SiGmail,
} from "react-icons/si";
import {
  PiLinkedinLogoBold,
  PiArrowUpRightBold,
  PiTerminalWindowBold,
  PiArrowSquareOutBold,
} from "react-icons/pi";
import type { IconType } from "react-icons";

const MAP: Record<string, IconType> = {
  php: SiPhp,
  javascript: SiJavascript,
  typescript: SiTypescript,
  laravel: SiLaravel,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  nextdotjs: SiNextdotjs,
  mysql: SiMysql,
  linux: SiLinux,
  nginx: SiNginx,
  pm2: SiPm2,
  docker: SiDocker,
  githubactions: SiGithubactions,
  git: SiGit,
  github: SiGithub,
  gmail: SiGmail,
  linkedin: PiLinkedinLogoBold,
  arrowup: PiArrowUpRightBold,
  external: PiArrowSquareOutBold,
  terminal: PiTerminalWindowBold,
};

export function Icon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const C = MAP[slug];
  if (!C) return null;
  return <C className={className} aria-hidden />;
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
