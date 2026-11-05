import React from "react";
import { Sunrise, Sunset, CloudSun, Compass } from "lucide-react";
import HourlyChart from "../HourlyChart.jsx";
import Forecast from "../Forecast.jsx";

function Detail({ icon, label, value, note }) {
  return (
    <div className="detail">
      <span>{icon}</span>
      <div><label>{label}</label><b>{value}</b><small>{note}</small></div>
    </div>
  );
}

export default function ForecastView({ hourly, chartMode, setChartMode, days, localTime }) {
  return (
<>
            <HourlyChart
              hours={hourly}
              mode={chartMode}
              setMode={setChartMode}
            />
            <Forecast days={days} />
            <section className="section detail-section">
              <div className="section-head">
                <div>
                  <div className="eyebrow">SMALL DETAILS, BIG DIFFERENCE</div>
                  <h2>
                    Plan around the elements<span>.</span>
                  </h2>
                </div>
              </div>
              <div className="detail-grid panel">
                <Detail
                  icon={<Sunrise />}
                  label="SUNRISE"
                  value={days[0]?.sunrise ? localTime(days[0].sunrise) : "—"}
                  note="First light"
                />
                <Detail
                  icon={<Sunset />}
                  label="SUNSET"
                  value={days[0]?.sunset ? localTime(days[0].sunset) : "—"}
                  note="Last light"
                />
                <Detail
                  icon={<CloudSun />}
                  label="PEAK RAIN CHANCE"
                  value={
                    days[0]
                      ? `${Math.round(days[0].precipitation_probability_max || 0)}%`
                      : "—"
                  }
                  note="Today's forecast"
                />
                <Detail
                  icon={<Compass />}
                  label="MAX WIND"
                  value={
                    days[0]
                      ? `${Math.round(days[0].wind_speed_10m_max || 0)} km/h`
                      : "—"
                  }
                  note="Today's forecast"
                />
              </div>
            </section>
          </>
  );
}
