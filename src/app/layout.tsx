import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { Loader } from "@/components/loader";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
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
      <body className={`${manrope.variable} ${unbounded.variable} antialiased`}>
        <Loader />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
