import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import MediaSlot from '../components/MediaSlot';
import SectionHeader from '../components/SectionHeader';

export default function About({ T, CFG }) {
  const badges = [["doc", T.about.badge1], ["shield", T.about.badge2], ["pin", T.about.badge3]];
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal className="about-media">
          <MediaSlot src={CFG.media + "germania.mp4"} kind="video" label="media/germania.mp4 — echipa / îngrijire la domiciliu" ratio="4 / 5" radius={24} />
        </Reveal>
        <div className="about-copy">
          <SectionHeader kicker={T.about.kicker} title={T.about.title} />
          <Reveal as="p" delay={120} className="body" style={{ marginTop: 22 }}>{T.about.p1}</Reveal>
          <Reveal as="p" delay={180} className="body" style={{ marginTop: 16 }}>{T.about.p2}</Reveal>
          <div className="about-badges">
            {badges.map(([ic, label], i) => (
              <Reveal key={i} delay={220 + i * 80} className="about-badge">
                <span className="about-badge-ic"><Icon name={ic} size={18} stroke={1.9} /></span>{label}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
