import type { Metadata } from "next";
import { SearchResults } from "./search-results";

export const metadata: Metadata = { title: "Поиск" };

export default function SearchPage() {
  return <SearchResults />;
}
