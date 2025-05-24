import { Router } from "express";
import * as authController from "../controllers/auth";
import { authenticateToken } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post("/logout", authenticateToken, authController.logout); // Not needed but could be useful for logs and improved security in the future
router.delete(
  "/:userId",
  authenticateToken,
  requireAdmin,
  authController.deleteUser
);

export default router;
