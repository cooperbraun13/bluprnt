import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const createUserSchema = z.object({
  first_name: z.string().min(1),
  middle_name: z.string().nullable().optional(),
  last_name: z.string().min(1),
  email: z.email(),
  discount: z.string().nullable().optional(),
});

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: z.flattenError(result.error),
    });
  }

  // body is now typed and clean
  req.body = result.data;
  next();
};
