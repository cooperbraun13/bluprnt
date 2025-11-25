import { db } from "../config/database";

export interface Product {
  product_id: number;
  product_name: string;
  product_use: string;
  vendor_id: number;
  price: number;
  image_url: string;
}

// for creating a new product (no id / created_at yet)
// what the controller passes in when creating a product
export interface CreateProductParams {
  product_name: string;
  product_use?: string;
  vendor_id?: number;
  price: number;
  image_url: string;
}

// create a new product
export async function CreateProduct(params: CreateProductParams): Promise<Product> {
  const { product_name, product_use = null, vendor_id = null, price, image_url } = params;

  const query = `
    INSERT INTO products (product_name, product_use, vendor_id, price, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING product_id, product_name, product_use, vendor_id, price, image_url;
  `;

  const values = [product_name, product_use, vendor_id, price, image_url];

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
    SELECT product_id, product_name, product_use, vendor_id, price, image_url
    FROM products
    WHERE product_id = $1  
  `;

  const { rows } = await db.query<Product>(query, [product_id]);
  return rows[0] ?? null;
}

// get all products
export async function GetAllProducts(): Promise<Product[]> {
  const query = `
    SELECT product_id, product_name, product_use, vendor_id, price, image_url
    FROM products
    ORDER BY product_id DESC
  `;

  const { rows } = await db.query<Product>(query);
  return rows;
}

export async function SearchProducts(term: string): Promise<Product[]> {
  const likeValue = `%${term}%`;
  const query = `
    SELECT product_id, product_name, product_use, vendor_id, price, image_url
    FROM products
    WHERE product_name ILIKE $1 OR COALESCE(product_use, '') ILIKE $1
    ORDER BY product_name ASC
    LIMIT 25
  `;

  const { rows } = await db.query<Product>(query, [likeValue]);
  return rows;
}