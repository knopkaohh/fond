"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    const seen = sessionStorage.getItem("sun-loader");
    if (seen) {
      setPhase("gone");
      return;
    }
    const leave = window.setTimeout(() => setPhase("leave"), 1700);
    const gone = window.setTimeout(() => {
      sessionStorage.setItem("sun-loader", "1");
      setPhase("gone");
    }, 2300);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center transition-opacity duration-500 ${
        phase === "leave" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(119,198,255,0.98) 18%, rgba(130,36,227,0.96) 62%, rgba(122,0,124,0.98) 100%)",
      }}
      aria-hidden={phase === "leave"}
      role="status"
      aria-label="Страница загружается"
    >
      <div className="flex flex-col items-center px-6 text-center text-white">
        <div className="relative mb-6 h-28 w-28">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />
          <span className="absolute inset-3 rounded-full bg-white/20" />
          <svg viewBox="0 0 120 120" className="relative h-28 w-28 drop-shadow-lg">
            <circle cx="60" cy="60" r="28" fill="#fff3a1" />
            {Array.from({ length: 12 }).map((_, index) => (
              <rect
                key={index}
                x="57"
                y="8"
                width="6"
                height="16"
                rx="3"
                fill="white"
                opacity="0.9"
                transform={`rotate(${index * 30} 60 60)`}
              />
            ))}
          </svg>
        </div>
        <p className="font-[family-name:var(--font-unbounded)] text-2xl font-semibold tracking-tight sm:text-3xl">
          Подари солнечный свет
        </p>
        <p className="mt-2 max-w-sm text-sm text-white/90 sm:text-base">
          Помощь детям, рождённым на раннем сроке
        </p>
        <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-white/30">
          <div className="h-full w-1/2 animate-[load_1.4s_ease-in-out_infinite] rounded-full bg-white" />
        </div>
      </div>
      <style>{`@keyframes load { 0% { transform: translateX(-120%);} 100% { transform: translateX(220%);} }`}</style>
    </div>
  );
}
