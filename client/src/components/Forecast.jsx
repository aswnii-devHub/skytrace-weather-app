import {
  Droplets,
  Wind,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
} from "lucide-react";
import { describeCode } from "../utils/weather.js";

const Icon = ({ code }) => {
  if (code === 0) return <Sun />;
  if ([1, 2, 3, 45, 48].includes(code)) return <Cloud />;
  if ([95, 96, 99].includes(code)) return <CloudLightning />;
  return <CloudRain />;
};

export default function Forecast({ days }) {
  
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <div className="eyebrow">PLAN A LITTLE FURTHER</div>
          <h2>
            Seven-day outlook<span>.</span>
          </h2>
        </div>
        <small>MODEL FORECAST · NOT A WARNING</small>
      </div>
      <div className="days-grid">
        {days.map((d, i) => (
          <article
            className={`day-card ${i === 0 ? "today" : ""}`}
            key={d.date}
          >
            <label>
              {i === 0
                ? "TODAY"
                : new Date(d.date)
                    .toLocaleDateString([], { weekday: "short" })
                    .toUpperCase()}
            </label>
            <div className="day-icon">
              <Icon code={d.weather_code} />
            </div>
            <b>{describeCode(d.weather_code)}</b>
            <div className="day-temp">
              <strong>{Math.round(d.temperature_2m_max)}°</strong>
              <span>{Math.round(d.temperature_2m_min)}°</span>
            </div>
            <div className="day-extra">
              <span>
                <Droplets size={12} />
                {Math.round(d.precipitation_probability_max || 0)}%
              </span>
              <span>
                <Wind size={12} />
                {Math.round(d.wind_speed_10m_max || 0)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
