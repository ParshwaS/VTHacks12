import { NextFunction, Request, Response } from "express";
import Blogs from "../models/blogs.model";
import User from "../models/user.model";

class BlogsController {


	
	public async blogs_me(req: Request, res: Response, next: NextFunction) {
		// const user = await User.findById(req.userToken?.userId);
		// if (!user) {
        
        // 	return res.status(404).json({ message: "User not found" });
		// }
		return res.status(200).json({ "user":req.user });
	}
}

export default new BlogsController();
