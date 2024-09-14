import { Router } from "express";
import rentCastController from "../controllers/rentCast.controller";

const router = Router();

router.get("/",rentCastController.test);

export default router;