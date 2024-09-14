import { Router } from 'express';
import authRouter from "./auth.routes";
import rentCastRouter from "./rentCast.routes";
import portfolioRouter from "./portfolio.routes";

const mainRouter = Router();

// Rental Listing routes
mainRouter.use('/rentals', rentCastRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/rentCast", rentCastRouter);
mainRouter.use("/portfolio", portfolioRouter);

export default mainRouter;
