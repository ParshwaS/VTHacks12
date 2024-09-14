import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type DataPoint = {
    date: Date;
    price: number;
};

interface LineChartProps {
    data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        const x = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d.date) as [Date, Date])
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([d3.min(data, (d) => d.price) as number, d3.max(data, (d) => d.price) as number])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const line = d3
            .line<DataPoint>()
            .x((d) => x(d.date))
            .y((d) => y(d.price));

        // Clear previous render
        svg.selectAll('*').remove();

        // Add the line
        svg
            .append('g')
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);

        // Add X axis
        svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        // Add Y axis
        svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));
    }, [data]);

    return <svg ref={svgRef} width={800} height={400} />;
};

export default LineChart;