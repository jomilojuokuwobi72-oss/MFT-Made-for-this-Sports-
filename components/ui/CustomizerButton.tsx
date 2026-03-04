"use client";

import { useStore } from "@/store/useStore";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings02Icon } from "@hugeicons/core-free-icons";
import clsx from "clsx";

export default function CustomizerButton() {
  const { isCustomizerOpen, setCustomizerOpen } = useStore();

  return (
    <button
      onClick={() => setCustomizerOpen(true)}
      className={clsx(
        "fixed bottom-12 right-12 z-40 flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/20 pointer-events-auto",
        isCustomizerOpen
          ? "opacity-0 translate-y-10"
          : "opacity-100 translate-y-0",
      )}
      aria-label="Customize"
    >
      <HugeiconsIcon icon={Settings02Icon} className="w-6 h-6" />
    </button>
  );
}
