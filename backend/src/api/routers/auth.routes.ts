import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import authMiddleware from "@/lib/middlewares/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/me", authMiddleware, AuthController.me);

export default router;