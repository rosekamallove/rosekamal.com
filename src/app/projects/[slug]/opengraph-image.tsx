import { ImageResponse } from "next/og";
import { getAllProjects, getProject } from "@/lib/project-posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Rose Kamal Love";
  const dateRange = project
    ? `${project.startDate} – ${project.endDate}`
    : "";
  const stack = project?.stack?.slice(0, 5).join(" · ") ?? "";

  return new ImageResponse(
    <div
      style={{
        background: "#2d353b",
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
          display: "flex",
          color: "#7a8478",
          fontSize: "18px",
          fontFamily: "monospace",
          marginBottom: "32px",
          letterSpacing: "0.05em",
        }}
      >
        rkl · projects
      </div>
      <div
        style={{
          display: "flex",
          color: "#d3c6aa",
          fontSize: "52px",
          fontWeight: 700,
          letterSpacing: "-2px",
          lineHeight: 1.1,
          marginBottom: "24px",
          maxWidth: "900px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {dateRange && (
          <div
            style={{
              color: "#a7c080",
              fontSize: "20px",
              fontFamily: "monospace",
            }}
          >
            {dateRange}
          </div>
        )}
        {stack && (
          <div style={{ color: "#7a8478", fontSize: "18px" }}>{stack}</div>
        )}
      </div>
    </div>,
    { ...size }
  );
}
