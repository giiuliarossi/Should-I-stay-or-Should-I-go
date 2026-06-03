const rawData = [
  {
    country: "IT",
    milestones: {
      "Bachelor's degree": 24.5,
      "Leaving home": 30.1,
      "Buying a house": 43,
      "First marriage": 33.0,
      "First child": 31.9,
      Retirement: 67,
    },
  },
  {
    country: "GER",
    milestones: {
      "Bachelor's degree": 26.2,
      "Leaving home": 23.9,
      "Buying a house": 34,
      "First marriage": 31.2,
      "First child": 29.9,
      Retirement: 66,
    },
  },
  {
    country: "SP",
    milestones: {
      "Bachelor's degree": 23.7,
      "Leaving home": 30.0,
      "Buying a house": 41,
      "First marriage": 34.7,
      "First child": 31.5,
      Retirement: 66,
    },
  },
  {
    country: "UK",
    milestones: {
      "Bachelor's degree": 23.0,
      "Leaving home": 24.0,
      "Buying a house": 34,
      "First marriage": 33.0,
      "First child": 29.5,
      Retirement: 66,
    },
  },
  {
    country: "CH",
    milestones: {
      "Bachelor's degree": 27.0,
      "Leaving home": 23.7,
      "Buying a house": 48,
      "First marriage": 30.9,
      "First child": 31.3,
      Retirement: 65,
    },
  },
  {
    country: "FR",
    milestones: {
      "Bachelor's degree": 23.5,
      "Leaving home": 23.5,
      "Buying a house": 31,
      "First marriage": 33.8,
      "First child": 29.3,
      Retirement: 64,
    },
  },
];

const goalImages = {
  "Bachelor's degree": "/3-goals/corona.png",
  "Leaving home": "/3-goals/casa.png",
  "Buying a house": "/3-goals/chiavi.png",
  "First marriage": "/3-goals/euro.png",
  "First child": "/3-goals/bimbo.png",
  Retirement: "/3-goals/sedia.png",
};

const goals = Object.keys(rawData[0].milestones);

// palette
const colorPalette = [
  "#FFC300", // yellow
  "#035AA6", // blue
  "#60B5FF", // light blue
  "#8C5C32", // brown
  "#9966FF", // purple
  "#4A235A", // dark purple
];
const colors = d3.scaleOrdinal(colorPalette).domain(goals);

// Chart dimensions - adjusted margins to fit country labels at the bottom
const margin = { top: 20, right: 40, bottom: 40, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// --- FLIPPED SCALES ---
// Countries on the X-axis
const xScale = d3
  .scaleBand()
  .domain(rawData.map((d) => d.country))
  .range([0, width])
  .padding(0.5);

// Years on the Y-axis (Standard orientation: lowest age at bottom, highest at top)
// Stretching out 20-35 to take up 65% of the chart height
const yScale = d3
  .scaleLinear()
  .domain([20, 35, 70])
  .range([height, height * 0.35, 0]);

// Build Buttons
const activeGoals = new Set();

const controls = d3.select("#controls");
goals.forEach((goal) => {
  controls
    .append("button")
    .attr("class", "filter-btn")
    .style("border", `2px solid ${colors(goal)}`)
    .style("background-color", "var(--white)")
    .text(goal)
    .on("click", function () {
      const btn = d3.select(this);
      if (activeGoals.has(goal)) {
        activeGoals.delete(goal);
        btn.classed("active", false);
        btn.style("background-color", "var(--white)");
      } else {
        activeGoals.add(goal);
        btn.classed("active", true);
        btn.style("background-color", colors(goal));
      }
      updateChart();
    });
});

// Build SVG with viewBox for responsiveness
const svg = d3
  .select("#chart-container")
  .append("svg")
  .attr(
    "viewBox",
    `0 0 ${width + margin.left + margin.right} ${
      height + margin.top + margin.bottom
    }`
  )
  .style("width", "100%")
  .style("height", "auto")
  .style("overflow", "visible")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// --- LEFT AXIS (YEARS) ---
const customTicks = [20, 25, 30, 35, 40, 50, 60, 70];
const yAxis = d3
  .axisLeft(yScale)
  .tickValues(customTicks)
  .tickFormat(d3.format("d"));

const yAxisGroup = svg.append("g").attr("class", "axis-line").call(yAxis);

// Style the axis text to match your fonts
yAxisGroup
  .selectAll("text")
  .attr("font-family", "body")
  .attr("font-size", "14px")
  .attr("fill", "var(--blue)");

// VERTICAL lines
const timelineGroup = svg.append("g").attr("class", "timeline-group");

timelineGroup
  .selectAll(".track-line")
  .data(rawData)
  .enter()
  .append("line")
  .attr("class", "track-line")
  .attr("x1", (d) => xScale(d.country) + xScale.bandwidth() / 2)
  .attr("x2", (d) => xScale(d.country) + xScale.bandwidth() / 2)
  .attr("y1", yScale(20))
  .attr("y2", yScale(70));

//  HORIZONTAL lines
timelineGroup
  .selectAll(".track-line-horizontal")
  .data(customTicks)
  .enter()
  .append("line")
  .attr("class", "track-line")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", (d) => yScale(d))
  .attr("y2", (d) => yScale(d));

// labels
svg
  .selectAll(".country-group")
  .data(rawData)
  .enter()
  .append("g")
  .each(function (d) {
    const g = d3.select(this);
    const xPos = xScale(d.country) + xScale.bandwidth() / 2;

    g.append("text")
      .attr("x", xPos)
      .attr("y", height + 25) // Positioned slightly below the chart area
      .attr("text-anchor", "middle")
      .attr("font-family", "body")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "var(--blue)")
      .style("cursor", "pointer")
      .text(d.country)
      .on("mouseover", function (event, hoveredData) {
        svg
          .selectAll(".data-point")
          .transition()
          .duration(200)
          .style("opacity", function (dotData) {
            return dotData.country === hoveredData.country ? 1 : 0.2;
          });

        let summaryHTML = `<strong style="font-size: 1rem;">${hoveredData.country}</strong><br>`;

        for (const [milestone, age] of Object.entries(hoveredData.milestones)) {
          if (activeGoals.has(milestone)) {
            summaryHTML += `${milestone}: <strong>${age}</strong><br>`;
          }
        }

        if (activeGoals.size === 0) {
          summaryHTML += `<em>Nothing selected</em>`;
        }

        tooltip.html(summaryHTML).style("opacity", 1);

        const tooltipWidth = tooltip.node().offsetWidth;

        tooltip
          .style("left", event.pageX - tooltipWidth - 15 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", function () {
        svg
          .selectAll(".data-point")
          .transition()
          .duration(200)
          .style("opacity", 1);

        tooltip.style("opacity", 0);
      });
  });

const tooltip = d3.select("#tooltip");
// --- UPDATE CHART ---
function updateChart() {
  let flattenedData = [];
  rawData.forEach((d) => {
    goals.forEach((goal) => {
      if (activeGoals.has(goal) && d.milestones[goal]) {
        flattenedData.push({
          country: d.country,
          goal: goal,
          age: d.milestones[goal],
        });
      }
    });
  });

  const dots = svg
    .selectAll(".data-point")
    .data(flattenedData, (d) => d.country + ":" + d.goal);

  dots.exit().remove();

  const dotsEnter = dots.enter().append("g").attr("class", "data-point");

  // Only append circles, drop-lines have been removed
  dotsEnter
    .append("circle")
    .attr("cx", (d) => xScale(d.country) + xScale.bandwidth() / 2)
    .attr("cy", (d) => yScale(d.age))
    .attr("r", 7)
    .style("fill", (d) => colors(d.goal))
    .on("mouseover", (event, d) => {
      tooltip
        .style("opacity", 1)
        .html(`<strong>${d.goal}</strong><br>${d.country}: ${d.age} years`)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 20 + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  // Only transition circles
  dots
    .select("circle")
    .transition()
    .duration(300)
    .attr("cx", (d) => xScale(d.country) + xScale.bandwidth() / 2)
    .attr("cy", (d) => yScale(d.age));
}

updateChart();
