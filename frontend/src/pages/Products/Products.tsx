import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import "./Products.css";
import { fetchAllProducts, type Product } from "../../api/products";

type Status = "idle" | "loading" | "error" | "ready";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setErrorMessage("");

    fetchAllProducts()
      .then((items) => {
        if (cancelled) return;
        setProducts(items);
        setStatus("ready");
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
  }, []);

  return (
    <>
      <Header
        title="Products"
        showTagline={false}
        background="alt"
        leftSlot={<BackButton />}
      />
      <div className="products-page">
        {status === "loading" && (
          <p className="products-message">Loading products…</p>
        )}
        {status === "error" && (
          <p className="products-message error">{errorMessage}</p>
        )}

        {status === "ready" && products.length === 0 && (
          <p className="products-message">No products available yet.</p>
        )}

        <div className="products-grid">
          {products.map((product) => (
            <article key={product.product_id} className="product-card">
              <img
                src={product.image_url}
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-body">
                <h2>{product.product_name}</h2>
                {product.product_use && (
                  <p className="product-use">{product.product_use}</p>
                )}
                {product.vendor_name && (
                  <p className="product-vendor">{product.vendor_name}</p>
                )}
                <p className="product-price">
                  {priceFormatter.format(Number(product.price))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}