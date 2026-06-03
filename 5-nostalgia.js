document.addEventListener("DOMContentLoaded", () => {
  const csvUrl = "1-dataMAp.csv";

  // Italian names in English
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
    "Emirati Arabi Uniti": "UAE",
    Lussemburgo: "Luxembourg",
    Svezia: "Sweden",
    Messico: "Mexico",
    Filippine: "Philippines",
    Grecia: "Greece",
    Egitto: "Egypt",
    Cina: "China",
    "Nuova Zelanda": "New Zealand",
    Sudafrica: "South Africa",
    "Arabia Saudita": "Saudi Arabia",
    Giappone: "Japan",
    "Corea del Sud": "South Korea",
    Polonia: "Poland",
    Turchia: "Türkiye",
    Ungheria: "Hungary",
    Cechia: "Czechia",
    "Repubblica Ceca": "Czechia",
    Finlandia: "Finland",
    Norvegia: "Norway",
    Cile: "Chile",
  };

  const targetCountries = [
    "Costa Rica",
    "Mexico",
    "Philippines",
    "Indonesia",
    "Brazil",
    "Thailand",
    "Panama",
    "Colombia",
    "Kenya",
    "Greece",
    "Spain",
    "Oman",
    "Vietnam",
    "Egypt",
    "Portugal",
    "UAE",
    "Cyprus",
    "Bahrain",
    "China",
    "Australia",
    "New Zealand",
    "Qatar",
    "South Africa",
    "Malaysia",
    "Saudi Arabia",
    "India",
    "Hong Kong",
    "USA",
    "Ireland",
    "Singapore",
    "Belgium",
    "Malta",
    "Italy",
    "France",
    "Japan",
    "South Korea",
    "Poland",
    "Luxembourg",
    "Canada",
    "Türkiye",
    "Netherlands",
    "United Kingdom",
    "Chile",
    "Hungary",
    "Denmark",
    "Switzerland",
    "Czechia",
    "Sweden",
    "Austria",
    "Finland",
    "Germany",
    "Norway",
    "Kuwait",
  ];

  // Hardcoded rankings from your table
  const easeOfSettling = [
    "Costa Rica",
    "Mexico",
    "Philippines",
    "Indonesia",
    "Brazil",
    "Thailand",
    "Panama",
    "Colombia",
    "Kenya",
    "Greece",
    "Spain",
    "Oman",
    "Vietnam",
    "Egypt",
    "Portugal",
    "UAE",
    "Cyprus",
    "Bahrain",
    "China",
    "Australia",
    "New Zealand",
    "Qatar",
    "South Africa",
    "Malaysia",
    "Saudi Arabia",
    "India",
    "Hong Kong",
    "USA",
    "Ireland",
    "Singapore",
    "Belgium",
    "Malta",
    "Italy",
    "France",
    "Japan",
    "South Korea",
    "Poland",
    "Luxembourg",
    "Canada",
    "Türkiye",
    "Netherlands",
    "United Kingdom",
    "Chile",
    "Hungary",
    "Denmark",
    "Switzerland",
    "Czechia",
    "Sweden",
    "Austria",
    "Finland",
    "Germany",
    "Norway",
    "Kuwait",
  ];

  const cultureWelcome = [
    "Costa Rica",
    "Mexico",
    "Philippines",
    "Indonesia",
    "Brazil",
    "Spain",
    "Thailand",
    "Panama",
    "Greece",
    "Colombia",
    "Portugal",
    "Oman",
    "UAE",
    "Kenya",
    "Vietnam",
    "Cyprus",
    "Australia",
    "New Zealand",
    "Qatar",
    "Bahrain",
    "Hong Kong",
    "Egypt",
    "Saudi Arabia",
    "South Africa",
    "Malaysia",
    "USA",
    "China",
    "France",
    "Belgium",
    "Singapore",
    "Italy",
    "Ireland",
    "Luxembourg",
    "United Kingdom",
    "Canada",
    "Poland",
    "Malta",
    "Netherlands",
    "India",
    "Japan",
    "South Korea",
    "Türkiye",
    "Chile",
    "Denmark",
    "Switzerland",
    "Austria",
    "Czechia",
    "Hungary",
    "Sweden",
    "Norway",
    "Finland",
    "Germany",
    "Kuwait",
  ];

  const localFriendliness = [
    "Costa Rica",
    "Indonesia",
    "Brazil",
    "Philippines",
    "Vietnam",
    "Mexico",
    "Colombia",
    "Oman",
    "Thailand",
    "Egypt",
    "Kenya",
    "Greece",
    "Panama",
    "Spain",
    "Portugal",
    "UAE",
    "New Zealand",
    "China",
    "Ireland",
    "Australia",
    "Bahrain",
    "Cyprus",
    "Qatar",
    "Malaysia",
    "India",
    "Saudi Arabia",
    "USA",
    "South Africa",
    "Japan",
    "Canada",
    "South Korea",
    "Belgium",
    "Netherlands",
    "Singapore",
    "Malta",
    "Luxembourg",
    "Italy",
    "Türkiye",
    "Hong Kong",
    "Poland",
    "United Kingdom",
    "France",
    "Chile",
    "Hungary",
    "Denmark",
    "Switzerland",
    "Sweden",
    "Finland",
    "Germany",
    "Norway",
    "Czechia",
    "Austria",
    "Kuwait",
  ];

  const findingFriends = [
    "Mexico",
    "Philippines",
    "Panama",
    "Indonesia",
    "Costa Rica",
    "Brazil",
    "Kenya",
    "Thailand",
    "Greece",
    "Spain",
    "Colombia",
    "Egypt",
    "South Africa",
    "Oman",
    "Vietnam",
    "China",
    "Cyprus",
    "Bahrain",
    "Portugal",
    "Hong Kong",
    "India",
    "UAE",
    "Qatar",
    "Malaysia",
    "Saudi Arabia",
    "New Zealand",
    "Australia",
    "Singapore",
    "Malta",
    "Belgium",
    "USA",
    "Türkiye",
    "Poland",
    "France",
    "South Korea",
    "Italy",
    "Chile",
    "Ireland",
    "Japan",
    "Czechia",
    "United Kingdom",
    "Austria",
    "Hungary",
    "Netherlands",
    "Luxembourg",
    "Canada",
    "Denmark",
    "Switzerland",
    "Sweden",
    "Germany",
    "Norway",
    "Finland",
    "Kuwait",
  ];

  // Flexible render function to handle both string arrays and object arrays (for expats)
  function renderColumn(listId, dataArray) {
    const ul = d3.select(listId);
    ul.selectAll("li").remove();

    ul.selectAll("li")
      .data(dataArray)
      .enter()
      .append("li")
      .attr("class", (d) => {
        // Extract country name whether it's an object {name: 'Italy', value: 10} or a string 'Italy'
        const countryName = typeof d === "object" ? d.name : d;
        return (
          "country-item country-" + countryName.replace(/[^a-zA-Z0-9]/g, "-")
        );
      })
      .html((d, i) => {
        if (typeof d === "object") {
          // Expat column with numbers
          //   return `<span>${d.name}</span> <b>${d.value.toLocaleString(
          //     "it-IT"
          //   )}</b>`;
          // } else {
          //   // Ranking columns with names and their rank (index + 1)
          //   return `<span>${d}</span> <b>${i + 1}</b>`;

          // 2024 expat
          return `<b>${i + 1}</b> <span>${d.name} (${d.value.toLocaleString(
            "it-IT"
          )})</span>`;
        } else {
          // other columns
          return `<b>${i + 1}</b> <span>${d}</span>`;
        }
      })
      .on("mouseover", function (event, d) {
        const countryName = typeof d === "object" ? d.name : d;
        const targetClass =
          ".country-" + countryName.replace(/[^a-zA-Z0-9]/g, "-");

        // Highlight the country in ALL columns
        const targetElements = d3.selectAll(targetClass);
        targetElements.classed("highlighted", true);

        // Auto-scroll ALL columns to show this country smoothly
        targetElements.nodes().forEach((node) => {
          node.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      })
      .on("mouseout", function (event, d) {
        const countryName = typeof d === "object" ? d.name : d;
        const targetClass =
          ".country-" + countryName.replace(/[^a-zA-Z0-9]/g, "-");

        d3.selectAll(targetClass).classed("highlighted", false);
      })
      .on("click", function (event, d) {
        const countryName = typeof d === "object" ? d.name : d;
        console.log("Clicked on:", countryName);
      });
  }

  // Fetch the CSV, process it, and render all 5 columns
  d3.dsv(";", csvUrl)
    .then(function (csvData) {
      const totaleData = csvData.filter((d) => d.Sesso === "Totale");
      const expatsByCountry = {};

      totaleData.forEach((d) => {
        const mappedName = countryNameMap[d.Paese] || d.Paese;
        expatsByCountry[mappedName] =
          +d["Trasferiti dall'Italia (espatri) (p)"];
      });

      // Filter to keep only the 53 countries, format as objects, and sort
      const rankedExpats = Object.keys(expatsByCountry)
        .map((countryName) => {
          return {
            name: countryName,
            value: expatsByCountry[countryName],
          };
        })
        .filter((d) => d.value > 0 && targetCountries.includes(d.name))
        .sort((a, b) => b.value - a.value);

      // Get the final list of valid countries from the expat column
      const validCountries = rankedExpats.map((d) => d.name);

      // Filter the hardcoded ranking arrays to ONLY include the valid countries
      const filteredSettling = easeOfSettling.filter((c) =>
        validCountries.includes(c)
      );
      const filteredCulture = cultureWelcome.filter((c) =>
        validCountries.includes(c)
      );
      const filteredFriendliness = localFriendliness.filter((c) =>
        validCountries.includes(c)
      );
      const filteredFriends = findingFriends.filter((c) =>
        validCountries.includes(c)
      );

      // Render the fetched data column
      renderColumn("#list-expats", rankedExpats);

      // Render the filtered hardcoded ranking columns
      renderColumn("#list-settling", filteredSettling);
      renderColumn("#list-culture", filteredCulture);
      renderColumn("#list-friendliness", filteredFriendliness);
      renderColumn("#list-friends", filteredFriends);
    })
    .catch(function (error) {
      console.error("Errore nel caricamento dei dati:", error);
    });
});
