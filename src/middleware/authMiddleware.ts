import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/request";
import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "insecure_default_key";
const prisma = new PrismaClient();

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) return res.status(401).json({ error: "Invalid user" });

    req.userId = user.id;
    req.isAdmin = user.isAdmin;

    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}
