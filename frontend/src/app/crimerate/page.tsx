"use client";

import { withAuthInfo } from '@propelauth/react';
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const CrimeRate = withAuthInfo(({ accessToken }) => {
  const data = [
    { type: "Nuisance violation", x: 10, y: 20 },
    { type: "Nuisance violation", x: 15, y: 25 },
    { type: "Property crime", x: 20, y: 30 },
    { type: "Property crime", x: 25, y: 35 },
    { type: "Violent crime", x: 30, y: 40 },
    { type: "Violent crime", x: 35, y: 45 },
  ];

  const width = 500;
  const height = 500;

  useEffect(() => {
    const svg = d3.select("#scatterplot")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const x = d3.scaleLinear().domain([0, 50]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, 50]).range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Color scale for different crime types
    const color = d3.scaleOrdinal()
      .domain(["Nuisance violation", "Property crime", "Violent crime"])
      .range(["red", "blue", "green"]);

    // Plot points
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 5)
      .style("fill", d => color(d.type));
  }, []);

  return (
    <>
      <div>Crime Rate Scatter Plot</div>
      <svg id="scatterplot"></svg>
    </>
  );
});

export default CrimeRate;
