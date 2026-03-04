"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollContext({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Only set the default scroller AFTER the DOM element exists
        const scroller = document.querySelector("#main-scroll");
        if (scroller) {
            ScrollTrigger.defaults({ scroller });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return <>{children}</>;
}

