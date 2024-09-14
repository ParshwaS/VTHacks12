import { Router } from "express";
import portfolioController from "../controllers/portfolio.controller";
import propelAuth from "@/lib/service/propelAuth";

const router = Router();

router.get("/get-portfolio", propelAuth.requireUser, portfolioController.getPortfolio);
router.post("/add-property", propelAuth.requireUser, portfolioController.addProperty);

export default router;
