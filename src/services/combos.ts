import { PrismaClient } from "@prisma/client";
import { CreateComboInput, UpdateComboInput } from "../types/combos";
import { normalizeStepList } from "../utils/normalizeNotation";

const prisma = new PrismaClient();

export const getCombosByUser = async (userId: string, gameId?: string) => {
  return prisma.combo.findMany({
    where: { userId, gameId },
    include: { steps: { orderBy: { order: "asc" } } },
  });
};

export const createCombo = async (combo: CreateComboInput) => {
  const normalizedSteps = normalizeStepList(combo.steps);

  return prisma.combo.create({
    data: {
      name: combo.name,
      notes: combo.notes,
      gameId: combo.gameId,
      userId: combo.userId,
      steps: {
        create: normalizedSteps.map((notation, index) => ({
          notation,
          order: index,
        })),
      },
    },
    include: { steps: true },
  });
};

export const updateCombo = async (newCombo: UpdateComboInput) => {
  const combo = await prisma.combo.findUnique({
    where: { id: newCombo.id },
    include: { steps: true },
  });

  if (!combo || combo.userId !== newCombo.userId) return; // We don't return anything if the user doesn't own the combo, controller will return 404

  const normalizedSteps = normalizeStepList(newCombo.steps);

  return prisma.combo.update({
    where: { id: newCombo.id },
    data: {
      name: newCombo.name,
      notes: newCombo.notes,
      steps: {
        deleteMany: {},
        create: normalizedSteps.map((notation, index) => ({
          notation,
          order: index,
        })),
      },
    },
    include: { steps: true },
  });
};

export const deleteCombo = async (id: string, userId: string) => {
  const combo = await prisma.combo.findUnique({
    where: { id },
  });

  if (!combo || combo.userId !== userId) return; // We don't return anything if the user doesn't own the combo, controller will return 404

  return prisma.combo.delete({ where: { id } });
};
