// Reuse the same branded card for the Twitter/X (summary_large_image) preview.
// `runtime` must be declared directly here — Next.js can't recognize it when
// re-exported from another module.
export const runtime = "nodejs";
export { default, alt, size, contentType } from "./opengraph-image";
