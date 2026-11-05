import React from "react";
import { LocateFixed, RefreshCw } from "lucide-react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "forecast", label: "Forecast" },
  { id: "storms", label: "Storms" },
  { id: "alerts", label: "Alerts" },
];

export default function Header({ activeView, setActiveView, refreshAll, locate }) {
  return (
    <header className="topbar">
      <a className="brand" href="#">
        <span>SKYTRACE<span className="brand-period">.</span><small>WEATHER INTELLIGENCE</small></span>
      </a>
      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.id} className={activeView === item.id ? "active" : ""}
            onClick={() => { setActiveView(item.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="top-actions">
        <span className="live-pill"><i /> LIVE DATA</span>
        <button className="icon-button" onClick={refreshAll} title="Refresh all data"><RefreshCw size={16} /></button>
        <button className="locate-button" onClick={locate}><LocateFixed size={15} /> My location</button>
      </div>
    </header>
  );
}
