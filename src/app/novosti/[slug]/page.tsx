import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site-shell";
import { news } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const images = ["/photos/news-1.jpg", "/photos/news-2.jpg", "/photos/news-3.jpg", "/photos/news-4.jpg"];

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: news.find((item) => item.slug === slug)?.title ?? "Новость" };
}

export default async function NewsArticle({ params }: Props) {
  const { slug } = await params;
  const index = news.findIndex((entry) => entry.slug === slug);
  const item = news[index];
  if (!item) notFound();
  return (
    <main>
      <PageHero crumb="Новости" title={item.title} lead={item.date} />
      <article className="container-site max-w-3xl space-y-4 py-12">
        <img src={images[index % images.length]} alt="" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
        {item.body.map((paragraph) => (
          <p key={paragraph} className="leading-8 text-[var(--muted)]">
            {paragraph}
          </p>
        ))}
      </article>
    </main>
  );
}
