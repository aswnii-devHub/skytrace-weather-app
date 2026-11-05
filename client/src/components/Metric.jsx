import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Sun,
  CloudRain,
  Activity,
} from "lucide-react";

const icons = {
  humidity: Droplets,
  wind: Wind,
  pressure: Gauge,
  cloud: Eye,
  uv: Sun,
  rain: CloudRain,
  aqi: Activity,
};

export default function Metric({ kind, label, value, note }) {
  const Icon = icons[kind] || Activity;
  
  return (
    <div className="metric">
      <span className="metric-icon">
        <Icon size={17} />
      </span>
      <div>
        <label>{label}</label>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}
