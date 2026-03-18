import type { Metadata } from "next";
import { Guitar, Piano, Camera } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Outside Work",
  description: "What I do when I'm not building software.",
};

const HOBBIES = [
  {
    icon: Guitar,
    label: "Guitar",
    note: "acoustic & electric",
    description:
      "About six months in. Barre chords finally clicked — felt like unlocking a new level. Still rough around the edges but getting there.",
  },
  {
    icon: Piano,
    label: "Piano",
    note: "learning",
    description:
      "Over a year in. Can get through a few scales without falling apart. Slower progress than expected, but it's satisfying in a way coding rarely is.",
  },
  {
    icon: Camera,
    label: "Photography",
    note: "street & landscape",
    description:
      "Shoot mostly on the street and on trips. Interested in light, composition, and catching moments before they pass.",
  },
];

export default function OutsidePage() {
  return (
    <section>
      <SectionHeading label="outside work" />
      <div className="space-y-3">
        {HOBBIES.map((h) => (
          <div
            key={h.label}
            className="rounded-xl border border-transparent px-5 py-4 transition-all hover:border-border hover:bg-bg-card"
          >
            <div className="mb-2 flex items-center gap-2">
              <h.icon size={16} className="text-text-muted" />
              <span className="font-medium">{h.label}</span>
              <span className="font-mono text-xs text-text-muted">
                {h.note}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {h.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
