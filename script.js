/* =========================================================
   Felix Oketch — Solar Products Portfolio
   Product data, card rendering, hover actions, modal, cart
   and dynamic WhatsApp link generation.
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Configuration ---------- */
  const CONFIG = {
    whatsappNumber: "254707113706", // international format, no "+" or spaces
    currency: "KES",
    cartStorageKey: "fo-solar-cart",
  };

  /* ---------- Product catalog ----------
     To add a product: copy an object, give it a unique id and
     pick an `art` type: panel | battery | heater | inverter | controller | kit | light.
     To use a real photo instead, add `image: "images/your-file.jpg"`. */
  const PRODUCTS = [
    {
      id: "panel-550w",
      name: "550W Mono PERC Solar Panel",
      category: "panels",
      categoryLabel: "Solar Panels",
      price: 18500,
      badge: "Best Seller",
      art: "panel",
      short: "High-efficiency half-cut monocrystalline module for rooftop and ground-mount systems.",
      description:
        "A tier-1 grade monocrystalline PERC module with half-cut cell technology that reduces resistive losses and keeps producing in partial shade. Ideal for residential rooftops, commercial arrays and solar water pumping. Anodized aluminium frame and tempered anti-reflective glass are built for Kenya's high-irradiance, high-UV conditions.",
      features: [
        "Half-cut 144-cell design for better shade tolerance",
        "Up to 21.3% module efficiency",
        "Salt-mist and ammonia corrosion resistant",
        "25-year linear power output warranty",
      ],
      specs: {
        "Peak Power (Pmax)": "550 W",
        "Cell Type": "Monocrystalline PERC, half-cut (144 cells)",
        "Module Efficiency": "21.3%",
        "Voltage at Pmax (Vmp)": "41.9 V",
        "Current at Pmax (Imp)": "13.13 A",
        "Open Circuit Voltage (Voc)": "49.8 V",
        "Short Circuit Current (Isc)": "13.98 A",
        "Dimensions": "2279 × 1134 × 35 mm",
        "Weight": "27.5 kg",
        "Connector": "MC4 compatible, IP68 junction box",
        "Warranty": "12 yrs product / 25 yrs performance",
      },
    },
    {
      id: "battery-200ah-gel",
      name: "200Ah 12V Deep-Cycle Gel Battery",
      category: "storage",
      categoryLabel: "Batteries",
      price: 38000,
      art: "battery",
      short: "Maintenance-free sealed gel battery built for daily solar cycling and backup.",
      description:
        "A valve-regulated gel battery engineered for deep, daily discharge in off-grid and backup solar systems. The gelled electrolyte resists stratification and performs well in warm climates — no topping up, no acid spills. A reliable, affordable storage choice for homes, shops, schools and clinics.",
      features: [
        "Sealed, maintenance-free VRLA gel technology",
        "Long cycle life at 50% depth of discharge",
        "Low self-discharge — holds charge in storage",
        "Safe for indoor installation",
      ],
      specs: {
        "Nominal Voltage": "12 V",
        "Rated Capacity (C10)": "200 Ah",
        "Stored Energy": "2.4 kWh",
        "Cycle Life": "≈ 1,500 cycles @ 50% DoD",
        "Recommended Charge Voltage": "14.1 – 14.4 V (absorption)",
        "Float Voltage": "13.5 – 13.8 V",
        "Operating Temperature": "-20 °C to 50 °C",
        "Dimensions": "522 × 240 × 219 mm",
        "Weight": "≈ 58 kg",
        "Warranty": "2 years",
      },
    },
    {
      id: "heater-300l",
      name: "300L Pressurized Solar Water Heater",
      category: "heating",
      categoryLabel: "Water Heaters",
      price: 165000,
      badge: "Installed",
      badgeStyle: "green",
      art: "heater",
      short: "Heat-pipe evacuated tube heater for large homes, hotels and institutions.",
      description:
        "Cut your water-heating bill by up to 80% with a pressurized heat-pipe system that delivers hot water at mains pressure to showers and kitchens. Evacuated tubes capture heat even on cloudy days, while the insulated stainless-steel tank keeps water hot overnight. Includes professional installation support and electric backup element.",
      features: [
        "Works at mains pressure — strong hot showers",
        "Heat-pipe evacuated tubes for cloudy-day performance",
        "SUS304 food-grade stainless-steel inner tank",
        "Electric backup element with thermostat",
      ],
      specs: {
        "Tank Capacity": "300 litres",
        "Collector Type": "Heat-pipe evacuated tubes (30 × 58 mm × 1800 mm)",
        "Inner Tank": "SUS304 stainless steel, 2.0 mm",
        "Outer Casing": "Powder-coated galvanised steel",
        "Insulation": "55 mm high-density polyurethane foam",
        "Working Pressure": "Up to 6 bar",
        "Backup Element": "2.5 kW electric with thermostat",
        "Suitable For": "6 – 8 people / small institutions",
        "Warranty": "5 years tank, 3 years tubes",
      },
    },
    {
      id: "inverter-5kw-hybrid",
      name: "5kW Hybrid Solar Inverter",
      category: "inverters",
      categoryLabel: "Inverters",
      price: 92000,
      badge: "New",
      art: "inverter",
      short: "All-in-one pure sine wave inverter with built-in MPPT charger and Wi-Fi monitoring.",
      description:
        "The heart of a modern solar system. This hybrid inverter combines a pure sine wave inverter, MPPT solar charge controller and grid/generator charger in one wall-mount unit. It prioritises solar, stores excess in batteries and seamlessly switches to grid or generator — perfect for homes and businesses facing power outages.",
      features: [
        "Pure sine wave output — safe for sensitive electronics",
        "Built-in 100A MPPT solar charge controller",
        "Works with lithium and lead-acid batteries",
        "Wi-Fi app monitoring and LCD display",
      ],
      specs: {
        "Rated Output Power": "5,000 W / 5,000 VA",
        "Battery Voltage": "48 V DC",
        "Output Waveform": "Pure sine wave, 230 V AC, 50 Hz",
        "MPPT Range": "120 – 450 V DC",
        "Max PV Input Power": "6,000 W",
        "Max PV Open Circuit Voltage": "500 V DC",
        "Max Solar Charge Current": "100 A",
        "Peak Efficiency": "93%",
        "Transfer Time": "≤ 10 ms",
        "Monitoring": "Wi-Fi / mobile app, RS485",
        "Warranty": "2 years",
      },
    },
    {
      id: "lithium-5kwh",
      name: "5.12kWh LiFePO4 Lithium Battery",
      category: "storage",
      categoryLabel: "Batteries",
      price: 185000,
      badge: "Premium",
      art: "battery",
      artVariant: "lithium",
      short: "Long-life lithium iron phosphate battery with smart BMS for 48V hybrid systems.",
      description:
        "A wall- or rack-mounted lithium iron phosphate (LiFePO4) battery that delivers over 6,000 cycles — more than a decade of daily use. The intelligent BMS protects against over-charge, deep discharge and high temperature, and communicates directly with compatible hybrid inverters for optimal charging.",
      features: [
        "6,000+ cycles at 80% depth of discharge",
        "Smart BMS with CAN / RS485 inverter communication",
        "Expandable — connect up to 15 units in parallel",
        "Safe LiFePO4 chemistry, no thermal runaway",
      ],
      specs: {
        "Nominal Voltage": "51.2 V",
        "Capacity": "100 Ah",
        "Usable Energy": "5.12 kWh",
        "Chemistry": "Lithium Iron Phosphate (LiFePO4)",
        "Cycle Life": "≥ 6,000 cycles @ 80% DoD",
        "Max Continuous Discharge": "100 A",
        "Communication": "CAN, RS485",
        "Dimensions": "480 × 440 × 180 mm",
        "Weight": "≈ 48 kg",
        "Warranty": "5 years",
      },
    },
    {
      id: "mppt-60a",
      name: "60A MPPT Solar Charge Controller",
      category: "inverters",
      categoryLabel: "Charge Controllers",
      price: 14500,
      art: "controller",
      short: "Maximises panel output and protects batteries in 12/24/48V off-grid systems.",
      description:
        "An intelligent maximum power point tracking controller that harvests up to 30% more energy than PWM controllers. Auto-detects 12/24/48 V battery banks and supports gel, AGM, flooded and lithium batteries with configurable charging profiles.",
      features: [
        "≥ 99% MPPT tracking efficiency",
        "Auto 12 / 24 / 48 V system detection",
        "Lithium, gel, AGM and flooded battery profiles",
        "LCD display with full electronic protection",
      ],
      specs: {
        "Rated Charge Current": "60 A",
        "System Voltage": "12 / 24 / 48 V auto",
        "Max PV Input Voltage": "150 V DC",
        "Max PV Input Power": "800 W (12V) / 1600 W (24V) / 3200 W (48V)",
        "Tracking Efficiency": "≥ 99.5%",
        "Conversion Efficiency": "≤ 98%",
        "Protections": "Reverse polarity, over-current, over-temp, short circuit",
        "Operating Temperature": "-25 °C to 55 °C",
        "Warranty": "1 year",
      },
    },
    {
      id: "home-kit-1kw",
      name: "1kW Complete Home Solar Kit",
      category: "kits",
      categoryLabel: "Solar Kits",
      price: 145000,
      badge: "Bundle",
      badgeStyle: "green",
      art: "kit",
      short: "Everything a home needs: panels, inverter, battery, cables and mounting.",
      description:
        "A ready-to-install package sized for a typical Kenyan home — powering lights, TV, fridge, laptops and phone charging. Every component is matched for compatibility and the kit includes mounting structure, cables, breakers and professional installation consultation.",
      features: [
        "2 × 550W mono panels with roof mounting kit",
        "1.5kVA pure sine wave inverter with MPPT",
        "200Ah 12V deep-cycle gel battery",
        "DC/AC breakers, MC4 connectors & solar cable",
      ],
      specs: {
        "PV Array": "1.1 kWp (2 × 550 W)",
        "Inverter": "1.5 kVA / 12 V pure sine wave hybrid",
        "Battery Storage": "2.4 kWh (200 Ah @ 12 V)",
        "Daily Energy (est.)": "4 – 5 kWh in good sun",
        "Typical Loads": "10 LED bulbs, TV, fridge, laptop, phones",
        "Included Accessories": "Mounting rails, 20 m PV cable, breakers, MC4",
        "Installation": "Available in Nairobi & surrounding counties",
        "Warranty": "Per component (see individual products)",
      },
    },
    {
      id: "floodlight-200w",
      name: "200W Solar LED Floodlight",
      category: "kits",
      categoryLabel: "Solar Lighting",
      price: 7500,
      art: "light",
      short: "Dusk-to-dawn security lighting with remote control — no wiring to the grid.",
      description:
        "A standalone solar floodlight for compounds, gates, parking areas and farms. The separate solar panel charges an internal lithium battery during the day; the light switches on automatically at dusk. Set brightness and timer modes with the included remote.",
      features: [
        "Automatic dusk-to-dawn operation",
        "IP67 waterproof aluminium housing",
        "Remote control with timer and brightness modes",
        "Zero electricity bills, easy DIY mounting",
      ],
      specs: {
        "LED Rating": "200 W (high-efficiency SMD LEDs)",
        "Solar Panel": "6 V / 25 W polycrystalline, 5 m cable",
        "Battery": "3.2 V LiFePO4, 20,000 mAh",
        "Charging Time": "6 – 8 hours of sunlight",
        "Lighting Time": "10 – 12 hours (full charge)",
        "Protection Rating": "IP67",
        "Coverage": "≈ 150 m²",
        "Warranty": "1 year",
      },
    },
  ];

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const fmt = (n) => `${CONFIG.currency} ${Number(n).toLocaleString("en-KE")}`;
  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** Build a WhatsApp click-to-chat URL with a pre-filled message. */
  const waLink = (message) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const orderMessage = (p) => `I'm interested in ordering ${p.name}`;
  const installMessage = (p) =>
    `Hello Felix, I'd like to enquire about installation of the ${p.name} (${fmt(p.price)}). Please advise on a site visit and installation cost.`;

  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

  /* ---------- Product illustrations (inline SVG placeholders) ---------- */
  let artUid = 0;
  function productArt(p) {
    if (p.image) {
      return `<img class="product-art" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" style="object-fit:cover">`;
    }
    const u = `a${++artUid}`;
    const bg = `
      <defs>
        <linearGradient id="${u}bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e8fbf3"/><stop offset="1" stop-color="#fff8d6"/>
        </linearGradient>
        <radialGradient id="${u}sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#fde047"/><stop offset=".6" stop-color="#facc15"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${u}cell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1e3a5f"/><stop offset="1" stop-color="#0f1b2d"/>
        </linearGradient>
        <linearGradient id="${u}metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#cbd5e1"/>
        </linearGradient>
        <linearGradient id="${u}green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#${u}bg)"/>
      <circle cx="340" cy="58" r="70" fill="url(#${u}sun)" opacity=".85"/>
      <ellipse cx="200" cy="268" rx="150" ry="12" fill="#0f1b2d" opacity=".08"/>`;

    let body = "";
    switch (p.art) {
      case "panel": {
        let cells = "";
        for (let r = 0; r < 6; r++)
          for (let c = 0; c < 4; c++)
            cells += `<rect x="${118 + c * 42}" y="${42 + r * 34}" width="38" height="30" rx="2" fill="url(#${u}cell)"/>`;
        body = `
          <g transform="rotate(-6 200 150)">
            <rect x="110" y="34" width="180" height="218" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            ${cells}
            <path d="M118 42 L288 42 L240 140 L118 120Z" fill="#fff" opacity=".12"/>
          </g>
          <rect x="185" y="250" width="30" height="14" rx="3" fill="#64748b"/>`;
        break;
      }
      case "battery": {
        const lithium = p.artVariant === "lithium";
        body = lithium
          ? `
          <rect x="120" y="50" width="160" height="210" rx="16" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="120" y="50" width="160" height="40" rx="16" fill="#0f1b2d"/>
          <rect x="120" y="74" width="160" height="16" fill="#0f1b2d"/>
          <circle cx="146" cy="70" r="6" fill="#34d399"/><circle cx="166" cy="70" r="6" fill="#facc15"/>
          <text x="262" y="75" text-anchor="end" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" fill="#fff">LiFePO4</text>
          <rect x="145" y="120" width="110" height="18" rx="9" fill="#e2e8f0"/>
          <rect x="145" y="120" width="96" height="18" rx="9" fill="url(#${u}green)"/>
          <text x="200" y="185" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="30" font-weight="700" fill="#0f1b2d">5.12</text>
          <text x="200" y="208" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" fill="#475569">kWh · 51.2V</text>
          <path d="M193 225 l-8 16 h10 l-4 14 14-20 h-10 l6-10z" fill="#facc15"/>`
          : `
          <rect x="140" y="60" width="26" height="18" rx="3" fill="#dc2626"/>
          <rect x="234" y="60" width="26" height="18" rx="3" fill="#0f1b2d"/>
          <rect x="100" y="74" width="200" height="180" rx="14" fill="#16263d"/>
          <rect x="100" y="74" width="200" height="36" rx="14" fill="#22364f"/>
          <rect x="100" y="96" width="200" height="14" fill="#22364f"/>
          <rect x="120" y="128" width="160" height="80" rx="8" fill="url(#${u}green)"/>
          <text x="200" y="168" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="30" font-weight="700" fill="#fff">200Ah</text>
          <text x="200" y="192" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#ecfdf5">12V DEEP CYCLE GEL</text>
          <path d="M193 218 l-8 14 h10 l-4 14 14-20 h-10 l6-8z" fill="#facc15"/>`;
        break;
      }
      case "heater": {
        let tubes = "";
        for (let i = 0; i < 9; i++) {
          const x = 108 + i * 22;
          tubes += `<line x1="${x}" y1="110" x2="${x - 50}" y2="240" stroke="#0f1b2d" stroke-width="13" stroke-linecap="round"/>
                    <line x1="${x - 2}" y1="114" x2="${x - 48}" y2="234" stroke="#64748b" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
        }
        body = `
          ${tubes}
          <line x1="60" y1="240" x2="300" y2="240" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <line x1="300" y1="100" x2="300" y2="240" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <rect x="80" y="74" width="240" height="50" rx="25" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="96" y="86" width="40" height="26" rx="6" fill="#facc15" opacity=".9"/>
          <text x="116" y="104" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700" fill="#0f1b2d">300L</text>
          <path d="M330 150 q8 -12 0 -24 q-8 -12 0 -24" stroke="#f97316" stroke-width="4" fill="none" opacity=".7"/>
          <path d="M350 160 q8 -12 0 -24 q-8 -12 0 -24" stroke="#f97316" stroke-width="4" fill="none" opacity=".5"/>`;
        break;
      }
      case "inverter":
        body = `
          <rect x="120" y="40" width="160" height="222" rx="16" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="138" y="62" width="124" height="70" rx="8" fill="#0f1b2d"/>
          <text x="152" y="92" font-family="Space Grotesk, sans-serif" font-size="22" font-weight="700" fill="#34d399">4.86</text>
          <text x="210" y="92" font-family="Inter, sans-serif" font-size="11" fill="#94a3b8">kW</text>
          <rect x="152" y="104" width="96" height="8" rx="4" fill="#22364f"/>
          <rect x="152" y="104" width="78" height="8" rx="4" fill="#facc15"/>
          <circle cx="160" cy="154" r="6" fill="#34d399"/><circle cx="182" cy="154" r="6" fill="#facc15"/><circle cx="204" cy="154" r="6" fill="#cbd5e1"/>
          <rect x="140" y="180" width="120" height="6" rx="3" fill="#cbd5e1"/>
          <rect x="140" y="194" width="120" height="6" rx="3" fill="#cbd5e1"/>
          <rect x="140" y="208" width="120" height="6" rx="3" fill="#cbd5e1"/>
          <text x="200" y="245" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="15" font-weight="700" fill="#059669">HYBRID 5kW</text>`;
        break;
      case "controller":
        body = `
          <rect x="110" y="70" width="180" height="170" rx="14" fill="#16263d"/>
          <rect x="110" y="70" width="180" height="26" rx="13" fill="#22364f"/>
          <rect x="132" y="106" width="136" height="56" rx="6" fill="#bef264" opacity=".9"/>
          <text x="200" y="142" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="22" font-weight="700" fill="#0f1b2d">13.8V · 42A</text>
          <rect x="140" y="176" width="28" height="12" rx="6" fill="#34d399"/>
          <rect x="186" y="176" width="28" height="12" rx="6" fill="#facc15"/>
          <rect x="232" y="176" width="28" height="12" rx="6" fill="#64748b"/>
          ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${128 + i * 25}" y="204" width="17" height="22" rx="3" fill="#475569"/>`).join("")}
          <text x="200" y="88" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#facc15">MPPT 60A</text>`;
        break;
      case "kit": {
        let mini = "";
        for (let r = 0; r < 3; r++)
          for (let c = 0; c < 4; c++)
            mini += `<rect x="${62 + c * 26}" y="${62 + r * 32}" width="23" height="29" rx="2" fill="url(#${u}cell)"/>`;
        body = `
          <g transform="rotate(-8 115 110)">
            <rect x="56" y="56" width="116" height="108" rx="5" fill="#cbd5e1"/>${mini}
          </g>
          <rect x="196" y="70" width="86" height="120" rx="12" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="208" y="84" width="62" height="34" rx="5" fill="#0f1b2d"/>
          <text x="239" y="106" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" fill="#34d399">1.5kVA</text>
          <circle cx="220" cy="136" r="5" fill="#34d399"/><circle cx="238" cy="136" r="5" fill="#facc15"/>
          <rect x="296" y="140" width="76" height="104" rx="10" fill="#16263d"/>
          <rect x="306" y="166" width="56" height="40" rx="6" fill="url(#${u}green)"/>
          <path d="M332 174 l-6 12 h8 l-3 12 11-16 h-8 l4-8z" fill="#facc15"/>
          <rect x="74" y="190" width="104" height="64" rx="10" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
          <path d="M98 238 v-22 l28 -18 l28 18 v22z" fill="#facc15"/>
          <rect x="118" y="222" width="16" height="16" fill="#0f1b2d"/>
          <path d="M172 130 C 185 130, 185 130, 196 130" stroke="#0f1b2d" stroke-width="3" stroke-dasharray="5 4"/>
          <path d="M282 160 C 290 160, 290 180, 296 180" stroke="#0f1b2d" stroke-width="3" stroke-dasharray="5 4"/>`;
        break;
      }
      case "light":
        body = `
          <rect x="60" y="160" width="100" height="70" rx="4" fill="#cbd5e1" transform="rotate(-10 110 195)"/>
          <g transform="rotate(-10 110 195)">
            ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${65 + c * 24}" y="${165 + r * 21}" width="21" height="18" rx="1.5" fill="url(#${u}cell)"/>`).join("")).join("")}
          </g>
          <path d="M160 200 C 200 220, 220 200, 236 170" stroke="#0f1b2d" stroke-width="3" fill="none"/>
          <path d="M210 120 L 380 60 L 380 280 L 210 170Z" fill="#fde047" opacity=".35"/>
          <rect x="190" y="88" width="120" height="100" rx="10" fill="#16263d" transform="rotate(8 250 138)"/>
          <g transform="rotate(8 250 138)">
            <rect x="202" y="100" width="96" height="76" rx="6" fill="#fef9c3"/>
            ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<circle cx="${216 + c * 23}" cy="${115 + r * 23}" r="7" fill="#facc15"/>`).join("")).join("")}
          </g>
          <rect x="240" y="186" width="20" height="40" rx="4" fill="#475569"/>`;
        break;
      default:
        body = "";
    }
    return `<svg class="product-art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${escapeHTML(p.name)} illustration" style="stroke:none">${bg}${body}</svg>`;
  }

  /* ---------- Render product cards ---------- */
  const grid = $("#productGrid");

  function renderProducts() {
    grid.innerHTML = PRODUCTS.map(
      (p, i) => `
      <article class="product-card" data-id="${p.id}" data-category="${p.category}" tabindex="0"
               aria-label="${escapeHTML(p.name)}, ${fmt(p.price)}. Press Enter for details." style="animation-delay:${i * 60}ms">
        <div class="card-media">
          ${p.badge ? `<span class="card-badge ${p.badgeStyle || ""}">${escapeHTML(p.badge)}</span>` : ""}
          ${productArt(p)}
          <div class="card-overlay">
            <button type="button" class="btn btn-cart" data-action="add" data-id="${p.id}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><path d="M12 9v4M10 11h4"/></svg>
              Add to Cart
            </button>
            <a class="btn btn-whatsapp" data-action="whatsapp" href="${waLink(orderMessage(p))}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" class="wa-icon" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>
              Order on WhatsApp
            </a>
            <span class="overlay-hint">or click the card for full specs</span>
          </div>
        </div>
        <div class="card-body">
          <span class="card-cat">${escapeHTML(p.categoryLabel)}</span>
          <h3 class="card-title">${escapeHTML(p.name)}</h3>
          <p class="card-desc">${escapeHTML(p.short)}</p>
          <div class="card-foot">
            <span class="card-price">${fmt(p.price)}<small>Indicative price</small></span>
            <span class="card-more">Details <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </div>
          <div class="card-mobile-actions">
            <button type="button" class="btn btn-cart" data-action="add" data-id="${p.id}">Add to Cart</button>
            <a class="btn btn-whatsapp" data-action="whatsapp" href="${waLink(orderMessage(p))}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </article>`
    ).join("");
  }

  // Event delegation: action buttons vs. opening the modal
  grid.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      e.stopPropagation();
      if (actionEl.dataset.action === "add") {
        e.preventDefault();
        addToCart(actionEl.dataset.id);
      }
      return; // WhatsApp links follow their href
    }
    const card = e.target.closest(".product-card");
    if (card) openModal(card.dataset.id, card);
  });

  grid.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("product-card")) {
      e.preventDefault();
      openModal(e.target.dataset.id, e.target);
    }
  });

  /* ---------- Category filters ---------- */
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", String(on));
    });
    const f = btn.dataset.filter;
    $$(".product-card", grid).forEach((card) => {
      card.classList.toggle("hidden", f !== "all" && card.dataset.category !== f);
    });
  });

  /* ---------- Product modal ---------- */
  const modal = $("#productModal");
  let lastFocused = null;
  let currentProduct = null;

  function openModal(id, trigger) {
    const p = findProduct(id);
    if (!p) return;
    currentProduct = p;
    lastFocused = trigger || document.activeElement;

    $("#modalMedia").innerHTML = productArt(p);
    $("#modalCat").textContent = p.categoryLabel;
    $("#modalTitle").textContent = p.name;
    $("#modalPrice").innerHTML = `${fmt(p.price)}<small>Installation quoted separately</small>`;
    $("#modalDesc").textContent = p.description;
    $("#modalFeatures").innerHTML = p.features.map((f) => `<li>${escapeHTML(f)}</li>`).join("");
    $("#modalSpecs").innerHTML = Object.entries(p.specs)
      .map(([k, v]) => `<tr><th scope="row">${escapeHTML(k)}</th><td>${escapeHTML(v)}</td></tr>`)
      .join("");
    $("#modalWhatsApp").href = waLink(orderMessage(p));
    $("#modalInstall").href = waLink(installMessage(p));

    modal.hidden = false;
    document.body.classList.add("no-scroll");
    $(".modal-body", modal).scrollTop = 0;
    $(".modal-panel", modal).scrollTop = 0;
    requestAnimationFrame(() => $(".modal-close", modal).focus());
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    currentProduct = null;
    if (!cartDrawer.classList.contains("open")) document.body.classList.remove("no-scroll");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });

  $("#modalAddCart").addEventListener("click", () => {
    if (currentProduct) addToCart(currentProduct.id);
  });

  // Keep keyboard focus inside open dialogs
  function trapFocus(container, e) {
    const focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', container).filter(
      (el) => el.offsetParent !== null
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!modal.hidden) closeModal();
      else if (cartDrawer.classList.contains("open")) closeCart();
    }
    if (e.key === "Tab") {
      if (!modal.hidden) trapFocus(modal, e);
      else if (cartDrawer.classList.contains("open")) trapFocus(cartDrawer, e);
    }
  });

  /* ---------- Cart ---------- */
  const cartDrawer = $("#cartDrawer");
  const drawerBackdrop = $("#drawerBackdrop");
  const cartBtn = $("#cartBtn");
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(CONFIG.cartStorageKey) || "{}");
      // Drop anything that no longer exists in the catalog
      return Object.fromEntries(
        Object.entries(raw).filter(([id, q]) => findProduct(id) && Number.isInteger(q) && q > 0)
      );
    } catch {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CONFIG.cartStorageKey, JSON.stringify(cart));
    } catch {
      /* storage unavailable (private mode) — cart still works for this visit */
    }
  }

  function addToCart(id, qty = 1) {
    const p = findProduct(id);
    if (!p) return;
    cart[id] = (cart[id] || 0) + qty;
    saveCart();
    renderCart();
    showToast(`${p.name} added to cart`);
    const badge = $("#cartCount");
    badge.classList.remove("bump");
    void badge.offsetWidth; // restart animation
    badge.classList.add("bump");
  }

  function setQty(id, qty) {
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    saveCart();
    renderCart();
  }

  function renderCart() {
    const entries = Object.entries(cart);
    const count = entries.reduce((n, [, q]) => n + q, 0);
    const total = entries.reduce((sum, [id, q]) => sum + findProduct(id).price * q, 0);

    const badge = $("#cartCount");
    badge.textContent = count;
    badge.classList.toggle("show", count > 0);
    cartBtn.setAttribute("aria-label", `Open cart (${count} item${count === 1 ? "" : "s"})`);

    $("#cartEmpty").hidden = count > 0;
    $("#cartFoot").hidden = count === 0;
    $("#cartTotal").textContent = fmt(total);

    $("#cartItems").innerHTML = entries
      .map(([id, q]) => {
        const p = findProduct(id);
        return `
        <li class="cart-item" data-id="${id}">
          <div class="cart-thumb">${productArt(p)}</div>
          <div class="cart-info">
            <h3>${escapeHTML(p.name)}</h3>
            <p>${fmt(p.price)}</p>
            <div class="qty" aria-label="Quantity">
              <button type="button" data-qty="-1" aria-label="Decrease quantity">−</button>
              <span>${q}</span>
              <button type="button" data-qty="1" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div>
            <div class="cart-line">${fmt(p.price * q)}</div>
            <button type="button" class="remove-btn" data-remove>Remove</button>
          </div>
        </li>`;
      })
      .join("");

    if (count > 0) {
      const lines = entries.map(([id, q]) => {
        const p = findProduct(id);
        return `• ${q} × ${p.name} — ${fmt(p.price * q)}`;
      });
      const msg = `Hello Felix, I'm interested in ordering the following solar products:\n\n${lines.join("\n")}\n\nEstimated total: ${fmt(total)}\n\nPlease confirm availability and delivery/installation details.`;
      $("#cartCheckout").href = waLink(msg);
    }
  }

  $("#cartItems").addEventListener("click", (e) => {
    const item = e.target.closest(".cart-item");
    if (!item) return;
    const id = item.dataset.id;
    const qtyBtn = e.target.closest("[data-qty]");
    if (qtyBtn) setQty(id, (cart[id] || 0) + Number(qtyBtn.dataset.qty));
    if (e.target.closest("[data-remove]")) setQty(id, 0);
  });

  $("#cartClear").addEventListener("click", () => {
    cart = {};
    saveCart();
    renderCart();
  });

  function openCart() {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    drawerBackdrop.hidden = false;
    cartBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    setTimeout(() => $("#cartClose").focus(), 50);
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    drawerBackdrop.hidden = true;
    cartBtn.setAttribute("aria-expanded", "false");
    if (modal.hidden) document.body.classList.remove("no-scroll");
    cartBtn.focus();
  }

  cartBtn.addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  drawerBackdrop.addEventListener("click", closeCart);
  $("#cartBrowse").addEventListener("click", closeCart);

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(text) {
    const t = $("#toast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------- Generic WhatsApp links (data-wa="message") ---------- */
  $$("[data-wa]").forEach((el) => {
    el.href = waLink(el.dataset.wa);
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  /* ---------- Navigation ---------- */
  const header = $(".site-header");
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section in view
  if ("IntersectionObserver" in window) {
    const links = $$(".nav-links a");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["products", "about", "contact"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) sectionObserver.observe(s);
    });

    // Reveal-on-scroll animations
    const revealEls = $$(".section-head, .about-visual, .about-copy, .contact-card, .feature, .cta-inner");
    revealEls.forEach((el) => el.classList.add("reveal"));
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderProducts();
  renderCart();
})();
