export type Vendor = {
  vendor_id: number;
  vendor_name: string;
  website: string | null;
  image_url: string;
};

const API_ROOT = (
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"
) as string;

const BASE_URL = `${API_ROOT.replace(/\/$/, "")}/vendors`;

export async function fetchVendors(): Promise<Vendor[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    let message = "Unable to load vendors.";
    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return response.json();
}

