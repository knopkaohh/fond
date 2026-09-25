import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site-shell";
import { searchIndex } from "@/lib/content";

export const metadata: Metadata = { title: "Поиск" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const results = query
    ? searchIndex.filter((item) => `${item.title} ${item.text}`.toLowerCase().includes(query))
    : [];

  return (
    <main>
      <PageHero crumb="Поиск" title="Поиск" lead={query ? `Запрос: ${q}` : "Введите слово в строке поиска в шапке."} />
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-10">
        {query && results.length === 0 && <p>Ничего не нашлось. Попробуйте «носочки», «школа» или «реквизиты».</p>}
        {results.map((item) => (
          <Link key={item.href + item.title} href={item.href} className="block rounded-2xl border border-[var(--line)] p-4 hover:border-[var(--sun-2)]">
            <p className="font-semibold">{item.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{item.text}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
