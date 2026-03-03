/**
 * Mocked Prismic client to satisfy the Suburbia Header component requirements
 * without throwing errors about missing credentials.
 */
import { createClient as createPrismicClient } from "@prismicio/client";

export const createClient = () => {
    return {
        getSingle: async (uid: string) => {
            if (uid === "settings") {
                return {
                    data: {
                        navigation: [
                            { link: { text: "About", url: "/about" } },
                            { link: { text: "Blog", url: "/blog" } },
                            { link: { text: "Join Waitlist", url: "/waitlist" } },
                        ],
                    },
                };
            }
            return null;
        }
    } as any;
};
