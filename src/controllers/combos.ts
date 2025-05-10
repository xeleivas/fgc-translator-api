import { Request, Response } from "express";
import { AuthRequest } from "../types/request";
import { CreateComboSchema } from "../types/combos";
import * as comboService from "../services/combos";

export async function getUserCombos(req: AuthRequest, res: Response) {
  const gameId = req.params.gameId;
  const combos = await comboService.getCombosByUser(req.userId!, gameId);
  res.json(combos);
}

/**
 * Creates a new combo and returns it.
 *
 * The request body must be a JSON object with the following properties:
 * - `name`: The name of the combo.
 * - `notes`: A description of the combo.
 * - `gameId`: The ID of the game this combo belongs to.
 * - `steps`: An array of steps in the combo.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export async function createCombo(req: AuthRequest, res: Response) {
  const parsed = CreateComboSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const combo = await comboService.createCombo({
    ...parsed.data,
    userId: req.userId!, // enforced by auth middleware
  });

  res.status(201).json(combo);
}
