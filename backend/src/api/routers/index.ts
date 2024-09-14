import { Router } from "express";
import authRouter from "./auth.routes";
import rentCastRouter from "./rentCast.routes";

const router = Router();

router.use("/auth", authRouter);

router.use("/rentCast", rentCastRouter);

export default router;
