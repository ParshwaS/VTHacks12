import { Router } from "express";
import QOLController from "../controllers/qol.controller";

const router = Router();

router.get("/proximity", QOLController.getProximityData);
router.get("/crime", QOLController.crimesData);

export default router;