"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { address, email, nav, phones, requisites } from "@/lib/content";

export const primaryNav = [
  { label: "О фонде", href: "/o-fonde" },
  { label: "Как помогаем", href: "/nashi-programmy" },
  { label: "Проекты", href: "/nashi-programmy" },
  { label: "Истории", href: "/istorii-detey" },
  { label: "Новости", href: "/novosti" },
  { label: "Контакты", href: "/kontakty" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [a11y, setA11y] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("a11y", a11y);
  }, [a11y]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/poisk?q=${encodeURIComponent(value)}`);
    setOpen(false);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#fffdf8]/95 backdrop-blur-sm">
      <div className="border-b border-[var(--line)] bg-[#f1eaf4]">
        <div className="container-site flex items-center justify-between gap-3 py-1 text-xs text-[var(--muted)]">
          <div className="flex flex-wrap items-center gap-x-3">
            {phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-[var(--violet)]">
                {phone}
              </a>
            ))}
            <a href={`mailto:${email}`} className="hidden hover:text-[var(--violet)] sm:inline">
              {email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden sm:block">Пн–пт, 10:00–20:00</p>
            <button className="hidden font-semibold uppercase tracking-wide hover:text-[var(--violet)] md:inline" onClick={() => setA11y((value) => !value)}>
              {a11y ? "Обычная версия" : "Для слабовидящих"}
            </button>
          </div>
        </div>
      </div>
      <div className={`container-site flex items-center gap-6 transition-[padding] duration-300 ${compact ? "py-2" : "py-3.5"}`}>
        <Link href="/" className="shrink-0">
          <img
            src="/logo.png"
            alt="БФ «Подари солнечный свет»"
            className={`w-auto transition-[height] duration-300 ${compact ? "h-10" : "h-12"}`}
          />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Основное меню">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-semibold ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-[var(--lavender)] text-[var(--violet)]"
                  : "text-[var(--ink)] hover:text-[var(--violet)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--violet)]" onClick={() => setSearchOpen((value) => !value)}>
            Поиск
          </button>
          <Link href="/blagotvoritel" className="btn-primary">
            Помочь
          </Link>
        </div>
        <button
          className="ml-auto rounded-full border border-[var(--line)] px-3 py-2 text-sm font-semibold lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          Меню
        </button>
      </div>
      {searchOpen && (
        <div className="border-t border-[var(--line)] bg-white">
          <form onSubmit={onSearch} className="container-site flex gap-2 py-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Найти на сайте"
              aria-label="Поиск по сайту"
              className="w-full rounded-full border border-[var(--line)] px-4 py-2.5"
              autoFocus
            />
            <button className="btn-primary" type="submit">
              Найти
            </button>
          </form>
        </div>
      )}
      {open && (
        <div className="border-t border-[var(--line)] bg-white px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="mb-4 flex">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск"
              aria-label="Поиск по сайту"
              className="w-full rounded-l-full border border-[var(--line)] px-4 py-2 text-sm"
            />
            <button className="rounded-r-full bg-[var(--violet)] px-4 text-sm font-semibold text-white">Найти</button>
          </form>
          <div className="mb-4 flex flex-col gap-1">
            {primaryNav.map((item) => (
              <Link key={item.label} href={item.href} className="py-2 font-semibold">
                {item.label}
              </Link>
            ))}
            <Link href="/blagotvoritel" className="btn-primary mt-2">
              Помочь
            </Link>
            <Link href="/semiyam" className="btn-secondary mt-2">
              Получить помощь
            </Link>
          </div>
          {nav.map((item) => (
            <div key={item.href} className="mb-3">
              <Link href={item.href} className="text-sm font-semibold text-[var(--violet)]">
                {item.label}
              </Link>
              <div className="mt-1 flex flex-col">
                {item.children?.map((child) => (
                  <Link key={child.href} href={child.href} className="py-1 text-sm text-[var(--ink)]">
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <button className="ghost-btn mt-2 w-full" onClick={() => setA11y((value) => !value)}>
            {a11y ? "Обычная версия" : "Версия для слабовидящих"}
          </button>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="relative mt-0 overflow-hidden bg-[#27232a] text-[#f6f1ea]">
        <div className="pattern-soft absolute inset-0 opacity-[0.07]" />
        <div className="container-site relative grid gap-10 py-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src="/logo.png" alt="" className="h-12 w-auto brightness-0 invert" />
            <p className="mt-4 text-sm leading-6 text-[#d8d0d4]">
              Благотворительный фонд помощи детям, рождённым на раннем сроке. Москва и регионы России.
            </p>
            <Link href="/blagotvoritel" className="btn-gold mt-5">
              Помочь фонду
            </Link>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--gold)]">Навигация</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="/o-fonde">О фонде</Link>
              <Link href="/nashi-programmy">Как помогаем</Link>
              <Link href="/istorii-detey">Истории</Link>
              <Link href="/novosti">Новости</Link>
              <Link href="/semiyam">Получить помощь</Link>
              <Link href="/volonteram">Волонтёрам</Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--gold)]">Контакты</h2>
            <p className="mt-4 text-sm leading-6">
              {phones[0]}
              <br />
              {phones[1]}
              <br />
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              {address}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--gold)]">Реквизиты</h2>
            <ul className="mt-4 space-y-1 text-sm leading-6 text-[#d8d0d4]">
              {requisites.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative border-t border-white/10 py-4 text-center text-xs text-[#b7b0b6]">
          © 2015–2026 Благотворительный фонд помощи детям, рождённым на раннем сроке «Подари солнечный свет»
        </div>
      </footer>
      <Link href="/blagotvoritel" className="mobile-cta btn-primary shadow-lg">
        Помочь
      </Link>
    </>
  );
}

export function PageHero({ crumb, title, lead }: { crumb: string; title: string; lead?: string }) {
  return (
    <section className="bg-[var(--lavender)]">
      <div className="container-site py-12 md:py-16">
        <p className="text-sm font-semibold text-[var(--violet)]">
          <Link href="/">Главная</Link>
          <span className="px-2 text-[var(--muted)]">/</span>
          {crumb}
        </p>
        <h1 className="mt-3 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-5 max-w-3xl">{lead}</p>}
      </div>
    </section>
  );
}
