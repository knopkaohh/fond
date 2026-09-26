import Link from "next/link";
import { news, stories } from "@/lib/content";

const directions = [
  { title: "Медицинская помощь", href: "/semiyam" },
  { title: "Реабилитация", href: "/semiyam" },
  { title: "Диагностика", href: "/semiyam" },
  { title: "Лекарства", href: "/idet-sbor" },
  { title: "Оборудование", href: "/nashi-programmy" },
  { title: "Поддержка родителей", href: "/opisanie-shkoly" },
  { title: "Психологическая помощь", href: "/semiyam" },
  { title: "Развитие проектов", href: "/nashi-programmy" },
];

const projects = [
  {
    title: "Школа «Новая жизнь вместе»",
    text: "Встречи с неонатологами, психологами и родителями, которые уже прошли выхаживание.",
    href: "/opisanie-shkoly",
    image: "/photos/event-1.jpg",
  },
  {
    title: "Носочки для жизни",
    text: "Волонтёры вяжут носочки, шапочки и шьют пледы для отделений выхаживания.",
    href: "/nosochki-dlya-zhizni",
    image: "/photos/event-2.jpg",
  },
  {
    title: "Семейный ресурсный центр",
    text: "Площадка в Москве, где живут основные программы фонда.",
    href: "/semejnyj-czentr",
    image: "/photos/event-3.jpg",
  },
  {
    title: "Экосистема «Вместе в жизнь»",
    text: "Кабинеты послеродового сопровождения в перинатальных центрах по всей стране.",
    href: "/ekosistema-poslerodovoj-podderzhki-vmeste-v-zhizn",
    image: "/photos/hospital.jpg",
  },
];

export default function HomePage() {
  const featured = projects[0];
  const rest = projects.slice(1);
  const story = stories[0];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pattern-soft absolute inset-0" />
        <div className="container-site relative grid items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div>
            <p className="eyebrow">Благотворительный фонд</p>
            <h1 className="mt-4">Помогаем детям, рождённым раньше срока</h1>
            <p className="lead mt-6 max-w-xl">
              Поддерживаем детей и их семьи от первых дней жизни до дальнейшего развития.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/blagotvoritel" className="btn-primary">
                Помочь детям
              </Link>
              <Link href="/o-fonde" className="text-link px-2 py-2">
                Узнать больше о фонде →
              </Link>
            </div>
          </div>
          <div className="relative">
            <span className="absolute -right-3 -top-3 h-14 w-14 rounded-full bg-[var(--gold)]" aria-hidden />
            <span className="absolute -bottom-4 -left-3 h-8 w-8 rounded-full bg-[var(--violet)]" aria-hidden />
            <img
              src="/photos/hero.jpg"
              alt="Семья на мероприятии фонда «Подари солнечный свет»"
              className="aspect-[4/5] w-full rounded-[28px] object-cover"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container-site section grid items-center gap-10 md:grid-cols-2">
          <img src="/photos/about.jpg" alt="Мероприятие фонда" className="aspect-[4/5] w-full rounded-[28px] object-cover md:aspect-[5/6]" />
          <div>
            <p className="eyebrow">О фонде</p>
            <h2 className="mt-3">Кратко о фонде</h2>
            <p className="lead mt-5">
              «Подари солнечный свет» основала в 2015 году Саниям Коваль, мама недоношенного ребёнка. Фонд помогает детям, рождённым раньше срока, и их семьям — в Москве и по всей России.
            </p>
            <ul className="mt-6 space-y-3 text-[17px]">
              <li>Принят в Европейскую ассоциацию по уходу за новорождёнными (EFCNI).</li>
              <li>Гранты Мэра Москвы, президентские гранты и премия «МыВместе».</li>
              <li>В реестре поставщиков социальных услуг.</li>
            </ul>
            <Link href="/o-fonde" className="text-link mt-7 inline-block">
              Подробнее о фонде →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--lavender)]">
        <div className="container-site section">
          <p className="eyebrow">Что мы делаем</p>
          <h2 className="mt-3">Направления помощи</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {directions.map((item) => (
              <Link key={item.title} href={item.href} className="card px-5 py-6 font-semibold hover:border-[var(--violet)]">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--violet)] text-white">
        <div className="container-site section">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">Результаты</p>
          <h2 className="mt-3 text-white">Цифры, которые можно проверить</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              ["2015", "Год основания"],
              ["12", "Кабинетов сопровождения"],
              ["17 ноября", "День недоношенного ребёнка"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-5xl font-bold tracking-tight text-[var(--gold)] md:text-6xl">{value}</p>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-site section">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Программы</p>
              <h2 className="mt-3">Проекты</h2>
            </div>
            <Link href="/nashi-programmy" className="text-link hidden sm:inline">
              Все проекты →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="card lg:row-span-3">
              <img src={featured.image} alt="" className="aspect-[16/10] w-full object-cover lg:aspect-[16/11]" />
              <div className="p-6 md:p-8">
                <h3 className="text-3xl font-bold">{featured.title}</h3>
                <p className="mt-3 text-[17px] leading-7 text-[var(--muted)]">{featured.text}</p>
                <Link href={featured.href} className="text-link mt-5 inline-block">
                  Подробнее →
                </Link>
              </div>
            </article>
            {rest.map((project) => (
              <article key={project.title} className="card grid sm:grid-cols-[160px_1fr]">
                <img src={project.image} alt="" className="h-40 w-full object-cover sm:h-full" />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-[var(--muted)]">{project.text}</p>
                  <Link href={project.href} className="text-link mt-3 inline-block text-sm">
                    Подробнее →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--lavender)]">
        <div className="container-site section">
          <div className="flex items-end justify-between">
            <h2>Новости</h2>
            <Link href="/novosti" className="text-link">
              Все новости →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.slice(0, 3).map((item, index) => (
              <article key={item.slug} className="card">
                <img src={`/photos/news-${index + 1}.jpg`} alt="" className="aspect-[16/10] w-full object-cover" />
                <div className="p-6">
                  <p className="text-sm font-semibold text-[var(--violet)]">{item.date}</p>
                  <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-7 text-[var(--muted)]">{item.excerpt}</p>
                  <Link href={`/novosti/${item.slug}`} className="text-link mt-4 inline-block">
                    Подробнее →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-site section grid items-center gap-10 md:grid-cols-2">
          <img src="/photos/family.jpg" alt="Семья подопечных фонда" className="aspect-[5/4] w-full rounded-[28px] object-cover" />
          <div>
            <p className="eyebrow">Истории семей</p>
            <h2 className="mt-3">{story.title}</h2>
            <p className="mt-2 text-sm font-semibold text-[var(--violet)]">{story.date}</p>
            <p className="lead mt-5">{story.lead} Когда малыша выписывают домой, вопросы только начинаются. Мамы подопечных делятся тем, что уже прошли.</p>
            <Link href="/istorii-detey" className="text-link mt-6 inline-block">
              Читать истории →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--violet)] text-white">
        <div className="container-site section">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--gold)]">Как помочь</p>
            <h2 className="mt-3 text-white">Помочь ребёнку сделать ещё один шаг вперёд</h2>
            <p className="mt-5 text-lg leading-7 text-white/85">
              Ваше пожертвование помогает фонду продолжать программы помощи детям, рождённым раньше срока, и их семьям.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/blagotvoritel" className="btn-gold">
                Помочь фонду
              </Link>
              <Link href="/pomogat-kazhdiy-den" className="rounded-full border border-white/40 px-5 py-3 font-bold text-white">
                СМС на 3434
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-[24px] border border-white/15 px-6 py-6 text-center">
            <p className="font-semibold">Нужна помощь ребёнку?</p>
            <p className="mt-2 text-sm text-white/75">Расскажем, как обратиться в фонд и какие документы необходимы.</p>
            <Link href="/semiyam" className="mt-4 inline-flex rounded-full border border-white px-5 py-2.5 text-sm font-bold text-white">
              Получить помощь
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
