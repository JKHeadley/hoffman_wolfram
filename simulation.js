// Sample data (replace with your simulation results)
const data = [
    { x: 0.1, y: 0.5, type: 'quark' },
    { x: 0.2, y: 0.6, type: 'gluon' },
    // ... add more data points
];

// Set up the SVG canvas dimensions
const width = 800;
const height = 600;
const margin = { top: 20, right: 20, bottom: 50, left: 50 };

const svg = d3.select("#momentum-fractions")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Set up scales
const xScale = d3.scaleLinear().domain([0, 1]).range([margin.left, width - margin.right]);
const yScale = d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, margin.top]);

// Create circles for each data point
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5)
    .attr("fill", d => d.type === 'quark' ? 'blue' : 'red');

// Add axes
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));

// Add labels (optional)
svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - margin.bottom + 40)
    .attr("text-anchor", "middle")
    .text("Bjorken x");

svg.append("text")
    .attr("x", margin.left - 40)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90," + (margin.left - 40) + "," + (height / 2) + ")")
    .text("Momentum Fraction");
