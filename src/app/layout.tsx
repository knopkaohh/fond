import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Loader } from "@/components/loader";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { asset, basePath } from "@/lib/asset";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(basePath ? "https://bm-develop.ru" : "http://localhost:4317"),
  title: {
    default: "БФ «Подари солнечный свет»",
    template: "%s — Подари солнечный свет",
  },
  description:
    "Благотворительный фонд помощи детям, рождённым на раннем сроке. Обновлённая версия сайта sunlightfond.ru.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" style={{ ["--header-pattern" as string]: `url("${asset("/header-pattern.png")}")` }}>
      <head>
        <link rel="preload" href={asset("/logo.png")} as="image" />
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
