import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, createUser);
router.get("/", requireAuth, getAllUsers);
router.get("/:id", requireAuth, getUserById);

export default router;
