import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getPublishedGames() {
  return prisma.game.findMany({ where: { published: true } });
}

export function getAllGames() {
  return prisma.game.findMany();
}

export function createGame(name: string, published: boolean) {
  return prisma.game.create({ data: { name, published } });
}
