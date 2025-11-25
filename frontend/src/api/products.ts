export type Product = {
  product_id: number;
  product_name: string;
  product_use: string | null;
  vendor_id: number | null;
  price: number;
  image_url: string;
};

const API_ROOT = (
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"
) as string;

const PRODUCTS_BASE_URL = `${API_ROOT.replace(/\/$/, "")}/products`;

export async function searchProducts(query: string): Promise<Product[]> {
  const url = `${PRODUCTS_BASE_URL}/search?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    let message = "Unable to search products right now.";
    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return response.json();
}

