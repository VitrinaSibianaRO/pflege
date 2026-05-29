import Reveal from './Reveal';

export default function SectionHeader({ kicker, title, lead, align = "left", maxLead = 640 }) {
  const center = align === "center";
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 760 : null, margin: center ? "0 auto" : null }}>
      {kicker && (
        <Reveal as="div" className="kicker">
          <span style={{ width: 22, height: 1.5, background: "var(--accent)", display: "inline-block" }}></span>
          {kicker}
        </Reveal>
      )}
      <Reveal as="h2" delay={60} className="h2" style={{ margin: "14px 0 0" }}>{title}</Reveal>
      {lead && <Reveal as="p" delay={120} className="lead" style={{ maxWidth: maxLead, margin: center ? "16px auto 0" : "16px 0 0" }}>{lead}</Reveal>}
    </div>
  );
}
