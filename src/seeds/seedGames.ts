import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedGames() {
  await prisma.game.createMany({
    data: [
      { name: "Guilty Gear Strive", published: true },
      { name: "Street Fighter 6", published: true },
      { name: "Mortal Kombat 1", published: false },
      { name: "Tekken 8", published: false },
      { name: "Fatal Fury: City of the Wolves", published: false },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Games seeded");
}
