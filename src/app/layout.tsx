import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Loader } from "@/components/loader";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const display = Cormorant_Garamond({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
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
      <body className={`${manrope.variable} ${display.variable} antialiased`}>
        <Loader />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
