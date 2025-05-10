import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/request";

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.isAdmin) {
    return res.status(403).json({ error: "Admins only" });
  }

  next();
}
