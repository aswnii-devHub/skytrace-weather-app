import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { localTime } from "../utils/weather.js";

export default function HourlyChart({ hours, mode, setMode }) {
  const data = hours.slice(0, 24);
  const key =
    mode === "rain"
      ? "precipitation_probability"
      : mode === "wind"
        ? "wind_speed_10m"
        : "temperature_2m";
  const suffix = mode === "rain" ? "%" : mode === "wind" ? " km/h" : "°";
  
  return (
    <section className="panel chart-panel">
      <div className="section-head">
        <div>
          <div className="eyebrow">THE NEXT 24 HOURS</div>
          <h2>
            How the day unfolds<span>.</span>
          </h2>
        </div>
        <div className="tabs">
          {["temp", "rain", "wind"].map((x) => (
            <button
              key={x}
              className={mode === x ? "active" : ""}
              onClick={() => setMode(x)}
            >
              {x === "temp"
                ? "Temperature"
                : x === "rain"
                  ? "Rain chance"
                  : "Wind"}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-summary">
        <b>
          {mode === "temp"
            ? "TEMPERATURE CURVE"
            : mode === "rain"
              ? "PRECIPITATION PROBABILITY"
              : "WIND SPEED"}
        </b>
        <span>HOURLY · LOCAL TIME</span>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -22, bottom: 0 }}
          >
            <defs>
              <linearGradient id="skyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dca66e" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#dca66e" stopOpacity={0.015} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#2a3d44"
              strokeDasharray="3 6"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tickFormatter={(v) => localTime(v, { hour: "numeric" })}
              tick={{ fill: "#8b9ba0", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fill: "#8b9ba0", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              unit={suffix}
            />
            <Tooltip
              contentStyle={{
                background: "#14232c",
                border: "1px solid #33454c",
                borderRadius: 8,
                color: "#edf1ec",
              }}
              labelFormatter={localTime}
              formatter={(v) => [
                `${Math.round(v)}${suffix}`,
                mode === "temp"
                  ? "Temperature"
                  : mode === "rain"
                    ? "Rain chance"
                    : "Wind speed",
              ]}
            />
            <Area
              type="monotone"
              dataKey={key}
              stroke="#dfa66c"
              strokeWidth={2.5}
              fill="url(#skyFill)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
