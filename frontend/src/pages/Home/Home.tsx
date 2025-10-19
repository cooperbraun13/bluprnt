import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemCategories from "../../components/ItemCategories/ItemCategories";

export default function Home() {
  const [query, setQuery] = useState("");

  function handleSearch(): void {
    // for now, just log the current query to the console
    console.log("Searching for:", query);
  }
  return (
    <>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      <ItemCategories />
    </>
  );
}
