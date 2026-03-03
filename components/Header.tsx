import Link from "next/link";
import React from "react";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

export async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="header absolute left-0 right-0 top-0 z-50 py-4 px-4 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="flex-shrink-0 z-50">
          <Logo className="text-primary-violet h-12 md:h-16" />
        </Link>
        <nav
          aria-label="Main"
          className="hidden md:flex flex-1 justify-center z-50"
        >
          <ul className="flex items-center gap-8">
            {settings.data.navigation.map((item: any) => (
              <li key={item.link.text}>
                <PrismicNextLink field={item.link} className="text-lg font-bold tracking-wide hover:text-primary-violet transition-colors" />
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center z-50">
          <ButtonLink href="#waitlist" icon="cart" color="purple">
            <span className="md:hidden">Join</span>
            <span className="hidden md:inline">Join Waitlist</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
