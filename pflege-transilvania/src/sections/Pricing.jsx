import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

export default function Pricing({ T }) {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeader kicker={T.pricing.kicker} title={T.pricing.title} lead={T.pricing.lead} align="center" />
        <div className="pricing-grid">
          {T.pricing.tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 90} className={"price-card" + (i === 0 ? " price-feature" : "")}>
              <div className="price-badge">{tier.badge}</div>
              <h3 className="price-name">{tier.name}</h3>
              <div className="price-amount"><span className="price-num">{tier.price}</span><span className="price-per">/ {T.pricing.per}</span></div>
              <div className="price-month">{tier.month} · {T.pricing.colMonth}</div>
              <p className="price-desc">{tier.desc}</p>
              <a href="#contact" className={"btn " + (i === 0 ? "btn-primary" : "btn-ghost")} style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}>{T.topbar.apply}</a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="extras">
          <h3 className="extras-title">{T.pricing.extrasTitle}</h3>
          <div className="extras-table">
            <div className="extras-headrow">
              <span>{T.pricing.colDesc}</span><span>{T.pricing.colDay}</span><span>{T.pricing.colMonth}</span>
            </div>
            {T.pricing.extras.map((ex, i) => (
              <div key={i} className="extras-row">
                <span>{ex.d}</span><span className="extras-num">{ex.day}</span><span className="extras-num">{ex.month}</span>
              </div>
            ))}
          </div>
          <p className="price-note">{T.pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
