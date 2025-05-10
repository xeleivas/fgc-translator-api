import { Request, Response } from "express";
import { AuthSchema } from "../types/auth";
import * as authService from "../services/auth";

export async function register(req: Request<{}, {}, any>, res: Response) {
  const parsed = AuthSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  const result = await authService.register(email, password);
  if (result.error)
    return res.status(result.status).json({ error: result.error });

  res.status(201).json({ userId: result.userId });
}

export async function login(req: Request<{}, {}, any>, res: Response) {
  const parsed = AuthSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  const result = await authService.login(email, password);
  if (result.error)
    return res.status(result.status).json({ error: result.error });

  res.json({ token: result.token });
}
