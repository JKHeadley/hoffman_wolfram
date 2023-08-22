import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { simulateScenario, ConsciousAgent } from "./simulation";


const initialConditions = {
  agents: [
    new ConsciousAgent("gluon"),
    new ConsciousAgent("quark"),
    new ConsciousAgent("antiquark"),
  ],
};

const SimulationVisualization: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const svgRef = useRef(null); // Reference to the SVG element

  useEffect(() => {
    const simulationData = simulateScenario(initialConditions);
    setData(simulationData);
    console.log(JSON.stringify(simulationData));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const margin = { top: 50, right: 50, bottom: 50, left: 75 };

    // Set up scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.agentStates[0])!])
      .range([height - margin.bottom, margin.top]);

    // Format y-axis values
    const yAxisFormat = d3.format(".2e");

    // Create the line generator function
    const line = d3
      .line<any>()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.agentStates[0]));

    // Append the path to the SVG
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickFormat(yAxisFormat));

    // Add X Axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .style("text-anchor", "middle")
      .text("Time");

    // Add Y Axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .text("Perception Value");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Evolution of Agents' Perceptions Over Time");
  }, [data]);

  // useEffect(() => {
  //   const svg = d3.select(svgRef.current);
  //   const width = +svg.attr("width");
  //   const height = +svg.attr("height");

  //   console.log("width: " + width);
  //   console.log("height: " + height);

  //   // Define scales
  //   const xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]);
  //   const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

  //   // Draw lines for each agent
  //   data.forEach((agentData, index) => {
  //     svg
  //       .append("path")
  //       .datum(agentData)
  //       .attr("fill", "none")
  //       .attr("stroke", d3.schemeCategory10[index])
  //       .attr("stroke-width", 1.5)
  //       .attr(
  //         "d",
  //         d3
  //           .line<number>()
  //           .x((d, i) => xScale(i))
  //           .y((d) => yScale(d as number)) // Add type assertion here
  //       );
  //   });

  //   // Add X Axis label
  // //   svg
  // //     .append("text")
  // //     .attr("x", width / 2)
  // //     .attr("y", height + 40)
  // //     .style("text-anchor", "middle")
  // //     .text("Time");

  // //   // Add Y Axis label
  // //   svg
  // //     .append("text")
  // //     .attr("transform", "rotate(-90)")
  // //     .attr("y", -50)
  // //     .attr("x", 0 - height / 2)
  // //     .style("text-anchor", "middle")
  // //     .text("Perception Value");

  // //   // Add title
  // //   svg
  // //     .append("text")
  // //     .attr("x", width / 2)
  // //     .attr("y", -20)
  // //     .style("text-anchor", "middle")
  // //     .style("font-size", "16px")
  // //     .style("font-weight", "bold")
  // //     .text("Evolution of Agents' Perceptions Over Time");
  // }, [data]);

  // useEffect(() => {
  //   const svg = d3.select(svgRef.current);
  //   const width = +svg.attr('width');
  //   const height = +svg.attr('height');

  //   // Define scales
  //   const xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]);
  //   const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

  //   // Draw lines for each agent
  //   data.forEach((agentData, index) => {
  //     svg.append('path')
  //       .datum(agentData)
  //       .attr('fill', 'none')
  //       .attr('stroke', d3.schemeCategory10[index])
  //       .attr('stroke-width', 1.5)
  //       .attr('d', d3.line<number>()
  //         .x((d, i) => xScale(i))
  //         .y(d => yScale(d as number))
  //       );
  //   });

  //   // Add X Axis label
  //   svg.append('text')
  //     .attr('x', width / 2)
  //     .attr('y', height + 40)
  //     .style('text-anchor', 'middle')
  //     .text('Time');

  //   // Add Y Axis label
  //   svg.append('text')
  //     .attr('transform', 'rotate(-90)')
  //     .attr('y', -50)
  //     .attr('x', 0 - (height / 2))
  //     .style('text-anchor', 'middle')
  //     .text('Perception Value');

  //   // Add title
  //   svg.append('text')
  //     .attr('x', width / 2)
  //     .attr('y', -20)
  //     .style('text-anchor', 'middle')
  //     .style('font-size', '16px')
  //     .style('font-weight', 'bold')
  //     .text("Evolution of Agents' Perceptions Over Time");

  //   // We've removed the legend generation code here

  // }, [data]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-blue-500 p-8 bg-gray-100 rounded-lg shadow-md">
        <svg ref={svgRef} width="800" height="500"></svg>
      </div>
    </div>
  );
};

export default SimulationVisualization;
