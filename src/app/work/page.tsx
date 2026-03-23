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

function groupByYear(entries: typeof EXPERIENCE) {
  const map: Record<string, typeof EXPERIENCE> = {};
  for (const entry of entries) {
    const year = entry.period.split(" ")[1];
    if (!map[year]) map[year] = [];
    map[year].push(entry);
  }
  return Object.entries(map).sort(([a], [b]) => Number(b) - Number(a));
}

export default function WorkPage() {
  const groups = groupByYear(EXPERIENCE);

  return (
    <>
      <section className="mb-20">
        <SectionHeading label="experience" />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />

          {groups.map(([year, entries]) => (
            <div key={year} className="relative mb-10 last:mb-0">

              {/* Year label */}
              <div className="relative mb-5 flex items-center pl-10">
                <div className="absolute left-[3px] top-1/2 z-10 h-2 w-2 -translate-y-1/2 border border-border bg-bg" />
                <span className="font-mono text-xs tracking-widest text-text-muted">{year}</span>
              </div>

              {/* Entries */}
              <div className="space-y-8">
                {entries.map((role, i) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute left-[4.5px] top-[6px] h-[5px] w-[5px] bg-border" />
                    <div>
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-medium text-text-primary">{role.title}</p>
                          <p className="text-sm text-text-secondary">
                            {role.company}
                            {role.companyNote && (
                              <span className="text-text-muted"> · {role.companyNote}</span>
                            )}
                          </p>
                        </div>
                        <div className="shrink-0 sm:text-right">
                          <p className="font-mono text-xs text-text-muted">{role.period}</p>
                          <p className="flex items-center gap-1 text-xs text-text-muted sm:justify-end">
                            <MapPin size={10} />
                            {role.location}
                          </p>
                        </div>
                      </div>

                      {role.description && (
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {role.description}
                        </p>
                      )}

                      {role.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {role.highlights.map((item, j) => (
                            <li key={j} className="flex gap-2 text-sm text-text-secondary">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading label="education" />
        <div className="relative pl-10">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />
          <div className="absolute left-[3px] top-[3px] z-10 h-2 w-2 border border-border bg-bg" />
          <h3 className="font-medium text-text-primary">B.Tech, Computer Science</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Mahatma Jyotiba Phule Rohilkhand University, Bareilly
          </p>
          <p className="mt-0.5 font-mono text-xs text-text-muted">
            2020 – 2024 · Dropped out in final year to start Kroto
          </p>
        </div>
      </section>
    </>
  );
}
