"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Sample data
const data = [
  { areaCode: '10001', grocery: 80, pharmacy: 70, healthcare: 65, transportation: 90, park: 60 },
  { areaCode: '10002', grocery: 60, pharmacy: 55, healthcare: 60, transportation: 75, park: 50 },
  { areaCode: '10003', grocery: 70, pharmacy: 65, healthcare: 70, transportation: 80, park: 75 },
  { areaCode: '10004', grocery: 50, pharmacy: 45, healthcare: 50, transportation: 55, park: 40 },
  { areaCode: '10005', grocery: 90, pharmacy: 85, healthcare: 80, transportation: 95, park: 85 }
];

const Heatmap = ({ zipcode }: { zipcode: string | null }) => {
  const [data, setData] = useState<any[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 });
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const parent = svgRef.current.parentElement;
        if (parent) {
          const width = parent.clientWidth * 0.8;
          const height = parent.clientHeight * 0.6;
          setDimensions({ width, height });
        }
      }
    };

    // Initial dimensions
    updateDimensions();

    // Update dimensions on window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    console.log("Fetching data for zipcode:", zipcode);
    // Fetch data based on the selected zipcode
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URI! + `/api/qol/proximity?zip=${zipcode || '10001'}`);
      const result = await response.json();
      result.forEach((el: any) => {
        el.areaCode = el.year.toString();
        el.grocery = el.avgProximityToGroceries || 0;
        el.pharmacy = el.avgProximityToPharmacies || 0;
        el.healthcare = el.avgProximityToHealthcare || 0;
        el.transportation = el.avgProximityToTransportation || 0;
        el.park = el.avgProximityToParks || 0;
      });
      setData(result);
    };

    fetchData();
  }, [zipcode]);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 30, right: 105, bottom: 70, left: 95 };
    const { width, height } = dimensions;
    // const width = 600 - margin.left - margin.right;
    // const height = 500 - margin.top - margin.bottom;
    d3.select(svgRef.current).select("*").remove(); // Clear previous content

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const categories = ['grocery', 'pharmacy', 'healthcare', 'transportation', 'park'];
    const areaCodes = data.map(d => d.areaCode);

    const x = d3.scaleBand()
      .domain(areaCodes)
      .range([0, width - margin.left - margin.right])
      .padding(0.01);

    const y = d3.scaleBand()
      .domain(categories)
      .range([height - margin.top - margin.bottom, 0])
      .padding(0.02);

    const color = d3.scaleSequential(d3.interpolate("white", "darkgreen"))
      .domain([0, 100]);

    svg.selectAll('rect')
      .data(data.flatMap(d => categories.map(cat => ({
        areaCode: d.areaCode,
        category: cat,
        value: d[cat]
      }))))
      .enter().append('rect')
      .attr('x', d => x(d.areaCode)!)
      .attr('y', d => y(d.category)!)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => color(d.value));

    svg.append('g')
      .attr('class', 'x-axis')
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')  // Select all text elements (tick labels)
      .attr('transform', 'rotate(-45)')  // Rotate 45 degrees counter-clockwise
      .style('text-anchor', 'end');

    svg.append('g')
      .attr('class', 'y-axis')
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .call(d3.axisLeft(y));

    // Create a color legend
    const legendWidth = 20;
    const legendHeight = height - margin.top - margin.bottom;
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.left - margin.right + 20}, 0)`);

    const legendScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, legendHeight]);

    legend.selectAll('rect')
      .data(d3.range(0, 100, 1))
      .enter().append('rect')
      .attr('x', 0)
      .attr('y', d => legendHeight - legendScale(d))
      .attr('width', legendWidth)
      .attr('height', legendHeight / 100)
      .attr('fill', d => color(d));

    legend.append('text')
      .attr('x', 0)
      .attr('y', -10)
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .text('Percentage')
      .attr('text-anchor', 'middle');

    legend.append('text')
      .attr('x', 25)
      .attr('y', 15)
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .text('100')
      .attr('text-anchor', 'left');

    legend.append('text')
      .attr('x', 25)
      .attr('y', legendHeight)
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .text('0')
      .attr('text-anchor', 'left');

    legend.append('text')
      .attr('x', 25)
      .attr('y', legendHeight * .25 + 15)
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .text('75')
      .attr('text-anchor', 'left');

    legend.append('text')
      .attr('x', 25)
      .attr('y', legendHeight * .50 + 15)
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .text('50')
      .attr('text-anchor', 'left');

    legend.append('text')
      .attr('x', 25)
      .attr('y', legendHeight * .75 + 15)
      .style('font-size', '14px')  // Font size
      .style('font-family', 'Arial')  // Font family
      .text('25')
      .attr('text-anchor', 'left');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;
