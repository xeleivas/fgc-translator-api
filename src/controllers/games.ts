import { Request, Response } from "express";
import { AuthRequest } from "../types/request";
import { CreateGameSchema, UpdateGameSchema } from "../types/games";
import * as gameService from "../services/games";

export const getPublishedGames = async (_req: Request, res: Response) => {
  const games = await gameService.getPublishedGames();
  res.json(games);
};

export const getAllGames = async (_req: AuthRequest, res: Response) => {
  const games = await gameService.getAllGames();
  res.json(games);
};

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const game = await gameService.getGameById(id);
  if (!game) return res.status(404).json({ error: "Game not found" });

  res.json(game);
};

/**
 * Creates a new game.
 * Requires `name`, `published` (optional) (see Zod schema).
 */
export const createGame = async (req: AuthRequest, res: Response) => {
  const parsed = CreateGameSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const game = await gameService.createGame(parsed.data);
  res.status(201).json(game);
};

/**
 * Updates a game.
 * Requires `id`, `name`, `published` (optional) (see Zod schema).
 */
export const updateGame = async (req: AuthRequest, res: Response) => {
  const data = { ...req.body, id: req.params.id };
  const parsed = UpdateGameSchema.safeParse(data);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const game = await gameService.updateGame(parsed.data);
  if (!game) return res.status(404).json({ error: "Game not found" });

  res.status(201).json(game);
};

/**
 * Deletes a game.
 * Requires `gameId`.
 */
export const deleteGame = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const result = await gameService.deleteGame(id);
  if (result) {
    res.status(200).json({ message: "Game deleted successfully" });
  } else {
    res.status(404).json({ error: "Game not found" });
  }
};
