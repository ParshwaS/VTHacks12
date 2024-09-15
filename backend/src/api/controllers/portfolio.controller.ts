import { Request, Response, NextFunction } from 'express';
import Portfolio from '../models/portfolio.model';

class PortfolioController {



    // Fetch rental properties for the logged-in user
public async getRentalProperties(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const portfolio = await Portfolio.findOne({ userId });
  
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
  
      // Filter properties where isForRent is true
      const rentalProperties = portfolio.properties.filter(property => property.isForRent === true);
  
      return res.status(200).json({ rentalProperties });
    } catch (err) {
        return res.status(404).json({ err });
    }
  }

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












// Add or Update a regular or rental property in the user's portfolio
public async addProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const { name, investmentAmount, currentValue, isForRent, rentPerMonth, zipcode, date_purchased, isPaid } = req.body;
  
      // Validate required fields
      if (!zipcode || !date_purchased || !name || !investmentAmount || !currentValue || (isForRent && !rentPerMonth)) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      let portfolio = await Portfolio.findOne({ userId });
  
      if (!portfolio) {
        portfolio = new Portfolio({ userId, properties: [] });
      }
  
      // Find if the property already exists
      let property = portfolio.properties.find(p => p.name === name && p.zipcode === zipcode);
  
      if (property) {
        // Property exists, update its values
        property.currentValue = currentValue;
        property.investmentAmount = investmentAmount;
        property.date_purchased = date_purchased;
        const currentMonth = new Date().toISOString().slice(0, 7); 
        // If it's a rental property, update rental details
        if (isForRent) {
          property.isForRent = true;
          property.rentPerMonth = rentPerMonth;
         
  
   
        }
      } 
      
      
      else {
        const currentMonth = new Date().toISOString().slice(0, 7); 

        const newProperty: any = {
          name,
          investmentAmount,
          currentValue,
          profitLoss: currentValue - investmentAmount,
          isForRent: isForRent || false,
          zipcode,
          date_purchased,
        };
  

        if (isForRent) {
          newProperty.rentPerMonth = rentPerMonth;
          newProperty.totalRentCollected = 0;
          newProperty.totalRentDue = 0;
          newProperty.isPaid= false
      
        }
  
        portfolio.properties.push(newProperty);
      }
  
      // Calculate total portfolio value and investment
      portfolio.totalInvestment = portfolio.properties.reduce((sum, prop) => sum + prop.investmentAmount, 0);
      portfolio.currentPortfolioValue = portfolio.properties.reduce((sum, prop) => sum + prop.currentValue, 0);
  
      await portfolio.save();
  
      return res.status(201).json({ portfolio });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }


}

export default new PortfolioController();
