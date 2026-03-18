import type { Metadata } from "next";
import { MapPin } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Work",
  description: "Experience and career history.",
};

const EXPERIENCE = [
  {
    title: "Product Lead & IC (InstantDocs)",
    company: "OptimizeCX",
    period: "Jan 2025 - Present",
    location: "Newport, RI (Remote)",
    description: null,
    highlights: [],
  },
  {
    title: "Co-Founder & CEO",
    company: "Kroto",
    companyNote: "Acquired",
    period: "Jun 2024 - Jan 2025",
    location: "Bangalore, India",
    description:
      "AI-powered SaaS that generates professional-grade video documentation for SaaS products in minutes.",
    highlights: [
      "Launched the first version in 15 days with 11 pilot customers",
      "Launched on Product Hunt twice — ranked #4 and #1 for the day",
      "Scaled to 300+ activated users",
      "Over 2,000 video-guides created with ~100,000 views",
      "Led SEO efforts: 0 to 2,000 clicks/mo in 3 months",
      "6-figure acquisition — became InstantDocs",
    ],
  },
  {
    title: "Co-Founder & CEO",
    company: "Kroto",
    companyNote: "AI Course Creation",
    period: "May 2023 - Jun 2024",
    location: "Bareilly, India",
    description:
      "Started as an AI-powered course builder for creators. Discovered a larger use case in product documentation through customer conversations.",
    highlights: [
      "Scaled to 500+ courses across 30 paying creators",
      "Raised a pre-seed of $160,000 for 15%",
    ],
  },
  {
    title: "Open Source Developer",
    company: "Google Summer of Code",
    period: "Jun 2022 - Sep 2022",
    location: "Remote",
    description:
      "Rewrote the UI of LibreHealth Toolkit and Radiology as an Open Web Application following FHIR standards.",
    highlights: [],
  },
  {
    title: "Fellow (Open Source Developer)",
    company: "MLH Fellowship",
    period: "Sep 2021 - Dec 2021",
    location: "Remote",
    description:
      "Selected as one of 150 fellows from 20,000+ applicants (0.75% acceptance rate).",
    highlights: [
      "Refactored an open-source GitHub metrics project — streamlined metric additions by 25%",
      "Added new GraphQL metrics and type-safe tests with Tape.js",
      "Built a web client to improve accessibility",
    ],
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="mb-20">
        <SectionHeading label="experience" />
        <div className="space-y-1">
          {EXPERIENCE.map((role, i) => (
            <ExperienceCard key={i} {...role} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading label="education" />
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <h3 className="font-medium">B.Tech, Computer Science</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Mahatma Jyotiba Phule Rohilkhand University, Bareilly
          </p>
          <p className="mt-0.5 font-mono text-xs text-text-muted">
            2020 - 2024 (Dropped out in final year to start Kroto)
          </p>
        </div>
      </section>
    </>
  );
}

function ExperienceCard({
  title,
  company,
  companyNote,
  period,
  location,
  description,
  highlights,
}: {
  title: string;
  company: string;
  companyNote?: string;
  period: string;
  location: string;
  description: string | null;
  highlights: string[];
}) {
  return (
    <div className="group rounded-xl border border-transparent px-5 py-4 transition-all hover:border-border hover:bg-bg-card">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-text-secondary">
            {company}
            {companyNote && (
              <span className="text-text-muted"> &middot; {companyNote}</span>
            )}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-xs text-text-muted">{period}</p>
          <p className="flex items-center gap-1 text-xs text-text-muted sm:justify-end">
            <MapPin size={10} />
            {location}
          </p>
        </div>
      </div>

      {description && (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      )}

      {highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {highlights.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-text-secondary">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
