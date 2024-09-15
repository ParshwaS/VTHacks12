"use client";

import React from 'react';
import LineChart from '@/app/LineChart1/page';
import Heatmap from '@/app/Heatmap/page';
// import correlation from '@/app/corelation'; // Assume another graph component
// import PieChart from '@/components/graphs'; // Assume another graph component

const GraphsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid lg:grid-cols-10 gap-4">
        {/* Card 1: Line Chart */}
        <div className="card col-span-6 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Line Chart</h2>
          <LineChart />
        </div>

        {/* Card 2: Heatmap */}
        <div className="card flex flex-col justify-center items-center align-middle col-span-4 bg-white p-4 shadow-md end-0 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Heatmap</h2>
          <Heatmap />
        </div>

        {/* Card 3: Bar Chart
        <div className="card bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Bar Chart</h2>
          <BarChart />
        </div>

        {/* Card 4: Pie Chart 
        <div className="card bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Pie Chart</h2>
          <PieChart />
        </div> */}

        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default GraphsPage;
