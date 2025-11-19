import { db } from "../config/database";

export interface Vendor {
  vendor_id: number;
  vendor_name: string;
  website: string;
}

// get a vendor by id
export async function GetVendor(vendor_id: number): Promise<Vendor | null> {
  const query = `
    SELECT vendor_id, vendor_name, website
    FROM vendors
    WHERE vendor_id = $1  
  `;

  const { rows } = await db.query<Vendor>(query, [vendor_id]);
  return rows[0] ?? null;
}

// get all vendors
export async function GetAllVendors(): Promise<Vendor[]> {
  const query = `
    SELECT vendor_id, vendor_name, website
    FROM vendors
    ORDER BY vendor_name DESC
  `;

  const { rows } = await db.query<Vendor>(query);
  return rows;
}