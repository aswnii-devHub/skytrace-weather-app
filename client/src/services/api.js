
import { formatLocation } from "../utils/formatLocation";

// Empty in development so Vite proxy continues working.
// Uses the Render backend in production.
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const request = async (url) => {
  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      payload.message || payload.error || `Request failed (${response.status})`
    );
  }

  return payload;
};

export const getForecast = (lat, lon) =>
  request(
    `${API_BASE_URL}/api/weather/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
  );

export const getRadar = () =>
  request(`${API_BASE_URL}/api/weather/radar`);

export const getAirQuality = (lat, lon) =>
  request(
    `${API_BASE_URL}/api/weather/air-quality?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
  );

export const getAlerts = () =>
  request(`${API_BASE_URL}/api/alerts`);

export const getCycloneTrack = () =>
  request(`${API_BASE_URL}/api/storms/cyclone-track`);

export async function searchPlaces(query) {
  const data = await request(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=7&language=en&format=json`
  );

  return (data.results || []).map((p) => ({
    id: `${p.latitude}:${p.longitude}`,
    name: formatLocation(p.name),
    admin: [p.admin1, p.country].filter(Boolean).join(", "),
    country: p.country,
    latitude: p.latitude,
    longitude: p.longitude,
    timezone: p.timezone,
  }));
}
