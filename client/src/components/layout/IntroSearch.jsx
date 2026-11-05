import React from "react";
import { Search } from "lucide-react";

const contentByView = {
  home: { eyebrow: "YOUR WEATHER BRIEFING", title: <>Know the weather.<br /><em>Read the room.</em></>, description: "A clearer picture of what’s happening outside — and what might happen next." },
  forecast: { eyebrow: "WEATHER OUTLOOK", title: <>Plan around<br /><em>the elements.</em></>, description: "A practical look at the hours and days ahead." },
  storms: { eyebrow: "REGIONAL HAZARD MONITOR", title: <>See what's<br /><em>moving nearby.</em></>, description: "Follow verified storm information and understand what the data can — and cannot — tell you." },
  alerts: { eyebrow: "OFFICIAL WARNING NETWORK", title: <>Stay informed.<br /><em>Stay prepared.</em></>, description: "Official warnings, clear context and practical safety guidance." },
};

export default function IntroSearch({ activeView, query, setQuery, search, searching, results, choose }) {
  const content = contentByView[activeView];
  return (
    <section className="intro">
      <div>
        <div className="eyebrow"><i /> {content.eyebrow}{" "}
          <span>{new Date().toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}</span>
        </div>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </div>
      <form className="search" onSubmit={search}>
        <Search size={17} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a city or place…" />
        <button disabled={searching}>{searching ? "…" : "SEARCH"}</button>
        {results.length > 0 && <div className="results">
          {results.map((p) => <button type="button" key={p.id} onClick={() => choose(p)}>{p.name}<small>{p.admin}</small></button>)}
        </div>}
      </form>
    </section>
  );
}
