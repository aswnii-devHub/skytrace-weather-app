# SKYTRACE — Weather Intelligence

A complete React + Vite + Express project with live weather forecasts, air quality, city search, browser geolocation, interactive charts, seven-day forecast, map layers, NDMA CAP alert ingestion, IMD cyclone-track adapter, saved locations and safety guidance.

## Requirements

- Node.js 20 LTS or newer (Node 18.18+ should also work with modern fetch/AbortSignal support)
- npm
- Internet connection for external data sources

## Start the complete application

From the project root:

```bash
npm install
npm --prefix server install
npm --prefix client install
cp .env.example .env
npm run dev
```

Open http://localhost:5173. Vite proxies `/api` to Express on port 5050.

Windows PowerShell: if `cp` is unavailable, use:

Build the frontend:

```bash
npm run build
```

Run the backend in production:

```bash
npm start
```

For a static frontend deployment, deploy `client/dist` and configure `/api` to point to your deployed Express server.

## Included modules

- Current weather and apparent temperature
- Humidity, pressure, cloud cover, wind and gust data
- 24-hour temperature, rain-probability and wind chart
- 7-day forecast
- Sunrise, sunset, UV, precipitation probability
- Air quality: US AQI (US EPA breakpoints), PM2.5 and PM10
- Search for cities and towns
- Browser GPS location (permission-based)
- Save locations in browser local storage
- OpenStreetMap map with location and optional past radar tile overlay
- NDMA SACHET India CAP RSS feed reader (server-side XML parsing)
- IMD cyclone-track API adapter (server-side; token configurable)
- Severity-aware alert display, possible area-name text matches and official source links\n- Opt-in browser notifications for newly received, recently issued CAP feed entries\n- Approximate straight-line distance to nearest IMD track coordinate (explicitly not an impact forecast)
- Rule-based local weather pulse (not AI-generated)
- Cyclone, flood and lightning safety guidance
- Caching, graceful API failure states and responsive layout

## Data sources and terms

1. **Open-Meteo Forecast & Air Quality:** https://open-meteo.com/en/docs and https://open-meteo.com/en/docs/air-quality-api. Free public API for non-commercial use; fair use and attribution required. Forecast and air-quality values are cached server-side.
2. **Open-Meteo Geocoding:** https://open-meteo.com/en/docs/geocoding-api. City search is called directly from the browser.
3. **NDMA SACHET CAP RSS:** https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml. The server reads the official India CAP RSS feed and normalizes CAP fields. Feed access/availability may vary.
4. **IMD Cyclone Track:** https://api.imd.gov.in/public/api_reference.html. The adapter calls `/api/v1/cyclone_track`. Some API access may require an IMD account/token. If your account provides a token, add it to `IMD_API_TOKEN` in `.env`. The adapter currently sends it as a Bearer token; adjust only if IMD's issued integration instructions specify a different scheme.
5. **Map tiles:** OpenStreetMap standard tile service; follow tile usage policy and attribution: https://operations.osmfoundation.org/policies/tiles/
6. **RainViewer:** https://www.rainviewer.com/api.html. Only past radar tiles are shown; no nowcast is implied. Free API is for personal/educational/small community use and has no SLA. Attribution is included on the map.

## Important cyclone / warning safety notes

- The app does not infer a cyclone from ordinary rain, wind or forecast values.
- The cyclone path is drawn only when the IMD endpoint returns observed/forecast coordinates.
- IMD track response sample formats include `data.observed` and `data.forecast`; the adapter filters invalid coordinates.
- The CAP RSS feed may include multiple hazards and regions. This first version displays official feed entries and does not claim that every alert applies to the selected city.
- The UI explicitly shows feed status and timestamps. A disconnected or empty feed is not proof that no hazard exists.
- The application is not an emergency warning system. Users must follow IMD, NDMA and local-authority instructions.

## Environment variables

```env
PORT=5050
IMD_API_TOKEN=
IMD_API_BASE=https://api.imd.gov.in/api/v1
NDMA_CAP_RSS=https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml
```

No AI key, paid weather key, map key or database is required for the included functionality.

## Known free-service constraints

- Open-Meteo free API is intended for non-commercial use. Review current terms before commercial use.
- RainViewer free endpoint is historical radar only as of its 2026 transition; the map toggle must not be described as live precipitation nowcasting.
- OpenStreetMap's public tile server is best-effort and has a usage policy; do not use it for heavy production traffic. For a portfolio-scale project it is suitable if requests are reasonable.
- IMD API authentication and rate limits depend on the account and access terms provided by IMD.
- NDMA CAP RSS can be unavailable or change format; app shows a failure state and official link.

## Suggested verification checklist

- `GET http://localhost:5050/api/health`
- `GET http://localhost:5050/api/weather/forecast?lat=17.385&lon=78.4867`
- `GET http://localhost:5050/api/weather/air-quality?lat=17.385&lon=78.4867`
- `GET http://localhost:5050/api/alerts`
- `GET http://localhost:5050/api/storms/cyclone-track`
- `npm run build`

No fabricated cyclone, alert or forecast data is bundled.


## UX / navigation design

The interface uses four focused views rather than placing every feature on one long dashboard:
- **Home:** current conditions, local pulse and air quality.
- **Forecast:** 24-hour chart, 7-day outlook, sunrise/sunset and daily planning details.
- **Storms:** regional map, optional past-radar overlay, verified IMD track points and track-distance context.
- **Alerts:** NDMA CAP alerts, opt-in browser notifications and practical safety guides.

The active view is the only main content shown. City search, saved places, GPS and refresh remain available across views. The design uses progressive disclosure, restrained motion, compact data labels and responsive mobile navigation. Alert feed states are differentiated: connected with no alert, connected with alerts, and unavailable/disconnected.
### Responsive layouts

SKYTRACE adapts its layout for wide desktop displays, laptops, tablets and phones. Desktop uses a wider dashboard canvas and side-by-side information panels; tablet layouts reflow navigation and panels; mobile uses a compact navigation bar and stacked content. Resize the browser or use DevTools device emulation to check the breakpoints.
