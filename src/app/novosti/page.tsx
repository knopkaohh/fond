import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site-shell";
import { asset } from "@/lib/asset";
import { news } from "@/lib/content";

export const metadata: Metadata = { title: "Новости" };

const images = ["/photos/news-1.jpg", "/photos/news-2.jpg", "/photos/news-3.jpg", "/photos/news-4.jpg"].map((src) => asset(src));

export default function NewsPage() {
  return (
    <main>
      <PageHero crumb="О фонде" title="Новости фонда" lead="События фонда, гранты и жизнь программ." />
      <div className="container-site grid gap-5 py-12 md:grid-cols-2 lg:py-16">
        {news.map((item, index) => (
          <Link key={item.slug} href={`/novosti/${item.slug}`} className="card hover:border-[var(--violet)]">
            <img src={images[index % images.length]} alt="" className="aspect-[16/10] w-full object-cover" />
            <div className="p-6">
              <p className="text-sm font-semibold text-[var(--violet)]">{item.date}</p>
              <h2 className="mt-2 text-xl font-bold">{item.title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{item.excerpt}</p>
              <span className="text-link mt-4 inline-block">Подробнее →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
