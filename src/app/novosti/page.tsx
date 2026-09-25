import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site-shell";
import { news } from "@/lib/content";

export const metadata: Metadata = { title: "Новости" };

export default function NewsPage() {
  return (
    <main>
      <PageHero crumb="О фонде" title="Новости" lead="События фонда, гранты и жизнь программ." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-2">
        {news.map((item) => (
          <Link key={item.slug} href={`/novosti/${item.slug}`} className="rounded-3xl border border-[var(--line)] p-6 hover:border-[var(--sun-2)]">
            <p className="text-sm font-semibold text-[var(--sun)]">{item.date}</p>
            <h2 className="mt-2 font-[family-name:var(--font-unbounded)] text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
