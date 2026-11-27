require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// IATA Airport Codes for Supported Cities
const IATA_CODES = {
  bengaluru: "BLR",
  mumbai: "BOM",
  delhi: "DEL",
  goa: "GOI",
  udaipur: "UDR",
  jaipur: "JAI",
  kochi: "COK",
  varanasi: "VNS",
  hyderabad: "HYD",
  chennai: "MAA",
  kolkata: "CCU",
  mangaluru: "IXE",
  pune: "PNQ",
  leh: "IXL",
  tokyo: "TYO",
  singapore: "SIN"
};

let cachedToken = null;
let tokenExpiresAt = 0;

// Fetch & cache Amadeus OAuth2 token
async function getAmadeusToken() {
  const { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } = process.env;
  if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) return null;

  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: AMADEUS_CLIENT_ID,
      client_secret: AMADEUS_CLIENT_SECRET
    })
  });

  if (!res.ok) return null;
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

// Convert ISO duration (e.g. "PT2H15M") to "2h 15m"
function formatDuration(iso) {
  const match = String(iso || "").match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return "1h 45m";
  const h = match[1] ? `${match[1]}h ` : "";
  const m = match[2] ? `${match[2]}m` : "";
  return (h + m).trim() || "1h 30m";
}

// Format ISO timestamp ("2026-12-24T07:15:00") to "07:15 AM"
function formatTime(isoDateTime) {
  const dt = new Date(isoDateTime);
  if (isNaN(dt.getTime())) return "08:30 AM";
  return dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
}

// Fetch live flight offers from Amadeus
async function fetchLiveFlights(fromCity, toCity, date) {
  const originCode = IATA_CODES[fromCity.toLowerCase()];
  const destCode = IATA_CODES[toCity.toLowerCase()];
  if (!originCode || !destCode) return [];

  const token = await getAmadeusToken();
  if (!token) return [];

  const travelDate = date || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0];
  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destCode}&departureDate=${travelDate}&adults=1&currencyCode=INR&max=4`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) return [];
  const payload = await res.json();
  const carriers = payload.dictionaries?.carriers || {};

  return (payload.data || []).map((offer, idx) => {
    const itinerary = offer.itineraries[0];
    const firstSeg = itinerary.segments[0];
    const carrierCode = firstSeg.carrierCode;
    const carrierName = carriers[carrierCode] || carrierCode;
    const price = Math.round(Number(offer.price.total));

    return {
      id: Date.now() + idx,
      mode: "Flight",
      operator: `${carrierName} ${carrierCode}-${firstSeg.number}`,
      from: fromCity,
      to: toCity,
      depart: formatTime(firstSeg.departure.at),
      duration: formatDuration(itinerary.duration),
      price,
      prevPrice: Math.round(price * 1.08),
      seats: offer.numberOfBookableSeats || 6,
      source: "live-api"
    };
  });
}

// Build realistic regional Train & Bus options alongside live flights
function buildGroundTransit(fromCity, toCity, budget) {
  const base = budget ? Number(budget) : 2800;
  return [
    {
      id: Date.now() + 101,
      mode: "Train",
      operator: "Vande Bharat / Express",
      from: fromCity,
      to: toCity,
      depart: "06:15 AM",
      duration: "6h 40m",
      price: Math.max(450, Math.round(base * 0.34)),
      prevPrice: Math.max(450, Math.round(base * 0.34)),
      seats: 14,
      source: "schedule-engine"
    },
    {
      id: Date.now() + 102,
      mode: "Bus",
      operator: "Airavat / Volvo Multi-Axle",
      from: fromCity,
      to: toCity,
      depart: "10:30 PM",
      duration: "8h 15m",
      price: Math.max(380, Math.round(base * 0.27)),
      prevPrice: Math.max(420, Math.round(base * 0.31)),
      seats: 8,
      source: "schedule-engine"
    }
  ];
}

// API Endpoint: GET /api/fares?from=Bengaluru&to=Goa&date=2026-12-24&budget=4000
app.get("/api/fares", async (req, res) => {
  const from = String(req.query.from || "").trim();
  const to = String(req.query.to || "").trim();
  const date = String(req.query.date || "").trim();
  const budget = req.query.budget ? Number(req.query.budget) : null;

  if (!from || !to) {
    return res.status(400).json({ error: "Both 'from' and 'to' parameters are required." });
  }

  try {
    const liveFlights = await fetchLiveFlights(from, to, date);
    const groundOptions = buildGroundTransit(from, to, budget);

    // If Amadeus keys aren't configured or city lacks an airport, provide a realistic flight fallback if both have airports
    let flights = liveFlights;
    if (flights.length === 0 && IATA_CODES[from.toLowerCase()] && IATA_CODES[to.toLowerCase()]) {
      const est = budget ? Math.round(budget * 0.92) : 3499;
      flights = [
        {
          id: Date.now() + 100,
          mode: "Flight",
          operator: "IndiGo 6E Direct",
          from,
          to,
          depart: "08:20 AM",
          duration: "1h 35m",
          price: est,
          prevPrice: Math.round(est * 1.12),
          seats: 5,
          source: "fallback-estimate"
        }
      ];
    }

    res.json({
      route: `${from} → ${to}`,
      liveApiActive: liveFlights.length > 0,
      results: [...flights, ...groundOptions]
    });
  } catch (err) {
    console.error("Fare lookup error:", err);
    res.status(500).json({ error: "Failed to fetch live transit fares." });
  }
});

app.listen(PORT, () => {
  console.log(`DreamRoute server running at http://localhost:${PORT}`);
});