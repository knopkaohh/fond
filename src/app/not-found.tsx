import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-site py-20 text-center">
      <h1>Страница не найдена</h1>
      <p className="lead mx-auto mt-3 max-w-xl">Такого раздела нет. Вернитесь на главную или откройте меню.</p>
      <Link href="/" className="btn-primary mt-6">
        На главную
      </Link>
    </main>
  );
}
