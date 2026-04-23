"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state on close
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
        setError("");
      }, 300);
    }
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      
      tl.fromTo(backdropRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      
      tl.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

      const elements = modalRef.current?.querySelectorAll(".animate-item");
      if (elements) {
        tl.fromTo(elements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.2"
        );
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await joinWaitlist(email);

    if (result.success) {
      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      setStatus("error");
      setError(result.error || "Something went wrong. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl bg-black border border-white/20 p-12 md:p-24 overflow-hidden rounded-none shadow-2xl"
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-20"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="relative z-10 text-center flex flex-col items-center">
          {status === "success" ? (
            <div className="py-12">
              <h2 className="text-5xl md:text-7xl font-secondary tracking-tighter mb-6">YOU&apos;RE IN.</h2>
              <p className="text-white/80 font-bold uppercase tracking-[0.4em] text-sm">
                The vanguard awaits. Keep an eye on your transmission.
              </p>
            </div>
          ) : (
            <>
              <span className="animate-item text-xs sm:text-sm font-bold uppercase tracking-[0.5em] text-white/70 mb-8 block font-display">
                Exclusive Early Access
              </span>
              <h2 className="animate-item text-5xl md:text-8xl lg:text-9xl mb-12 tracking-tighter font-secondary leading-[0.85]">
                JOIN THE <br /> WAITLIST
              </h2>

              <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-8">
                <div className="animate-item relative group">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-none px-10 py-8 text-lg font-bold tracking-widest text-center focus:outline-none focus:border-white transition-all placeholder:text-white/50 uppercase"
                    disabled={status === "loading"}
                  />

                  {status === "error" && (
                    <p className="absolute -bottom-10 left-0 right-0 text-red-500 text-4xl font-bold uppercase tracking-widest animate-pulse">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="animate-item w-full mt-16 py-8 text-2xl bg-white text-black font-bold hover:bg-neutral-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 rounded-none font-display"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Secure Spotlight
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>

              <p className="animate-item mt-12 text-xl font-bold text-white/90 max-w-xs leading-relaxed font-display">
                By joining, you agree to our privacy framework and occasional tactical updates.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
