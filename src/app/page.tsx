import Link from "next/link";
import { HeroSun, ScrollSun } from "@/components/scroll-sun";
import { news } from "@/lib/content";

export default function HomePage() {
  return (
    <main className="relative">
      <ScrollSun />
      <section className="relative bg-[#fdf8f4]/70">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div className="reveal">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--sun)]">Благотворительный фонд</p>
            <h1 className="mt-3 font-[family-name:var(--font-unbounded)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Подари солнечный свет
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Мы помогаем семьям с недоношенными детьми получить медицинскую помощь и психологическую поддержку. Ищем системные решения, а не разовые жесты.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="sun-btn help-btn" href="/blagotvoritel">
                Помочь детям
              </Link>
              <Link className="ghost-btn" href="/o-fonde">
                Подробнее о фонде
              </Link>
            </div>
          </div>
          <HeroSun />
        </div>
      </section>

      <section className="bg-[#f3e9f4] text-[var(--ink)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 py-8 sm:flex-row sm:items-center">
          <p className="max-w-3xl text-lg leading-8 sm:text-xl">
            Отправьте СМС на номер{" "}
            <span className="mx-1 inline-block rounded-xl bg-white px-3 py-1 font-[family-name:var(--font-unbounded)] text-3xl font-bold tracking-wide text-[var(--sun-deep)] sm:text-4xl">
              3434
            </span>{" "}
            с текстом{" "}
            <span className="font-[family-name:var(--font-unbounded)] text-2xl font-semibold text-[var(--gold)] sm:text-3xl">
              «СВЕТ 250»
            </span>
            , где 250 — любая комфортная сумма. Для мобильных операторов РФ. Подтвердите платёж.
          </p>
          <Link href="/pomogat-kazhdiy-den" className="sun-btn help-btn shrink-0">
            Помочь детям
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <h2 className="font-[family-name:var(--font-unbounded)] text-2xl font-semibold">О фонде</h2>
          <p className="mt-4 leading-8 text-[var(--muted)]">
            Благотворительный фонд «Подари солнечный свет» создан для помощи детям, рождённым на раннем сроке. География работы — Москва и регионы России. Мы улучшаем качество помощи недоношенным детям и возможности для их жизни в обществе.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["2015", "год основания"],
              ["12", "кабинетов сопровождения в регионах"],
              ["17 ноября", "день недоношенного ребёнка"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl bg-[var(--mist)] p-4">
                <p className="font-[family-name:var(--font-unbounded)] text-xl text-[var(--sun)]">{value}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-unbounded)] text-2xl font-semibold">Новости</h2>
            <Link href="/novosti" className="text-sm font-semibold text-[var(--sun)]">
              Все новости
            </Link>
          </div>
          <div className="space-y-3">
            {news.map((item) => (
              <Link key={item.slug} href={`/novosti/${item.slug}`} className="block rounded-2xl border border-[var(--line)] p-4 hover:border-[var(--sun-2)]">
                <p className="text-xs font-semibold text-[var(--sun)]">{item.date}</p>
                <p className="mt-1 font-semibold">{item.title}</p>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
