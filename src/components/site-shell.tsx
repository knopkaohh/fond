"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { address, email, nav, phones, requisites } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [a11y, setA11y] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("a11y", a11y);
  }, [a11y]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/poisk?q=${encodeURIComponent(value)}`);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#dd3333]/40 bg-white/80 bg-[url('/header-pattern.png')] bg-repeat-x bg-center backdrop-blur-sm">
      <div className="border-b border-[var(--line)] bg-[var(--mist)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm text-[var(--muted)]">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-[var(--sun)]">
                {phone}
              </a>
            ))}
            <a href={`mailto:${email}`} className="hover:text-[var(--sun)]">
              {email}
            </a>
          </div>
          <p className="hidden sm:block">Пн–пт, 10:00–20:00</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-2 pl-10 sm:pl-16 md:pl-20">
        <Link href="/" className="shrink-0">
          <img
            src="/logo.png"
            alt="БФ «Подари солнечный свет». Помощь детям, рожденным на раннем сроке"
            className="h-14 w-auto drop-shadow-sm sm:h-[4.5rem]"
          />
        </Link>
        <nav className="hidden min-w-0 flex-1 items-center md:flex" aria-label="Основное меню">
          <ul className="flex flex-wrap items-center gap-x-1">
            {nav.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setMenu(item.label)}
                onMouseLeave={() => setMenu(null)}
              >
                <Link
                  href={item.href}
                  className={`block px-2.5 py-2 text-sm font-semibold ${
                    pathname.startsWith(item.href) ? "text-[var(--sun)]" : "text-[var(--ink)]"
                  } hover:text-[var(--sun)]`}
                >
                  {item.label}
                </Link>
                {item.children && menu === item.label && (
                  <div className="absolute left-0 top-full z-30 w-72 rounded-2xl border border-[var(--line)] bg-white p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2 text-sm hover:bg-[#f6e9ff] hover:text-[var(--sun)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <form onSubmit={onSearch} className="ml-auto hidden items-center lg:flex">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск"
            aria-label="Поиск по сайту"
            className="w-36 rounded-l-full border border-[var(--line)] bg-white px-4 py-2 text-sm outline-none xl:w-48"
          />
          <button className="rounded-r-full bg-[var(--sun)] px-4 py-2 text-sm font-semibold text-white">Найти</button>
        </form>
        <button
          className="ml-auto rounded-full border border-[var(--line)] px-3 py-2 text-sm font-semibold md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          Меню
        </button>
      </div>
      {open && (
        <div className="border-t border-[var(--line)] bg-white px-4 py-4 md:hidden">
          <form onSubmit={onSearch} className="mb-4 flex">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск"
              aria-label="Поиск по сайту"
              className="w-full rounded-l-full border border-[var(--line)] px-4 py-2 text-sm"
            />
            <button className="rounded-r-full bg-[var(--sun)] px-4 text-sm font-semibold text-white">Найти</button>
          </form>
          {nav.map((item) => (
            <div key={item.href} className="mb-3">
              <Link href={item.href} className="font-semibold text-[var(--sun)]">
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
      <div className="hidden justify-end px-4 pb-2 md:flex">
        <button className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] hover:text-[var(--sun)]" onClick={() => setA11y((value) => !value)}>
          {a11y ? "Обычная версия" : "Версия для слабовидящих"}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-[var(--mist)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="font-[family-name:var(--font-unbounded)] text-sm font-semibold text-[var(--sun)]">Контакты</h2>
          <p className="mt-3 text-sm leading-6">
            Телефон: {phones[0]}
            <br />
            {phones[1]}
            <br />
            E-mail: <a className="text-[var(--sun)]" href={`mailto:${email}`}>{email}</a>
            <br />
            Адрес: {address}
          </p>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-unbounded)] text-sm font-semibold text-[var(--sun)]">Наши реквизиты</h2>
          <ul className="mt-3 space-y-1 text-sm leading-6 text-[var(--muted)]">
            {requisites.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-unbounded)] text-sm font-semibold text-[var(--sun)]">Разделы</h2>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <Link href="/o-fonde" className="hover:text-[var(--sun)]">О фонде</Link>
            <Link href="/blagotvoritel" className="hover:text-[var(--sun)]">Благотворителям</Link>
            <Link href="/volonteram" className="hover:text-[var(--sun)]">Волонтёрам</Link>
            <Link href="/semiyam" className="hover:text-[var(--sun)]">Школа для родителей</Link>
            <Link href="/novosti" className="hover:text-[var(--sun)]">Новости</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4 text-center text-xs text-[var(--muted)]">
        © 2015–2026 Благотворительный фонд помощи детям, рождённым на раннем сроке «Подари солнечный свет»
      </div>
    </footer>
  );
}

export function PageHero({ crumb, title, lead }: { crumb: string; title: string; lead?: string }) {
  return (
    <section className="bg-gradient-to-r from-[#f7ecff] via-white to-[#e7f8ff]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm font-semibold text-[var(--sun)]">
          <Link href="/">Главная</Link>
          <span className="px-2 text-[var(--muted)]">/</span>
          {crumb}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-unbounded)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{lead}</p>}
      </div>
    </section>
  );
}
