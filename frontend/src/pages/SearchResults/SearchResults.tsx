import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { searchProducts, type Product } from "../../api/products";
import "./SearchResults.css";

type Status = "idle" | "loading" | "error" | "success";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const DEFAULT_IMAGE = "/appliancesbluprnt.jpg";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(() => searchParams.get("q") ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const activeQuery = useMemo(() => {
    return (searchParams.get("q") ?? "").trim();
  }, [searchParams]);

  useEffect(() => {
    setInputValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (!activeQuery) {
      setResults([]);
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setErrorMessage("");

    searchProducts(activeQuery)
      .then((items) => {
        if (cancelled) return;
        setResults(items);
        setStatus("success");
      })
      .catch((error) => {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load products right now.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [activeQuery]);

  function handleSearch() {
    const trimmed = inputValue.trim();
    const params = new URLSearchParams(searchParams);

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    setSearchParams(params);
  }

  let helperMessage: string | null = null;
  if (!activeQuery) {
    helperMessage = "Search by product name or intended use to get started.";
  } else if (status === "loading") {
    helperMessage = "Searching products...";
  } else if (status === "error") {
    helperMessage = errorMessage;
  } else if (status === "success" && results.length === 0) {
    helperMessage = `No products found for "${activeQuery}".`;
  }

  return (
    <section className="search-results-page">
      <div className="search-results-header">
        <h1>Find Products</h1>
        <SearchBar value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
      </div>

      {helperMessage && (
        <p className={`search-results-message${status === "error" ? " error" : ""}`}>
          {helperMessage}
        </p>
      )}

      {results.length > 0 && (
        <ul className="search-results-list">
          {results.map((product) => (
            <li key={product.product_id} className="result-card">
              <img
                src={product.image_url || DEFAULT_IMAGE}
                alt={product.product_name}
                className="product-image"
              />

              <div className="result-details">
                <p className="product-name">{product.product_name}</p>
                <p className="product-description">
                  {product.product_use ?? "No description available yet."}
                </p>

                <div className="result-meta">
                  <span className="product-price">
                    {priceFormatter.format(product.price)}
                  </span>
                  {product.vendor_id && (
                    <span className="vendor-pill">Vendor #{product.vendor_id}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}