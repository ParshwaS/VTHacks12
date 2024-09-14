import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI! + '/api/portfolio';

const portfolioService = {
  getPortfolio: async (accessToken: string) => {
    const response = await axios.get(API_URL + '/get-portfolio' , {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },

  addProperty: async (accessToken: string, propertyData: any) => {
    const response = await axios.post(API_URL + '/add-property', propertyData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};

export default portfolioService;
