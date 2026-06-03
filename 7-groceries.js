document.addEventListener("DOMContentLoaded", () => {
  // const rawProductData = [
  //   {
  //     id: 1,
  //     name: "Olio EVO",
  //     image: "olio-evo.png",
  //     prices: { it: 7.99, de: 8.99, es: 6.8, uk: 6.5, fr: 8.5, ch: 11.5 },
  //   },
  //   {
  //     id: 2,
  //     name: "Pinoli",
  //     image: "pinoli.png",
  //     prices: { it: 4.5, de: 3.99, es: 3.5, uk: 3.3, fr: 4.2, ch: 5.5 },
  //   },
  //   {
  //     id: 3,
  //     name: "Aceto Balsamico",
  //     image: "aceto-balsamico.png",
  //     prices: { it: 3.5, de: 4.49, es: 2.9, uk: 3.5, fr: 4.2, ch: 5.9 },
  //   },
  //   {
  //     id: 4,
  //     name: "Basilico fresco",
  //     image: "basilico.png",
  //     prices: { it: 1.5, de: 2.29, es: 1.6, uk: 1.65, fr: 2.5, ch: 3.2 },
  //   },
  //   {
  //     id: 5,
  //     name: "Barilla Pesto",
  //     image: "pesto-barilla.png",
  //     prices: { it: 2.49, de: 3.29, es: 2.6, uk: 2.75, fr: 2.85, ch: 3.95 },
  //   },
  //   {
  //     id: 6,
  //     name: "Rummo Pasta",
  //     image: "pasta-rummo.png",
  //     prices: { it: 1.15, de: 2.19, es: 0, uk: 1.9, fr: 1.95, ch: 0 },
  //   },
  //   {
  //     id: 7,
  //     name: "Garofalo Pasta",
  //     image: "pasta-garofalo.png",
  //     prices: { it: 1.29, de: 0, es: 0, uk: 1.8, fr: 1.89, ch: 2.5 },
  //   },
  //   {
  //     id: 8,
  //     name: "De Cecco Pasta",
  //     image: "pasta-dececco.png",
  //     prices: { it: 1.45, de: 2.29, es: 1.95, uk: 1.85, fr: 2.05, ch: 0 },
  //   },
  //   {
  //     id: 9,
  //     name: "Riso Carnaroli",
  //     image: "riso-carnaroli.png",
  //     prices: { it: 3.8, de: 4.5, es: 3.9, uk: 4.2, fr: 4.6, ch: 5.8 },
  //   },
  //   {
  //     id: 10,
  //     name: "Pane rustico",
  //     image: "pane.png",
  //     prices: { it: 2.5, de: 2.99, es: 1.8, uk: 1.6, fr: 2.3, ch: 3.5 },
  //   },
  //   {
  //     id: 11,
  //     name: "Taralli",
  //     image: "taralli.png",
  //     prices: { it: 1.5, de: 0, es: 0, uk: 0, fr: 2.2, ch: 0 },
  //   },
  //   {
  //     id: 12,
  //     name: "Piadine",
  //     image: "piadine.png",
  //     prices: { it: 2.1, de: 0, es: 2.0, uk: 0, fr: 2.5, ch: 4.5 },
  //   },
  //   {
  //     id: 13,
  //     name: "San Carlo Rustica",
  //     image: "patatine-sancarlo.png",
  //     prices: { it: 2.9, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
  //   },
  //   {
  //     id: 14,
  //     name: "Pringles",
  //     image: "pringles.png",
  //     prices: { it: 2.69, de: 2.99, es: 2.4, uk: 2.25, fr: 2.59, ch: 3.5 },
  //   },
  //   {
  //     id: 15,
  //     name: "Pomodorini",
  //     image: "pomodorini.png",
  //     prices: { it: 2.5, de: 3.49, es: 2.2, uk: 2.3, fr: 3.2, ch: 4.5 },
  //   },
  //   {
  //     id: 16,
  //     name: "Mutti Passata",
  //     image: "passata-mutti.png",
  //     prices: { it: 1.59, de: 2.49, es: 1.9, uk: 1.85, fr: 2.1, ch: 2.95 },
  //   },
  //   {
  //     id: 17,
  //     name: "Tonno scatola",
  //     image: "tonno.png",
  //     prices: { it: 3.5, de: 4.2, es: 2.9, uk: 3.5, fr: 4.1, ch: 5.5 },
  //   },
  //   {
  //     id: 18,
  //     name: "Filetto Salmone",
  //     image: "salmone.png",
  //     prices: { it: 6.5, de: 7.5, es: 5.8, uk: 5.5, fr: 7.2, ch: 10.5 },
  //   },
  //   {
  //     id: 19,
  //     name: "Filetto Branzino",
  //     image: "branzino.png",
  //     prices: { it: 5.5, de: 6.9, es: 4.5, uk: 5.0, fr: 6.5, ch: 9.5 },
  //   },
  //   {
  //     id: 20,
  //     name: "Salsiccia suino",
  //     image: "salsiccia.png",
  //     prices: { it: 4.5, de: 4.0, es: 3.5, uk: 3.5, fr: 5.0, ch: 7.5 },
  //   },
  //   {
  //     id: 21,
  //     name: "Hamburger bovino",
  //     image: "hamburger.png",
  //     prices: { it: 6.5, de: 6.0, es: 5.2, uk: 4.5, fr: 7.5, ch: 11.5 },
  //   },
  //   {
  //     id: 22,
  //     name: "Bistecca suino",
  //     image: "bistecca.png",
  //     prices: { it: 4.5, de: 4.2, es: 3.8, uk: 3.8, fr: 5.5, ch: 8.5 },
  //   },
  //   {
  //     id: 23,
  //     name: "Grana Padano",
  //     image: "grana-padano.png",
  //     prices: { it: 3.8, de: 5.5, es: 4.5, uk: 4.5, fr: 5.8, ch: 7.5 },
  //   },
  //   {
  //     id: 24,
  //     name: "Igor Gorgonzola",
  //     image: "gorgonzola.png",
  //     prices: { it: 3.2, de: 4.5, es: 3.5, uk: 3.0, fr: 3.8, ch: 5.5 },
  //   },
  //   {
  //     id: 25,
  //     name: "Prosciutto Parma",
  //     image: "prosciutto-parma.png",
  //     prices: { it: 4.5, de: 5.9, es: 5.0, uk: 4.5, fr: 6.2, ch: 8.5 },
  //   },
  //   {
  //     id: 26,
  //     name: "Pavesi Gocciole",
  //     image: "gocciole.png",
  //     prices: { it: 3.5, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
  //   },
  //   {
  //     id: 27,
  //     name: "Zucchero Bianco",
  //     image: "zucchero.png",
  //     prices: { it: 1.3, de: 1.49, es: 1.35, uk: 1.1, fr: 1.45, ch: 1.5 },
  //   },
  //   {
  //     id: 28,
  //     name: "Pan di Stelle",
  //     image: "pan-di-stelle.png",
  //     prices: { it: 3.8, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
  //   },
  //   {
  //     id: 29,
  //     name: "Mikado",
  //     image: "mikado.png",
  //     prices: { it: 1.6, de: 1.99, es: 1.5, uk: 1.5, fr: 1.75, ch: 2.5 },
  //   },
  //   {
  //     id: 30,
  //     name: "Illy Caffè",
  //     image: "caffe-illy.png",
  //     prices: { it: 6.5, de: 7.5, es: 6.9, uk: 6.5, fr: 7.2, ch: 9.5 },
  //   },
  //   {
  //     id: 31,
  //     name: "Novi Crema",
  //     image: "crema-novi.png",
  //     prices: { it: 3.9, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
  //   },
  //   {
  //     id: 32,
  //     name: "Farina 00",
  //     image: "farina.png",
  //     prices: { it: 0.85, de: 0.85, es: 0.75, uk: 1.2, fr: 1.1, ch: 1.4 },
  //   },
  //   {
  //     id: 33,
  //     name: "Maxibon",
  //     image: "maxibon.png",
  //     prices: { it: 4.99, de: 0, es: 0, uk: 0, fr: 4.5, ch: 6.5 },
  //   },
  //   {
  //     id: 34,
  //     name: "Cornetto",
  //     image: "cornetto.png",
  //     prices: { it: 4.49, de: 3.79, es: 0, uk: 3.0, fr: 3.95, ch: 7.2 },
  //   },
  //   {
  //     id: 35,
  //     name: "Coppa del Nonno",
  //     image: "coppa-del-nonno.png",
  //     prices: { it: 4.49, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
  //   },
  //   {
  //     id: 36,
  //     name: "Magnum",
  //     image: "magnum.png",
  //     prices: { it: 4.99, de: 3.99, es: 0, uk: 3.25, fr: 4.1, ch: 7.5 },
  //   },
  //   {
  //     id: 37,
  //     name: "Limoni bio",
  //     image: "limoni.png",
  //     prices: { it: 2.2, de: 1.99, es: 1.8, uk: 1.6, fr: 2.3, ch: 2.9 },
  //   },
  //   {
  //     id: 38,
  //     name: "Radicchio rosso",
  //     image: "radicchio.png",
  //     prices: { it: 1.5, de: 1.49, es: 0, uk: 1.3, fr: 1.99, ch: 2.5 },
  //   },
  //   {
  //     id: 39,
  //     name: "Fragole",
  //     image: "fragole.png",
  //     prices: { it: 3.5, de: 3.99, es: 3.2, uk: 3.0, fr: 4.5, ch: 4.9 },
  //   },
  //   {
  //     id: 40,
  //     name: "Mascarpone",
  //     image: "mascarpone.png",
  //     prices: { it: 2.99, de: 2.99, es: 0, uk: 2.5, fr: 3.2, ch: 4.2 },
  //   },
  // ];
  const rawProductData = [
    {
      id: 1,
      name: "Extra Virgin Olive Oil. 0,75ml",
      image: "olio-evo.png",
      prices: { it: 7.99, de: 8.99, es: 6.8, uk: 7.61, fr: 8.5, ch: 11.85 },
    },
    {
      id: 2,
      name: "Pine nuts. 50g",
      image: "pinoli.png",
      prices: { it: 4.5, de: 3.99, es: 3.5, uk: 3.86, fr: 4.2, ch: 5.67 },
    },
    {
      id: 3,
      name: "Balsamic Vinegar of Modena PGI. 500 ml",
      image: "aceto-balsamico.png",
      prices: { it: 3.5, de: 4.49, es: 2.9, uk: 4.1, fr: 4.2, ch: 6.08 },
    },
    {
      id: 4,
      name: "Fresh Basil",
      image: "basilico.png",
      prices: { it: 1.5, de: 2.29, es: 1.6, uk: 1.93, fr: 2.5, ch: 3.3 },
    },
    {
      id: 5,
      name: "Barilla Pesto alla Genovese. 190 g",
      image: "pesto-barilla.png",
      prices: { it: 2.49, de: 3.29, es: 2.6, uk: 3.22, fr: 2.85, ch: 4.07 },
    },
    {
      id: 6,
      name: "Rummo Penne Rigate N° 66. 500 g",
      image: "pasta-rummo.png",
      prices: { it: 1.15, de: 2.19, es: 0, uk: 2.22, fr: 1.95, ch: 0 },
    },
    {
      id: 7,
      name: "Garofalo Penne Rigate. 500 g",
      image: "pasta-garofalo.png",
      prices: { it: 1.29, de: 0, es: 0, uk: 2.11, fr: 1.89, ch: 2.58 },
    },
    {
      id: 8,
      name: "De Cecco Penne Rigate n°41. 500 g",
      image: "pasta-dececco.png",
      prices: { it: 1.45, de: 2.29, es: 1.95, uk: 2.16, fr: 2.05, ch: 0 },
    },
    {
      id: 9,
      name: "Carnaroli Rice. 1000g",
      image: "riso-carnaroli.png",
      prices: { it: 3.8, de: 4.5, es: 3.9, uk: 4.91, fr: 4.6, ch: 5.97 },
    },
    {
      id: 10,
      name: "Bread. 400g",
      image: "pane.png",
      prices: { it: 2.5, de: 2.99, es: 1.8, uk: 1.87, fr: 2.3, ch: 3.61 },
    },
    {
      id: 11,
      name: "Classic Apulian Taralli. 250 g",
      image: "taralli.png",
      prices: { it: 1.5, de: 0, es: 0, uk: 0, fr: 2.2, ch: 0 },
    },
    {
      id: 12,
      name: "Piadine. 350g",
      image: "piadine.png",
      prices: { it: 2.1, de: 0, es: 2.0, uk: 0, fr: 2.5, ch: 4.64 },
    },
    {
      id: 13,
      name: "San Carlo Rustica. 300g",
      image: "patatine-sancarlo.png",
      prices: { it: 2.9, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
    },
    {
      id: 14,
      name: "Pringles Original. 175 g",
      image: "pringles.png",
      prices: { it: 2.69, de: 2.99, es: 2.4, uk: 2.63, fr: 2.59, ch: 3.61 },
    },
    {
      id: 15,
      name: "Cherry Tomatoes. 500g",
      image: "pomodorini.png",
      prices: { it: 2.5, de: 3.49, es: 2.2, uk: 2.69, fr: 3.2, ch: 4.64 },
    },
    {
      id: 16,
      name: "Mutti Tomato sauce. 700 g",
      image: "passata-mutti.png",
      prices: { it: 1.59, de: 2.49, es: 1.9, uk: 2.16, fr: 2.1, ch: 3.04 },
    },
    {
      id: 17,
      name: "Tuna in olive oil. 105 g",
      image: "tonno.png",
      prices: { it: 3.5, de: 4.2, es: 2.9, uk: 4.1, fr: 4.1, ch: 5.67 },
    },
    {
      id: 18,
      name: "Salmon fillet. 390 g",
      image: "salmone.png",
      prices: { it: 6.5, de: 7.5, es: 5.8, uk: 6.44, fr: 7.2, ch: 10.82 },
    },
    {
      id: 19,
      name: "Sea Bass fillet. 200g",
      image: "branzino.png",
      prices: { it: 5.5, de: 6.9, es: 4.5, uk: 5.85, fr: 6.5, ch: 9.79 },
    },
    {
      id: 20,
      name: "Pork sausage. 500 g",
      image: "salsiccia.png",
      prices: { it: 4.5, de: 4.0, es: 3.5, uk: 4.1, fr: 5.0, ch: 7.73 },
    },
    {
      id: 21,
      name: "Beef burgers. 500g",
      image: "hamburger.png",
      prices: { it: 6.5, de: 6.0, es: 5.2, uk: 5.27, fr: 7.5, ch: 11.85 },
    },
    {
      id: 22,
      name: "Pork chops. 550 g",
      image: "bistecca.png",
      prices: { it: 4.5, de: 4.2, es: 3.8, uk: 4.45, fr: 5.5, ch: 8.76 },
    },
    {
      id: 23,
      name: "Grana Padano PDO, 20-month aged. 700 g",
      image: "grana-padano.png",
      prices: { it: 3.8, de: 5.5, es: 4.5, uk: 5.27, fr: 5.8, ch: 7.73 },
    },
    {
      id: 24,
      name: "Gorgonzola PDO. 250 g",
      image: "gorgonzola.png",
      prices: { it: 3.2, de: 4.5, es: 3.5, uk: 3.51, fr: 3.8, ch: 5.67 },
    },
    {
      id: 25,
      name: "Parma ham. 90g",
      image: "prosciutto-parma.png",
      prices: { it: 4.5, de: 5.9, es: 5.0, uk: 5.27, fr: 6.2, ch: 8.76 },
    },
    {
      id: 26,
      name: "Pavesi Gocciole. 500g",
      image: "gocciole.png",
      prices: { it: 2.9, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
    },
    {
      id: 27,
      name: "Sugar. 1000g",
      image: "zucchero.png",
      prices: { it: 1.3, de: 1.49, es: 1.35, uk: 1.29, fr: 1.45, ch: 1.55 },
    },
    {
      id: 28,
      name: "Pan di Stelle. 700g",
      image: "pan-di-stelle.png",
      prices: { it: 3.9, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
    },
    {
      id: 29,
      name: "Mikado. 75g",
      image: "mikado.png",
      prices: { it: 1.8, de: 1.99, es: 1.5, uk: 1.76, fr: 1.75, ch: 2.58 },
    },
    {
      id: 30,
      name: "Illy Caffè",
      image: "caffe-illy.png",
      prices: { it: 6.5, de: 7.5, es: 6.9, uk: 7.61, fr: 7.2, ch: 9.79 },
    },
    {
      id: 31,
      name: "Novi Chocolate Cream. 200 g",
      image: "crema-novi.png",
      prices: { it: 4.9, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
    },
    {
      id: 32,
      name: "Flower 00. 1000g",
      image: "farina.png",
      prices: { it: 0.85, de: 0.85, es: 0.75, uk: 1.4, fr: 1.1, ch: 1.44 },
    },
    // {
    //   id: 33,
    //   name: "Maxibon",
    //   image: "maxibon.png",
    //   prices: { it: 4.99, de: 0, es: 0, uk: 0, fr: 4.5, ch: 6.7 },
    // },
    {
      id: 34,
      name: "Ice cream cone. 6x75g",
      image: "cornetto.png",
      prices: { it: 5.9, de: 3.79, es: 0, uk: 3.51, fr: 3.95, ch: 7.42 },
    },
    {
      id: 35,
      name: "Coppa del Nonno coffee ice cream. 6x65 g",
      image: "coppa-del-nonno.png",
      prices: { it: 4.9, de: 0, es: 0, uk: 0, fr: 0, ch: 0 },
    },
    {
      id: 36,
      name: "Magnum ice cream. 4x75g",
      image: "magnum.png",
      prices: { it: 4.99, de: 3.99, es: 0, uk: 3.8, fr: 4.1, ch: 7.73 },
    },
    {
      id: 37,
      name: "Lemons. 1000g",
      image: "limoni.png",
      prices: { it: 2.2, de: 1.99, es: 1.8, uk: 1.87, fr: 2.3, ch: 2.99 },
    },
    {
      id: 38,
      name: "Red Radicchio. 600g",
      image: "radicchio.png",
      prices: { it: 1.5, de: 1.49, es: 0, uk: 1.52, fr: 1.99, ch: 2.58 },
    },
    {
      id: 39,
      name: "Strawberries. 500g",
      image: "fragole.png",
      prices: { it: 3.5, de: 3.99, es: 3.2, uk: 3.51, fr: 4.5, ch: 5.05 },
    },
    {
      id: 40,
      name: "Mascarpone. 250g",
      image: "mascarpone.png",
      prices: { it: 2.99, de: 2.99, es: 0, uk: 2.93, fr: 3.2, ch: 4.33 },
    },
  ];

  const countries = ["it", "de", "es", "uk", "fr", "ch"];
  const cartItems = new Set();
  const gameArea = document.getElementById("game-area");
  const cartTarget = document.getElementById("cart-target");
  const receiptContainer = document.getElementById("receipt-container");
  const receiptItemsDiv = document.getElementById("receipt-items");
  const itemCountSpan = document.getElementById("item-count");
  const totalPricesDiv = document.getElementById("total-prices");
  const receiptHandle = document.querySelector(".receipt-handle");

  // scontrino
  receiptHandle.addEventListener("click", () => {
    if (receiptContainer.classList.contains("closed")) {
      receiptContainer.classList.remove("closed");
      receiptContainer.classList.add("open");
      receiptHandle.innerHTML = "<span>Close receipt</span>";
    } else {
      receiptContainer.classList.remove("open");
      receiptContainer.classList.add("closed");
      receiptHandle.innerHTML = "<span>Receipt</span>";
    }
  });

  // Scontrino
  function formatPrice(price) {
    return price === 0 ? "N/A" : price.toFixed(2);
  }

  function updateReceipt() {
    receiptItemsDiv.innerHTML = "";
    let totals = [0, 0, 0, 0, 0, 0];
    let count = 0;

    cartItems.forEach((id) => {
      count++;
      const p = rawProductData.find((x) => x.id === id);

      // Genera i prezzi usando l'array delle nazioni ordinato
      let pricesHTML = countries
        .map((countryKey, index) => {
          const price = p.prices[countryKey];
          totals[index] += price;
          return `<div>${formatPrice(price)}</div>`;
        })
        .join("");

      const itemCode = count.toString().padStart(2, "0");
      const rowHTML = `
        <div class="receipt-item">
            <div class="receipt-item-name">${itemCode} ${p.name}</div>
            <div class="price-stack">${pricesHTML}</div>
        </div>
      `;
      receiptItemsDiv.insertAdjacentHTML("beforeend", rowHTML);
    });

    itemCountSpan.textContent = count.toString().padStart(2, "0");
    totalPricesDiv.innerHTML = totals
      .map((t) => `<div>${t.toFixed(2)}</div>`)
      .join("");
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // Drag & Drop

  function checkCollision(el, id) {
    const r1 = el.getBoundingClientRect();
    const r2 = cartTarget.getBoundingClientRect();

    const centerX = r1.left + r1.width / 2;
    const centerY = r1.top + r1.height / 2;

    const inside =
      centerX > r2.left &&
      centerX < r2.right &&
      centerY > r2.top &&
      centerY < r2.bottom;

    if (inside && !cartItems.has(id)) {
      cartItems.add(id);
      cartTarget.style.filter = "drop-shadow(0 0 15px rgba(96, 181, 255, 0.8))";
      cartTarget.style.transform = "translate(-50%, -50%) scale(1.05)";
      setTimeout(() => {
        cartTarget.style.filter = "";
        cartTarget.style.transform = "translate(-50%, -50%) scale(1)";
      }, 300);
    } else if (!inside && cartItems.has(id)) {
      cartItems.delete(id);
    }
    updateReceipt();
  }

  //
  //
  //
  // drag
  function makeDraggable(el, id) {
    let offsetX = 0,
      offsetY = 0,
      dragging = false;

    el.ondragstart = () => false;

    el.addEventListener("pointerdown", (e) => {
      dragging = true;
      el.classList.add("dragging");
      const r = el.getBoundingClientRect();
      // dove hai cliccato
      offsetX = e.clientX - r.left;
      offsetY = e.clientY - r.top;
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", (e) => {
      if (!dragging) return;

      // posizione dell'area di gioco in tempo reale
      const gameAreaRect = gameArea.getBoundingClientRect();

      let newLeft = e.clientX - offsetX - gameAreaRect.left;
      let newTop = e.clientY - offsetY - gameAreaRect.top;

      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
    });

    el.addEventListener("pointerup", (e) => {
      dragging = false;
      el.classList.remove("dragging");
      checkCollision(el, id);
    });
  }

  // posizionamento casuale
  const itemSize = 80;
  const margin = 30;

  const areaW = gameArea.clientWidth;
  const areaH = gameArea.clientHeight;

  const cartBox = {
    left: areaW / 2 - 150 - margin,
    right: areaW / 2 + 150 + margin,
    top: areaH / 2 - 120 - margin,
    bottom: areaH / 2 + 120 + margin,
  };

  const placedItems = [];
  const minDistance = itemSize + 5;

  rawProductData.forEach((p) => {
    const item = document.createElement("div");
    item.className = "product-item";

    // immagine
    item.innerHTML = `<img src="7-groceries/${p.image}" alt="${p.name}" draggable="false" onerror="this.style.opacity='0.3'">`;

    let rx, ry;
    let hasOverlap = true;
    let attempts = 0;

    while (hasOverlap && attempts < 200) {
      rx = margin + Math.random() * (areaW - itemSize - margin * 2);
      ry = margin + Math.random() * (areaH - itemSize - margin * 3);

      const insideCart =
        rx + itemSize > cartBox.left &&
        rx < cartBox.right &&
        ry + itemSize > cartBox.top &&
        ry < cartBox.bottom;

      if (!insideCart) {
        hasOverlap = placedItems.some((placed) => {
          const dx = placed.x - rx;
          const dy = placed.y - ry;
          return Math.sqrt(dx * dx + dy * dy) < minDistance;
        });
      } else {
        hasOverlap = true;
      }
      attempts++;
    }

    placedItems.push({ x: rx, y: ry });

    item.dataset.initX = rx;
    item.dataset.initY = ry;

    item.style.left = `${rx}px`;
    item.style.top = `${ry}px`;
    gameArea.appendChild(item);
    makeDraggable(item, p.id);
  });

  // mpty cart button
  const emptyCartBtn = document.getElementById("empty-cart-btn");

  emptyCartBtn.addEventListener("click", () => {
    cartItems.clear();

    updateReceipt();

    const allItems = document.querySelectorAll(".product-item");
    allItems.forEach((item) => {
      item.style.left = `${item.dataset.initX}px`;
      item.style.top = `${item.dataset.initY}px`;
    });
  });

  updateReceipt();
});
