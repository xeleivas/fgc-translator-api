import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import * as comboController from "../controllers/combos";

const router = Router();

router.get("/", authenticateToken, comboController.getUserCombos);
router.get("/:gameId", authenticateToken, comboController.getUserCombos);
router.post("/", authenticateToken, comboController.createCombo);

export default router;
