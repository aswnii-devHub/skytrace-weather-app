import { useCallback, useEffect, useState } from "react";
import { getForecast, getAirQuality } from "../services/api.js";

export function useWeather(place) {
    const [weather, setWeather] = useState(null);
    const [air, setAir] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const refresh = useCallback(async () => {
        setLoading(true); setError("");
        const [w, a] = await Promise.allSettled([getForecast(place.latitude, place.longitude), getAirQuality(place.latitude, place.longitude)]);
        if (w.status === "fulfilled") 
            setWeather(w.value.data); 
        else 
            setError(w.reason?.message || "Weather data unavailable.");
        if (a.status === "fulfilled") 
            setAir(a.value.data); 
        else 
            setAir(null);
        setLoading(false);
    }, [place.latitude, place.longitude]);

    useEffect(() => { 
        refresh(); 
        const timer = setInterval(refresh, 15 * 60 * 1000); 
        return () => clearInterval(timer); 
    }, [refresh]);
    return { weather, air, loading, error, refresh };
}
