import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-[family-name:var(--font-unbounded)] text-3xl font-semibold">Страница не найдена</h1>
      <p className="mt-3 text-[var(--muted)]">Такого раздела на обновлённом сайте нет. Вернитесь на главную или откройте меню.</p>
      <Link href="/" className="sun-btn mt-6">
        На главную
      </Link>
    </main>
  );
}
