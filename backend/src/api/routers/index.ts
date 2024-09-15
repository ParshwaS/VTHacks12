import { Router } from 'express';
import authRouter from "./auth.routes";
import rentCastRouter from "./rentCast.routes";
import portfolioRouter from "./portfolio.routes";
import qolRouter from "./qol.routes";

const mainRouter = Router();

// Rental Listing routes
mainRouter.use('/rentals', rentCastRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/rentCast", rentCastRouter);
mainRouter.use("/portfolio", portfolioRouter);
mainRouter.use("/qol", qolRouter);

export default mainRouter;
