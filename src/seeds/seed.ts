import { seedGames } from "./seedGames";

async function main() {
  await seedGames();
  // More seeds
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
