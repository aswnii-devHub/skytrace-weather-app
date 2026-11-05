import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = L.divIcon({
  className: "sky-pin",
  html: "<span></span>",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function WeatherMap({ place, storms, radarFrame }) {

  const points = useMemo(
    () =>
      [...(storms?.observed || []), ...(storms?.forecast || [])]
        .filter(
          (p) =>
            Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lon)),
        )
        .map((p) => [Number(p.lat), Number(p.lon)]),
    [storms],
  );

  const center = [place.latitude, place.longitude];
  const radarUrl = radarFrame?.available
    ? `${radarFrame.host}${radarFrame.path}/256/{z}/{x}/{y}/2/1_1.png`
    : null;
    
  return (
    <div className="map-shell">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        key={`${place.latitude}:${place.longitude}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {radarUrl && (
          <TileLayer
            opacity={0.48}
            attribution='Radar &copy; <a href="https://www.rainviewer.com/">RainViewer</a>'
            url={radarUrl}
          />
        )}
        <Marker position={center} icon={pin}>
          <Popup>
            <b>{place.name}</b>
            <br />
            Selected location
          </Popup>
        </Marker>
        <Circle
          center={center}
          radius={50000}
          pathOptions={{
            color: "#dca66e",
            fillColor: "#dca66e",
            fillOpacity: 0.06,
            weight: 1,
            dashArray: "5 7",
          }}
        />
        {points.length > 1 && (
          <Polyline
            positions={points}
            pathOptions={{ color: "#b97845", weight: 3, dashArray: "7 7" }}
          />
        )}
        {points.map((p, i) => (
          <Circle
            key={i}
            center={p}
            radius={22000}
            pathOptions={{
              color:
                i < (storms?.observed?.length || 0) ? "#d8e2d4" : "#e3a66e",
              fillOpacity: 0.75,
            }}
          />
        ))}
      </MapContainer>
      <div className="map-legend">
        <span>
          <i className="legend-location" /> Your location
        </span>
        {points.length > 0 && (
          <span>
            <i className="legend-track" /> IMD track
          </span>
        )}
        {radarUrl && (
          <span>
            <i className="legend-radar" /> Past radar tiles
          </span>
        )}
      </div>
    </div>
  );
}
