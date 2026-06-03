// Timeline & D3 Line Chart
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".scrolly-container .step");
  const valEspatri = document.getElementById("val-espatri");
  const valRimpatri = document.getElementById("val-rimpatri");
  const valSaldo = document.getElementById("val-saldo");

  // 1. SAFELY INJECT OR SELECT THE CHART CONTAINER (Fixes the ghost layer bug)
  let chartDiv = document.getElementById("timeline-chart-container");

  if (!chartDiv) {
    // If you didn't add it to HTML, we create it safely
    chartDiv = document.createElement("div");
    chartDiv.id = "timeline-chart-container";
    const scrollyContainer = document.querySelector(".scrolly-container");
    const scrollyGrid = document.querySelector(".scrolly-grid");
    if (scrollyContainer && scrollyGrid) {
      scrollyContainer.insertBefore(chartDiv, scrollyGrid);
    }
  }

  // Wipe any existing ghost charts (fixes issues if you are using Live Server)
  chartDiv.innerHTML = "";

  // 2. CHART DATA & SETUP
  const chartData = [
    { year: 2006, expatriates: 46308, returnees: 37666, netMigration: -8642 },
    { year: 2007, expatriates: 36299, returnees: 36693, netMigration: 394 },
    { year: 2008, expatriates: 39536, returnees: 32118, netMigration: -7418 },
    { year: 2009, expatriates: 39024, returnees: 29330, netMigration: -9694 },
    { year: 2010, expatriates: 39545, returnees: 28192, netMigration: -11353 },
    { year: 2011, expatriates: 50057, returnees: 31466, netMigration: -18591 },
    { year: 2012, expatriates: 67998, returnees: 29467, netMigration: -38531 },
    { year: 2013, expatriates: 82095, returnees: 28433, netMigration: -53662 },
    { year: 2014, expatriates: 88859, returnees: 29271, netMigration: -59588 },
    { year: 2015, expatriates: 102259, returnees: 30052, netMigration: -72207 },
    { year: 2016, expatriates: 114512, returnees: 37894, netMigration: -76618 },
    { year: 2017, expatriates: 114559, returnees: 42369, netMigration: -72190 },
    { year: 2018, expatriates: 116732, returnees: 46824, netMigration: -69908 },
    { year: 2019, expatriates: 122020, returnees: 68207, netMigration: -53813 },
    { year: 2020, expatriates: 120950, returnees: 55760, netMigration: -65190 },
    { year: 2021, expatriates: 94219, returnees: 74759, netMigration: -19460 },
    { year: 2022, expatriates: 99510, returnees: 74490, netMigration: -25020 },
    { year: 2023, expatriates: 114057, returnees: 61286, netMigration: -52771 },
    {
      year: 2024,
      expatriates: 155732,
      returnees: 52508,
      netMigration: -103224,
    },
  ];

  const virtualWidth = 800;
  const virtualHeight = 350;
  const margin = { top: 40, right: 30, bottom: 30, left: 60 }; // Increased top margin slightly for legend
  const innerWidth = virtualWidth - margin.left - margin.right;
  const innerHeight = virtualHeight - margin.top - margin.bottom;

  const chartSvg = d3
    .select("#timeline-chart-container")
    .append("svg")
    .attr("viewBox", `0 0 ${virtualWidth} ${virtualHeight}`)
    .style("width", "100%")
    .style("height", "100%")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleLinear()
    .domain(d3.extent(chartData, (d) => d.year))
    .range([0, innerWidth]);
  const yMin = d3.min(chartData, (d) =>
    Math.min(d.expatriates, d.returnees, d.netMigration)
  );
  const yMax = d3.max(chartData, (d) =>
    Math.max(d.expatriates, d.returnees, d.netMigration)
  );
  const y = d3
    .scaleLinear()
    .domain([yMin - 10000, yMax + 10000])
    .range([innerHeight, 0]);

  // Highlight Box
  const highlightRect = chartSvg
    .append("rect")
    .attr("class", "chart-highlight")
    .attr("y", 0)
    .attr("height", innerHeight)
    .attr("x", 0)
    .attr("width", 0);

  // Axes & Baseline
  chartSvg
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(10))
    .attr("font-size", "12px")
    .attr("color", "var(--blue)");
  chartSvg
    .append("g")
    .call(d3.axisLeft(y).ticks(6))
    .attr("font-size", "12px")
    .attr("color", "var(--blue)");
  chartSvg
    .append("line")
    .attr("class", "chart-zero-baseline")
    .attr("x1", 0)
    .attr("x2", innerWidth)
    .attr("y1", y(0))
    .attr("y2", y(0));

  // Vertical Dashed Lines for Each Year
  chartSvg
    .selectAll(".year-line")
    .data(chartData)
    .enter()
    .append("line")
    .attr("class", "year-line")
    .attr("x1", (d) => x(d.year))
    .attr("x2", (d) => x(d.year))
    .attr("y1", innerHeight)
    .attr("y2", 0)
    .attr("stroke", "var(--blue)")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4")
    .style("opacity", 0.15);

  // Draw Lines (Hardcoding fill and stroke widths to override any rogue CSS)
  const metrics = [
    { id: "expatriates", color: "var(--brown)" },
    { id: "returnees", color: "var(--lightblue)" },
    { id: "netMigration", color: "var(--blue)" },
  ];

  metrics.forEach((metric) => {
    chartSvg
      .append("path")
      .datum(chartData)
      .attr("class", "chart-line")
      .attr(
        "fill",
        "none"
      ) /* FORCED FILL OFF so it doesn't blob out the screen */
      .attr("stroke-width", 2.5) /* FORCED STROKE WIDTH */
      .attr("stroke", metric.color)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.year))
          .y((d) => y(d[metric.id]))
      );
  });

  // Legend
  const legendLabels = {
    expatriates: "Expatriates",
    returnees: "Returnees",
    netMigration: "Net Migration",
  };

  const legend = chartSvg
    .append("g")
    .attr("class", "chart-legend")
    .attr("transform", `translate(20, -25)`); // Positioned above the chart lines safely

  const legendItems = legend
    .selectAll(".legend-item")
    .data(metrics)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(${i * 130}, 0)`);

  legendItems
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", (d) => d.color);

  legendItems
    .append("text")
    .attr("x", 20)
    .attr("y", 11)
    .text((d) => legendLabels[d.id])
    .attr("font-size", "12px")
    .attr("fill", "var(--blue)")
    .style("font-family", "body");

  // tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "chart-tooltip");

  chartSvg
    .append("rect")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mousemove", function (event) {
      // Find the year based on X position
      const mouseX = d3.pointer(event)[0];
      const x0 = x.invert(mouseX);
      const bisect = d3.bisector((d) => d.year).left;
      const i = bisect(chartData, x0, 1);
      const d0 = chartData[i - 1];
      const d1 = chartData[i];
      const d = x0 - d0.year > d1.year - x0 ? d1 : d0;

      // Update tooltip content
      tooltip.style("opacity", 1);
      tooltip
        .html(
          `
        <strong style="display:block; margin-bottom: 4px;">Year: ${
          d.year
        }</strong>
        <div class="tooltip-row"><span>Expatriates:</span> <b>${d.expatriates.toLocaleString()}</b></div>
        <div class="tooltip-row"><span>Returnees:</span> <b>${d.returnees.toLocaleString()}</b></div>
        <div class="tooltip-row"><span>Net Migration:</span> <b>${d.netMigration.toLocaleString()}</b></div>
      `
        )
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
    });

  // 3. INTERSECTION OBSERVER LOGIC (Data Only, No Opacity classes)
  const highlightPeriods = [
    { start: 2006, end: 2010 }, // First phase
    { start: 2011, end: 2014 }, // Second phase
    { start: 2015, end: 2019 }, // Third phase
    { start: 2020, end: 2023 }, // Fourth phase
    { start: 2024, end: 2024 }, // Now
  ];

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -40% 0px",
    threshold: 0,
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. Update sidebar numbers
        const data = entry.target.dataset;
        if (valEspatri && data.espatri) valEspatri.textContent = data.espatri;
        if (valRimpatri && data.rimpatri)
          valRimpatri.textContent = data.rimpatri;
        if (valSaldo && data.saldo) valSaldo.textContent = data.saldo;

        // 2. Move the D3 highlight
        const index = Array.from(steps).indexOf(entry.target);
        const period = highlightPeriods[index];
        if (period) {
          const startX =
            period.start === period.end
              ? x(period.start - 0.2)
              : x(period.start);
          const endX =
            period.start === period.end ? x(period.end + 0.2) : x(period.end);

          highlightRect
            .transition()
            .duration(500)
            .attr("x", startX)
            .attr("width", endX - startX)
            .style("opacity", 0.4);
        }
      }
    });
  }, observerOptions);

  steps.forEach((step) => timelineObserver.observe(step));
});

// 3. INTERSECTION OBSERVER LOGIC
const highlightPeriods = [
  { start: 2006, end: 2010 }, // First phase
  { start: 2011, end: 2014 }, // Second phase
  { start: 2015, end: 2019 }, // Third phase
  { start: 2020, end: 2023 }, // Fourth phase
  { start: 2024, end: 2024 }, // Now
];

const observerOptions = {
  root: null,
  rootMargin: "-50% 0px -30% 0px", // Trigger zone directly over the line chart
  threshold: 0,
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      steps.forEach((s) => s.classList.remove("is-active"));
      entry.target.classList.add("is-active");

      const data = entry.target.dataset;
      if (valEspatri && data.espatri) valEspatri.textContent = data.espatri;
      if (valRimpatri && data.rimpatri) valRimpatri.textContent = data.rimpatri;
      if (valSaldo && data.saldo) valSaldo.textContent = data.saldo;

      const index = Array.from(steps).indexOf(entry.target);
      const period = highlightPeriods[index];
      if (period) {
        const startX =
          period.start === period.end ? x(period.start - 0.2) : x(period.start);
        const endX =
          period.start === period.end ? x(period.end + 0.2) : x(period.end);

        highlightRect
          .transition()
          .duration(500)
          .attr("x", startX)
          .attr("width", endX - startX)
          .style("opacity", 0.4);
      }
    } else {
      entry.target.classList.remove("is-active");
    }
  });
}, observerOptions);

steps.forEach((step) => timelineObserver.observe(step));
