import Image from "next/image";
import { resume } from "../data/resume";

export default function Home() {
  const {
    name,
    title,
    location,
    email,
    linkedin,
    photo,
    now,
    highlights,
    experience,
    education,
    links
  } = resume;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ambient opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:48px_48px] opacity-30"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 md:pb-24 md:pt-16">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm uppercase tracking-[0.25em] text-muted">
            Rose Kamal Love
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a className="hover:text-accent" href="#experience">
              Experience
            </a>
            <a className="hover:text-accent" href="#highlights">
              Highlights
            </a>
            <a className="hover:text-accent" href="#education">
              Education
            </a>
            <a className="hover:text-accent" href="#contact">
              Contact
            </a>
          </div>
        </nav>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="pill">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {location} · Remote
            </div>
            <h1 className="text-4xl font-semibold text-ink md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              {name}
            </h1>
            <p className="text-lg text-muted md:text-xl">{title}</p>
            <p className="max-w-2xl text-base text-muted md:text-lg">
              I build AI-first SaaS from zero to traction, blending product strategy,
              engineering, and growth. My focus is on shipping fast, testing with real
              users, and turning documentation into a growth engine.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-full border border-border bg-white/80 px-5 py-2 text-sm font-medium text-ink shadow-soft transition hover:-translate-y-0.5 hover:text-accent"
                href={`mailto:${email}`}
              >
                Email
              </a>
              <a
                className="rounded-full border border-border bg-white/80 px-5 py-2 text-sm font-medium text-ink shadow-soft transition hover:-translate-y-0.5 hover:text-accent"
                href={linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="rounded-full border border-border bg-ink px-5 py-2 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5"
                href="/rose-kamal-love-resume.pdf"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="card space-y-6">
            <div className="flex items-center gap-5">
              <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-border">
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes="96px"
                  priority
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">
                  Currently
                </div>
                <div className="text-lg font-semibold text-ink">
                  Product Lead & IC at OptimizeCX
                </div>
                <div className="text-sm text-muted">InstantDocs · AI + SaaS</div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-muted">
              {now.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className="grid gap-3 rounded-2xl border border-border bg-white/70 p-4 text-xs uppercase tracking-[0.2em] text-muted">
              <div className="flex items-center justify-between">
                <span>Location</span>
                <span className="text-ink">{location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email</span>
                <span className="text-ink">{email}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="highlights" className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="section-title">Highlights</div>
              <h2 className="section-heading">Proof of momentum</h2>
            </div>
            <p className="max-w-xl text-sm text-muted">
              Shipping velocity, distribution, and growth are my core focus. Here are a
              few moments that show the pace and outcomes.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight.label} className="card">
                <div className="text-xs uppercase tracking-[0.3em] text-muted">
                  {highlight.label}
                </div>
                <div className="mt-3 text-2xl font-semibold text-ink">
                  {highlight.value}
                </div>
                <p className="mt-2 text-sm text-muted">{highlight.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="section-title">Experience</div>
              <h2 className="section-heading">From founder to product lead</h2>
            </div>
            <p className="max-w-xl text-sm text-muted">
              I like roles where I can own outcomes end-to-end, from product vision to
              execution and growth.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {experience.map((item) => (
              <div key={`${item.company}-${item.role}`} className="card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-ink">
                      {item.role}
                    </div>
                    <div className="text-sm text-muted">
                      {item.company} · {item.location}
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-muted">
                    {item.dates}
                  </div>
                </div>
                {item.summary ? (
                  <p className="mt-4 text-sm text-muted">{item.summary}</p>
                ) : null}
                {item.bullets.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="section-title">Education</div>
              <h2 className="section-heading">Academic foundation</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4">
            {education.map((item) => (
              <div key={item.institution} className="card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-ink">
                      {item.degree}
                    </div>
                    <div className="text-sm text-muted">{item.institution}</div>
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-muted">
                    {item.dates}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-16">
          <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="section-title">Let us build</div>
              <h2 className="section-heading">Open to bold product bets</h2>
              <p className="mt-3 max-w-xl text-sm text-muted">
                If you are building AI-first SaaS or want to turn documentation into a
                growth engine, I would love to connect.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  className="rounded-full border border-border bg-white/80 px-5 py-2 text-sm font-medium text-ink shadow-soft transition hover:-translate-y-0.5 hover:text-accent"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-muted">
          <span>Designed as a resume replacement</span>
          <span>{new Date().getFullYear()} · {name}</span>
        </footer>
      </div>
    </main>
  );
}
