import type { Metadata } from "next";
import { Cormorant_Infant, Nunito } from "next/font/google";
import { Loader } from "@/components/loader";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";

const body = Nunito({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const display = Cormorant_Infant({
  variable: "--font-unbounded",
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
      <body className={`${body.variable} ${display.variable} antialiased`}>
        <Loader />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
