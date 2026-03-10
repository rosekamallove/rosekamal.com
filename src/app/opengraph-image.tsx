import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Rose Kamal Love — Founder, builder, product engineer.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#555555",
            fontSize: "18px",
            fontFamily: "monospace",
            marginBottom: "32px",
            letterSpacing: "0.05em",
          }}
        >
          rkl
        </div>
        <div
          style={{
            color: "#fafafa",
            fontSize: "68px",
            fontWeight: 700,
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          Rose Kamal Love
        </div>
        <div
          style={{
            color: "#888888",
            fontSize: "26px",
            letterSpacing: "-0.5px",
          }}
        >
          Founder, builder, product engineer.
        </div>
      </div>
    ),
    { ...size }
  );
}
