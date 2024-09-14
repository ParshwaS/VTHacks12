import { Router } from "express";
import blogsController from "../controllers/blogs.controller";
import propelAuth from "@/lib/service/propelAuth";

const router = Router();

router.get("/bg", propelAuth.requireUser, blogsController.blogs_me);

export default router;