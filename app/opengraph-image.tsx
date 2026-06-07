import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Branded 1200x630 social share card — logo + wordmark on the brand-black bg.
export const runtime = "nodejs";
export const alt = "Made4This — Made For This Sports";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/images/mft-logo.png")),
    readFile(join(process.cwd(), "public/fonts/avaleigh/Avaleigh Bold.otf")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* subtle technical grid, matches the site */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={220}
          height={220}
          alt="Made4This logo"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Avaleigh",
            fontSize: 96,
            marginTop: 36,
            letterSpacing: "-0.02em",
          }}
        >
          Made4This<span style={{ color: "#a1a1aa" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.7)",
            marginTop: 4,
          }}
        >
          MADE FOR THIS SPORTS
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Avaleigh", data: font, style: "normal", weight: 700 }],
    },
  );
}
