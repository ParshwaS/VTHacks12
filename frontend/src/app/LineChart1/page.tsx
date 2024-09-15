"use client";
import { withAuthInfo } from '@propelauth/react';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import LineChart1Service from '@/components/customs/services/LineChart1.service';

interface DataPoint {
  quarter: string;
  "1-bedroom": number;
  "2-bedroom": number;
  "3-bedroom": number;
  "4-bedroom": number;
}

const formatClassName = (name: string) => {
  return name.replace(/\s+/g, '-').replace(/^\d/, 'b$&'); // Replace spaces with hyphens and add 'b' prefix if it starts with a digit
};

const LineChart1 = ({ zipcode }: { zipcode: string | null }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);

  const [GDdata, setGDdata] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Fetching data from the service and setting it to GDdata
    LineChart1Service.getLinePts(zipcode).then((dummyData_) => {
      const mappedData = dummyData_.map((d: any) => ({
        quarter: d.quarter, // Keep the quarter string
        "1-bedroom": d.rentals["1_bedroom"].average_rent,
        "2-bedroom": d.rentals["2_bedroom"].average_rent,
        "3-bedroom": d.rentals["3_bedroom"].average_rent,
        "4-bedroom": d.rentals["4_bedroom"].average_rent
      }));
      console.log(mappedData);
      setGDdata(mappedData);
    });
  }, [zipcode]);

  useEffect(() => {
    if (!svgRef.current || GDdata.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 65, left: 70 };
    const width = 850 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Set up the SVG container
    d3.select(svgRef.current).select("*").remove();
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales
    const x = d3.scaleBand()
      .domain(GDdata.map(d => d.quarter))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 1.2 * (d3.max(GDdata, d => Math.max(
        d["1-bedroom"], d["2-bedroom"], d["3-bedroom"], d["4-bedroom"]
      )) || 0)])
      .range([height, 0]);

    // Append X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")  // Select all the text for the X-axis labels
      .style("text-anchor", "end")  // Align the text towards the end (right side)
      .attr("dx", "-0.8em")  // Adjust position slightly horizontally
      .attr("dy", "0.15em")  // Adjust position slightly vertically
      .attr("transform", "rotate(-45)");

    // Append Y axis
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
      .text("Avg. Rental Price");

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Append lines for each bedroom type with properly formatted class names
    Object.keys(GDdata[0]).filter(key => key !== 'quarter').forEach((key, i) => {
      const formattedKey = formatClassName(key); // Format the class name
      svg.append('path')
        .data([GDdata])
        .attr('class', `line ${formattedKey}`) // Unique and valid class for each line
        .attr('d', d3.line<DataPoint>()
          .x(d => x(d.quarter) as number + x.bandwidth() / 2)
          .y(d => y(d[key] as number)))
        .style('fill', 'none')
        .style('stroke', color(`${i}`))
        .style('stroke-width', '2px');
    });

    // Append legend
    const legend = svg.selectAll(".legend")
      .data(Object.keys(GDdata[0]).filter(key => key !== 'quarter'))
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0,${i * 25})`)
      .on("mouseover", function (event, d) {
        const formattedKey = formatClassName(d);
        // Highlight only the hovered line
        setHoveredLegend(d as string);

        // Reduce opacity of non-hovered lines
        svg.selectAll('.line')
          .style('opacity', 0.1);

        // Highlight the hovered line using the formatted class name
        svg.select(`.line.${formattedKey}`)
          .style('opacity', 1)
          .style('stroke-width', '4px'); // Thicken the hovered line
      })
      .on("mouseout", function (event, d) {
        // Reset all lines to normal opacity and stroke width
        svg.selectAll('.line')
          .style('opacity', 1)
          .style('stroke-width', '2px');
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
  }, [GDdata, hoveredLegend]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart1;
