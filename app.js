document.addEventListener("DOMContentLoaded", () => {
  // Curated cities (Indian hubs + select international dream spots)
  const CITIES = [
    { name: "Bengaluru", region: "Karnataka, India" },
    { name: "Chitradurga", region: "Karnataka, India" },
    { name: "Hampi", region: "Karnataka, India" },
    { name: "Coorg", region: "Karnataka, India" },
    { name: "Gokarna", region: "Karnataka, India" },
    { name: "Mysuru", region: "Karnataka, India" },
    { name: "Mangaluru", region: "Karnataka, India" },
    { name: "Mumbai", region: "Maharashtra, India" },
    { name: "Pune", region: "Maharashtra, India" },
    { name: "Delhi", region: "NCR, India" },
    { name: "Goa", region: "India" },
    { name: "Udaipur", region: "Rajasthan, India" },
    { name: "Jaipur", region: "Rajasthan, India" },
    { name: "Manali", region: "Himachal Pradesh, India" },
    { name: "Rishikesh", region: "Uttarakhand, India" },
    { name: "Leh", region: "Ladakh, India" },
    { name: "Munnar", region: "Kerala, India" },
    { name: "Kochi", region: "Kerala, India" },
    { name: "Varanasi", region: "Uttar Pradesh, India" },
    { name: "Hyderabad", region: "Telangana, India" },
    { name: "Chennai", region: "Tamil Nadu, India" },
    { name: "Kolkata", region: "West Bengal, India" },
    { name: "Tokyo", region: "Japan" },
    { name: "Singapore", region: "Singapore" }
  ];

  // Pool of destinations categorized by vibe
  const EXPLORE_POOL = [
    {
      city: "Gokarna",
      vibe: "beaches",
      tag: "🏖️ Beaches",
      title: "Gokarna & Kudle Coast",
      desc: "Quiet cliffside beaches & golden Arabian Sea sunsets",
      img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Goa",
      vibe: "beaches",
      tag: "🌴 Coastal",
      title: "South Goa Palolem Cove",
      desc: "Palm-fringed shores, beach shacks & sea breezes",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Kochi",
      vibe: "beaches",
      tag: "⛵ Backwaters",
      title: "Fort Kochi & Arabian Coast",
      desc: "Chinese fishing nets, coastal cafes & spice alleys",
      img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Coorg",
      vibe: "mountains",
      tag: "🌿 Misty Hills",
      title: "Coorg Coffee Estates",
      desc: "Emerald plantations, waterfalls & cool Western Ghats",
      img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Manali",
      vibe: "mountains",
      tag: "🏔️ Himalayas",
      title: "Manali & Solang Peaks",
      desc: "Snow-dusted pine valleys & high mountain passes",
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Munnar",
      vibe: "mountains",
      tag: "🍃 Tea Valleys",
      title: "Munnar Rolling Hills",
      desc: "Endless green tea terraces & crisp mountain mist",
      img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Leh",
      vibe: "mountains",
      tag: "🏍️ High Passes",
      title: "Leh & Pangong Tso",
      desc: "Crystal-blue Himalayan lakes & rugged monasteries",
      img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Varanasi",
      vibe: "heritage",
      tag: "🪔 Ganga Ghats",
      title: "Varanasi Ghat Boats & Aarti",
      desc: "Sacred riverfront steps, evening lamps & old-city lanes",
      img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Hampi",
      vibe: "heritage",
      tag: "🏛️ Heritage",
      title: "Hampi Stone Chariots",
      desc: "Ancient Vijayanagara ruins & boulder-strewn hills",
      img: "https://images.unsplash.com/photo-1600100397608-f010f423b971?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Udaipur",
      vibe: "heritage",
      tag: "👑 Royal Lakes",
      title: "Udaipur City of Lakes",
      desc: "Marble palaces glowing over Lake Pichola at dusk",
      img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Jaipur",
      vibe: "heritage",
      tag: "🏰 Pink City",
      title: "Jaipur & Amber Fort",
      desc: "Sandstone palaces, bustling bazaars & desert sunsets",
      img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Mumbai",
      vibe: "city",
      tag: "🌃 City Lights",
      title: "Mumbai Marine Drive",
      desc: "Queen's Necklace skyline & midnight sea breeze",
      img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
    },
    {
      city: "Tokyo",
      vibe: "city",
      tag: "🗼 Neon Skyline",
      title: "Tokyo Midnight Lights",
      desc: "Shibuya crossings, bullet trains & late-night street food",
      img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Scenic cover images matched to saved trip cards
  const DESTINATION_COVERS = {
    goa: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    gokarna: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    hampi: "https://images.unsplash.com/photo-1600100397608-f010f423b971?auto=format&fit=crop&w=800&q=80",
    coorg: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    udaipur: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80",
    manali: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    munnar: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=80",
    varanasi: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
    mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    leh: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    rishikesh: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    bengaluru: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
    mysuru: "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?auto=format&fit=crop&w=800&q=80",
    kochi: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    chennai: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    hyderabad: "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=800&q=80",
    kolkata: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
    chitradurga: "https://images.unsplash.com/photo-1600100397608-f010f423b971?auto=format&fit=crop&w=800&q=80",
    tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80"
  };

  const DEFAULT_COVER = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";

  // Initial transit schedules (replaced/enriched by /api/fares calls)
  let schedules = [
    { id: 1, mode: "Flight", operator: "IndiGo 6E-412", from: "Bengaluru", to: "Goa", depart: "07:15 AM", duration: "1h 15m", price: 3199, prevPrice: 3650, seats: 5 },
    { id: 2, mode: "Train", operator: "Hampi Express", from: "Bengaluru", to: "Hampi", depart: "10:15 PM", duration: "8h 30m", price: 680, prevPrice: 680, seats: 18 },
    { id: 3, mode: "Bus", operator: "KSRTC Airavat Club", from: "Bengaluru", to: "Coorg", depart: "11:00 PM", duration: "5h 45m", price: 890, prevPrice: 980, seats: 9 },
    { id: 4, mode: "Train", operator: "Vande Bharat Exp", from: "Bengaluru", to: "Chennai", depart: "05:50 AM", duration: "4h 25m", price: 1150, prevPrice: 1150, seats: 14 },
    { id: 5, mode: "Flight", operator: "Air India AI-505", from: "Delhi", to: "Udaipur", depart: "02:10 PM", duration: "1h 25m", price: 4250, prevPrice: 4890, seats: 6 },
    { id: 6, mode: "Bus", operator: "IntrCity SmartBus", from: "Bengaluru", to: "Gokarna", depart: "09:30 PM", duration: "9h 50m", price: 1299, prevPrice: 1450, seats: 4 },
    { id: 7, mode: "Flight", operator: "ANA NH-830", from: "Delhi", to: "Tokyo", depart: "01:15 AM", duration: "7h 35m", price: 34200, prevPrice: 37500, seats: 4 }
  ];

  // Safely load saved trips from localStorage
  let savedTrips = [];
  try {
    const raw = JSON.parse(localStorage.getItem("dreamroute_saved_trips"));
    savedTrips = Array.isArray(raw) ? raw : [
      { id: 101, from: "Bengaluru", to: "Hampi", date: "2026-12-24", budget: 1500 }
    ];
  } catch (err) {
    savedTrips = [{ id: 101, from: "Bengaluru", to: "Hampi", date: "2026-12-24", budget: 1500 }];
  }

  let quickCheckedRoutes = [];
  let activeVibe = "all";
  let activeMode = "all";
  let activeRoute = "all";
  let sortBy = "price-asc";

  // Pending state for modals
  let pendingDeleteId = null;
  let pendingNewTrip = null;

  // DOM Elements
  const tripForm = document.getElementById("trip-form");
  const vibeGrid = document.getElementById("vibe-grid");
  const tripsGrid = document.getElementById("trips-grid");
  const tripCount = document.getElementById("trip-count");
  const transitFeed = document.getElementById("transit-feed");
  const routeSelect = document.getElementById("route-select");
  const sortSelect = document.getElementById("sort-select");
  const lastUpdated = document.getElementById("last-updated");
  const toastEl = document.getElementById("toast");

  // Radar Loader Elements
  const radarLoader = document.getElementById("radar-loader");
  const radarText = document.getElementById("radar-text");

  // Delete Modal Elements
  const confirmModal = document.getElementById("confirm-modal");
  const modalDesc = document.getElementById("modal-desc");
  const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

  // Return Trip Modal Elements
  const returnModal = document.getElementById("return-modal");
  const returnModalDesc = document.getElementById("return-modal-desc");
  const returnDateInput = document.getElementById("return-date-input");
  const oneWayOnlyBtn = document.getElementById("one-way-only-btn");
  const addWithReturnBtn = document.getElementById("add-with-return-btn");

  // Footer Year & Theme Setup
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("dreamroute_theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("dreamroute_theme", isDark ? "dark" : "light");
  });

  // Async Radar Loader Helper (stays open until API fetch finishes)
  async function runWithRadar(message, asyncTask) {
    if (radarLoader) {
      if (radarText) radarText.textContent = message;
      radarLoader.classList.add("active");
      radarLoader.setAttribute("aria-hidden", "false");
    }

    const minDelay = new Promise(resolve => setTimeout(resolve, 450));
    try {
      const [result] = await Promise.all([asyncTask(), minDelay]);
      return result;
    } finally {
      if (radarLoader) {
        radarLoader.classList.remove("active");
        radarLoader.setAttribute("aria-hidden", "true");
      }
    }
  }

  // Fetch live fares from Node.js backend (/api/fares)
  async function fetchAndMergeFares(from, to, date, budget) {
    try {
      const params = new URLSearchParams({ from, to });
      if (date) params.set("date", date);
      if (budget) params.set("budget", budget);

      const response = await fetch(`/api/fares?${params.toString()}`);
      if (!response.ok) throw new Error("Backend request failed");

      const data = await response.json();
      if (Array.isArray(data.results) && data.results.length > 0) {
        schedules = schedules.filter(
          s => !(s.from.toLowerCase() === from.toLowerCase() && s.to.toLowerCase() === to.toLowerCase())
        );
        schedules = [...data.results, ...schedules];
        return { ok: true, liveApiActive: Boolean(data.liveApiActive) };
      }
    } catch (err) {
      // Fallback if server is unreachable
      const exists = schedules.some(
        s => s.from.toLowerCase() === from.toLowerCase() && s.to.toLowerCase() === to.toLowerCase()
      );
      if (!exists) {
        const baseEstimate = budget || 3600;
        schedules.unshift(
          { id: Date.now() + 1, mode: "Flight", operator: "IndiGo / Akasa Direct", from, to, depart: "08:20 AM", duration: "1h 45m", price: Math.round(baseEstimate * 0.95), prevPrice: Math.round(baseEstimate * 1.12), seats: 6 },
          { id: Date.now() + 2, mode: "Train", operator: "Shatabdi / Superfast Exp", from, to, depart: "06:40 PM", duration: "7h 50m", price: Math.round(baseEstimate * 0.35), prevPrice: Math.round(baseEstimate * 0.35), seats: 15 },
          { id: Date.now() + 3, mode: "Bus", operator: "Airavat / Volvo Sleeper", from, to, depart: "10:15 PM", duration: "9h 30m", price: Math.round(baseEstimate * 0.28), prevPrice: Math.round(baseEstimate * 0.33), seats: 9 }
        );
      }
    }
    return { ok: false, liveApiActive: false };
  }

  // Helper: Format YYYY-MM-DD into dd/mm/yyyy
  function formatDateDDMMYYYY(isoDateStr) {
    if (!isoDateStr || !isoDateStr.includes("-")) return isoDateStr;
    const [yyyy, mm, dd] = isoDateStr.split("-");
    return `${dd}/${mm}/${yyyy}`;
  }

  // Helper: Add days to YYYY-MM-DD to suggest a default return date
  function addDaysToISO(isoDateStr, daysToAdd) {
    const dt = new Date(isoDateStr + "T00:00:00");
    if (isNaN(dt.getTime())) return isoDateStr;
    dt.setDate(dt.getDate() + daysToAdd);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  // Helper: Show notification toast
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  // Shuffle order once per page load so every visit brings fresh cards
  const shuffledExplorePool = [...EXPLORE_POOL].sort(() => Math.random() - 0.5);
  const compactMediaQuery = window.matchMedia("(max-width: 920px)");

  function renderExploreVibes() {
    if (!vibeGrid) return;

    const targetCount = compactMediaQuery.matches ? 6 : 4;
    let pool = activeVibe === "all"
      ? shuffledExplorePool
      : shuffledExplorePool.filter(item => item.vibe === activeVibe);

    if (pool.length < targetCount) {
      const extras = shuffledExplorePool.filter(item => !pool.includes(item));
      pool = [...pool, ...extras];
    }

    const visibleCards = pool.slice(0, targetCount);

    vibeGrid.innerHTML = visibleCards.map(item => `
      <button type="button" class="vibe-card" data-city="${item.city}">
        <img src="${item.img}" alt="${item.title}" loading="lazy" />
        <div class="vibe-overlay">
          <span class="vibe-tag">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </button>
    `).join("");
  }

  compactMediaQuery.addEventListener("change", renderExploreVibes);

  const vibeFilters = document.getElementById("vibe-filters");
  if (vibeFilters) {
    vibeFilters.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      vibeFilters.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      activeVibe = btn.dataset.vibe;
      renderExploreVibes();
    });
  }

  vibeGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".vibe-card");
    if (!card) return;

    const city = card.dataset.city;
    const destInput = document.getElementById("destination");
    const originInput = document.getElementById("origin");

    destInput.value = city;
    showToast(`Selected ${city} — enter your departure city & date!`);

    if (!originInput.value.trim()) {
      originInput.focus();
    } else {
      document.getElementById("travel-date").focus();
    }
  });

  // Setup City Autocomplete Dropdowns
  function setupCityAutocomplete(inputId, dropdownId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    function renderOptions(query) {
      const clean = query.trim().toLowerCase();
      const matches = CITIES.filter(
        c => c.name.toLowerCase().includes(clean) || c.region.toLowerCase().includes(clean)
      );

      dropdown.innerHTML = "";
      if (matches.length === 0) {
        dropdown.classList.remove("open");
        return;
      }

      matches.forEach(city => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${city.name}</strong> <span class="city-meta">${city.region}</span>`;
        li.addEventListener("mousedown", (e) => {
          e.preventDefault();
          input.value = city.name;
          dropdown.classList.remove("open");
        });
        dropdown.appendChild(li);
      });

      dropdown.classList.add("open");
    }

    input.addEventListener("focus", () => renderOptions(input.value));
    input.addEventListener("input", () => renderOptions(input.value));
    input.addEventListener("blur", () => {
      setTimeout(() => dropdown.classList.remove("open"), 150);
    });
  }

  setupCityAutocomplete("origin", "origin-dropdown");
  setupCityAutocomplete("destination", "destination-dropdown");

  function getDestinationImage(cityName) {
    const key = String(cityName || "").trim().toLowerCase();
    return DESTINATION_COVERS[key] || DEFAULT_COVER;
  }

  function getCountdownText(dateStr) {
    const target = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    if (isNaN(days)) return "Upcoming";
    if (days < 0) return "Trip date passed";
    if (days === 0) return "Departing Today!";
    if (days === 1) return "1 day left";
    return `${days} days left`;
  }

  function saveTrips() {
    localStorage.setItem("dreamroute_saved_trips", JSON.stringify(savedTrips));
  }

  function rebuildRouteDropdown() {
    routeSelect.innerHTML = `<option value="all">All Routes</option>`;
    const seen = new Set();

    savedTrips.forEach(trip => {
      const key = `${trip.from.toLowerCase()}-${trip.to.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = `📌 ${trip.from} → ${trip.to}`;
      if (activeRoute === key) opt.selected = true;
      routeSelect.appendChild(opt);
    });

    quickCheckedRoutes.forEach(item => {
      const key = `${item.from.toLowerCase()}-${item.to.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = `🔍 ${item.from} → ${item.to} (Fare Check)`;
      if (activeRoute === key) opt.selected = true;
      routeSelect.appendChild(opt);
    });
  }

  // Render Saved Trips & Countdowns (Dates shown in dd/mm/yyyy)
  function renderTrips() {
    tripsGrid.innerHTML = "";
    tripCount.textContent = `${savedTrips.length} ${savedTrips.length === 1 ? "Trip" : "Trips"}`;
    rebuildRouteDropdown();

    if (savedTrips.length === 0) {
      tripsGrid.innerHTML = `<p class="muted">No trips saved yet. Add a dream trip above or use "Check Fares Only" to browse prices!</p>`;
      return;
    }

    savedTrips.forEach(trip => {
      const matchingFares = schedules.filter(
        s => s.from.toLowerCase() === trip.from.toLowerCase() && s.to.toLowerCase() === trip.to.toLowerCase()
      );
      const bestPrice = matchingFares.length ? Math.min(...matchingFares.map(m => m.price)) : null;

      const budgetLabel = trip.budget ? `Max Budget: ₹${Number(trip.budget).toLocaleString()}` : "Flexible Budget";
      const formattedDate = formatDateDDMMYYYY(trip.date);

      let statusHtml = `<div class="budget-status">Scanning upcoming schedules...</div>`;
      if (bestPrice !== null) {
        if (!trip.budget) {
          statusHtml = `<div class="budget-status status-good">🏷️ Lowest fare found: ₹${bestPrice.toLocaleString()}</div>`;
        } else if (bestPrice <= trip.budget) {
          statusHtml = `<div class="budget-status status-good">✅ Best fare ₹${bestPrice.toLocaleString()} fits your ₹${Number(trip.budget).toLocaleString()} budget</div>`;
        } else {
          statusHtml = `<div class="budget-status status-warn">⚠️ Lowest ₹${bestPrice.toLocaleString()} (₹${(bestPrice - trip.budget).toLocaleString()} above budget)</div>`;
        }
      }

      const coverUrl = getDestinationImage(trip.to);

      const card = document.createElement("article");
      card.className = "trip-card";
      card.innerHTML = `
        <div class="trip-cover">
          <img src="${coverUrl}" alt="${trip.to} scenery" loading="lazy" />
          <div class="trip-cover-overlay">
            <span class="countdown-badge">⏳ ${getCountdownText(trip.date)}</span>
            <button type="button" class="remove-btn" data-id="${trip.id}" title="Cancel trip">✕</button>
          </div>
        </div>
        <div class="trip-body">
          <div class="trip-route">${trip.from} → ${trip.to}</div>
          <div class="trip-details">Target Date: <strong>${formattedDate}</strong> • ${budgetLabel}</div>
          ${statusHtml}
        </div>
      `;
      tripsGrid.appendChild(card);
    });
  }

  // Render Live Transit Feed
  function renderFeed() {
    transitFeed.innerHTML = "";

    let filtered = schedules.filter(item => {
      const modeMatch = activeMode === "all" || item.mode === activeMode;
      const key = `${item.from.toLowerCase()}-${item.to.toLowerCase()}`;
      const routeMatch = activeRoute === "all" || key === activeRoute;
      return modeMatch && routeMatch;
    });

    filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "drop") return (a.price - a.prevPrice) - (b.price - b.prevPrice);
      return 0;
    });

    if (filtered.length === 0) {
      transitFeed.innerHTML = `<p class="muted">No schedules match the selected filter.</p>`;
      return;
    }

    filtered.forEach(item => {
      const icon = item.mode === "Flight" ? "✈️" : item.mode === "Train" ? "🚆" : "🚌";
      const diff = item.price - item.prevPrice;
      let trendClass = "flat";
      let trendText = "● Stable fare";

      if (diff < 0) {
        trendClass = "down";
        trendText = `↓ ₹${Math.abs(diff).toLocaleString()} price drop`;
      } else if (diff > 0) {
        trendClass = "up";
        trendText = `↑ ₹${diff.toLocaleString()} rising`;
      }

      const sourceBadge = item.source === "live-api" ? " • 🟢 Live API" : "";

      const row = document.createElement("div");
      row.className = "transit-card";
      row.innerHTML = `
        <div class="transit-main">
          <div class="mode-icon">${icon}</div>
          <div>
            <div class="transit-title">${item.from} → ${item.to}</div>
            <div class="transit-sub">${item.operator} • Departs ${item.depart} (${item.duration}) • ${item.seats} seats left${sourceBadge}</div>
          </div>
        </div>
        <div class="transit-right">
          <div class="price-col">
            <div class="fare">₹${item.price.toLocaleString()}</div>
            <div class="trend ${trendClass}">${trendText}</div>
          </div>
          <button type="button" class="btn btn-outline alert-btn" data-route="${item.from} → ${item.to}">🔔 Alert</button>
        </div>
      `;
      transitFeed.appendChild(row);
    });
  }

  // 1. Intercept "+ Track Trip" to ask if they want to plan a return trip as well
  tripForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const from = document.getElementById("origin").value.trim();
    const to = document.getElementById("destination").value.trim();
    const date = document.getElementById("travel-date").value;
    const rawBudget = document.getElementById("budget").value.trim();
    const budget = rawBudget ? Number(rawBudget) : null;

    if (!from || !to || !date) return;

    pendingNewTrip = { from, to, date, budget };
    returnModalDesc.textContent = `Outbound: ${from} → ${to} on ${formatDateDDMMYYYY(date)}. Want to also add a return trip (${to} → ${from})?`;
    returnDateInput.min = date;
    returnDateInput.value = addDaysToISO(date, 3);
    returnModal.classList.add("open");
  });

  async function finalizeTripSave(includeReturn) {
    if (!pendingNewTrip) return;
    const { from, to, date, budget } = pendingNewTrip;
    const retDate = includeReturn && returnDateInput.value ? returnDateInput.value : null;

    savedTrips.unshift({ id: Date.now(), from, to, date, budget });
    if (retDate) {
      savedTrips.unshift({ id: Date.now() + 50, from: to, to: from, date: retDate, budget });
    }

    saveTrips();
    pendingNewTrip = null;
    returnModal.classList.remove("open");
    tripForm.reset();

    await runWithRadar(`Querying backend fares for ${from} → ${to}...`, async () => {
      const outboundRes = await fetchAndMergeFares(from, to, date, budget);
      if (retDate) {
        await fetchAndMergeFares(to, from, retDate, budget);
      }

      renderTrips();
      renderFeed();

      const sourceNote = outboundRes.liveApiActive ? " (Live API)" : "";
      const toastMsg = retDate
        ? `Saved outbound (${formatDateDDMMYYYY(date)}) & return (${formatDateDDMMYYYY(retDate)})${sourceNote}`
        : `Saved ${from} → ${to} (${formatDateDDMMYYYY(date)})${sourceNote}`;
      showToast(toastMsg);
    });
  }

  oneWayOnlyBtn.addEventListener("click", () => finalizeTripSave(false));
  addWithReturnBtn.addEventListener("click", () => finalizeTripSave(true));

  returnModal.addEventListener("click", (e) => {
    if (e.target === returnModal) {
      pendingNewTrip = null;
      returnModal.classList.remove("open");
    }
  });

  // 2. Check Fares Only (Query backend without saving a trip)
  document.getElementById("quick-check-btn").addEventListener("click", async () => {
    const from = document.getElementById("origin").value.trim();
    const to = document.getElementById("destination").value.trim();
    const date = document.getElementById("travel-date").value;
    const rawBudget = document.getElementById("budget").value.trim();
    const budget = rawBudget ? Number(rawBudget) : null;

    if (!from || !to) {
      showToast("Enter both From City and Destination to check fares!");
      if (!from) document.getElementById("origin").focus();
      else document.getElementById("destination").focus();
      return;
    }

    await runWithRadar(`Scanning live fares for ${from} → ${to}...`, async () => {
      const res = await fetchAndMergeFares(from, to, date, budget);

      const routeKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
      if (!quickCheckedRoutes.some(r => `${r.from.toLowerCase()}-${r.to.toLowerCase()}` === routeKey)) {
        quickCheckedRoutes.unshift({ from, to });
      }

      activeRoute = routeKey;
      rebuildRouteDropdown();
      renderFeed();

      const tag = res.liveApiActive ? "Live Amadeus API" : "Backend Schedule Engine";
      lastUpdated.textContent = `Showing fares for ${from} → ${to} via ${tag}`;
      showToast(`Fares loaded for ${from} → ${to}`);
      document.getElementById("transit-section").scrollIntoView({ behavior: "smooth" });
    });
  });

  // 3. Reconfirmation Modal before Removing/Cancelling a Trip
  function openDeleteModal(trip) {
    pendingDeleteId = trip.id;
    modalDesc.textContent = `Are you sure you want to cancel your ${trip.from} → ${trip.to} trip on ${formatDateDDMMYYYY(trip.date)}?`;
    confirmModal.classList.add("open");
  }

  function closeDeleteModal() {
    pendingDeleteId = null;
    confirmModal.classList.remove("open");
  }

  tripsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const trip = savedTrips.find(t => t.id === id);
    if (trip) openDeleteModal(trip);
  });

  cancelDeleteBtn.addEventListener("click", closeDeleteModal);

  confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) closeDeleteModal();
  });

  confirmDeleteBtn.addEventListener("click", () => {
    if (pendingDeleteId === null) return;
    savedTrips = savedTrips.filter(t => t.id !== pendingDeleteId);
    saveTrips();
    if (activeRoute !== "all") activeRoute = "all";
    closeDeleteModal();
    renderTrips();
    renderFeed();
    showToast("Trip cancelled and removed");
  });

  // Price Alert Button Delegation
  transitFeed.addEventListener("click", (e) => {
    const btn = e.target.closest(".alert-btn");
    if (!btn) return;
    showToast(`Price drop alert set for ${btn.dataset.route}`);
  });

  // Refresh Live Fares from Backend for All Saved Trips
  document.getElementById("simulate-btn").addEventListener("click", async () => {
    await runWithRadar("Refreshing live fares from server...", async () => {
      let liveCount = 0;
      for (const trip of savedTrips) {
        const res = await fetchAndMergeFares(trip.from, trip.to, trip.date, trip.budget);
        if (res.liveApiActive) liveCount++;
      }

      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      lastUpdated.textContent = liveCount > 0
        ? `Live API synced at ${now}`
        : `Server schedules refreshed at ${now}`;
      renderTrips();
      renderFeed();
      showToast("Transit fares updated from backend");
    });
  });

  // Transit Mode Filter & Sort Listeners
  document.getElementById("mode-tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    document.querySelectorAll("#mode-tabs .tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeMode = tab.dataset.mode;
    renderFeed();
  });

  routeSelect.addEventListener("change", (e) => {
    activeRoute = e.target.value;
    renderFeed();
  });

  sortSelect.addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderFeed();
  });

  // Initial Load: Sync saved trips with backend
  runWithRadar("Connecting to DreamRoute backend...", async () => {
    renderExploreVibes();
    for (const trip of savedTrips) {
      await fetchAndMergeFares(trip.from, trip.to, trip.date, trip.budget);
    }
    renderTrips();
    renderFeed();
  });
});