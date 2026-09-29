"use client";

import { LazyMotion } from "framer-motion";
import { ReactNode } from "react";

const loadFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Components use the lightweight `m` element; animation features are fetched
 * after hydration. `strict` flags any stray `motion.*` that would pull the full
 * bundle back into the main chunk.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
