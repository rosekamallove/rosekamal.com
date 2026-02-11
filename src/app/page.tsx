import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  MapPin,
} from "@/components/icons";

const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Email",
    href: "mailto:rosekamallove@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rose-kamal-love-1146141b0/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/rosekamallove",
    icon: Github,
  },
];

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
    title: "Co-Founder",
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
    title: "Software Engineer Intern",
    company: "Material Depot",
    companyNote: "YC W22",
    period: "Jan 2023 - Feb 2023",
    location: "Remote",
    description: null,
    highlights: [],
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
    title: "Frontend Developer Intern",
    company: "BlendED",
    period: "May 2022 - Jul 2022",
    location: "Remote",
    description: null,
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
  {
    title: "Pre-Fellow",
    company: "MLH Fellowship",
    period: "Jul 2021 - Aug 2021",
    location: "Remote",
    description: null,
    highlights: [
      "Integrated AlanAI voice control into a portfolio template",
      "Co-built a YouTube learning tool that won 'Best Project' in pod",
    ],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      {/* ── Nav ── */}
      <nav className="animate-fade-in mb-16 flex items-center justify-between">
        <span className="font-mono text-sm text-text-muted">rkl</span>
        <div className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="mb-20">
        <div className="animate-fade-in stagger-1 mb-4 flex items-center gap-2 text-sm text-text-secondary">
          <MapPin />
          <span>Bengaluru, India</span>
          <span className="mx-1 text-text-muted">/</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            Available
          </span>
        </div>

        <h1 className="animate-fade-in stagger-2 mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Rose Kamal Love
        </h1>

        <p className="animate-fade-in stagger-3 mb-6 max-w-lg text-lg leading-relaxed text-text-secondary">
          Product Lead & IC at{" "}
          <span className="text-text-primary">OptimizeCX</span>. Exited founder
          of <span className="text-text-primary">Kroto</span> (acquired). I
          build products people actually use.
        </p>

        <div className="animate-fade-in stagger-4 flex gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-card transition-all hover:border-border-hover hover:bg-bg-card-hover"
            >
              <link.icon />
            </a>
          ))}
        </div>
      </header>

      {/* ── Now ── */}
      <section className="animate-fade-in stagger-5 mb-20">
        <SectionHeading label="Now" />
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="text-sm leading-relaxed text-text-secondary">
            Leading product and shipping as an IC on{" "}
            <span className="text-text-primary font-medium">InstantDocs</span>{" "}
            at OptimizeCX — the evolution of Kroto after its acquisition.
            Building the future of product documentation.
          </p>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="animate-fade-in stagger-6 mb-20">
        <SectionHeading label="Experience" />
        <div className="space-y-1">
          {EXPERIENCE.map((role, i) => (
            <ExperienceCard key={i} {...role} />
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="animate-fade-in stagger-7 mb-20">
        <SectionHeading label="Education" />
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <h3 className="font-medium">B.Tech, Computer Science</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Mahatma Jyotiba Phule Rohilkhand University, Bareilly
          </p>
          <p className="mt-0.5 font-mono text-xs text-text-muted">
            2020 - 2024
          </p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="animate-fade-in stagger-8 mb-12">
        <SectionHeading label="Get in touch" />
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:rosekamallove@gmail.com"
            className="group flex flex-1 items-center justify-between rounded-xl border border-border bg-bg-card px-5 py-4 transition-all hover:border-border-hover hover:bg-bg-card-hover"
          >
            <div className="flex items-center gap-3">
              <Mail />
              <span className="text-sm">rosekamallove@gmail.com</span>
            </div>
            <ArrowUpRight />
          </a>
          <a
            href="https://www.linkedin.com/in/rose-kamal-love-1146141b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-between rounded-xl border border-border bg-bg-card px-5 py-4 transition-all hover:border-border-hover hover:bg-bg-card-hover"
          >
            <div className="flex items-center gap-3">
              <Linkedin />
              <span className="text-sm">LinkedIn</span>
            </div>
            <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="animate-fade-in-slow border-t border-border pt-8 text-center">
        <p className="font-mono text-xs text-text-muted">
          Rose Kamal Love &middot; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

/* ─── Components ─── */

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
        {label}
      </h2>
      <div className="h-px flex-1 bg-border" />
    </div>
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
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
