export function describeCode(code) {
  if (code === 0) return "Clear sky";
  if ([1, 2].includes(code)) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Variable conditions";
}
export function iconName(code) {
  if (code === 0) return "sun";
  if ([1, 2, 3, 45, 48].includes(code)) return "cloud-sun";
  if ([95, 96, 99].includes(code)) return "cloud-lightning";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return "cloud-rain";
  return "cloud";
}
export function compass(degrees) {
  return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
    Math.round((degrees || 0) / 45) % 8
  ];
}
export function localTime(
  iso,
  options = { hour: "numeric", minute: "2-digit" },
) {
  return iso ? new Date(iso).toLocaleTimeString([], options) : "—";
}
export function aqiLabel(value) {
  if (value == null) return { label: "Unavailable", tone: "neutral" };
  if (value <= 20) return { label: "Good", tone: "good" };
  if (value <= 40) return { label: "Fair", tone: "fair" };
  if (value <= 60) return { label: "Moderate", tone: "moderate" };
  if (value <= 80) return { label: "Poor", tone: "poor" };
  if (value <= 100) return { label: "Very poor", tone: "very-poor" };
  return { label: "Extremely poor", tone: "extreme" };
}
export function getPulse(current, hourly) {
  if (!current) return null;

  const rain = Math.max(
    0,
    ...hourly.slice(0, 8).map((h) => h.precipitation_probability || 0),
  );
  const gust = current.wind_gusts_10m || 0,
    uv = Math.max(
      current.uv_index || 0,
      ...hourly.slice(0, 8).map((h) => h.uv_index || 0),
    );

  if (gust >= 60)
    return {
      level: "watch",
      tag: "WIND WATCH",
      title: "Strong gusts are possible",
      body: "Secure loose outdoor objects and take extra care on exposed roads.",
      reason: `Forecast gusts reach ${Math.round(gust)} km/h.`,
    };

  if (rain >= 70)
    return {
      level: "rain",
      tag: "RAIN WINDOW",
      title: "Rain is likely soon",
      body: "Carry a rain layer and allow extra time for your commute.",
      reason: `Rain probability peaks at ${Math.round(rain)}% in the next 8 hours.`,
    };

  if (uv >= 8)
    return {
      level: "sun",
      tag: "UV ADVISORY",
      title: "High UV exposure",
      body: "Prefer shade around midday, protect your skin and stay hydrated.",
      reason: `Forecast UV index is ${Math.round(uv)}.`,
    };

  return {
    level: "calm",
    tag: "LOCAL PULSE",
    title: "No standout weather signal",
    body: "Conditions look manageable from the available forecast. Check official alerts before travel.",
    reason: "This is a forecast-based summary, not an official warning.",
  };
}

export function nearestTrackDistanceKm(place, points = []) {
  const valid = points.filter(
    (p) => Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lon)),
  );
  
  if (!valid.length) return null;

  const rad = (n) => (n * Math.PI) / 180,
    R = 6371;
  return Math.min(
    ...valid.map((p) => {
      const lat1 = rad(place.latitude),
        lat2 = rad(Number(p.lat)),
        dLat = lat2 - lat1,
        dLon = rad(Number(p.lon) - place.longitude);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(a));
    }),
  );
}
