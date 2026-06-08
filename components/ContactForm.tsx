"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/contact";
import Button from "./ui/Button";

const inputClass =
  "bg-white/5 border border-white/10 rounded-none px-6 py-5 sm:px-8 sm:py-6 text-lg sm:text-2xl font-bold focus:outline-none focus:border-white/40 transition-all placeholder:text-white/50";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const result = await submitContact({ name, email, message });

    if (result.success) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
      setError(result.error || "Something went wrong. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 border border-white/10 bg-white/[0.02] p-12 text-center">
        <h3 className="text-3xl sm:text-4xl font-bold uppercase font-display">Message sent.</h3>
        <p className="text-white/70 font-bold uppercase text-sm">
          We&apos;ll be in touch soon. Keep grinding.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          className={inputClass}
        />
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={inputClass}
        />
      </div>
      <textarea
        required
        placeholder="How can we help you reach your peak?"
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={status === "loading"}
        className={`${inputClass} resize-none h-full min-h-[180px]`}
      />

      {status === "error" && (
        <p className="text-red-500 text-sm sm:text-base font-bold uppercase">{error}</p>
      )}

      <Button
        type="submit"
        variant="solid"
        fullWidth
        loading={status === "loading"}
        className="mt-2 shadow-2xl [&_.btn-face]:py-8 sm:[&_.btn-face]:py-12"
      >
        Submit Application
      </Button>
    </form>
  );
}
