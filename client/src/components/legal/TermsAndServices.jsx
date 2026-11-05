
import React from "react";

const TermsAndServices = ({ onBack }) => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-slate-300">
      <button
        onClick={onBack}
        className="mb-8 text-sm text-sky-400 hover:text-sky-300"
      >
        ← Back to SKYTRACE
      </button>

      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">
        Legal · Terms
      </p>

      <h1 className="mb-4 text-4xl font-bold text-white">
        Terms of Use
      </h1>

      <p className="mb-10 text-sm text-slate-400">
        Last updated: November 4, 2026
      </p>

      <div className="space-y-8 leading-7">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using SKYTRACE, you agree to these Terms of Use. If you do not agree with these terms, please discontinue use of the application.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            2. Purpose of SKYTRACE
          </h2>
          <p>
            SKYTRACE is a weather information application designed to present forecasts, air-quality information, radar imagery, storm-related information and public weather alerts in one interface.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            3. Weather Data Accuracy
          </h2>
          <p>
            Weather information is obtained from external data providers and may be delayed, incomplete, unavailable or inaccurate. Forecasts are estimates and actual weather conditions may differ.
          </p>
          <p className="mt-3">
            SKYTRACE does not independently guarantee the accuracy, completeness or availability of third-party data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            4. Emergency and Safety Disclaimer
          </h2>
          <p>
            SKYTRACE is not an official emergency warning service. It must not be used as the sole source of information for emergency decisions, evacuation planning or personal safety.
          </p>
          <p className="mt-3">
            Always follow instructions and warnings issued by authorized government agencies, including the India Meteorological Department and the National Disaster Management Authority.
          </p>
          <p className="mt-3">
            Do not rely on SKYTRACE to determine whether an area is safe or whether a hazardous weather event will affect a particular location.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            5. Third-Party Services
          </h2>
          <p>
            SKYTRACE may display information, maps or imagery provided by third parties. Your use of those services and their content may also be subject to their respective terms and policies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            6. Acceptable Use
          </h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use the application for unlawful purposes.</li>
            <li>Attempt to disrupt or damage the application or its services.</li>
            <li>Attempt unauthorized access to application systems or data.</li>
            <li>Misrepresent SKYTRACE information as an official government warning.</li>
            <li>Scrape or redistribute data in violation of applicable provider terms.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            7. Intellectual Property and Attribution
          </h2>
          <p>
            The SKYTRACE application design, branding and original content belong to their respective owners. Third-party data, maps and imagery remain subject to the licences and attribution requirements of their respective providers.
          </p>
          <p className="mt-3">
            Users must respect all applicable third-party intellectual property rights and data licences.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            8. Availability
          </h2>
          <p>
            We may modify, suspend or discontinue any part of SKYTRACE at any time. We do not guarantee uninterrupted availability or error-free operation.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            9. Limitation of Liability
          </h2>
          <p>
            To the extent permitted by applicable law, SKYTRACE and its contributors are not liable for losses or damages arising from reliance on weather information, service interruptions, third-party data errors or inability to access the application.
          </p>
          <p className="mt-3">
            Nothing in these terms excludes liability that cannot legally be excluded under applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            10. Changes to These Terms
          </h2>
          <p>
            These Terms of Use may be updated as the application evolves. Continued use of SKYTRACE after updated terms are published constitutes acceptance of the revised terms, to the extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            11. Contact
          </h2>
          <p>
            For questions about these terms, contact:
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

export default TermsAndServices;
