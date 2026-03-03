"use client";

import { useState } from "react";
import clsx from "clsx";
import Button from "@/components/Button";

type Props = {
    className?: string;
};

export default function WaitlistForm({ className }: Props) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");

        // Simulate API call for now since we don't have the table set up
        setTimeout(() => {
            setStatus("success");
            setMessage("Thanks! You're on the list.");
            setEmail("");
        }, 1000);
    }

    return (
        <form onSubmit={onSubmit} className={clsx("flex flex-col gap-4 w-full max-w-sm", className)}>
            <div className="relative">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    disabled={status === "loading" || status === "success"}
                    placeholder="Enter your email"
                    className="h-14 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/50 outline-none backdrop-blur-md focus:border-primary-violet focus:ring-1 focus:ring-primary-violet transition-all disabled:opacity-50"
                />
                {status === "loading" && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-primary-violet" />
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="rounded-xl bg-primary-violet px-5 py-4 text-center text-lg font-bold uppercase tracking-wide text-white transition-all duration-150 hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:scale-100"
            >
                {status === "success" ? "Joined" : "Join Waitlist"}
            </button>

            {message && (
                <p className={clsx(
                    "text-sm font-medium text-center",
                    status === "success" ? "text-green-400" : "text-red-400"
                )}>
                    {message}
                </p>
            )}
        </form>
    );
}
