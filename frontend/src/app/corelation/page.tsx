"use client";
import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: string;
  rentalPriceChange: number;
  salePriceChange: number;
}

function Correlation() {
  useEffect(() => {
    // Clear the previous chart
    d3.select('.chart').selectAll('*').remove();

    // Sample data (Month/Year and corresponding rental and sale price changes)
    const data: DataPoint[] = [
      { date: '2023-01', rentalPriceChange: +2.5, salePriceChange: -3.0 },
      { date: '2023-02', rentalPriceChange: +3.0, salePriceChange: +3.5 },
      { date: '2023-03', rentalPriceChange: +2.8, salePriceChange: -3.1 },
      { date: '2023-04', rentalPriceChange: +4.0, salePriceChange: -4.5 },
      { date: '2023-05', rentalPriceChange: +3.5, salePriceChange: +4.0 },
      { date: '2023-06', rentalPriceChange: -3.8, salePriceChange: +4.2 },
      { date: '2023-07', rentalPriceChange: -4.5, salePriceChange: +4.8 },
      { date: '2023-08', rentalPriceChange: -4.2, salePriceChange: +5.0 },
    ];

    // Setup chart dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select('.chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse the date and setup scales
    const parseDate = d3.timeParse('%Y-%m');
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => parseDate(d.date) as Date) as [Date, Date])
      .range([0, width]);

    // Use the maximum absolute value to set the y scale domain
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(Math.abs(d.rentalPriceChange), Math.abs(d.salePriceChange))) as number])
      .range([height, 0]);

    // Define the line generator for rental price changes (use absolute values for plotting)
    const rentalLine = d3.line<DataPoint>()
      .x(d => x(parseDate(d.date) as Date) as number)
      .y(d => y(Math.abs(d.rentalPriceChange)) as number);

    // Define the line generator for sale price changes (use absolute values for plotting)
    const saleLine = d3.line<DataPoint>()
      .x(d => x(parseDate(d.date) as Date) as number)
      .y(d => y(Math.abs(d.salePriceChange)) as number);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));

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
      .attr('cx', d => x(parseDate(d.date) as Date) as number)
      .attr('cy', d => y(Math.abs(d.rentalPriceChange)) as number) // Plot with absolute values
      .attr('r', 4)
      .attr('fill', d => d.rentalPriceChange >= 0 ? 'green' : 'red')
      .on('mouseover', function (event, d) {
        // Show the tooltip with rental price change and change text color based on value
        tooltip.style('visibility', 'visible')
          .text(`Rental: ${d.rentalPriceChange}%`)
          .style('color', getColorForValue(d.rentalPriceChange));
        d3.select(this)
          .attr('fill', 'blue') // Highlight the point
          .attr('r', 6); // Increase point size
      })
      .on('mousemove', function (event) {
        // Move the tooltip with the cursor
        tooltip.style('top', (event.pageY - 30) + 'px')
          .style('left', (event.pageX + 5) + 'px');
      })
      .on('mouseout', function (event,d) {
        // Hide the tooltip when mouse leaves
        tooltip.style('visibility', 'hidden');
        d3.select(this)
        .attr('fill', d => d.rentalPriceChange >= 0 ? 'green' : 'red')
          .attr('r', 4); // Reset point size
      });

   // Add points for sale price
svg.selectAll('.sale-dot')
  .data(data)
  .enter().append('circle')
  .attr('cx', d => x(parseDate(d.date) as Date) as number)
  .attr('cy', d => y(Math.abs(d.salePriceChange)) as number)  // Take the absolute value for plotting
  .attr('r', 4)
  .attr('fill', d => d.salePriceChange >= 0 ? 'green' : 'red')  // Color based on positive (green) or negative (red)
  .on('mouseover', function (event, d) {
    // Show the tooltip with rental and sale price change
    tooltip.style('visibility', 'visible')
      .text(`Sale: ${d.salePriceChange}%`)
      .style('color', d.salePriceChange >= 0 ? 'green' : 'red');  // Tooltip text color matches the change
    d3.select(this)
      .attr('fill', 'blue') // Highlight the point
      .attr('r', 6); // Increase point size
  })
  .on('mousemove', function (event) {
    // Move the tooltip with the cursor
    tooltip.style('top', (event.pageY - 30) + 'px')
      .style('left', (event.pageX + 5) + 'px');
  })
  .on('mouseout', function (event, d) {
    // Hide the tooltip when mouse leaves
    tooltip.style('visibility', 'hidden');
    d3.select(this)
    .attr('fill', d => d.salePriceChange >= 0 ? 'green' : 'red') // Reset point color based on change
      .attr('r', 4); // Reset point size
  });

  }, []);

  return (
    <div className="chart"></div>
  );
}

export default Correlation;
