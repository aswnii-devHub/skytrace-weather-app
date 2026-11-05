import React from "react";
import Metric from "../Metric.jsx";
import { aqiLabel, localTime } from "../../utils/weather.js";

export default function AirQuality({ air, days }) {
  const aqi = air?.current?.us_aqi;
  const aqiInfo = aqiLabel(aqi);

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <div className="eyebrow">AIR & EXPOSURE</div>
          <h2>What’s in the air<span>.</span></h2>
        </div>
        <span className="source-note">OPEN-METEO AIR QUALITY</span>
      </div>
      <div className="air-grid panel">
        <div className="aqi-block">
          <label>US AIR QUALITY INDEX</label>
          <strong>{aqi == null ? "—" : Math.round(aqi)}</strong>
          <span className={`aqi-tag ${aqiInfo.tone}`}>{aqiInfo.label}</span>
          <small>
            {air?.current?.time ? `Updated ${localTime(air.current.time)}` : "Air quality data unavailable"}
          </small>
        </div>
        <Metric
          kind="aqi"
          label="PM2.5"
          value={air?.current?.pm2_5 != null ? `${Math.round(air.current.pm2_5)} µg/m³` : "—"}
          note="Fine particles"
        />
        <Metric
          kind="aqi"
          label="PM10"
          value={air?.current?.pm10 != null ? `${Math.round(air.current.pm10)} µg/m³` : "—"}
          note="Coarse particles"
        />
        <Metric
          kind="uv"
          label="UV INDEX"
          value={days[0]?.uv_index_max ?? "—"}
          note="Today's forecast maximum"
        />
      </div>
    </section>
  );
}
