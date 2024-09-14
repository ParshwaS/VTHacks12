import first_api from "@/lib/service/first_api";
import { NextFunction, Request, Response } from "express";

class AuthController {
	public async test(req: Request, res: Response, next: NextFunction) {
        let data = await first_api.getFirstApi();
        return res.status(200).json({ message: "Test route" , data});
    }
}

export default new AuthController();
