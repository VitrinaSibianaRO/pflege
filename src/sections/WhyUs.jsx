import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import MediaSlot from '../components/MediaSlot';
import SectionHeader from '../components/SectionHeader';

export default function WhyUs({ T, CFG }) {
  return (
    <section id="why" className="section">
      <div className="container why-grid">
        <div className="why-copy">
          <SectionHeader kicker={T.why.kicker} title={T.why.title} />
          <div className="why-groups">
            {T.why.groups.map((g, i) => (
              <Reveal key={i} delay={i * 90} className="why-group">
                <h3 className="why-group-t"><span className="why-num">{String(i + 1).padStart(2, "0")}</span>{g.t}</h3>
                <ul className="why-list">
                  {g.items.map((item, j) => (
                    <li key={j}><span className="why-check"><Icon name="check" size={14} stroke={2.4} /></span><span>{item}</span></li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={150} className="why-media">
          <MediaSlot src={CFG.media + "germania.mp4"} kind="video" label="media/germania.mp4 — Germania / document de muncă" ratio="3 / 4" radius={24} />
        </Reveal>
      </div>
    </section>
  );
}
