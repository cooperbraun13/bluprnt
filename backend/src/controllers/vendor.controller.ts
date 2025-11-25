import type { Request, Response } from "express";
import { GetAllVendors, GetVendor } from "../models/vendor.model";

// GET /api/vendors
export const getAllVendors = async (_req: Request, res: Response) => {
  try {
    const vendors = await GetAllVendors();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

// GET /api/vendors/:id
export const getVendorById = async (req: Request, res: Response) => {
  try {
    const vendorId = Number(req.params.id);
    if (Number.isNaN(vendorId)) {
      return res.status(400).json({ message: "Invalid vendor id" });
    }

    const vendor = await GetVendor(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};