import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and thoughts on building software, startups, and AI.",
};

const TOPICS = [
  "Building products people actually use",
  "Startups, leverage, and compounding",
  "The craft of shipping software",
  "AI as a tool for founders",
  "What I learned building and selling a company",
];

export default function WritingPage() {
  return (
    <section>
      <SectionHeading label="writing" />
      <div className="rounded-xl border border-border bg-bg-card p-6">
        <p className="text-sm leading-relaxed text-text-secondary">
          No posts yet — but this is where they&apos;ll live. I&apos;m working
          on it.
        </p>
        <div className="mt-5">
          <p className="mb-3 font-mono text-xs text-text-muted">
            topics i&apos;m thinking about
          </p>
          <ul className="space-y-2">
            {TOPICS.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-yellow" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
