import {
  ShieldCheck,
  CloudLightning,
  House,
  BriefcaseMedical,
  Radio,
} from "lucide-react";

const guides = [
  {
    icon: CloudLightning,
    title: "Cyclone readiness",
    steps: [
      "Follow IMD and local-authority bulletins.",
      "Charge phones and power banks; keep a torch ready.",
      "Secure loose items on balconies and terraces.",
      "If evacuation is advised, leave early using official routes.",
    ],
  },
  {
    icon: House,
    title: "Heavy rain & flooding",
    steps: [
      "Avoid walking or driving through floodwater.",
      "Keep documents and medicines in a waterproof bag.",
      "Stay away from open drains, culverts and electric poles.",
      "Move to higher ground if water rises around you.",
    ],
  },
  {
    icon: Radio,
    title: "Thunderstorms & lightning",
    steps: [
      "Move indoors or into a hard-topped vehicle.",
      "Avoid isolated trees, open fields and metal structures.",
      "Stay away from water and unplug sensitive equipment if safe.",
      "Wait at least 30 minutes after the last thunder before resuming outdoor activity.",
    ],
  },
];

export default function SafetyGuide() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <div className="eyebrow">PREPAREDNESS, NOT PANIC</div>
          <h2>
            Know what to do<span>.</span>
          </h2>
        </div>
        <small>GENERAL GUIDANCE · FOLLOW LOCAL OFFICIAL ADVICE</small>
      </div>
      <div className="safety-grid">
        {guides.map((g) => (
          <article className="panel safety-card" key={g.title}>
            <div className="safety-icon">
              <g.icon size={21} />
            </div>
            <h3>{g.title}</h3>
            <ul>
              {g.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
