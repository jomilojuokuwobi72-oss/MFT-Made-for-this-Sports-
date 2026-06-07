"use client";

import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline";
type Tone = "dark" | "onLight";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

/** Join class strings, dropping falsy values. (No clsx dep in this app.) */
function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Single source of truth for the raised offset (px). Used by base + face. */
const OFFSET = "5px";

/** Static skin per tone+variant. Motion classes are constant (see below). */
const SKIN: Record<Tone, Record<Variant, {
  face: string;
  base: string;
  sweep: string;
  hoverText: string;
}>> = {
  dark: {
    outline: {
      face: "border border-white bg-transparent text-white",
      base: "border border-white/40 bg-white/25",
      sweep: "bg-white",
      hoverText: "group-hover:text-black",
    },
    solid: {
      face: "border border-white bg-white text-black",
      base: "border border-white/40 bg-white/25",
      sweep: "bg-white",
      hoverText: "",
    },
  },
  onLight: {
    outline: {
      face: "border border-black bg-transparent text-black",
      base: "border border-black/40 bg-black/25",
      sweep: "bg-black",
      hoverText: "group-hover:text-white",
    },
    solid: {
      face: "border border-black bg-black text-white",
      base: "border border-black/40 bg-black/25",
      sweep: "bg-black",
      hoverText: "",
    },
  },
};

const SIZE: Record<Size, string> = {
  sm: "px-4 py-2 text-base gap-2",
  md: "px-8 py-4 text-2xl gap-3",
  lg: "px-16 py-8 text-4xl gap-4",
};

export default function Button({
  variant = "solid",
  tone = "dark",
  size = "md",
  icon,
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const skin = SKIN[tone][variant];
  const showSweep = variant === "outline";
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        "btn-layered group relative isolate inline-flex select-none font-display font-bold uppercase tracking-tight rounded-none",
        "outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        tone === "onLight"
          ? "focus-visible:ring-black focus-visible:ring-offset-white"
          : "focus-visible:ring-white focus-visible:ring-offset-[#0A0A0A]",
        "disabled:opacity-50 disabled:pointer-events-none",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {/* Raised offset base — static, never transformed, sibling of face. */}
      <span
        aria-hidden
        className={cn(
          "btn-base pointer-events-none absolute inset-[1px] -z-10 rounded-none",
          skin.base,
        )}
        style={{ transform: `translate(${OFFSET}, ${OFFSET})` }}
      />

      {/* Pressing face — owns the press transform; clips the sweep. */}
      <span
        className={cn(
          "btn-face relative z-10 flex w-full items-center justify-center overflow-hidden rounded-none",
          "transition-transform duration-300 ease-out",
          "group-hover:translate-x-[5px] group-hover:translate-y-[5px]",
          "group-active:translate-x-[5px] group-active:translate-y-[5px]",
          SIZE[size],
          skin.face,
        )}
      >
        {/* White sweep, bottom -> top (outline only). */}
        {showSweep && (
          <span
            aria-hidden
            className={cn(
              "btn-sweep pointer-events-none absolute inset-0 -z-[1] translate-y-full",
              "transition-transform duration-300 ease-out group-hover:translate-y-0",
              skin.sweep,
            )}
          />
        )}

        {loading ? (
          <Loader2 className="h-[1em] w-[1em] animate-spin" aria-hidden />
        ) : (
          <>
            {/* Label flip well: original slides up & out, duplicate rises from below. */}
            <span
              className={cn(
                "relative z-10 block overflow-hidden leading-none transition-colors duration-150 group-hover:delay-150",
                skin.hoverText,
              )}
            >
              <span className="btn-flip-orig block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                {children}
              </span>
              <span
                aria-hidden
                className="btn-flip-dup absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
              >
                {children}
              </span>
            </span>

            {/* Icon flip well: exits to the right, a copy re-enters from the right. */}
            {icon && (
              <span
                aria-hidden
                className={cn(
                  "relative z-10 inline-flex size-[1em] shrink-0 overflow-hidden transition-colors duration-150 group-hover:delay-150 [&_svg]:size-full",
                  skin.hoverText,
                )}
              >
                <span className="absolute inset-0 inline-flex items-center transition-transform duration-300 ease-out group-hover:translate-x-full">
                  {icon}
                </span>
                <span className="absolute inset-0 inline-flex translate-x-full items-center transition-transform delay-100 duration-300 ease-out group-hover:translate-x-0">
                  {icon}
                </span>
              </span>
            )}
          </>
        )}
      </span>
    </button>
  );
}
