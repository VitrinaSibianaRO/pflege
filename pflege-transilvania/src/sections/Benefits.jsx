import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

export default function Benefits({ T }) {
  const icons = ["euro", "home", "globe", "clock", "doc", "shield", "gift", "heart"];
  return (
    <section id="benefits" className="section section-tint">
      <div className="container">
        <SectionHeader kicker={T.benefits.kicker} title={T.benefits.title} lead={T.benefits.lead} align="center" />
        <div className="benefits-grid">
          {T.benefits.items.map((it, i) => (
            <Reveal key={i} delay={(i % 4) * 70} className="benefit-card">
              <span className="benefit-ic"><Icon name={icons[i] || "check"} size={22} stroke={1.8} /></span>
              <h3 className="benefit-t">{it.t}</h3>
              <p className="benefit-d">{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
