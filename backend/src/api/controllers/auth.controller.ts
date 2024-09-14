import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import spacy from "@/lib/service/spacy";

class AuthController {

	public async me(req: Request, res: Response, next: NextFunction) {
		return res.status(200).json({ user: req.user });
	}

}

export default new AuthController();
