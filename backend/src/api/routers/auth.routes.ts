import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import propelAuth from "@/lib/service/propelAuth";

const router = Router();

router.get("/me", propelAuth.requireUser, AuthController.me);

export default router;