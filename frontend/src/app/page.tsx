"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, Building2, MapPin } from "lucide-react"
import Image from "next/image"
import LineChart from "./LineChart";

const cardColors = [
  { bg: "bg-pink-100", text: "text-pink-800", icon: "text-pink-500" },
  { bg: "bg-blue-100", text: "text-blue-800", icon: "text-blue-500" },
  { bg: "bg-green-100", text: "text-green-800", icon: "text-green-500" },
  { bg: "bg-purple-100", text: "text-purple-800", icon: "text-purple-500" },
];

export const data = [
  { date: new Date(2021, 0, 1), price: 300000 },
  { date: new Date(2021, 1, 1), price: 320000 },
  { date: new Date(2021, 2, 1), price: 310000 },
  { date: new Date(2021, 3, 1), price: 330000 },
  { date: new Date(2021, 4, 1), price: 340000 },
  { date: new Date(2021, 5, 1), price: 350000 },
];

export default function LandingPage() {
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
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">Real Estate Analytics</h1>
          <div className="flex w-full max-w-md items-center space-x-2">
            <Input className="bg-white" placeholder="Search for properties..." />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Search Combinations */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-6 text-2xl font-semibold">Popular Searches</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Residential in New York", icon: Home },
              { title: "Commercial in Los Angeles", icon: Building2 },
              { title: "Apartments in Chicago", icon: MapPin },
              { title: "Houses in Miami", icon: Home },
            ].map((item, index) => (
              <Card key={index} className={`cursor-pointer transition-shadow hover:shadow-lg ${cardColors[index].bg}`}>
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
              <CardContent>
                <div className="h-[400px] w-full">
                  <LineChart data={data} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { label: "Average Home Price", value: "$350,000" },
                    { label: "YoY Price Change", value: "+5.2%" },
                    { label: "Inventory", value: "1.2M listings" },
                    { label: "Days on Market", value: "45 days" },
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