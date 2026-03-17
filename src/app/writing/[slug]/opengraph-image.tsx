import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const title = post?.title ?? "Rose Kamal Love";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
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
          display: "flex",
          color: "#555",
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
          display: "flex",
          color: "#fafafa",
          fontSize: "52px",
          fontWeight: 700,
          letterSpacing: "-2px",
          lineHeight: 1.1,
          marginBottom: "28px",
          maxWidth: "900px",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", color: "#888", fontSize: "22px", letterSpacing: "-0.5px" }}>
        {date} · rosekamal.com
      </div>
    </div>,
    { ...size }
  );
}
