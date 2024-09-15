"use client";

import { withAuthInfo, WithAuthInfoProps } from '@propelauth/react';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import qolService from '@/components/customs/services/qol.service';

interface CrimeData {
  year: number;
  avgViolentCrime: number;
  avgPropertyCrime: number;
  avgNuisanceViolation: number;
}

const CrimeRate = ({ zipcode }: { zipcode: string | null }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dummyData_, setDummyData_] = useState<CrimeData[]>([]); // State to hold fetched data

  const width = 400;
  const height = 250;
  const margin = { top: 80, right: 50, bottom: 40, left: 50 }; // Increased top margin for legend

  useEffect(() => {
    // Fetching data from the service
    qolService.getQol(zipcode).then((data: CrimeData[]) => {
      setDummyData_(data); // Set the fetched data to state
      console.log("Fetched Data:", data); // Log the data for debugging
    });
  }, [zipcode]);

  useEffect(() => {
    if (!dummyData_ || dummyData_.length === 0) return; // Don't render if no data

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain(d3.extent(dummyData_, d => d.year) as [number, number]) // Ensure type is [number, number]
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dummyData_, d => Math.max(d.avgViolentCrime, d.avgPropertyCrime, d.avgNuisanceViolation)) as number])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    svg.append('g')
      .call(d3.axisLeft(yScale));

    const createDots = (crimeType: keyof CrimeData, color: string) => {
      svg.selectAll(`.dot-${crimeType}`)
        .data(dummyData_)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d[crimeType]))
        .attr('r', 5)
        .style('fill', color)
        .attr('class', `dot-${crimeType}`);
    };

    createDots('avgViolentCrime', 'red');
    createDots('avgPropertyCrime', 'blue');
    createDots('avgNuisanceViolation', 'green');

    // Create legend above the graph
    const legend = svg.append('g')
      .attr('transform', `translate(0, -40)`); // Position legend above the graph

    const legendsData = [
      { label: 'Violent Crime', color: 'red' },
      { label: 'Property Crime', color: 'blue' },
      { label: 'Nuisance Violation', color: 'green' }
    ];

    const legendSpacing = 150; // Increase this value to add more space between legend items

    legendsData.forEach((legendItem, i) => {
      legend.append('rect')
        .attr('x', i * legendSpacing) // Use legendSpacing to adjust spacing
        .attr('y', 0)
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', legendItem.color);

      legend.append('text')
        .attr('x', i * legendSpacing + 15) // Adjust text position to match the spacing
        .attr('y', 10)
        .text(legendItem.label)
        .style('alignment-baseline', 'middle');
    });

    svg.append('text')
      .attr('class', 'x-axis-title')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .text('Year');

    svg.append('text')
      .attr('class', 'y-axis-title')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Crime Rate per 100 Housings");

    return () => {
      d3.select(svgRef.current).selectAll('*').remove();  // Clean up on re-render
    };
  }, [dummyData_]); // Re-run effect when data changes

  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
};

export default CrimeRate;
