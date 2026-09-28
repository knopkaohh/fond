"use client";

import { useEffect, useRef, useState } from "react";

const MIN_MS = 1700;

export function Loader() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");
  const screenRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const fill = fillRef.current;
    const edge = edgeRef.current;
    if (!screen || !fill) return;

    document.documentElement.classList.add("sun-loading");

    const release = () => document.documentElement.classList.remove("sun-loading");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      fill.style.width = "100%";
      if (edge) edge.style.opacity = "0";
      const leave = window.setTimeout(() => setPhase("leave"), 160);
      const gone = window.setTimeout(() => {
        release();
        setPhase("gone");
      }, 520);
      return () => {
        window.clearTimeout(leave);
        window.clearTimeout(gone);
        release();
      };
    }

    let raf = 0;
    let leaveTimer = 0;
    let goneTimer = 0;
    const start = performance.now();
    let displayed = 0;
    let loaded = document.readyState === "complete";

    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener("load", onLoad);

    const apply = (value: number) => {
      const clamped = Math.max(0, Math.min(100, value));
      fill.style.width = `${clamped}%`;
      screen.style.setProperty("--load", (clamped / 100).toFixed(4));
      if (edge) edge.style.opacity = clamped > 97 ? "0" : "1";
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / MIN_MS);
      const timeCurve = (1 - (1 - t) ** 2.15) * 100;
      const target = !loaded ? Math.min(88, timeCurve) : elapsed >= MIN_MS ? 100 : timeCurve;
      const follow = loaded && elapsed >= MIN_MS ? 0.18 : 0.09;
      displayed += (target - displayed) * follow;
      apply(displayed);

      if (loaded && elapsed >= MIN_MS && displayed >= 99.4) {
        apply(100);
        leaveTimer = window.setTimeout(() => setPhase("leave"), 90);
        goneTimer = window.setTimeout(() => {
          release();
          setPhase("gone");
        }, 580);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(goneTimer);
      release();
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      ref={screenRef}
      className={`sun-loader${phase === "leave" ? " is-leave" : ""}`}
      role="status"
      aria-label="Страница загружается"
    >
      <div className="sun-loader-glow" aria-hidden="true" />
      <div className="sun-loader-logo">
        <img src="/logo.png" alt="" className="sun-loader-ghost" />
        <div className="sun-loader-fill" ref={fillRef}>
          <img src="/logo.png" alt="БФ «Подари солнечный свет»" />
          <span className="sun-loader-edge" ref={edgeRef} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
