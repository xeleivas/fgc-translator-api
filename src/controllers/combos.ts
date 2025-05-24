import { Request, Response } from "express";
import { AuthRequest } from "../types/request";
import { CreateComboSchema, UpdateComboSchema } from "../types/combos";
import * as comboService from "../services/combos";

export async function getUserCombos(req: AuthRequest, res: Response) {
  const gameId = req.params.gameId;
  const combos = await comboService.getCombosByUser(req.userId!, gameId);
  res.json(combos);
}

/**
 * Creates a new combo and assigns it to the current user.
 * Requires `name`, `gameId`, `steps`, etc. (see Zod schema).
 * */
export const createCombo = async (req: AuthRequest, res: Response) => {
  const parsed = CreateComboSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const combo = await comboService.createCombo({
    ...parsed.data,
    userId: req.userId!, // enforced by auth middleware
  });

  res.status(201).json(combo);
};

/**
 * Updates a combo owned by the current user.
 * Requires `id`, `name`, `gameId`, `steps`, etc. (see Zod schema).
 */
export const updateCombo = async (req: AuthRequest, res: Response) => {
  const data = { ...req.body, id: req.params.id };
  const parsed = UpdateComboSchema.safeParse(data);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const combo = await comboService.updateCombo({
    ...parsed.data,
    userId: req.userId!, // enforced by auth middleware
  });

  if (!combo) return res.status(404).json({ error: "Combo not found" });

  res.status(201).json(combo);
};

/**
 * Deletes a combo owned by the current user.
 * Requires `comboId`.
 */
export const deleteCombo = async (req: AuthRequest, res: Response) => {
  const { comboId } = req.params;
  const result = await comboService.deleteCombo(comboId, req.userId!);
  if (result) {
    res.status(200).json({ message: "Combo deleted successfully" });
  } else {
    res.status(404).json({ error: "Combo not found" });
  }
};
