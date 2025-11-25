import type { Request, Response } from "express";
import {
  GetAllProducts,
  GetProduct,
  SearchProducts,
} from "../models/product.model";

// GET /api/products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await GetAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

// GET /api/products/:id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    if (Number.isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await GetProduct(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

// GET /api/products/search?q=term
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const rawQuery = typeof req.query.q === "string" ? req.query.q : "";
    const trimmedQuery = rawQuery.trim();

    if (!trimmedQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await SearchProducts(trimmedQuery);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};