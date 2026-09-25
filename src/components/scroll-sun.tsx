"use client";

import { useEffect, useState } from "react";

function SunGraphic({ rotate }: { rotate: number }) {
  return (
    <div
      className="relative h-64 w-64 will-change-transform sm:h-72 sm:w-72"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#c9a8d8] to-[#e8d4b0] opacity-80 blur-2xl" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full drop-shadow-sm">
        <circle cx="100" cy="100" r="46" fill="#f3e0a8" />
        {Array.from({ length: 16 }).map((_, index) => (
          <rect
            key={index}
            x="96"
            y="18"
            width="8"
            height="28"
            rx="4"
            fill="#c9a26a"
            transform={`rotate(${index * 22.5} 100 100)`}
          />
        ))}
      </svg>
    </div>
  );
}

function useSunRotate() {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setRotate(window.scrollY * 0.2);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return rotate;
}

export function ScrollSun() {
  const rotate = useSunRotate();

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-64 lg:block xl:w-80" aria-hidden>
      <div className="sticky top-36 translate-x-1/3 xl:translate-x-1/4">
        <SunGraphic rotate={rotate} />
      </div>
    </div>
  );
}

export function HeroSun() {
  const rotate = useSunRotate();
  return (
    <div className="relative mx-auto w-fit lg:invisible">
      <SunGraphic rotate={rotate} />
    </div>
  );
}
