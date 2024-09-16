"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import pricesqtimeService from '@/components/customs/services/pricesqtime.service';

interface DataPoint {
  date: string;
  pricePerSqFt: number;
}

const PricesByTimeChart = ({ zipcode }: { zipcode: string | null }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [dummyData1, setDummyData1] = useState<any[]>([]);

  useEffect(() => {
    // Fetching data from the service
    if (zipcode) {
      pricesqtimeService.getPts(zipcode).then((dummyData_) => {
        setDummyData1(dummyData_);
      });
    }
  }, [zipcode]);

  useEffect(() => {
    const svgWidth = 750;
    const svgHeight = 400;
    const margin = { top: 20, right: 30, bottom: 65, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Parse the dates from the data
    const parseDate = d3.timeParse('%Y-%m');

    // Map the data to the format D3 expects
    const data = dummyData1.map((d) => ({
      date: parseDate(d.month) as Date,
      pricePerSqFt: d.averageCostPerSqFt,
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
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    // Create Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.pricePerSqFt) as number])
      .nice()
      .range([height, 0]);

    // Create X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat('%b %Y'))
      )
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Create Y axis
    svg.append('g').call(d3.axisLeft(y));

    svg.append('text')
      .attr('class', 'x-axis-title')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .text('Month Year');

    svg.append('text')
      .attr('class', 'y-axis-title')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price per Sq. Foot");

    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.date))
      .y((d) => y(d.pricePerSqFt));

    // Bars
    svg
      .append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', 'steelblue')
      .style('stroke-width', '2px');

    // Tooltip div
    const tooltip = d3.select(chartRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', '1px solid black')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('font-size', '12px');

    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.pricePerSqFt))
      .attr('r', 4)
      .attr('fill', 'steelblue')
      .on('mouseover', function (event, d) {
        tooltip.style('visibility', 'visible')
          .text(`Price: $${d.pricePerSqFt.toFixed(2)}`);
        d3.select(this).attr('r', 6); // Increase point size
      })
      .on('mousemove', function (event) {
        tooltip.style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
        d3.select(this).attr('r', 4); // Reset point size
      });


    // Cleanup chart on unmount
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [dummyData1]);

  return <div ref={chartRef} className="chart"></div>;
};

export default PricesByTimeChart;
