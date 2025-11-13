import type { Response, Request, NextFunction } from "express";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "../config/supabaseClient";

export interface AuthenticatedRequest extends Request {
  user?: SupabaseUser;
}

// require JWT from client
export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // attach user to request for controllers to use
  req.user = data.user;
  next();
};
