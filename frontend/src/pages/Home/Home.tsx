import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemCategories from "../../components/ItemCategories/ItemCategories";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(): void {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  }
  return (
    <>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      <ItemCategories />
    </>
  );
}
