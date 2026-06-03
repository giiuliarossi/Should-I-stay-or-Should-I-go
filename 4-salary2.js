document.addEventListener("DOMContentLoaded", function () {
  Chart.defaults.font.family = "body";
  /* DASHBOARD 1*/
  (function initDashboard1() {
    const rawData = [
      {
        region: "Abruzzo",
        artistica: 33.3,
        giuridica: 32.9,
        sanitaria: 61.8,
        stem: 22.3,
      },
      {
        region: "Basilicata",
        artistica: 32.1,
        giuridica: 27.0,
        sanitaria: 29.7,
        stem: 29.7,
      },
      {
        region: "Calabria",
        artistica: 22.4,
        giuridica: 25.0,
        sanitaria: 64.7,
        stem: 25.4,
      },
      {
        region: "Campania",
        artistica: 29.4,
        giuridica: 31.8,
        sanitaria: 65.8,
        stem: 25.4,
      },
      {
        region: "Emilia Romagna",
        artistica: 46.6,
        giuridica: 42.5,
        sanitaria: 71.1,
        stem: 32.2,
      },
      {
        region: "Friuli Venezia Giulia",
        artistica: 43.3,
        giuridica: 46.5,
        sanitaria: 79.5,
        stem: 32.7,
      },
      {
        region: "Lazio",
        artistica: 40.2,
        giuridica: 38.5,
        sanitaria: 75.2,
        stem: 28.6,
      },
      {
        region: "Liguria",
        artistica: 47.2,
        giuridica: 42.7,
        sanitaria: 80.5,
        stem: 29.7,
      },
      {
        region: "Lombardia",
        artistica: 55.2,
        giuridica: 57.7,
        sanitaria: 78.7,
        stem: 48.8,
      },
      {
        region: "Marche",
        artistica: 39.3,
        giuridica: 42.1,
        sanitaria: 66.5,
        stem: 26.6,
      },
      {
        region: "Molise",
        artistica: 17.9,
        giuridica: 33.3,
        sanitaria: 44.9,
        stem: 29.3,
      },
      {
        region: "Piemonte",
        artistica: 46.5,
        giuridica: 46.8,
        sanitaria: 77.1,
        stem: 26.4,
      },
      {
        region: "Puglia",
        artistica: 33.6,
        giuridica: 33.4,
        sanitaria: 67.1,
        stem: 30.4,
      },
      {
        region: "Sardegna",
        artistica: 35.9,
        giuridica: 33.4,
        sanitaria: 68.3,
        stem: 26.4,
      },
      {
        region: "Sicilia",
        artistica: 27.6,
        giuridica: 29.4,
        sanitaria: 56.0,
        stem: 23.1,
      },
      {
        region: "Toscana",
        artistica: 42.5,
        giuridica: 45.8,
        sanitaria: 75.1,
        stem: 31.0,
      },
      {
        region: "Trentino Alto Adige",
        artistica: 43.4,
        giuridica: 42.4,
        sanitaria: 60.8,
        stem: 31.0,
      },
      {
        region: "Umbria",
        artistica: 42.1,
        giuridica: 33.5,
        sanitaria: 66.3,
        stem: 24.3,
      },
      {
        region: "Valle d'Aosta",
        artistica: 56.8,
        giuridica: 37.4,
        sanitaria: null,
        stem: null,
      },
      {
        region: "Veneto",
        artistica: 44.7,
        giuridica: 45.0,
        sanitaria: 78.1,
        stem: 35.3,
      },
    ];

    // English translation mapping for regions
    const regionTranslations = {
      abruzzo: "Abruzzo",
      basilicata: "Basilicata",
      calabria: "Calabria",
      campania: "Campania",
      "emilia romagna": "Emilia-Romagna",
      "friuli venezia giulia": "Friuli-Venezia Giulia",
      lazio: "Lazio",
      liguria: "Liguria",
      lombardia: "Lombardy",
      marche: "Marche",
      molise: "Molise",
      piemonte: "Piedmont",
      puglia: "Apulia",
      sardegna: "Sardinia",
      sicilia: "Sicily",
      toscana: "Tuscany",
      "trentino alto adige": "Trentino-Alto Adige",
      umbria: "Umbria",
      "valle d'aosta": "Aosta Valley",
      veneto: "Veneto",
    };

    const baseColors = {
      artistica: "#FFC300",
      giuridica: "#8c5c32",
      sanitaria: "#60b5ff",
      stem: "#9966FF",
      all: "#035aa6",
    };

    const mapTooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "rgba(255, 255, 255, 0.95)")
      .style("color", "#035aa6")
      .style("border", "1px solid #60b5ff")
      .style("padding", "8px 12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("font-family", "body")
      .style("font-size", "0.9rem");

    const italyRegionsGeojsonUrl =
      "https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson";
    const mapContainer = d3.select("#italyMap");
    const width = 600,
      height = 700;

    const svg = mapContainer
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const projection = d3
      .geoAlbers()
      .center([0, 42])
      .rotate([-12, 0])
      .parallels([35, 47])
      .scale(2800)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    function normalizeName(name) {
      if (!name) return "";
      let n = name.toLowerCase();
      if (n.includes("aosta")) return "valle d'aosta";
      if (n.includes("trentino")) return "trentino alto adige";
      if (n.includes("friuli")) return "friuli venezia giulia";
      if (n.includes("emilia")) return "emilia romagna";
      return n.trim();
    }

    let currentFilter = "all";
    const studyButtons = document.querySelectorAll("#studyArea .btn");

    studyButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        studyButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        currentFilter = this.getAttribute("data-value");
        updateMapAndBarChart(currentFilter);
      });
    });

    let geoFeatures = [];
    d3.json(italyRegionsGeojsonUrl).then(function (geoData) {
      geoFeatures = geoData.features;

      svg
        .selectAll("path")
        .data(geoFeatures)
        .enter()
        .append("path")
        .attr("class", "region-path")
        .attr("d", path)
        .attr("id", (d) => normalizeName(d.properties.reg_name));

      updateMapAndBarChart(currentFilter);
    });

    let barChartInstance = null;
    const ctxBar = document.getElementById("regionChart").getContext("2d");

    function getSortValue(d, filter) {
      if (filter === "all") {
        let sum =
          (d.artistica || 0) +
          (d.giuridica || 0) +
          (d.sanitaria || 0) +
          (d.stem || 0);
        let count =
          (d.artistica ? 1 : 0) +
          (d.giuridica ? 1 : 0) +
          (d.sanitaria ? 1 : 0) +
          (d.stem ? 1 : 0);
        return count > 0 ? sum / count : 0;
      }
      return d[filter] || 0;
    }

    function updateMapAndBarChart(filter) {
      let sortedData = [...rawData];
      sortedData.sort(
        (a, b) => getSortValue(b, filter) - getSortValue(a, filter)
      );

      // Translate Labels for the Y-Axis
      const labels = sortedData.map((d) => {
        let n = normalizeName(d.region);
        return regionTranslations[n] || d.region;
      });

      let datasets = [];

      if (filter === "all") {
        datasets = [
          {
            label: "Arts",
            data: sortedData.map((d) => d.artistica),
            backgroundColor: baseColors.artistica,
          },
          {
            label: "Law",
            data: sortedData.map((d) => d.giuridica),
            backgroundColor: baseColors.giuridica,
          },
          {
            label: "Health",
            data: sortedData.map((d) => d.sanitaria),
            backgroundColor: baseColors.sanitaria,
          },
          {
            label: "STEM",
            data: sortedData.map((d) => d.stem),
            backgroundColor: baseColors.stem,
          },
        ];
      } else {
        datasets = [
          {
            label: "Employment (%)",
            data: sortedData.map((d) => d[filter]),
            backgroundColor: baseColors[filter],
          },
        ];
      }

      if (barChartInstance) barChartInstance.destroy();
      barChartInstance = new Chart(ctxBar, {
        type: "bar",
        data: { labels: labels, datasets: datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          plugins: {
            legend: { display: filter === "all" },

            tooltip: {
              borderColor: "#60b5ff",
              borderWidth: 1,
              cornerRadius: 0,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              titleColor: "#035aa6",
              bodyColor: "#035aa6",
              padding: 8,
              boxPadding: 8,
              bodyFont: {
                family: "body",
              },
              callbacks: {
                label: function (context) {
                  return ` ${context.formattedValue}%`;
                },
                labelColor: function (context) {
                  return {
                    borderColor: "transparent",
                    backgroundColor: context.dataset.backgroundColor,
                    borderWidth: 0,
                  };
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: "Employment Rate (%)" },
            },
          },
        },
      });

      let mapData = {};
      let dataValues = [];

      sortedData.forEach((d) => {
        let val = getSortValue(d, filter);
        mapData[normalizeName(d.region)] = val;
        if (val > 0) dataValues.push(val);
      });

      let minVal = dataValues.length > 0 ? Math.min(...dataValues) : 0;
      let maxVal = dataValues.length > 0 ? Math.max(...dataValues) : 100;
      let opacityScale = d3
        .scaleLinear()
        .domain([minVal, maxVal])
        .range([0.15, 1.0]);
      let currentFillColor = baseColors[filter];

      svg
        .selectAll(".region-path")
        .on("mouseover", function (event, d) {
          let name = normalizeName(d.properties.reg_name);
          let val = mapData[name];
          let displayVal = val ? val.toFixed(1) + "%" : "No data";

          let englishName = regionTranslations[name] || d.properties.reg_name;

          mapTooltip
            .html(`<strong>${englishName}</strong><br>${displayVal}`)
            .style("opacity", 1);
        })
        .on("mousemove", function (event) {
          mapTooltip
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY - 20 + "px");
        })
        .on("mouseout", function () {
          mapTooltip.style("opacity", 0);
        })
        .transition()
        .duration(500)
        .style("fill", currentFillColor)
        .style("fill-opacity", function (d) {
          let name = normalizeName(d.properties.reg_name);
          let val = mapData[name];
          if (!val) return 0.02;
          return opacityScale(val);
        });
    }
  })();

  /* DASHBOARD 2 */
  (function initDashboard2() {
    const years = [
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ];

    const db = {
      Italy: {
        men_15_24: [19.2, 20.0, 20.7, 21.4, 20.2, 21.3, 23.4, 24.3, 24.0, 21.2],
        men_55_64: [61.0, 62.3, 64.1, 64.5, 63.6, 63.4, 65.3, 67.8, 70.1, 71.8],
        women_15_24: [
          13.7, 13.9, 14.3, 15.2, 12.8, 13.5, 16.0, 16.2, 15.1, 14.4,
        ],
        women_55_64: [
          39.5, 42.2, 43.8, 44.6, 43.8, 44.0, 45.2, 47.2, 48.5, 51.0,
        ],
      },
      Germany: {
        men_15_24: [46.3, 46.8, 48.2, 50.0, 49.3, 50.7, 52.5, 52.8, 52.7, 51.9],
        men_55_64: [72.7, 74.0, 75.1, 76.0, 74.5, 76.0, 77.2, 78.1, 78.9, 78.9],
        women_15_24: [
          43.9, 45.0, 44.8, 45.6, 45.5, 46.0, 48.0, 48.8, 49.5, 49.6,
        ],
        women_55_64: [
          62.7, 64.5, 66.0, 67.5, 66.9, 67.8, 69.5, 71.1, 71.5, 71.7,
        ],
      },
      Spain: {
        men_15_24: [19.4, 21.2, 22.7, 24.3, 20.3, 21.9, 24.6, 25.0, 26.9, 27.0],
        men_55_64: [55.7, 57.8, 59.7, 61.1, 61.6, 62.7, 64.7, 66.3, 68.0, 68.7],
        women_15_24: [
          17.2, 19.7, 20.5, 20.1, 16.6, 19.0, 21.1, 22.1, 22.7, 23.6,
        ],
        women_55_64: [
          42.8, 43.5, 44.9, 46.9, 48.0, 49.2, 50.9, 53.0, 54.5, 56.4,
        ],
      },
      France: {
        men_15_24: [31.1, 32.2, 33.4, 32.6, 31.6, 33.8, 36.3, 36.7, 36.8, 37.2],
        men_55_64: [52.1, 53.3, 54.7, 56.1, 56.6, 57.7, 58.3, 59.7, 62.1, 63.6],
        women_15_24: [
          25.6, 26.1, 27.0, 27.5, 26.1, 30.6, 33.5, 33.6, 32.2, 32.0,
        ],
        women_55_64: [
          50.3, 52.0, 52.6, 53.0, 53.9, 54.3, 55.5, 57.2, 58.7, 60.0,
        ],
      },
    };

    for (const key in db) {
      const data = db[key];
      data.young_total = d3
        .zip(data.men_15_24, data.women_15_24)
        .map((vals) => d3.mean(vals));
      data.old_total = d3
        .zip(data.men_55_64, data.women_55_64)
        .map((vals) => d3.mean(vals));
    }

    const singleColors = {
      men_15_24: "#035aa6",
      women_15_24: "#60b5ff",
      men_55_64: "#8c5c32",
      women_55_64: "#FFC300",
    };
    const nationColors = {
      Italy: "#035aa6",
      Germany: "#60b5ff",
      Spain: "#8c5c32",
      France: "#FFC300",
    };

    const ctxLine = document.getElementById("mainChart").getContext("2d");
    let lineChartInstance = null;

    const radioSingle = document.getElementById("modeSingle");
    const radioCompare = document.getElementById("modeCompare");
    const singleControls = document.getElementById("singleControls");
    const compareControls = document.getElementById("compareControls");

    let currentNation = "Italy";
    const nationButtons = document.querySelectorAll("#nationSelect .btn");
    nationButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        nationButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        currentNation = this.getAttribute("data-value");
        updateLineChart();
      });
    });

    let currentAge = "young_total";
    const ageButtons = document.querySelectorAll("#ageSelect .btn");
    ageButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        ageButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        currentAge = this.getAttribute("data-value");
        updateLineChart();
      });
    });

    function updateLineChart() {
      const mode = document.querySelector(
        'input[name="viewMode"]:checked'
      ).value;
      let datasets = [];

      if (mode === "single") {
        const data = db[currentNation];
        datasets = [
          {
            label: "Men (15-24)",
            data: data.men_15_24,
            borderColor: singleColors.men_15_24,
            backgroundColor: singleColors.men_15_24,
            tension: 0.3,
            borderWidth: 3,
          },
          {
            label: "Women (15-24)",
            data: data.women_15_24,
            borderColor: singleColors.women_15_24,
            backgroundColor: singleColors.women_15_24,
            tension: 0.3,
            borderWidth: 3,
          },
          {
            label: "Men (55-64)",
            data: data.men_55_64,
            borderColor: singleColors.men_55_64,
            backgroundColor: singleColors.men_55_64,
            tension: 0.3,
            borderWidth: 3,
          },
          {
            label: "Women (55-64)",
            data: data.women_55_64,
            borderColor: singleColors.women_55_64,
            backgroundColor: singleColors.women_55_64,
            tension: 0.3,
            borderWidth: 3,
          },
        ];
      } else {
        for (const [nation, data] of Object.entries(db)) {
          datasets.push({
            label: nation,
            data: data[currentAge],
            borderColor: nationColors[nation],
            backgroundColor: nationColors[nation],
            tension: 0.3,
            borderWidth: 3,
          });
        }
      }

      Chart.Tooltip.positioners.cursorY = function (elements, eventPosition) {
        if (elements.length) {
          return {
            x: elements[0].element.x,
            y: eventPosition.y,
          };
        }
        return false;
      };

      if (lineChartInstance) lineChartInstance.destroy();
      lineChartInstance = new Chart(ctxLine, {
        type: "line",
        data: { labels: years, datasets: datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            tooltip: {
              position: "cursorY",

              borderColor: "#60b5ff",
              borderWidth: 1,
              cornerRadius: 0,
              backgroundColor: "rgba(255, 255, 255, 0.95)",

              titleColor: "#035aa6",
              bodyColor: "#035aa6",
              padding: 8,
              boxPadding: 8,
              bodyFont: {
                family: "body",
              },
              callbacks: {
                title: function () {
                  return "";
                },
                label: function (context) {
                  return `${context.formattedValue}%`;
                },
                labelColor: function (context) {
                  return {
                    borderColor: "transparent",
                    backgroundColor: context.dataset.backgroundColor,
                    borderWidth: 0,
                  };
                },
              },
            },
          },
          scales: {
            y: {
              min: 10,
              max: 90,
              title: { display: true, text: "Employment Rate (%)" },
            },
          },
        },
      });
    }

    function handleModeChange() {
      if (radioSingle.checked) {
        singleControls.style.display = "flex";
        compareControls.style.display = "none";
      } else {
        singleControls.style.display = "none";
        compareControls.style.display = "flex";
      }
      updateLineChart();
    }

    radioSingle.addEventListener("change", handleModeChange);
    radioCompare.addEventListener("change", handleModeChange);

    updateLineChart();
  })();
});
