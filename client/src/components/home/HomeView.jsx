import React from "react";
import { Activity, ArrowUpRight, CloudSun, ShieldCheck } from "lucide-react";
import Metric from "../Metric.jsx";
import { aqiLabel, compass, describeCode, getPulse, localTime } from "../../utils/weather.js";

export default function HomeView({ current, hourly, weather, air, days, loading }) {
  const pulse = getPulse(current, hourly);
  const aqi = air?.current?.us_aqi;
  const aqiInfo = aqiLabel(aqi);
  return (
<>
            <section className="hero-grid">
              <article className="hero-weather panel">
                <div className="panel-top">
                  <span>LOCAL CONDITIONS</span>
                  <span>
                    {weather?.current?.time
                      ? `OBSERVED ${localTime(weather.current.time)}`
                      : "LIVE FORECAST"}
                  </span>
                </div>
                {loading && !current ? (
                  <div className="loading">
                    Reading the atmosphere<span>···</span>
                  </div>
                ) : current ? (
                  <>
                    <div className="current">
                      <div>
                        <div className="temperature">
                          {Math.round(current.temperature_2m)}
                          <sup>°</sup>
                        </div>
                        <h2>{describeCode(current.weather_code)}</h2>
                        <small>
                          FEELS LIKE {Math.round(current.apparent_temperature)}
                          °C
                        </small>
                      </div>
                      <div className="weather-art">
                        <CloudSun size={76} />
                        <span>
                          {current.is_day ? "DAYLIGHT" : "AFTER DARK"}
                        </span>
                      </div>
                    </div>
                    <div className="metrics">
                      <Metric
                        kind="humidity"
                        label="HUMIDITY"
                        value={`${current.relative_humidity_2m}%`}
                        note="Relative air moisture"
                      />
                      <Metric
                        kind="wind"
                        label="WIND"
                        value={`${Math.round(current.wind_speed_10m)} km/h`}
                        note={`${compass(current.wind_direction_10m)} direction`}
                      />
                      <Metric
                        kind="pressure"
                        label="PRESSURE"
                        value={`${Math.round(current.pressure_msl)} hPa`}
                        note="Sea-level pressure"
                      />
                      <Metric
                        kind="cloud"
                        label="CLOUD COVER"
                        value={`${current.cloud_cover}%`}
                        note="Sky coverage"
                      />
                    </div>
                  </>
                ) : (
                  <div className="loading">Weather data unavailable.</div>
                )}
              </article>
              <aside className={`pulse pulse-${pulse?.level || "calm"}`}>
                <div className="pulse-top">
                  <span>
                    <Activity size={15} /> THE LOCAL PULSE
                  </span>
                  <b>
                    <i /> NOW
                  </b>
                </div>
                <div className="pulse-orb">
                  <ShieldCheck size={28} />
                </div>
                <label>{pulse?.tag || "CHECKING CONDITIONS"}</label>
                <h2>{pulse?.title || "Reading local conditions"}</h2>
                <p>{pulse?.body || "Waiting for the latest forecast."}</p>
                <small>{pulse?.reason || "Forecast-based guidance"}</small>
                <div className="pulse-foot">
                  NEXT 8 HOURS <ArrowUpRight size={14} />
                </div>
              </aside>
            </section>
            <section className="section">
              <div className="section-head">
                <div>
                  <div className="eyebrow">AIR & EXPOSURE</div>
                  <h2>
                    What’s in the air<span>.</span>
                  </h2>
                </div>
                <span className="source-note">OPEN-METEO AIR QUALITY</span>
              </div>
              <div className="air-grid panel">
                <div className="aqi-block">
                  <label>US AIR QUALITY INDEX</label>
                  <strong>{aqi == null ? "—" : Math.round(aqi)}</strong>
                  <span className={`aqi-tag ${aqiInfo.tone}`}>
                    {aqiInfo.label}
                  </span>
                  <small>
                    {air?.current?.time
                      ? `Updated ${localTime(air.current.time)}`
                      : "Air quality data unavailable"}
                  </small>
                </div>
                <Metric
                  kind="aqi"
                  label="PM2.5"
                  value={
                    air?.current?.pm2_5 != null
                      ? `${Math.round(air.current.pm2_5)} µg/m³`
                      : "—"
                  }
                  note="Fine particles"
                />
                <Metric
                  kind="aqi"
                  label="PM10"
                  value={
                    air?.current?.pm10 != null
                      ? `${Math.round(air.current.pm10)} µg/m³`
                      : "—"
                  }
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
          </>
  );
}
