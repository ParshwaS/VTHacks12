"use client";

import React, { useState } from 'react';
import LineChart from '@/app/LineChart1/page';
import Heatmap from '@/app/Heatmap/page';
import Correlation from '../corelation/page';
import PricesByTimeChart from '../pricesqtime/page';
import MapView from '@/components/MapView';
import CrimeRate from '../crimerate/page';
// import correlation from '@/app/corelation'; // Assume another graph component
// import PieChart from '@/components/graphs'; // Assume another graph component

const GraphsPage = () => {

  const [selectedZip, setSelectedZip] = useState<string | null>(null);

  return (
    <div className="container font-sans m-auto p-4">
      <div className="grid mb-4 gap-4 grid-cols-12">
        {/* Card 1: Line Chart */}
        <div className="card bg-white p-4 col-span-8 shadow-md rounded-lg" style={{ "width": "100%" }}>
          <h2 className="text-xl font-semibold mb-2">Avg. Rental Price over Time</h2>
          <LineChart zipcode={selectedZip} />
        </div>
        <div className="card flex flex-col items-center bg-white p-4 col-span-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Search by Zipcode</h2>
          <MapView setSelectedZip={setSelectedZip} selectedZip={selectedZip} />
          <p></p>
        </div>
      </div>


      <div className="flex my-4 gap-4 grid-cols-12">
        {/* Card 2: Heatmap */}
        <div className="card flex flex-col justify-center items-center align-middle bg-white p-4 shadow-md end-0 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Crime Rate per 100 Housings over Time</h2>
          <CrimeRate zipcode={selectedZip} />
        </div>

        {/* Card 2: Heatmap */}
        <div className="card flex flex-col justify-center items-center align-middle bg-white p-4 shadow-md end-0 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Price per Square Feet over Time</h2>
          <PricesByTimeChart zipcode={selectedZip} />
        </div>
      </div>

      <div className="grid my-4 grid-cols-12 gap-4">
        {/* Card 1: Line Chart */}
        <div className="card bg-white p-4 col-span-7 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Rental & Sale price Growth Rate</h2>
          <Correlation zipcode={selectedZip} />
        </div>
        {/* Card 2: Heatmap */}
        <div className="card flex flex-col justify-center col-span-5 items-center align-middle bg-white p-4 shadow-md end-0 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Percentage of housing units in Proximity</h2>
          <Heatmap zipcode={selectedZip} />
        </div>
      </div>

      <div className="flex my-4 gap-4">
        {/* Card 2: Heatmap */}
        <div className="card flex flex-col justify-center items-center align-middle bg-white p-4 shadow-md end-0 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Price per Square Feet over Time</h2>
          <PricesByTimeChart zipcode={selectedZip} />
        </div>
      </div>
    </div>
  );
};

export default GraphsPage;
