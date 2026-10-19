"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  address,
  crumbHrefs,
  email,
  familyCenterAddress,
  familyCenterPhone,
  hours,
  nav,
  phones,
  pressPhone,
  requisites,
  socials,
  telHref,
} from "@/lib/content";
import { asset } from "@/lib/asset";

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

function sectionActive(pathname: string, item: (typeof nav)[number]) {
  if (isActive(pathname, item.href)) return true;
  return item.children?.some((child) => isActive(pathname, child.href)) ?? false;
}

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
        <div className="container-site flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5 text-xs text-[var(--muted)]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {phones.map((phone) => (
              <a key={phone} href={telHref(phone)} className="font-semibold text-[var(--violet)] hover:underline">
                {phone}
              </a>
            ))}
            <a href={telHref(familyCenterPhone)} className="hidden font-semibold text-[var(--violet)] hover:underline xl:inline">
              Центр {familyCenterPhone}
            </a>
            <a href={`mailto:${email}`} className="hidden hover:text-[var(--violet)] hover:underline sm:inline">
              {email}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="hidden sm:block">{hours}</p>
            <Link href="/donate" className="hidden font-semibold text-[var(--violet)] hover:underline md:inline">
              СМС 3434 «СВЕТ»
            </Link>
            {socials.slice(0, 3).map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="hidden hover:text-[var(--violet)] hover:underline lg:inline">
                {item.label}
              </a>
            ))}
            <button className="hidden font-semibold uppercase tracking-wide hover:text-[var(--violet)] md:inline" onClick={() => setA11y((value) => !value)}>
              {a11y ? "Обычная версия" : "Для слабовидящих"}
            </button>
          </div>
        </div>
      </div>
      <div className={`container-site flex items-center gap-4 transition-[padding] duration-300 ${compact ? "py-2" : "py-3"}`}>
        <Link href="/" className="shrink-0">
          <img
            src={asset("/logo.png")}
            alt="БФ «Подари солнечный свет»"
            className={`w-auto transition-[height] duration-300 ${compact ? "h-10" : "h-12"}`}
          />
        </Link>
        <nav className="hidden flex-1 items-center justify-center xl:flex" aria-label="Основное меню">
          {nav.map((item) => (
            <div key={item.href} className="nav-drop">
              <Link
                href={item.href}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold ${
                  sectionActive(pathname, item) ? "bg-[var(--lavender)] text-[var(--violet)]" : "text-[var(--ink)] hover:text-[var(--violet)]"
                }`}
              >
                {item.label}
                {item.children ? <span aria-hidden className="text-[10px]">▾</span> : null}
              </Link>
              {item.children ? (
                <div className={`nav-drop-panel ${item.children.length > 8 ? "nav-drop-wide" : ""}`}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`rounded-xl px-3 py-2 text-sm ${
                        isActive(pathname, child.href) ? "bg-[var(--lavender)] font-semibold text-[var(--violet)]" : "text-[var(--ink)] hover:bg-[var(--lavender)]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 xl:flex">
          <button className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--violet)]" onClick={() => setSearchOpen((value) => !value)}>
            Поиск
          </button>
          <Link href="/semiyam" className="btn-secondary !min-h-10 !px-4 !text-sm">
            Получить помощь
          </Link>
          <Link href="/blagotvoritel" className="btn-primary !min-h-10 !px-4 !text-sm">
            Помочь
          </Link>
        </div>
        <button
          className="ml-auto rounded-full border border-[var(--line)] px-3 py-2 text-sm font-semibold xl:hidden"
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
        <div className="border-t border-[var(--line)] bg-white px-4 py-4 xl:hidden">
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
          <div className="mb-4 flex flex-col gap-2">
            <Link href="/blagotvoritel" className="btn-primary">
              Помочь
            </Link>
            <Link href="/semiyam" className="btn-secondary">
              Получить помощь
            </Link>
          </div>
          {nav.map((item) => (
            <div key={item.href} className="mb-4">
              <Link href={item.href} className="text-sm font-semibold text-[var(--violet)]">
                {item.label}
              </Link>
              <div className="mt-1 flex flex-col">
                {item.children?.map((child) => (
                  <Link key={child.href} href={child.href} className="py-1.5 text-sm text-[var(--ink)]">
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="mb-3 flex flex-col gap-1 text-sm">
            {phones.map((phone) => (
              <a key={phone} href={telHref(phone)} className="font-semibold text-[var(--violet)]">
                {phone}
              </a>
            ))}
            <a href={telHref(familyCenterPhone)} className="font-semibold text-[var(--violet)]">
              Центр {familyCenterPhone}
            </a>
            <a href={`mailto:${email}`}>{email}</a>
            {socials.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
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
        <div className="container-site relative grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-[minmax(240px,1.3fr)_repeat(5,minmax(0,1fr))]">
          <div>
            <Link href="/">
              <img src={asset("/logo.png")} alt="БФ «Подари солнечный свет»" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 text-sm leading-6 text-[#d8d0d4]">
              Благотворительный фонд помощи детям, рождённым на раннем сроке. Москва и регионы России.
            </p>
            <p className="mt-3 text-sm leading-6">
              СМС на номер{" "}
              <Link href="/donate" className="font-semibold text-[var(--gold)] hover:underline">
                3434
              </Link>
              : текст «СВЕТ 250», где 250 — любая комфортная сумма.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/blagotvoritel" className="btn-gold">
                Помочь фонду
              </Link>
              <Link href="/semiyam" className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                Получить помощь
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {socials.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-[var(--gold)] hover:underline">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          {nav.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--gold)] hover:underline">
                {item.label}
              </Link>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                {(item.children ?? [{ label: item.label, href: item.href }]).map((child) => (
                  <Link key={child.href} href={child.href} className="text-[#d8d0d4] hover:text-white hover:underline">
                    {child.label}
                  </Link>
                ))}
                {item.label === "Контакты" ? (
                  <>
                    <Link href="/poisk" className="text-[#d8d0d4] hover:text-white hover:underline">
                      Поиск по сайту
                    </Link>
                    <Link href="/novosti" className="text-[#d8d0d4] hover:text-white hover:underline">
                      Новости
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="container-site relative grid gap-8 border-t border-white/10 py-10 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--gold)]">Контакты</h2>
            <p className="mt-4 space-y-2 text-sm leading-6">
              {phones.map((phone) => (
                <span key={phone} className="block">
                  <a href={telHref(phone)} className="hover:underline">
                    {phone}
                  </a>
                </span>
              ))}
              <span className="block">
                Семейный центр:{" "}
                <a href={telHref(familyCenterPhone)} className="hover:underline">
                  {familyCenterPhone}
                </a>
              </span>
              <span className="block">
                Для СМИ:{" "}
                <a href={telHref(pressPhone)} className="hover:underline">
                  {pressPhone}
                </a>
              </span>
              <span className="block">
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </span>
              <span className="block text-[#d8d0d4]">{hours}</span>
              <span className="block text-[#d8d0d4]">{address}</span>
              <span className="block text-[#d8d0d4]">Семейный центр: {familyCenterAddress}</span>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--gold)]">Реквизиты</h2>
            <ul className="mt-4 space-y-1 text-sm leading-6 text-[#d8d0d4]">
              {requisites.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/ustavnye-dokumenty" className="text-[var(--gold)] hover:underline">
                Уставные документы
              </Link>
              <Link href="/podrobnyj-otchet" className="text-[var(--gold)] hover:underline">
                Отчеты
              </Link>
              <Link href="/for-smi" className="text-[var(--gold)] hover:underline">
                Для СМИ
              </Link>
            </div>
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
  const crumbHref = crumbHrefs[crumb];
  return (
    <section className="bg-[var(--lavender)]">
      <div className="container-site py-12 md:py-16">
        <p className="text-sm font-semibold text-[var(--violet)]">
          <Link href="/" className="hover:underline">
            Главная
          </Link>
          <span className="px-2 text-[var(--muted)]">/</span>
          {crumbHref ? (
            <Link href={crumbHref} className="hover:underline">
              {crumb}
            </Link>
          ) : (
            crumb
          )}
        </p>
        <h1 className="mt-3 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-5 max-w-3xl">{lead}</p>}
      </div>
    </section>
  );
}
