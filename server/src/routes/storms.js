import { Router } from "express";
import { cached } from "../utils/cache.js";
import { getJson } from "../utils/http.js";

const router = Router();

router.get("/cyclone-track", async (_req, res) => {
  try {
    const base = (
      process.env.IMD_API_BASE || "https://api.imd.gov.in/api/v1"
    ).replace(/\/$/, "");
    
    const headers = {};
    if (process.env.IMD_API_TOKEN)
      headers.Authorization = `Bearer ${process.env.IMD_API_TOKEN}`;
    
    const data = await cached("imd-cyclone-track", 5 * 60 * 1000, () =>
      getJson(`${base}/cyclone_track`, { headers }),
    );
    const observed = data?.data?.observed || [],
      forecast = data?.data?.forecast || [];
    const valid = [...observed, ...forecast].filter(
      (p) => Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lon)),
    );
    res.json({
      connected: true,
      checkedAt: new Date().toISOString(),
      source: "India Meteorological Department",
      sourceUrl: "https://mausam.imd.gov.in/",
      stormName: valid[0]?.CYCLONE_NAME || null,
      observed,
      forecast,
      points: valid,
    });
  } catch (error) {
    res.json({
      connected: false,
      checkedAt: new Date().toISOString(),
      source: "India Meteorological Department",
      sourceUrl: "https://mausam.imd.gov.in/",
      observed: [],
      forecast: [],
      points: [],
      message: `IMD cyclone API is unavailable or requires account access: ${error.message}`,
    });
  }
});

export default router;
