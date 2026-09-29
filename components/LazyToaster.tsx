"use client";

import dynamic from "next/dynamic";

// Toasts only ever appear after user interaction, so keep sonner out of the
// initial bundle.
const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false }
);

export function LazyToaster() {
  return <Toaster />;
}
