"use client";

import React from 'react';
import LineChart from '@/app/LineChart1/page';
import Heatmap from '@/app/Heatmap/page';
import Correlation from '../corelation/page';
import PricesByTimeChart from '../pricesqtime/page';
// import correlation from '@/app/corelation'; // Assume another graph component
// import PieChart from '@/components/graphs'; // Assume another graph component

const GraphsPage = () => {
  return (
    <div className="container font-sans m-auto p-4">
      <div className="flex mb-4 gap-4">
        {/* Card 1: Line Chart */}
        <div className="card bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Avg. Rental Price over Time</h2>
          <p></p>
          <LineChart />
        </div>
      </div>

      <div className="flex mb-4 gap-4">
        {/* Card 1: Line Chart */}
        <div className="card bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2"></h2>
          <Correlation />
        </div>
         {/* Card 2: Heatmap */}
         <div className="card flex flex-col justify-center items-center align-middle bg-white p-4 shadow-md end-0 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Percentage of housing units in Proximity</h2>
          <Heatmap />
        </div>
      </div>

      <div className="flex mb-4 gap-4">
        {/* Card 2: Heatmap */}
        <div className="card flex flex-col justify-center items-center align-middle bg-white p-4 shadow-md end-0 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Price per Square Feet over Time</h2>
          <PricesByTimeChart />
        </div>
      </div>
    </div>
  );
};

export default GraphsPage;
