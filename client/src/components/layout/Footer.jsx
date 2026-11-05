const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", view: "home" },
      { label: "Forecast", view: "forecast" },
      { label: "Storms", view: "storms" },
      { label: "Alerts", view: "alerts" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Weather Data Sources", href: "https://open-meteo.com/" },
      { label: "Safety Guide", view: "alerts" },
      { label: "About", href: "#about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact / Feedback", href: "mailto:aswani.gundu@gmail.com" },
      { label: "GitHub", href: "https://github.com/your-username/your-repo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", view: "privacy" },
      { label: "Terms and Services", view: "terms" },
    ],
  },
];

const Footer = ({ onNavigate }) => {
  const handleNavigation = (link) => {
    if (link.view) {
      onNavigate(link.view);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-700/50 bg-[#101D25] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-xl font-bold tracking-widest text-white">
            SKYTRACE<span className="text-sky-400">.</span>
          </h2>
          <span>
            A weather intelligence platform designed to make weather information
            easier to understand. Explore forecasts, monitor regional hazards,
            track radar activity and stay informed with official weather alerts.
          </span>
          <span>
            Weather insights. Clearer decisions. See beyond the forecast.
          </span>
        </div>
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.view ? (
                      <button
                        type="button"
                        onClick={() => handleNavigation(link)}
                        className="text-sm text-slate-400 transition-colors hover:text-sky-400"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noreferrer"
                            : undefined
                        }
                        className="text-sm text-slate-400 transition-colors hover:text-sky-400"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-700/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SKYTRACE. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Weather data provided by Open-Meteo and other listed sources.
          </p>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
          Weather information is provided for informational purposes and should
          not replace official emergency warnings.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
