document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup D3 SVG using the exact dimensions and viewBox logic from 1-line.js
  const virtualWidth = 800;
  const virtualHeight = 350;
  const margin = { top: 40, right: 30, bottom: 40, left: 50 };
  const innerWidth = virtualWidth - margin.left - margin.right;
  const innerHeight = virtualHeight - margin.top - margin.bottom;

  const chartDiv = document.getElementById("adaptation-chart");
  chartDiv.innerHTML = ""; // Clear any ghost instances

  const svg = d3
    .select("#adaptation-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${virtualWidth} ${virtualHeight}`)
    .style("width", "100%")
    .style("height", "100%")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 2. Data from your mood chart
  const data = [
    { month: 0, mood: 6 },
    { month: 3, mood: 9 }, // Peak: Euphoria
    { month: 6, mood: 1 }, // Trough: Crisis
    { month: 18, mood: 2 }, // Rising: Adaptation
    { month: 24, mood: 5 }, // Stable: Integration
  ];

  // Define start and end months for the highlight box
  const phases = {
    1: { start: 0, end: 3 },
    2: { start: 3, end: 6 },
    3: { start: 6, end: 18 },
    4: { start: 18, end: 24 },
  };

  // 3. Scales X e Y
  const x = d3.scaleLinear().domain([0, 24]).range([0, innerWidth]);
  const y = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);

  // 4. Sliding Highlight Box
  const highlightRect = svg
    .append("rect")
    .attr("class", "chart-highlight")
    .attr("fill", "var(--lightblue)")
    .attr("y", 0)
    .attr("height", innerHeight)
    .attr("x", 0)
    .attr("width", 0)
    .style("opacity", 0);

  // 5. Vertical Dashed Grid Lines
  svg
    .selectAll(".grid-line")
    .data(d3.range(0, 25))
    .enter()
    .append("line")
    .attr("class", "grid-line")
    .attr("x1", (d) => x(d))
    .attr("y1", 0)
    .attr("x2", (d) => x(d))
    .attr("y2", innerHeight)
    .attr("stroke", "var(--blue)")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4")
    .style("opacity", 0.15);

  // 6. X Axis
  const xAxis = d3
    .axisBottom(x)
    .tickValues([0, 12, 24])
    .tickFormat((d) => (d === 0 ? "0 months" : d));

  svg
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxis)
    .call((g) => g.selectAll(".tick line").remove())
    .attr("font-size", "12px")
    .style("font-family", "body")
    .attr("color", "var(--blue)")
    .call((g) =>
      g
        .select(".domain")
        .style("stroke", "var(--blue)")
        .style("stroke-width", "1.5")
    );

  // 7. Y Axis Label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -35)
    .attr("x", -innerHeight / 2)
    .attr("text-anchor", "middle")
    .style("font-family", "body")
    .style("font-size", "14px")
    .style("fill", "var(--blue)")
    .text("mood");

  // 8. Main Line Path
  const line = d3
    .line()
    .x((d) => x(d.month))
    .y((d) => y(d.mood));

  svg
    .append("path")
    .datum(data)
    .attr("class", "chart-line")
    .attr("fill", "none")
    .attr("stroke", "var(--blue)")
    .attr("stroke-width", 2.5)
    .attr("d", line);

  // 9. THE CIRCLE (Tracking Dot)
  const dot = svg
    .append("circle")
    .attr("r", 7)
    .attr("fill", "var(--blue)")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("opacity", 0)
    .style("pointer-events", "none"); // Ensures it doesn't block the tooltip hover

  svg
    .append("rect")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mousemove", function (event) {
      const mouseX = d3.pointer(event)[0];
      const x0 = x.invert(mouseX);
      const bisect = d3.bisector((d) => d.month).left;
      const i = bisect(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      let d = d0;

      if (d0 && d1) {
        d = x0 - d0.month > d1.month - x0 ? d1 : d0;
      } else if (d1) {
        d = d1;
      }

      tooltip.style("opacity", 1);
      tooltip
        .html(
          `
          <strong style="display:block; margin-bottom: 4px;">Timeline: Month ${d.month}</strong>
          <div class="tooltip-row"><span>Mood Level:</span> <b>${d.mood} / 10</b></div>
        `
        )
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
    });

  // 11. Scrollytelling Logic (Intersection Observer)
  // 11. Scrollytelling Logic (Intersection Observer)
  const steps = document.querySelectorAll(".curve-step-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((s) => s.classList.remove("is-active"));
          entry.target.classList.add("is-active");

          const stepId = entry.target.dataset.step;
          const period = phases[stepId];

          if (period) {
            // Move the highlight rectangle
            highlightRect
              .transition()
              .duration(500)
              .attr("x", x(period.start))
              .attr("width", x(period.end) - x(period.start))
              .style("opacity", 0.4);

            // Find the correct data point to snap the circle to
            const targetNode = data.find((d) => d.month === period.end);

            if (targetNode) {
              dot
                .transition()
                .duration(800)
                .attr("opacity", 1)
                .attr("cx", x(targetNode.month))
                .attr("cy", y(targetNode.mood));
            }
          }
        }
      });
    },
    {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0,
    }
  );

  steps.forEach((step) => observer.observe(step));
});
