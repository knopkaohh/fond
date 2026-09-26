import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks, ContactForm, GiftForm } from "@/components/blocks";
import { PageHero } from "@/components/site-shell";
import { findPage, pages, stories } from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return pages.map((page) => ({ slug: [page.slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug.join("/"));
  return { title: page?.title ?? "Страница" };
}

export default async function InnerPage({ params }: Props) {
  const { slug } = await params;
  const page = findPage(slug.join("/"));
  if (!page || slug.length !== 1) notFound();
  const lead = page.blocks.find((block) => block.type === "lead");

  return (
    <main>
      <PageHero crumb={page.crumb} title={page.title} lead={lead && lead.type === "lead" ? lead.text : undefined} />
      <div className="container-site grid gap-8 py-12 lg:grid-cols-[1.4fr_0.7fr] lg:py-16">
        <div>
          <Blocks blocks={page.blocks.filter((block) => block.type !== "lead")} />
          {page.slug === "istorii-detey" && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {stories.map((story) => (
                <article key={story.title} className="card p-5">
                  <p className="text-xs font-semibold text-[var(--violet)]">{story.date}</p>
                  <h2 className="mt-1 text-lg font-bold">{story.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{story.lead}</p>
                </article>
              ))}
            </div>
          )}
        </div>
        <aside className="space-y-4">
          {(page.slug === "blagotvoritel" || page.slug === "pomogat-kazhdiy-den" || page.slug === "idet-sbor") && <GiftForm />}
          {page.slug === "kontakty" && <ContactForm />}
        </aside>
      </div>
    </main>
  );
}
