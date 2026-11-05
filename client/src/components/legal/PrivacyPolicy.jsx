
import React from "react";

const PrivacyPolicy = ({ onBack }) => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-slate-300">
      <button
        onClick={onBack}
        className="mb-8 text-sm text-sky-400 hover:text-sky-300"
      >
        ← Back to SKYTRACE
      </button>

      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">
        Legal · Privacy
      </p>

      <h1 className="mb-4 text-4xl font-bold text-white">
        Privacy Policy
      </h1>

      <p className="mb-10 text-sm text-slate-400">
        Last updated: November 4, 2026
      </p>

      <div className="space-y-8 leading-7">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            1. Introduction
          </h2>
          <p>
            Welcome to SKYTRACE. We respect your privacy and aim to be transparent about the information used when you access our weather application. This policy explains what information may be processed and how it is used.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            2. Information We Use
          </h2>
          <p className="mb-3">
            SKYTRACE may use the following information to provide its
            weather features:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Location information:</strong> If you use the My Location feature, your browser may provide your approximate or precise device coordinates, depending on its permissions and settings.
            </li>
            <li>
              <strong>Search information:</strong> City or place names
              you enter to retrieve weather information.
            </li>
            <li>
              <strong>Saved locations:</strong> Locations you choose
              to save in the application.
            </li>
            <li>
              <strong>Notification preference:</strong> Whether you
              enable browser notifications for newly received alerts.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            3. How Information Is Used
          </h2>
          <p>
            Information is used to retrieve weather forecasts, display local weather conditions, provide air-quality information, show weather alerts and storm-related data, and remember your selected locations and preferences.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            4. Local Storage
          </h2>
          <p>
            SKYTRACE uses your browser's local storage to remember application preferences, including your selected location, saved locations and notification preference. This information may remain in your browser until you clear the website's stored data. 
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            5. Third-Party Services
          </h2>
          <p className="mb-3">
            SKYTRACE uses third-party services to provide weather, mapping and alert information. Depending on the feature, these may include:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <a className="text-sky-400 hover:underline"
                href="https://open-meteo.com/" target="_blank"
                rel="noreferrer">Open-Meteo</a> — weather forecasts
              and air-quality information.
            </li>
            <li>
              <a className="text-sky-400 hover:underline"
                href="https://sachet.ndma.gov.in/" target="_blank"
                rel="noreferrer">NDMA SACHET</a> — public alert information.
            </li>
            <li>
              <a className="text-sky-400 hover:underline"
                href="https://mausam.imd.gov.in/" target="_blank"
                rel="noreferrer">India Meteorological Department</a> —
              official meteorological information.
            </li>
            <li>
              <a className="text-sky-400 hover:underline"
                href="https://www.rainviewer.com/" target="_blank"
                rel="noreferrer">RainViewer</a> — past radar imagery.
            </li>
            <li>
              <a className="text-sky-400 hover:underline"
                href="https://www.openstreetmap.org/" target="_blank"
                rel="noreferrer">OpenStreetMap</a> — map information.
            </li>
          </ul>
          <p className="mt-3">
            These services may process technical information, such as
            IP addresses or request details, when your browser or our
            server requests their data. Their own privacy policies
            apply to their services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            6. Browser Notifications
          </h2>
          <p>
            If you enable notifications, your browser will request permission. SKYTRACE may use that permission to display newly received official alert information. You can revoke notification permission through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            7. Data Sharing and Security
          </h2>
          <p>
            SKYTRACE does not require you to create an account to use its basic weather features. We do not intentionally sell personal information. Information may be processed by third-party services as necessary to provide application functionality. No internet-based system can be guaranteed to be completely secure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            8. Your Choices
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>You can choose whether to use device location.</li>
            <li>You can remove saved locations within the application.</li>
            <li>You can disable browser notifications.</li>
            <li>You can clear SKYTRACE's local storage through your browser.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy when application functionality or data practices change. The latest version will be published on this page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            10. Contact
          </h2>
          <p>
            For privacy-related questions, contact us at:
            {" "}
            <a className="text-sky-400 hover:underline"
              href="mailto:aswani.gundu@gmail.com">
              aswani.gundu@gmail.com
            </a>
          </p>
        </section>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
