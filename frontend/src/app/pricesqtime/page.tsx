"use client"
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: string;
  pricePerSqFt: number;
}

const dummyData: DataPoint[] = [
  { date: '2021-01', pricePerSqFt: 500 },
  { date: '2021-02', pricePerSqFt: 520 },
  { date: '2021-03', pricePerSqFt: 540 },
  { date: '2021-04', pricePerSqFt: 530 },
  { date: '2021-05', pricePerSqFt: 550 },
  { date: '2021-06', pricePerSqFt: 570 },
  { date: '2021-07', pricePerSqFt: 580 },
];

const PricesByTimeChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Parse the dates from the data
    const parseDate = d3.timeParse('%Y-%m');

    const data = dummyData.map(d => ({
      date: parseDate(d.date) as Date,
      pricePerSqFt: d.pricePerSqFt,
    }));

    // Create SVG element
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create X scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    // Create Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.pricePerSqFt) as number])
      .nice()
      .range([height, 0]);

    // Create X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat('%b %Y')))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Create Y axis
    svg.append('g').call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date)!)
      .attr('y', d => y(d.pricePerSqFt))
      .attr('width', width / data.length - 10) // Adjust width
      .attr('height', d => height - y(d.pricePerSqFt))
      .attr('fill', 'steelblue');

    return () => {
      // Cleanup chart when the component unmounts or updates
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, []);

  return <div ref={chartRef} className="chart"></div>;
};

export default PricesByTimeChart;
