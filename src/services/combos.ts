import { PrismaClient } from "@prisma/client";
import { CreateComboInput } from "../types/combos";

const prisma = new PrismaClient();

export async function getCombosByUser(userId: string, gameId?: string) {
  return prisma.combo.findMany({
    where: { userId, gameId },
    include: { steps: { orderBy: { order: "asc" } } },
  });
}

export async function createCombo(input: CreateComboInput) {
  return prisma.combo.create({
    data: {
      name: input.name,
      notes: input.notes,
      gameId: input.gameId,
      userId: input.userId,
      steps: {
        create: input.steps.map((notation, index) => ({
          notation,
          order: index,
        })),
      },
    },
    include: { steps: true },
  });
}
