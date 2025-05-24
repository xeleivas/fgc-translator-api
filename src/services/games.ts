import { PrismaClient } from "@prisma/client";
import { CreateGameInput, UpdateGameInput } from "../types/games";

const prisma = new PrismaClient();

export const getPublishedGames = () => {
  return prisma.game.findMany({ where: { published: true } });
};

export const getAllGames = () => {
  return prisma.game.findMany();
};

export const getGameById = (id: string) => {
  return prisma.game.findUnique({ where: { id } });
};

export const createGame = (game: CreateGameInput) => {
  return prisma.game.create({
    data: {
      name: game.name,
      published: game.published || false,
    },
  });
};

export const updateGame = (newGame: UpdateGameInput) => {
  const game = prisma.game.findUnique({ where: { id: newGame.id } });

  if (!game) return; // We don't return anything if the game doesn't exist, controller will return 404

  return prisma.game.update({
    where: { id: newGame.id },
    data: {
      name: newGame.name,
      published: newGame.published || false,
    },
  });
};

export const deleteGame = (id: string) => {
  const game = prisma.game.findUnique({ where: { id } });

  if (!game) return; // We don't return anything if the game doesn't exist, controller will return 404

  return prisma.game.delete({ where: { id } });
};
