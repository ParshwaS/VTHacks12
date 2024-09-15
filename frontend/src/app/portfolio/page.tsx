"use client";
import { withAuthInfo } from '@propelauth/react';
import React, { useEffect, useState } from 'react';
import portfolioService from '@/components/customs/services/portfolio.service';


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownIcon, ArrowUpIcon, HomeIcon, DollarSignIcon, TrendingUpIcon, BarChart3Icon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Property = {
  name: string
  investmentAmount: number
  currentValue: number
  _id: { $oid: string }
}

type PortfolioData = {
  _id: { $oid: string }
  userId: string
  __v: number
  currentPortfolioValue: number
  properties: Property[]
  totalInvestment: number
}

// const portfolioData: PortfolioData = {
//   _id: { $oid: "66e575182e52bfbcc7b6afa3" },
//   userId: "a373d6bc-2c06-45f2-bd54-ed754cb6ca21",
//   __v: 3,
//   currentPortfolioValue: 0,
//   properties: [
//     {
//       name: "Sunset Villa",
//       investmentAmount: 350000,
//       currentValue: 425000,
//       _id: { $oid: "66e57f96752610c79f2b5def" }
//     },
//     {
//       name: "Downtown Loft",
//       investmentAmount: 275000,
//       currentValue: 310000,
//       _id: { $oid: "66e5954e1c9f6255a0ae0f99" }
//     },
//     {
//       name: "Riverside Cottage",
//       investmentAmount: 180000,
//       currentValue: 205000,
//       _id: { $oid: "66e5954e1c9f6255a0ae0f9a" }
//     }
//   ],
//   totalInvestment: 0
// }



const Portfolio = withAuthInfo(({ accessToken }) => {
    const [portfolioData, setPortfolio] = useState<any>(null);
    const [extraData, setExtraData] = useState<any>(null);
    

    useEffect(() => {
        portfolioService.getPortfolio(accessToken!).then((data) => {
            setPortfolio(data.portfolio);
            let x: any = {};
            x.totalInvestment = data.portfolio.properties.reduce((sum: any, property: any) => sum + property.investmentAmount, 0)
            x.currentPortfolioValue = data.portfolio.properties.reduce((sum: any, property: any) => sum + property.currentValue, 0)
            x.totalAppreciation = x.currentPortfolioValue - x.totalInvestment
            x.percentageChange = ((x.currentPortfolioValue - x.totalInvestment) / x.totalInvestment) * 100
            setExtraData(x);
        }).catch(err => {
            console.error('Error fetching portfolio', err);
        });
    }, [accessToken]);
  
    return (
      <div className=" mx-auto p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Real Estate Portfolio Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Investment</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">${extraData?.totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Initial capital invested</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Portfolio Value</CardTitle>
              <HomeIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">${extraData?.currentPortfolioValue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Total value of all properties</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Appreciation</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${extraData?.totalAppreciation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(extraData?.totalAppreciation).toLocaleString()} ({extraData?.percentageChange.toFixed(2)}%)
              </div>
              <p className="text-xs text-gray-500 mt-1">Overall portfolio growth</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-white shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Portfolio Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData?.properties.map((property: any) => (
                <div key={property._id.$oid} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600">{property.name}</div>
                  <div className="flex-1 mx-2">
                    <Progress 
                      value={(property.currentValue / extraData?.currentPortfolioValue) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="w-20 text-right text-sm font-medium text-gray-800">
                    {((property.currentValue / extraData?.currentPortfolioValue) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">Property Details</CardTitle>
            <BarChart3Icon className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Property Name</TableHead>
                  <TableHead className="text-gray-600">Purchase Price</TableHead>
                  <TableHead className="text-gray-600">Current Value</TableHead>
                  <TableHead className="text-gray-600">Appreciation</TableHead>
                  <TableHead className="text-gray-600">ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData?.properties.map((property: any) => {
                  const appreciation = property.currentValue - property.investmentAmount
                  const roi = ((property.currentValue - property.investmentAmount) / property.investmentAmount) * 100
                  
                  return (
                    <TableRow key={property._id.$oid} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-800">{property.name}</TableCell>
                      <TableCell>${property.investmentAmount.toLocaleString()}</TableCell>
                      <TableCell>${property.currentValue.toLocaleString()}</TableCell>
                      <TableCell className={appreciation >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${Math.abs(appreciation).toLocaleString()}
                        {appreciation >= 0 ? (
                          <ArrowUpIcon className="inline-block ml-1 h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="inline-block ml-1 h-4 w-4" />
                        )}
                      </TableCell>
                      <TableCell className={roi >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {roi.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  });

export default Portfolio;
