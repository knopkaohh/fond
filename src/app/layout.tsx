import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Loader } from "@/components/loader";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "БФ «Подари солнечный свет»",
    template: "%s — Подари солнечный свет",
  },
  description:
    "Благотворительный фонд помощи детям, рождённым на раннем сроке. Обновлённая версия сайта sunlightfond.ru.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <Loader />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
