export type Product = {
  product_id: number;
  product_name: string;
  product_use: string | null;
  vendor_id: number | null;
  price: number;
  image_url: string;
  vendor_name: string | null;
};

const API_ROOT = (
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"
) as string;

const PRODUCTS_BASE_URL = `${API_ROOT.replace(/\/$/, "")}/products`;

async function handleProductsResponse(
  response: Response,
  defaultError: string,
): Promise<Product[]> {
  if (!response.ok) {
    let message = defaultError;
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

export async function searchProducts(query: string): Promise<Product[]> {
  const url = `${PRODUCTS_BASE_URL}/search?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  return handleProductsResponse(
    response,
    "Unable to search products right now.",
  );
}

export async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_BASE_URL);
  return handleProductsResponse(
    response,
    "Unable to load products right now.",
  );
}
