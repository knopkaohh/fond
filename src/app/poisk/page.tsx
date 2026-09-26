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
      <PageHero crumb="Поиск" title="Поиск" lead={query ? `Запрос: ${q}` : "Откройте поиск в шапке и введите слово."} />
      <div className="container-site max-w-3xl space-y-3 py-12">
        {query && results.length === 0 && <p>Ничего не нашлось. Попробуйте «носочки», «школа» или «реквизиты».</p>}
        {results.map((item) => (
          <Link key={item.href + item.title} href={item.href} className="card block p-4 hover:border-[var(--violet)]">
            <p className="font-semibold">{item.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{item.text}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
