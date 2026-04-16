import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

let cachedFonts: Array<{ name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }> | null = null;

async function loadFonts() {
  if (cachedFonts) return cachedFonts;

  const [regular, bold] = await Promise.all([
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf").then((r) => r.arrayBuffer()),
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf").then((r) => r.arrayBuffer()),
  ]);

  cachedFonts = [
    { name: "Inter", data: regular, weight: 400, style: "normal" },
    { name: "Inter", data: bold, weight: 700, style: "normal" },
  ];
  return cachedFonts;
}

export type OgVariant = "default" | "writing" | "projects" | "quit";

export async function renderOgPng(opts: {
  title: string;
  subtitle?: string;
  kicker?: string;
  variant?: OgVariant;
}): Promise<Uint8Array> {
  const { title, subtitle, kicker = "rkl", variant = "default" } = opts;
  const fonts = await loadFonts();

  const bg = variant === "quit" ? "#0c0a09" : "#0c0a09";
  const accent = variant === "writing" ? "#e8a977"
    : variant === "projects" ? "#f5c489"
    : "#f5e6d3";

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          background: bg,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "Inter",
          position: "relative",
        },
        children: [
          // Paper texture gradient
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at top left, rgba(232,169,119,0.08), transparent 60%)",
                display: "flex",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                color: "#78716c",
                fontSize: "18px",
                marginBottom: "28px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "flex",
              },
              children: kicker,
            },
          },
          {
            type: "div",
            props: {
              style: {
                color: accent,
                fontSize: title.length > 40 ? "54px" : "68px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: subtitle ? "24px" : "0",
                maxWidth: "1000px",
                display: "flex",
              },
              children: title,
            },
          },
          subtitle && {
            type: "div",
            props: {
              style: {
                color: "#a8a29e",
                fontSize: "24px",
                letterSpacing: "-0.01em",
                maxWidth: "900px",
                display: "flex",
              },
              children: subtitle,
            },
          },
        ].filter(Boolean),
      },
    } as any,
    { width: 1200, height: 630, fonts }
  );

  const png = new Resvg(svg).render().asPng();
  return new Uint8Array(png);
}
