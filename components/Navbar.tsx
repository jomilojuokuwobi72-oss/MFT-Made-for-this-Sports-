"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import WordMark from "@/components/WordMark";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const navigation = [
    { label: "About", link: "/about" },
    { label: "Blog", link: "/blog" },
    { label: "Join Waitlist", link: "/waitlist", isButton: true },
];

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="px-4 py-4 md:px-6 w-full glass-container fixed top-0 z-50 rounded-none border-b border-transparent" aria-label="Main">
            <div className="mx-auto flex max-w-7xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
                <div className="flex items-center justify-between z-50">
                    <Link href="/" onClick={() => setOpen(false)}>
                        <WordMark />
                        <span className="sr-only">Made For This Home Page</span>
                    </Link>
                    <button
                        type="button"
                        className="block p-2 text-3xl text-white md:hidden"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <MdMenu />
                        <span className="sr-only">Open menu</span>
                    </button>
                </div>

                {/* Mobile Nav */}
                <div
                    className={clsx(
                        "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-lg transition-all duration-300 ease-in-out md:hidden",
                        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                    )}
                >
                    <button
                        type="button"
                        className="fixed right-6 top-6 mb-4 block p-2 text-3xl text-white md:hidden"
                        aria-expanded={open}
                        onClick={() => setOpen(false)}
                    >
                        <MdClose />
                        <span className="sr-only">Close menu</span>
                    </button>

                    <div className="flex flex-col items-center gap-8 w-full px-6">
                        {navigation.map((item) => {
                            if (item.isButton) {
                                return (
                                    <Button
                                        key={item.label}
                                        href={item.link}
                                        className="w-full max-w-sm mt-8"
                                    >
                                        {item.label}
                                    </Button>
                                );
                            }
                            return (
                                <Link
                                    key={item.label}
                                    className="block text-3xl tracking-tight text-slate-300 hover:text-white transition-colors"
                                    href={item.link}
                                    onClick={() => setOpen(false)}
                                    aria-current={pathname === item.link ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden flex-row items-center gap-8 md:flex">
                    {navigation.map((item) => {
                        if (item.isButton) {
                            return (
                                <li key={item.label}>
                                    <Button href={item.link}>
                                        {item.label}
                                    </Button>
                                </li>
                            );
                        }

                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.link}
                                    className="inline-flex min-h-11 items-center text-slate-300 hover:text-white transition-colors"
                                    aria-current={pathname === item.link ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
