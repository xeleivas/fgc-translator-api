import { Router } from "express";
import * as gamesController from "../controllers/games";
import { authenticateToken } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", gamesController.getPublishedGames);
router.get(
  "/all",
  authenticateToken,
  requireAdmin,
  gamesController.getAllGames
);
router.post("/", authenticateToken, requireAdmin, gamesController.createGame);

export default router;
