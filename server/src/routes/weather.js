import { Router } from "express";
import { cached } from "../utils/cache.js";
import { getJson } from "../utils/http.js";

const router = Router();
const forecastBase = "https://api.open-meteo.com/v1/forecast";

router.get("/forecast", async (req, res, next) => {
  try {
    const lat = Number(req.query.lat),
      lon = Number(req.query.lon);
    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    )
      return res.status(400).json({ error: "Valid lat and lon are required." });
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      timezone: "auto",
      forecast_days: "7",
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
      hourly:
        "temperature_2m,precipitation_probability,precipitation,relative_humidity_2m,wind_speed_10m,weather_code,uv_index,visibility",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max",
    });
    const data = await cached(
      `forecast:${lat.toFixed(2)}:${lon.toFixed(2)}`,
      10 * 60 * 1000,
      () => getJson(`${forecastBase}?${params}`),
    );
    res.json({
      source: "Open-Meteo",
      fetchedAt: new Date().toISOString(),
      data,
    });
  } catch (e) {
    next(e);
  }
});

router.get("/radar", async (_req, res) => {
  try {
    const data = await cached("rainviewer-metadata", 5 * 60 * 1000, () =>
      getJson("https://api.rainviewer.com/public/weather-maps.json"),
    );
    const frames = data?.radar?.past || [];
    const frame = frames[frames.length - 1];
    if (!data?.host || !frame?.path)
      throw new Error("No past radar frame is currently available.");
    res.json({
      available: true,
      host: data.host,
      path: frame.path,
      frameTime: frame.time,
      source: "RainViewer",
    });
  } catch (error) {
    res.json({
      available: false,
      message: error.message,
      source: "RainViewer",
    });
  }
});

router.get("/air-quality", async (req, res, next) => {
  try {
    const lat = Number(req.query.lat),
      lon = Number(req.query.lon);
    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    )
      return res.status(400).json({ error: "Valid lat and lon are required." });
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      timezone: "auto",
      forecast_days: "1",
      current:
        "european_aqi,us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,ozone,sulphur_dioxide",
      hourly: "pm2_5,pm10,us_aqi",
    });
    const data = await cached(
      `air:${lat.toFixed(2)}:${lon.toFixed(2)}`,
      30 * 60 * 1000,
      () =>
        getJson(
          `https://air-quality-api.open-meteo.com/v1/air-quality?${params}`,
        ),
    );
    res.json({
      source: "Open-Meteo Air Quality",
      fetchedAt: new Date().toISOString(),
      data,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
