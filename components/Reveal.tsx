"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const HIDDEN = { opacity: 0, y: 18 };
const SHOWN = { opacity: 1, y: 0 };
const VIEWPORT = { once: true, amount: 0.2 };

export function Reveal({
  children,
  className,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const transition = { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] };
  return (
    <motion.div
      id={id}
      className={className}
      initial={HIDDEN}
      whileInView={SHOWN}
      viewport={VIEWPORT}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
