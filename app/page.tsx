import { content } from "../content";
import { Section } from "../components/Section";
import { TextLink } from "../components/TextLink";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[680px] flex-col gap-14 px-6 py-16 text-[15px] leading-[1.8] sm:px-8 md:py-20">
      <header className="grid gap-6 md:grid-cols-[120px_1fr]">
        <div className="text-xs uppercase tracking-[0.35em] text-heading/60">
          Profile
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-heading text-3xl tracking-tight md:text-4xl">
                {content.header.name}
              </h1>
              <p className="text-lg text-heading/90">
                {content.header.tagline}
              </p>
              <p className="text-sm text-text/80">{content.header.location}</p>
            </div>
            <ThemeToggle />
          </div>
          <div className="text-sm text-text/75">
            <span className="text-accent">•</span> calm build mode
          </div>
        </div>
      </header>

      <Section title={content.now.title}>
        <ul className="space-y-4 text-text">
          {content.now.items.map((item) => (
            <li key={item.text} className="space-y-2">
              <div className="text-heading/90">{item.text}</div>
              {item.subitems?.length ? (
                <ul className="space-y-1 pl-5 text-text/85">
                  {item.subitems.map((subitem) => (
                    <li key={subitem} className="flex gap-2">
                      <span className="text-accent">-</span>
                      <span>{subitem}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={content.prev.title}>
        <ul className="space-y-2 text-text">
          {content.prev.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-heading/35">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={content.about.title}>
        <div className="space-y-4 text-text">
          {content.about.body.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section title={content.projects.title}>
        <ul className="space-y-5">
          {content.projects.items.map((project) => (
            <li key={project.name} className="space-y-1">
              <TextLink href={project.href}>
                <span className="text-heading">{project.name}</span>
              </TextLink>
              {project.description ? (
                <p className="text-text/90">{project.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={content.writing.title}>
        <p className="text-text">{content.writing.body}</p>
      </Section>

      <Section title={content.socials.title}>
        <ul className="space-y-2">
          {content.socials.items.map((social) => (
            <li key={social.name}>
              <TextLink href={social.href}>{social.name}</TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <footer className="text-xs uppercase tracking-[0.2em] text-text/60">
        {content.footer}
      </footer>
    </main>
  );
}
