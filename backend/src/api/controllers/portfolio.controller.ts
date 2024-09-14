import { Request, Response, NextFunction } from 'express';
import Portfolio from '../models/portfolio.model';

class PortfolioController {

  // Fetch portfolio for logged-in user
  public async getPortfolio(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const portfolio = await Portfolio.findOne({ userId });

      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }

    //   portfolio?.calculatePortfolioValue();
      await portfolio.save();

      return res.status(200).json({ portfolio });
    } catch (err) {
      next(err);
    }
    // return res.status(200).json({ "user":req.user });
  }

//   Add a property to the user's portfolio
public async addProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { name, investmentAmount, currentValue } = req.body;

      console.log(req.body);
  
      if (!name || !investmentAmount || !currentValue) {
        return res.status(400).json({ message: "Missing required fields" });
      }

    //   console.log(name, investmentAmount, currentValue);
  
      let portfolio = await Portfolio.findOne({ userId });
  
      if (!portfolio) {
        portfolio = new Portfolio({ userId, properties: [] });
      }
  
      portfolio.properties.push({
        name,
        investmentAmount,
        currentValue,
        profitLoss: currentValue - investmentAmount,
      });
  

      await portfolio.save();
  
      return res.status(201).json({ portfolio });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}

export default new PortfolioController();
