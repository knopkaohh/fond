import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site-shell";
import { news } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: news.find((item) => item.slug === slug)?.title ?? "Новость" };
}

export default async function NewsArticle({ params }: Props) {
  const { slug } = await params;
  const item = news.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return (
    <main>
      <PageHero crumb="Новости" title={item.title} lead={item.date} />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10">
        {item.body.map((paragraph) => (
          <p key={paragraph} className="leading-8 text-[var(--muted)]">
            {paragraph}
          </p>
        ))}
      </article>
    </main>
  );
}
