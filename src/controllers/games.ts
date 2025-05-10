import { Request, Response } from "express";
import { AuthRequest } from "../types/request";
import { CreateGameSchema } from "../types/games";
import * as gameService from "../services/games";

export async function getPublishedGames(_req: Request, res: Response) {
  const games = await gameService.getPublishedGames();
  res.json(games);
}

export async function getAllGames(req: AuthRequest, res: Response) {
  const games = await gameService.getAllGames();
  res.json(games);
}

export async function createGame(req: AuthRequest, res: Response) {
  const parsed = CreateGameSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { name, published = false } = parsed.data;
  const game = await gameService.createGame(name, published);
  res.status(201).json(game);
}
