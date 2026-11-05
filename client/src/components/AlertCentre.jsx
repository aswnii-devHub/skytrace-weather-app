import { AlertTriangle, ExternalLink, ShieldCheck, Clock3 } from "lucide-react";

const severityClass = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");

export default function AlertCentre({
  data,
  place,
  notificationsOn,
  onEnableNotifications,
}) {
  const alerts = data?.alerts || [];
  const tokens = [place.name, place.admin, place.country]
    .filter(Boolean)
    .map((x) => x.toLowerCase());

  const isPossibleMatch = (a) => {
    const text = (a.areas || [])
      .map((x) => x.description || "")
      .join(" ")
      .toLowerCase();
    return Boolean(
      text && tokens.some((t) => t.length > 3 && text.includes(t)),
    );
  };

  return (
    <section className="section" id="alerts">
      <div className="section-head">
        <div>
          <div className="eyebrow">OFFICIAL WARNING NETWORK</div>
          <h2>
            Alert centre<span>.</span>
          </h2>
        </div>
        <div className="alert-actions">
          <button className="notify-button" onClick={onEnableNotifications}>
            {notificationsOn ? "NOTIFICATIONS ON" : "ENABLE BROWSER ALERTS"}
          </button>
          <span className={`feed-status ${data?.connected ? "ok" : ""}`}>
            <i />
            {data?.connected ? "FEED CONNECTED" : "FEED STATUS UNKNOWN"}
          </span>
        </div>
      </div>
      <div className="alert-layout">
        <div className="panel alert-main">
          {alerts.length ? (
            alerts.slice(0, 8).map((a, i) => (
              <article className="alert-row" key={a.id || i}>
                <div className="alert-symbol">
                  <AlertTriangle />
                </div>
                <div className="alert-copy">
                  <div className="alert-meta">
                    <span className={`severity ${severityClass(a.severity)}`}>
                      {a.severity || "Alert"}
                    </span>
                    <span>{a.event}</span>
                    {isPossibleMatch(a) && (
                      <span className="match-tag">POSSIBLE PLACE MATCH</span>
                    )}
                  </div>
                  <h3>{a.headline || a.event || "Official alert"}</h3>
                  <p>
                    {a.description ||
                      "See the original official alert for full instructions."}
                  </p>
                  <small>
                    <Clock3 size={12} /> Issued{" "}
                    {a.sent
                      ? new Date(a.sent).toLocaleString()
                      : "time not supplied"}
                  </small>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-alert">
              <ShieldCheck size={28} />
              <h3>
                {data?.connected
                  ? "No current CAP alerts were returned"
                  : "Official alert feed could not be checked"}
              </h3>
              <p>
                {data?.connected
                  ? "No alerts are present in the latest feed response. Continue to monitor official sources."
                  : data?.message ||
                    "Check the official warning services directly. An unavailable feed is not proof that no hazard exists."}
              </p>
            </div>
          )}
          <div className="alert-foot">
            Feed checked:{" "}
            {data?.checkedAt
              ? new Date(data.checkedAt).toLocaleString()
              : "Not yet checked"}{" "}
            · {data?.source || "NDMA SACHET"}
          </div>
        </div>
        <aside className="official-card">
          <div className="eyebrow">SOURCE OF TRUTH</div>
          <h3>Warnings come from the people responsible for issuing them.</h3>
          <p>
            Use official bulletins for decisions during severe weather. SKYTRACE
            is an informational companion, not an emergency warning service.
          </p>
          <a
            href="https://sachet.ndma.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            NDMA SACHET <ExternalLink size={13} />
          </a>
          <a href="https://mausam.imd.gov.in/" target="_blank" rel="noreferrer">
            IMD MAUSAM <ExternalLink size={13} />
          </a>
          <a
            href="https://rsmcnewdelhi.imd.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            RSMC NEW DELHI <ExternalLink size={13} />
          </a>
          <small>Selected location: {place.name}</small>
        </aside>
      </div>
    </section>
  );
}
