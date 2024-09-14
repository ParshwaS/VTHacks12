import { Router } from "express";
import authRouter from "./auth.routes";
import rentCastRouter from "./rentCast.routes";
import blogRouter from "./blogs.routes";
import portfolioRouter from "./portfolio.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/bl", blogRouter);

router.use("/rentCast", rentCastRouter);
router.use("/portfolio", portfolioRouter);

export default router;
