import React from "react";
import { MapPin, X } from "lucide-react";

export default function LocationBar({ place, savePlace, savedLocations, choose, removeSavedPlace }) {
  return (
    <div className="location-line">
      <span><MapPin size={14} />{place.name} <small>{place.admin}</small></span>
      <button onClick={savePlace}>＋ Save place</button>
      {savedLocations.length > 0 && <div className="saved-places">
        {savedLocations.map((location) => <React.Fragment key={location.id}>
          <button className={location.id === place.id ? "chosen" : ""} onClick={() => choose(location)}>{location.name}</button>
          <button className="remove-saved-place" onClick={(e) => { e.stopPropagation(); removeSavedPlace(location.id); }}
            aria-label={`Remove ${location.name}`} title={`Remove ${location.name}`}><X size={13} /></button>
        </React.Fragment>)}
      </div>}
    </div>
  );
}
