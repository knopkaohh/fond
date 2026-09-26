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
    const leave = window.setTimeout(() => setPhase("leave"), 900);
    const gone = window.setTimeout(() => {
      sessionStorage.setItem("sun-loader", "1");
      setPhase("gone");
    }, 1300);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-[#fffdf8] transition-opacity duration-300 ${
        phase === "leave" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Страница загружается"
    >
      <div className="text-center">
        <img src="/logo.png" alt="" className="mx-auto h-14 w-auto" />
        <p className="mt-4 text-sm font-semibold text-[var(--muted)]">Подари солнечный свет</p>
      </div>
    </div>
  );
}
