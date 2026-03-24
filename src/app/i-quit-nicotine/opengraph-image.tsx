import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "I Quit Nicotine — Rose Kamal Love";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const QUIT_DATE = new Date("2026-03-20T02:00:00+05:30");

function getElapsed() {
  const total = Math.floor((Date.now() - QUIT_DATE.getTime()) / 1000);
  return {
    days:    Math.floor(total / 86400),
    hours:   Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export default function Image() {
  const { days, hours, minutes, seconds } = getElapsed();
  const units = [
    { value: days,    label: "days"    },
    { value: hours,   label: "hours"   },
    { value: minutes, label: "minutes" },
    { value: seconds, label: "seconds" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0a09",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <div
          style={{
            color: "#78716c",
            fontSize: 13,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 56,
            fontFamily: "monospace",
          }}
        >
          nicotine free for
        </div>

        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
          {units.map(({ value, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  color: "#fafaf9",
                  fontSize: 112,
                  fontWeight: 700,
                  lineHeight: 1,
                  fontFamily: "monospace",
                  letterSpacing: "-0.02em",
                }}
              >
                {String(value).padStart(2, "0")}
              </div>
              <div
                style={{
                  color: "#57534e",
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            color: "#44403c",
            fontSize: 14,
            marginTop: 56,
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          since mar 20, 2026 · 2:00 am — rosekamal.com
        </div>
      </div>
    ),
    { ...size }
  );
}
