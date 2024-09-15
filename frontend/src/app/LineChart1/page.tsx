"use client";
import { withAuthInfo } from '@propelauth/react';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Average rent vs time and no of bedrooms

// Define the interface for the data
interface DataPoint {
  "date": Date,
  [key: string]: any;
}

// Generate dummy data for the line chart
const generateDummyData = (): DataPoint[] => {
  const startDate = new Date(2024, 0, 1); // Starting from January 2024
  const months = d3.timeMonths(startDate, new Date(2024, 11, 1)); // Up to December 2024

  return months.map(month => ({
    date: month,
    "1-bedroom": Math.random() * 200000 + 100000,
    "2-bedroom": Math.random() * 250000 + 150000,
    "3-bedroom": Math.random() * 300000 + 200000,
    "4-bedroom": Math.random() * 350000 + 250000
  }));
};

const LineChart1 = withAuthInfo(({ accessToken }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);


  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Set up the SVG container
    d3.select(svgRef.current).select("*").remove();
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Generate dummy data
    const data = generateDummyData();

    // Define scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 1.2*(d3.max(data, d => Math.max(
        d["1-bedroom"], d["2-bedroom"], d["3-bedroom"], d["4-bedroom"]
      )) || 0)])
      .range([height, 0]);

    // // Define the line generator
    const line = d3.line<DataPoint>()
      .x(d => x(d.date))
      .y(d => y(d["value"]));

    // Append X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b %Y") as any));

    // Append Y axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Append lines for each bedroom type
    console.log(Object.keys(data[0]).filter(key => key !== 'date'))
    Object.keys(data[0]).filter(key => key !== 'date').forEach((key, i) => {
      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', d3.line<DataPoint>()
          .x(d => x(d.date))
          .y(d => y(d[key] as number)))
        .style('fill', 'none')
        .style('stroke', color(`${i}`))
        .style('stroke-width', '2px');
    });

    // Append legend
    const legend = svg.selectAll(".legend")
      .data(Object.keys(data[0]).filter(key => key !== 'date'))
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0,${i * 25})`)
      .on("mouseover", function(event, d) {
        // Highlight only the hovered line
        setHoveredLegend(d as string);

        svg.selectAll('.line')
          .style('opacity', function(lineKey, e){ 
            if(lineKey === d){
              return 3;
            }else {
              return 0.1;
            }
          });
      })
      .on("mouseout", function(event, d) {
        // Reset line visibility
        svg.selectAll('.line')
          .style('opacity', 1);
        setHoveredLegend(null);
      });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => color(`${i}`));

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(d => d);
  }, [hoveredLegend]); // Empty dependency array means this effect runs once after initial render

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
});

export default LineChart1;
