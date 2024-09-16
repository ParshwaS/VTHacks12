"use client";
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import corelationServices from '@/components/customs/services/corelation.services';

interface DataPoint {
  quarter: string;
  rentalPriceChange: number;
  salePriceChange: number;
}

function Correlation({ zipcode }: { zipcode: string | null }) {

  const [data, setDummyData] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (zipcode) {
      corelationServices.getcorelation(zipcode).then((dumy_data: any) => {
        setDummyData(dumy_data);
        console.log(dumy_data);
      });
    }
  }, [zipcode]);

  useEffect(() => {
    // Clear the previous chart
    d3.select('.chart').selectAll('*').remove();

    // Setup chart dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select('.chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Setup scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.quarter))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([-150, 150])
      .range([height, 0]);

    // Define the line generator for rental price changes
    const rentalLine = d3.line<DataPoint>()
      .x(d => x(d.quarter) as number + x.bandwidth() / 2)
      .y(d => y(d.rentalPriceChange) as number);

    // Define the line generator for sale price changes
    const saleLine = d3.line<DataPoint>()
      .x(d => x(d.quarter) as number + x.bandwidth() / 2)
      .y(d => y(d.salePriceChange) as number);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));

    svg.append('text')
      .attr('class', 'x-axis-title')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .text('Quarter');

    // Add Y axis title
    svg.append('text')
      .attr('class', 'y-axis-title')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage");

    // Add the rental price line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', rentalLine);

    // Add the sale price line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)
      .attr('d', saleLine);

    // Tooltip div
    const tooltip = d3.select('.chart')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid black')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('font-size', '12px');

    // Function to handle tooltip color based on value
    const getColorForValue = (value: number) => value >= 0 ? 'green' : 'red';

    // Add points for rental price and sale price, and add hover functionality
    svg.selectAll('.rental-dot')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => x(d.quarter) as number + x.bandwidth() / 2)
      .attr('cy', d => y(d.rentalPriceChange) as number)
      .attr('r', 4)
      .attr('fill', d => d.rentalPriceChange >= 0 ? 'green' : 'red')
      .on('mouseover', function (event, d) {
        tooltip.style('visibility', 'visible')
          .text(`Rental: ${d.rentalPriceChange}%`)
          .style('color', getColorForValue(d.rentalPriceChange));
        d3.select(this)
          .attr('fill', 'blue')
          .attr('r', 6);
      })
      .on('mousemove', function (event) {
        tooltip.style('top', (event.pageY - 30) + 'px')
          .style('left', (event.pageX + 5) + 'px');
      })
      .on('mouseout', function (event, d) {
        tooltip.style('visibility', 'hidden');
        d3.select(this)
          .attr('fill', d => d.rentalPriceChange >= 0 ? 'green' : 'red')
          .attr('r', 4);
      });

    svg.selectAll('.sale-dot')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => x(d.quarter) as number + x.bandwidth() / 2)
      .attr('cy', d => y(d.salePriceChange) as number)
      .attr('r', 4)
      .attr('fill', d => d.salePriceChange >= 0 ? 'green' : 'red')
      .on('mouseover', function (event, d) {
        tooltip.style('visibility', 'visible')
          .text(`Sale: ${d.salePriceChange}%`)
          .style('color', getColorForValue(d.salePriceChange));
        d3.select(this)
          .attr('fill', 'blue')
          .attr('r', 6);
      })
      .on('mousemove', function (event) {
        tooltip.style('top', (event.pageY - 30) + 'px')
          .style('left', (event.pageX + 5) + 'px');
      })
      .on('mouseout', function (event, d) {
        tooltip.style('visibility', 'hidden');
        d3.select(this)
          .attr('fill', d => d.salePriceChange >= 0 ? 'green' : 'red')
          .attr('r', 4);
      });

  }, [data]);

  return (
    <div className="chart"></div>
  );
}

export default Correlation;
