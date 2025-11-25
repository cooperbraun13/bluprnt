import { db } from "../config/database";

export interface Product {
  product_id: number;
  product_name: string;
  product_use: string;
  vendor_id: number;
  price: number;
}

// for creating a new product (no id / created_at yet)
// what the controller passes in when creating a product
export interface CreateProductParams {
  product_name: string;
  product_use?: string;
  vendor_id?: number;
  price: number;
}

// create a new product
export async function CreateProduct(params: CreateProductParams): Promise<Product> {
  const { product_name, product_use = null, vendor_id = null, price } = params;

  const query = `
    INSERT INTO products (product_name, product_use, vendor_id, price)
    VALUES ($1, $2, $3, $4)
    RETURNING product_id, product_name, product_use, vendor_id, price;
  `;

  const values = [product_name, product_use, vendor_id, price];

  const { rows } = await db.query<Product>(query, values);

  const product = rows[0];

  if (!product) {
    throw new Error("Failed to create product.");
  }

  return product;
}

// get a product by id
export async function GetProduct(product_id: number): Promise<Product | null> {
  const query = `
    SELECT product_id, product_name, product_use, vendor_id, price
    FROM products
    WHERE product_id = $1  
  `;

  const { rows } = await db.query<Product>(query, [product_id]);
  return rows[0] ?? null;
}

// get all products
export async function GetAllProducts(): Promise<Product[]> {
  const query = `
    SELECT product_id, product_name, product_use, vendor_id, price
    FROM products
    ORDER BY product_id DESC
  `;

  const { rows } = await db.query<Product>(query);
  return rows;
}