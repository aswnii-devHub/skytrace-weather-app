import React from "react";
import { ArrowUpRight, ShieldCheck, Wind } from "lucide-react";
import WeatherMap from "../WeatherMap.jsx";

export default function StormsView({ storms, place, radar, radarFrame, toggleRadar, activeCyclone, trackDistance }) {
  return (
<section className="section" id="stormwatch">
            <div className="section-head">
              <div>
                <div className="eyebrow">REGIONAL HAZARD MONITOR</div>
                <h2>
                  Storm watch<span>.</span>
                </h2>
              </div>
              <span className={`feed-status ${storms?.connected ? "ok" : ""}`}>
                <i />
                {storms?.connected
                  ? "IMD DATA CONNECTED"
                  : "IMD FEED NOT VERIFIED"}
              </span>
            </div>
            <div className="storm-layout">
              <div className="panel storm-map-panel">
                <div className="map-heading">
                  <span>REGIONAL VIEW · {place.name.toUpperCase()}</span>
                  <button
                    className={radar ? "selected" : ""}
                    onClick={toggleRadar}
                  >
                    {radar ? "Hide" : "Show"} past radar
                  </button>
                </div>
                <WeatherMap
                  place={place}
                  storms={storms}
                  radarFrame={radar ? radarFrame : null}
                />
                <small className="map-attribution">
                  Map © OpenStreetMap · Radar © RainViewer (past radar imagery
                  only)
                </small>
              </div>
              <aside className="panel storm-info">
                <div className="eyebrow">CYCLONE TRACK STATUS</div>
                {activeCyclone ? (
                  <>
                    <div className="storm-status-pill">
                      TRACK DATA AVAILABLE
                    </div>
                    <h3>{storms.stormName || "Cyclone system detected"}</h3>
                    <p>
                      IMD has returned {storms.observed?.length || 0} observed
                      and {storms.forecast?.length || 0} forecast track points.
                      Review the official bulletin for the authoritative track
                      and timing.
                    </p>
                    <div className="storm-stat">
                      <span>Observed points</span>
                      <b>{storms.observed?.length || 0}</b>
                    </div>
                    <div className="storm-stat">
                      <span>Forecast points</span>
                      <b>{storms.forecast?.length || 0}</b>
                    </div>
                    <div className="storm-stat">
                      <span>Nearest track point</span>
                      <b>
                        {trackDistance == null
                          ? "—"
                          : `${Math.round(trackDistance)} km`}
                      </b>
                    </div>
                    <small className="track-caveat">
                      Straight-line distance to a returned track coordinate; not
                      an impact forecast or warning.
                    </small>
                  </>
                ) : (
                  <>
                    <div className="no-storm-icon">
                      <Wind size={27} />
                    </div>
                    <h3>
                      {storms?.connected
                        ? "No cyclone track returned"
                        : "Cyclone feed not available"}
                    </h3>
                    <p>
                      {storms?.message ||
                        "The connected IMD endpoint returned no track points. This is not a guarantee that no weather hazard exists."}
                    </p>
                  </>
                )}
                <a
                  href="https://mausam.imd.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open IMD official bulletins <ArrowUpRight size={14} />
                </a>
                <div className="warning-note">
                  <ShieldCheck size={15} /> Do not use this map as an evacuation
                  or navigation tool. Follow official instructions.
                </div>
              </aside>
            </div>
          </section>
  );
}
