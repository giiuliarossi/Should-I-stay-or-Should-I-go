// d3
// map
const width = 1000;
const height = 600;

const svg = d3
  .select("#map-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("max-width", "100%")
  .style("height", "auto");

const mainGroup = svg.append("g");

const worldGroup = mainGroup.append("g").attr("id", "world-group");
const regionsGroup = mainGroup
  .append("g")
  .attr("id", "regions-group")
  .style("opacity", 0)
  .style("pointer-events", "none");

// NEW GROUP
const flowGroup = mainGroup
  .append("g")
  .attr("id", "flow-group")
  .style("pointer-events", "none"); // mouse pass through

let isZoomedToItaly = false;
let activeHoverId = null;

const projection = d3
  .geoNaturalEarth1()
  .scale(180)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const worldGeojsonUrl =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const italyRegionsGeojsonUrl =
  "https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson";
// data
const csvUrl = "1-dataMAp.csv";

// italian names in english
const countryNameMap = {
  Germania: "Germany",
  Spagna: "Spain",
  "Regno Unito": "United Kingdom",
  Svizzera: "Switzerland",
  Francia: "France",
  Brasile: "Brazil",
  "Stati Uniti d'America": "USA",
  Argentina: "Argentina",
  "Paesi Bassi": "Netherlands",
  Belgio: "Belgium",
  Australia: "Australia",
  Austria: "Austria",
  Irlanda: "Ireland",
  Danimarca: "Denmark",
  Portogallo: "Portugal",
  Canada: "Canada",
  Malta: "Malta",
  "Emirati Arabi Uniti": "United Arab Emirates",
  Lussemburgo: "Luxembourg",
  Svezia: "Sweden",
};

const regionData = [
  { name: "Lombardia", expats: 22001 },
  { name: "Veneto", expats: 11455 },
  { name: "Sicilia", expats: 9387 },
  { name: "Emilia-Romagna", expats: 8653 },
  { name: "Campania", expats: 7640 },
  { name: "Piemonte", expats: 7534 },
  { name: "Lazio", expats: 7215 },
  { name: "Toscana", expats: 5760 },
  { name: "Puglia", expats: 5485 },
  { name: "Calabria", expats: 4417 },
  { name: "Trentino-Alto Adige", expats: 3327 },
  { name: "Friuli-Venezia Giulia", expats: 3090 },
  { name: "Marche", expats: 2502 },
  { name: "Abruzzo", expats: 2457 },
  { name: "Sardegna", expats: 2128 },
  { name: "Liguria", expats: 2057 },
  { name: "Umbria", expats: 1099 },
  { name: "Basilicata", expats: 830 },
  { name: "Molise", expats: 673 },
  { name: "Valle d'Aosta", expats: 224 },
].map((d) => {
  d.safeId = "id-" + d.name.replace(/[^a-zA-Z0-9]/g, "-");
  return d;
});

let globalRankedFeatures = [];

// sidebar
function renderSidebar(data, type) {
  const sidebarList = d3.select("#map-ranking-list");

  sidebarList.selectAll("li").remove();

  sidebarList
    .selectAll("li")
    .data(data)
    .enter()
    .append("li")
    .attr("id", (d) => "list-" + d.safeId)
    .html((d) => {
      const displayName = d.properties ? d.properties.name : d.name;
      const displayExpats = d.properties ? d.properties.expats : d.expats;
      return `<span>${displayName}</span> <b>${displayExpats.toLocaleString(
        "it-IT"
      )}</b>`;
    })
    .on("mouseover", function (event, d) {
      d3.select(this).classed("highlighted", true);
      const mapPrefix = type === "world" ? "#map-" : "#region-";
      d3.select(mapPrefix + d.safeId).classed("highlighted", true);

      if (type === "world") drawFlowLine(d);
    })
    .on("mouseout", function (event, d) {
      d3.select(this).classed("highlighted", false);
      const mapPrefix = type === "world" ? "#map-" : "#region-";
      d3.select(mapPrefix + d.safeId).classed("highlighted", false);
    });
}

Promise.all([
  d3.json(worldGeojsonUrl),
  d3.dsv(";", csvUrl),
  d3.json(italyRegionsGeojsonUrl),
])
  .then(function ([geoData, csvData, regionsGeoData]) {
    const totaleData = csvData.filter((d) => d.Sesso === "Totale");
    const expatsByCountry = {};
    totaleData.forEach((d) => {
      const mappedName = countryNameMap[d.Paese] || d.Paese;
      expatsByCountry[mappedName] = +d["Trasferiti dall'Italia (espatri) (p)"];
    });

    let features = geoData.features.filter((d) => d.properties.name);
    features.forEach((d) => {
      d.properties.expats = expatsByCountry[d.properties.name] || 0;
      d.safeId = "id-" + d.properties.name.replace(/[^a-zA-Z0-9]/g, "-");
    });

    globalRankedFeatures = features
      .filter((d) => d.properties.expats > 0)
      .sort((a, b) => b.properties.expats - a.properties.expats);

    //
    //
    //
    // animation stuff
    function drawFlowLine(targetDatum) {
      if (
        isZoomedToItaly ||
        !targetDatum ||
        targetDatum.properties.name === "Italy"
      )
        return;

      const italyDatum = features.find((d) => d.properties.name === "Italy");
      if (!italyDatum) return;

      // centroids
      const start = path.centroid(italyDatum);
      const end = path.centroid(targetDatum);

      // arc
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;

      //path
      const flowPath = flowGroup
        .append("path")
        .attr("class", "flow-line")
        .attr(
          "d",
          `M${start[0]},${start[1]} A${dr},${dr} 0 0,1 ${end[0]},${end[1]}`
        )
        .style("fill", "none")
        .style("stroke", "var(--lightblue)") // color
        .style("stroke-width", 2)
        .style("stroke-linecap", "round");

      const totalLength = flowPath.node().getTotalLength();

      flowPath
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(800)
        .ease(d3.easeCubicInOut)
        .attr("stroke-dashoffset", 0);
    }

    function removeFlowLine() {
      flowGroup.selectAll(".flow-line").remove();
    }
    // function drawFlowLine(targetDatum) {
    //   removeFlowLine();

    //   if (
    //     isZoomedToItaly ||
    //     !targetDatum ||
    //     targetDatum.properties.name === "Italy"
    //   )
    //     return;

    //   const italyDatum = features.find((d) => d.properties.name === "Italy");
    //   if (!italyDatum) return;

    //   const start = path.centroid(italyDatum);
    //   const end = path.centroid(targetDatum);

    //   const dx = end[0] - start[0];
    //   const dy = end[1] - start[1];
    //   const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;

    //   //  invisible guide path
    //   const flowPath = flowGroup
    //     .append("path")
    //     .attr("class", "flow-guide")
    //     .attr(
    //       "d",
    //       `M${start[0]},${start[1]} A${dr},${dr} 0 0,1 ${end[0]},${end[1]}`
    //     )
    //     .style("fill", "none")
    //     .style("stroke", "none");

    //   const pathNode = flowPath.node();
    //   const totalLength = pathNode.getTotalLength();

    //   // position along the curve
    //   function translateAlong(pathEl) {
    //     return function () {
    //       return function (t) {
    //         const p = pathEl.getPointAtLength(t * totalLength);
    //         return `translate(${p.x},${p.y})`;
    //       };
    //     };
    //   }

    //   // single particles
    //   function spawnParticle() {
    //     if (!flowGroup.select(".flow-guide").node()) return;

    //     flowGroup
    //       .append("circle")
    //       .attr("class", "swarm-particle")
    //       .attr("r", 2.5) // Size of the particle
    //       .style("fill", "var(--lightblue)")
    //       .style("opacity", 0.8)
    //       .attr("transform", `translate(${start[0]},${start[1]})`)
    //       .transition()
    //       .duration(2200) // Randomize speed (900ms to 1300ms)
    //       .ease(d3.easeQuadInOut)
    //       .attrTween("transform", translateAlong(pathNode))
    //       .on("end", function () {
    //         d3.select(this).remove(); // Delete particle when it reaches destination
    //         spawnParticle(); // Spawn a new one to keep the loop going
    //       });
    //   }

    //   for (let i = 0; i < 10; i++) {
    //     setTimeout(spawnParticle, i * 200);
    //   }
    // }

    renderSidebar(globalRankedFeatures, "world");

    let regionFeatures = regionsGeoData.features;
    regionFeatures.forEach((d) => {
      const match = regionData.find((r) =>
        Object.values(d.properties)
          .join(" ")
          .toLowerCase()
          .includes(r.name.toLowerCase())
      );

      if (match) {
        d.properties.name = match.name;
        d.properties.expats = match.expats;
        d.safeId = match.safeId;
      } else {
        d.properties.expats = 0;
        d.safeId = "id-unknown-" + Math.random();
      }
    });

    const opacityScale = d3
      .scaleThreshold()
      .domain([1, 101, 1001, 5001, 10001])
      .range([0.1, 0.3, 0.5, 0.7, 0.85, 1.0]);

    worldGroup
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "country")
      .attr("id", (d) => "map-" + d.safeId)
      .style("opacity", (d) => opacityScale(d.properties.expats))
      .on("mouseover", function (event, d) {
        if (d.properties.expats > 0) {
          d3.select(this).classed("highlighted", true);
          const listItem = d3.select("#list-" + d.safeId);
          if (!listItem.empty()) {
            listItem.classed("highlighted", true);
            if (listItem.node())
              listItem
                .node()
                .scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
          drawFlowLine(d);
        }
      })
      .on("mouseout", function (event, d) {
        d3.select(this).classed("highlighted", false);
        d3.select("#list-" + d.safeId).classed("highlighted", false);

        removeFlowLine();
      })
      .append("title")
      .text((d) =>
        d.properties.expats > 0
          ? `${d.properties.name}: ${d.properties.expats}`
          : d.properties.name
      );

    regionsGroup
      .selectAll("path")
      .data(regionFeatures)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "region")
      .attr("id", (d) => "region-" + d.safeId)
      .style("opacity", (d) => opacityScale(d.properties.expats))
      .on("mouseover", function (event, d) {
        if (d.properties.expats > 0) {
          d3.select(this).classed("highlighted", true);
          const listItem = d3.select("#list-" + d.safeId);
          if (!listItem.empty()) {
            listItem.classed("highlighted", true);
            if (listItem.node())
              listItem
                .node()
                .scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      })
      .on("mouseout", function (event, d) {
        d3.select(this).classed("highlighted", false);
        d3.select("#list-" + d.safeId).classed("highlighted", false);
      })
      .append("title")
      .text((d) =>
        d.properties.name ? `${d.properties.name}: ${d.properties.expats}` : ""
      );

    const italyDatum = features.find((d) => d.properties.name === "Italy");

    function zoomToItaly() {
      if (!italyDatum) return;

      isZoomedToItaly = true;
      removeFlowLine();

      const bounds = path.bounds(italyDatum);
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      const x = (bounds[0][0] + bounds[1][0]) / 2;
      const y = (bounds[0][1] + bounds[1][1]) / 2;
      const scale = Math.max(
        1,
        Math.min(10, 0.9 / Math.max(dx / width, dy / height))
      );
      const translate = [width / 2 - scale * x, height / 2 - scale * y];

      mainGroup
        .transition()
        .duration(1000)
        .attr("transform", `translate(${translate}) scale(${scale})`);
      worldGroup
        .selectAll(".country")
        .transition()
        .duration(1000)
        .style("opacity", 0.3);
      d3.select("#map-id-Italy")
        .transition()
        .duration(1000)
        .style("opacity", 0);
      regionsGroup
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .style("pointer-events", "all");

      renderSidebar(regionData, "italy");
    }

    function resetMap() {
      isZoomedToItaly = false;

      mainGroup
        .transition()
        .duration(1000)
        .attr("transform", "translate(0,0) scale(1)");
      worldGroup
        .selectAll(".country")
        .transition()
        .duration(1000)
        .style("opacity", (d) => opacityScale(d.properties.expats));
      regionsGroup
        .transition()
        .duration(1000)
        .style("opacity", 0)
        .style("pointer-events", "none");

      renderSidebar(globalRankedFeatures, "world");
    }

    const mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "step-italy") {
            if (entry.isIntersecting) {
              zoomToItaly();
            } else {
              if (entry.boundingClientRect.top > 0) {
                resetMap();
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const stepItaly = document.getElementById("step-italy");
    if (stepItaly) mapObserver.observe(stepItaly);
  })
  .catch(function (error) {
    console.error("Errore nel caricamento dei dati:", error);
  });
