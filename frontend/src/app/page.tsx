"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, Building2, MapPin } from "lucide-react"
import Image from "next/image"
// import LineChart from "./LineChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState } from "react";
import { useRouter } from "next/navigation";

const cardColors = [
  { bg: "bg-pink-100", text: "text-pink-800", icon: "text-pink-500" },
  { bg: "bg-blue-100", text: "text-blue-800", icon: "text-blue-500" },
  { bg: "bg-green-100", text: "text-green-800", icon: "text-green-500" },
  { bg: "bg-purple-100", text: "text-purple-800", icon: "text-purple-500" },
];

const data = [
  { month: 'Jan', price: 0 },
  { month: 'Feb', price: 20000 },
  { month: 'Mar', price: 10000 },
  { month: 'Apr', price: 30000 },
  { month: 'May', price: 40000 },
  { month: 'Jun', price: 50000 },
]

export default function LandingPage() {

  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleClick = () => {
    fetch(`http://localhost:8000/text/${searchTerm}`).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      router.push('/Analysis?zipcode='+data.zipcode);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Background Image"
            src="/bg.jpg"
            fill
            quality={80}
            className="object-cover"
          />
        </div>
        {/* backdrop */}
        <div className="absolute inset-0 z-10 bg-black opacity-30 " />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center">
          <h3 className="mb-6 text-2xl font-bold text-white md:text-5xl">Enhance your Real Estate Investment!</h3>
          <div className="flex w-full max-w-md items-center space-x-2">
            <Input onChange={(event) => {
              setSearchTerm(event.target.value);
            }} className="bg-white" placeholder="Search for properties..." />
            <Button onClick={() => handleClick()} type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Search Combinations */}
      <section className="py-12">
        <div className="container">
          <h1 className="mb-6 text-lg font-semibold">Suggested Searches</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Residential in Raleigh", icon: MapPin },
              { title: "Commercial in Asheville", icon: MapPin },
              { title: "Apartments in Charlotte", icon: MapPin },
              { title: "Houses in Durham", icon: MapPin },
            ].map((item, index) => (
              <Card key={index} className={`cursor-pointer text-md transition-shadow hover:shadow-lg ${cardColors[index].bg}`}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <item.icon className={`h-8 w-8 ${cardColors[index].icon}`} />
                  <CardTitle className={cardColors[index].text}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${cardColors[index].text} opacity-80`}>Explore market trends and analytics</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Graph and Statistics */}
      <section className="bg-muted py-12">
        <div className="container">
          <h2 className="mb-6 text-2xl font-semibold">US Real Estate Market Overview</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Housing Price Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Key US Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { label: "Average Home Price", value: "$350,000" },
                    { label: "Average Rental Income", value: "$2,000/month" },
                    { label: "Gross Rental Yield", value: "6.2%" },
                    { label: "Inventory", value: "1.2M listings" },
                    { label: "Avg. Days on Market", value: "45 days" },
                    { label: "Avg. Net Operating Income (NOI)", value: "25,000" },
                    { label: "Price per Sq. Foot", value: "$200/sq ft" },
                  ].map((stat, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold">{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}