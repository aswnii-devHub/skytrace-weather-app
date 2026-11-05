import { Router } from "express";
import { XMLParser } from "fast-xml-parser";
import { cached } from "../utils/cache.js";

const router = Router();
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
  parseTagValue: false,
  trimValues: true,
});

const rssUrl = () =>
  process.env.NDMA_CAP_RSS ||
  "https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml";
const asText = (v) => (typeof v === "string" ? v : v?.["#text"] || "");

function normalize(item) {
  // Some RSS relays expose the CAP alert fields directly; others provide title,
  // description and link only. Preserve the publisher's wording in either case.
  const info = item?.info || {};
  const area = info.area
    ? Array.isArray(info.area)
      ? info.area
      : [info.area]
    : [];
  const title =
    asText(item.title) || asText(info.event) || "Official disaster alert";
  const description =
    asText(info.description) ||
    asText(item.description) ||
    asText(item.summary) ||
    asText(info.instruction);
  const severity =
    asText(info.severity) ||
    (/extreme/i.test(`${title} ${description}`)
      ? "Extreme"
      : /severe/i.test(`${title} ${description}`)
        ? "Severe"
        : /moderate/i.test(`${title} ${description}`)
          ? "Moderate"
          : "Not specified");
  const link =
    asText(item.link) || item.link?.["@href"] || "https://sachet.ndma.gov.in/";
  return {
    id:
      asText(item.identifier) ||
      asText(item.guid) ||
      asText(item["@identifier"]) ||
      `${asText(item.pubDate)}-${title}`,
    sender: asText(item.sender),
    sent: asText(item.sent) || asText(item.pubDate),
    status: asText(item.status),
    msgType: asText(item.msgType),
    event: asText(info.event) || title,
    headline: asText(info.headline) || title,
    description,
    severity,
    urgency: asText(info.urgency),
    certainty: asText(info.certainty),
    effective: asText(info.effective),
    expires: asText(info.expires),
    areas: area.map((a) => ({
      description: asText(a.areaDesc),
      polygon: asText(a.polygon),
      circle: asText(a.circle),
    })),
    source: "NDMA SACHET CAP RSS",
    sourceUrl: link,
  };
}

router.get("/", async (_req, res) => {
  try {
    const result = await cached("ndma-cap-rss", 3 * 60 * 1000, async () => {
      const response = await fetch(rssUrl(), {
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": "SKYTRACE/1.0" },
      });
      if (!response.ok)
        throw new Error(`NDMA RSS returned HTTP ${response.status}`);
      const xml = await response.text(),
        parsed = parser.parse(xml);
      const channel = parsed?.rss?.channel || parsed?.feed || {};
      let entries = channel.item || channel.entry || parsed?.alert || [];

      if (!Array.isArray(entries)) entries = [entries];
      
      const alerts = entries
        .filter(Boolean)
        .map(normalize)
        .sort((a, b) => new Date(b.sent || 0) - new Date(a.sent || 0));
      return {
        connected: true,
        checkedAt: new Date().toISOString(),
        alerts,
        source: "NDMA SACHET CAP RSS",
        sourceUrl: "https://sachet.ndma.gov.in/",
      };
    });
    res.json(result);
  } catch (error) {
    res.json({
      connected: false,
      checkedAt: new Date().toISOString(),
      alerts: [],
      source: "NDMA SACHET CAP RSS",
      message: `Official feed could not be reached: ${error.message}`,
      sourceUrl: "https://sachet.ndma.gov.in/",
    });
  }
});

export default router;
