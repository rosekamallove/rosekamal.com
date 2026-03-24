"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Mar 20 2026, 2:00 AM IST (UTC+5:30)
const QUIT_DATE = new Date("2026-03-20T02:00:00+05:30");

// days slowest, seconds fastest — like a slot machine settling
const DURATIONS = { days: 3800, hours: 3000, minutes: 2400, seconds: 1800 };

type Elapsed = { days: number; hours: number; minutes: number; seconds: number };

function getElapsed(): Elapsed {
  const total = Math.floor((Date.now() - QUIT_DATE.getTime()) / 1000);
  return {
    days:    Math.floor(total / 86400),
    hours:   Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-mono text-[4rem] font-bold leading-none tabular-nums text-text-primary sm:text-[7rem] lg:text-[9rem]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-mono text-[0.6rem] tracking-[0.25em] text-text-muted uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function IQuitNicotinePage() {
  const [elapsed, setElapsed] = useState<Elapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const rafRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const target = getElapsed();
    const start = performance.now();
    const maxDuration = Math.max(...Object.values(DURATIONS));

    function tick(now: number) {
      const ms = now - start;

      setElapsed({
        days:    Math.round(target.days    * easeOutQuart(Math.min(ms / DURATIONS.days,    1))),
        hours:   Math.round(target.hours   * easeOutQuart(Math.min(ms / DURATIONS.hours,   1))),
        minutes: Math.round(target.minutes * easeOutQuart(Math.min(ms / DURATIONS.minutes, 1))),
        seconds: Math.round(target.seconds * easeOutQuart(Math.min(ms / DURATIONS.seconds, 1))),
      });

      if (ms < maxDuration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setElapsed(getElapsed());
        intervalRef.current = setInterval(() => setElapsed(getElapsed()), 1000);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-16 bg-bg px-6">
      <p className="font-mono text-[0.65rem] tracking-[0.3em] text-text-muted uppercase">
        nicotine free for
      </p>

      <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:flex sm:gap-16 lg:gap-24">
        <Unit value={elapsed.days}    label="days"    />
        <Unit value={elapsed.hours}   label="hours"   />
        <Unit value={elapsed.minutes} label="minutes" />
        <Unit value={elapsed.seconds} label="seconds" />
      </div>

      <p className="font-mono text-xs text-text-muted">
        since mar 20, 2026 &middot; 2:00 am
      </p>

      <Link
        href="/"
        className="absolute bottom-8 font-mono text-xs text-text-muted transition-colors hover:text-text-primary"
      >
        ← back
      </Link>
    </div>
  );
}
