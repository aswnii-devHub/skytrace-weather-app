import React, { useEffect, useRef, useState } from "react";
import {
  getAlerts,
  getCycloneTrack,
  getRadar,
  searchPlaces,
} from "./services/api.js";
import { useWeather } from "./hooks/useWeather.js";
import {
  aqiLabel,
  getPulse,
  localTime,
  nearestTrackDistanceKm,
} from "./utils/weather.js";
import Header from "./components/layout/Header.jsx";
import IntroSearch from "./components/layout/IntroSearch.jsx";
import LocationBar from "./components/layout/LocationBar.jsx";
import HomeView from "./components/home/HomeView.jsx";
import ForecastView from "./components/forecast/ForecastView.jsx";
import StormsView from "./components/storms/StormsView.jsx";
import AlertsView from "./components/alerts/AlertsView.jsx";
import Footer from "./components/layout/Footer.jsx";
import "./styles.css";
import TermsAndServices from "./components/legal/TermsAndServices.jsx";
import PrivacyPolicy from "./components/legal/PrivacyPolicy.jsx";

const DEFAULT = {
  id: "hyderabad",
  name: "Hyderabad",
  admin: "Telangana, India",
  country: "India",
  latitude: 17.385,
  longitude: 78.4867,
};

const readSaved = () => {
  try {
    return JSON.parse(localStorage.getItem("skytrace:saved") || "[]");
  } catch {
    return [];
  }
};

export default function App() {
  const [place, setPlace] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skytrace:place")) || DEFAULT;
    } catch {
      return DEFAULT;
    }
  });
  const [activeView, setActiveView] = useState("home");
  const [savedLocations, setSavedLocations] = useState(readSaved);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const [storms, setStorms] = useState(null);
  const [radar, setRadar] = useState(false);
  const [radarFrame, setRadarFrame] = useState(null);
  const [chartMode, setChartMode] = useState("temp");
  const [notice, setNotice] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(
    () => localStorage.getItem("skytrace:notifications") === "on",
  );
  const seenAlertIds = useRef(null);
  const { weather, air, loading, error, refresh } = useWeather(place);

  useEffect(() => {
    localStorage.setItem("skytrace:place", JSON.stringify(place));
  }, [place]);

  useEffect(() => {
    localStorage.setItem("skytrace:saved", JSON.stringify(savedLocations));
  }, [savedLocations]);

  const refreshSafety = async () => {
    const [a, s] = await Promise.allSettled([getAlerts(), getCycloneTrack()]);
    if (a.status === "fulfilled") setAlerts(a.value);
    if (s.status === "fulfilled") setStorms(s.value);
  };

  useEffect(() => {
    refreshSafety();
    const id = setInterval(refreshSafety, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!alerts?.connected || !Array.isArray(alerts.alerts)) return;
    const ids = new Set(alerts.alerts.map((a) => a.id));
    if (seenAlertIds.current === null) {
      seenAlertIds.current = ids;
      return;
    }

    const fresh = alerts.alerts.filter(
      (a) =>
        !seenAlertIds.current.has(a.id) &&
        a.sent &&
        Date.now() - new Date(a.sent).getTime() < 20 * 60 * 1000,
    );
    seenAlertIds.current = ids;

    if (
      notificationsOn &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      fresh.forEach(
        (a) =>
          new Notification(a.headline || a.event || "Official weather alert", {
            body:
              a.description || "Open SKYTRACE and check the official bulletin.",
          }),
      );
    }
  }, [alerts, notificationsOn]);

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      setNotice("This browser does not support desktop notifications.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsOn(true);
      localStorage.setItem("skytrace:notifications", "on");
      setNotice(
        "Browser notifications enabled for newly received official CAP alerts.",
      );
    } else setNotice("Notification permission was not granted.");
  };

  const current = weather?.current,
    hourly =
      weather?.hourly?.time?.map((time, i) => ({
        time,
        temperature_2m: weather.hourly.temperature_2m[i],
        precipitation_probability: weather.hourly.precipitation_probability[i],
        wind_speed_10m: weather.hourly.wind_speed_10m[i],
        weather_code: weather.hourly.weather_code[i],
        uv_index: weather.hourly.uv_index[i],
      })) || [];

  const days =
    weather?.daily?.time?.map((date, i) => ({
      date,
      weather_code: weather.daily.weather_code[i],
      temperature_2m_max: weather.daily.temperature_2m_max[i],
      temperature_2m_min: weather.daily.temperature_2m_min[i],
      precipitation_probability_max:
        weather.daily.precipitation_probability_max[i],
      wind_speed_10m_max: weather.daily.wind_speed_10m_max[i],
      uv_index_max: weather.daily.uv_index_max[i],
      sunrise: weather.daily.sunrise[i],
      sunset: weather.daily.sunset[i],
    })) || [];

  const pulse = getPulse(current, hourly);
  const aqi = air?.current?.us_aqi,
    aqiInfo = aqiLabel(aqi);

  const search = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    try {
      setResults(await searchPlaces(query));
    } catch (err) {
      setNotice(err.message);
    } finally {
      setSearching(false);
    }
  };

  const choose = (p) => {
    setPlace(p);
    setQuery("");
    setResults([]);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const locate = () => {
    if (!navigator.geolocation) {
      setNotice("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        choose({
          id: "gps",
          name: "Your location",
          admin: `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () =>
        setNotice("Location permission was denied. Search for a city instead."),
      {
        enableHighAccuracy: true,
        timeout: 12000,
      },
    );
  };

  const removeSavedPlace = (locationToRemove) => {
    const updatedLocations = savedLocations.filter(
      (location) => location.id !== locationToRemove,
    );

    setSavedLocations(updatedLocations);

    localStorage.setItem(
      "skytrace-saved-locations",
      JSON.stringify(updatedLocations),
    );
  };

  const savePlace = () => {
    if (savedLocations.some((x) => x.id === place.id)) return;
    setSavedLocations((v) => [...v, place]);
    setNotice(`${place.name} saved to your places.`);
  };
  const activeCyclone = storms?.points?.length > 0;
  const trackDistance = activeCyclone
    ? nearestTrackDistanceKm(place, storms.points)
    : null;

  const toggleRadar = async () => {
    if (radar) {
      setRadar(false);
      return;
    }
    const frame = await getRadar();
    setRadarFrame(frame);
    setRadar(Boolean(frame.available));
    if (!frame.available)
      setNotice(
        `Radar overlay unavailable: ${frame.message || "No frame returned."}`,
      );
  };

  const maxRain = Math.max(
    0,
    ...hourly.slice(0, 8).map((h) => h.precipitation_probability || 0),
  );

  return (
    <div className="app-shell">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        refreshAll={() => {
          refresh();
          refreshSafety();
        }}
        locate={locate}
      />

      <main className="main" id="overview">
        {!["privacy", "terms"].includes(activeView) && (
          <>
        <IntroSearch
          activeView={activeView}
          query={query}
          setQuery={setQuery}
          search={search}
          searching={searching}
          results={results}
          choose={choose}
        />
        {notice && (
          <div className="notice">
            {notice}
            <button onClick={() => setNotice("")}>Dismiss</button>
          </div>
        )}
        {error && (
          <div className="error">
            {error}
            <button onClick={refresh}>Retry</button>
          </div>
        )}
        <LocationBar
          place={place}
          savePlace={savePlace}
          savedLocations={savedLocations}
          choose={choose}
          removeSavedPlace={removeSavedPlace}
        />
        {activeView === "home" && (
          <HomeView
            current={current}
            hourly={hourly}
            weather={weather}
            air={air}
            days={days}
            loading={loading}
          />
        )}
        {activeView === "forecast" && (
          <ForecastView
            hourly={hourly}
            chartMode={chartMode}
            setChartMode={setChartMode}
            days={days}
            localTime={localTime}
          />
        )}
        {activeView === "storms" && (
          <StormsView
            storms={storms}
            place={place}
            radar={radar}
            radarFrame={radarFrame}
            toggleRadar={toggleRadar}
            activeCyclone={activeCyclone}
            trackDistance={trackDistance}
          />
        )}
        {activeView === "alerts" && (
          <AlertsView
            alerts={alerts}
            place={place}
            notificationsOn={notificationsOn}
            enableNotifications={enableNotifications}
          />
        )}
        </>
      )}
        {activeView === "privacy" && (
          <PrivacyPolicy onBack={() => setActiveView("home")} />
        )}

        {activeView === "terms" && (
          <TermsAndServices onBack={() => setActiveView("home")} />
        )}
      </main>
      <Footer onNavigate={setActiveView} />
    </div>
  );
}
