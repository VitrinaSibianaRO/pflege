import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import MediaSlot from '../components/MediaSlot';

export default function Mirela({ T, CFG }) {
  return (
    <section className="section section-mirela">
      <div className="container mirela-grid">
        <Reveal className="mirela-media">
          <MediaSlot src={CFG.media + "mirela.jpg"} kind="image" label="media/mirela.jpg — portret Mirela Popescu" ratio="4 / 5" radius={24} />
        </Reveal>
        <div className="mirela-copy">
          <Reveal className="kicker"><span style={{ width: 22, height: 1.5, background: "var(--accent)", display: "inline-block" }}></span>{T.mirela.kicker}</Reveal>
          <Reveal as="blockquote" delay={90} className="mirela-quote">\u201C{T.mirela.quote}\u201D</Reveal>
          <Reveal delay={160} className="mirela-sign">
            <div>
              <div className="mirela-name">{T.mirela.name}</div>
              <div className="mirela-role">{T.mirela.role}</div>
            </div>
          </Reveal>
          <Reveal delay={220} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href={CFG.wa} target="_blank" rel="noopener" className="btn btn-whatsapp">
              <Icon name="whatsapp" size={18} fill={true} stroke={0} />{T.mirela.cta}</a>
            <a href={CFG.media + "marturie-mirela.mp4"} target="_blank" rel="noopener" className="btn btn-ghost">
              <Icon name="play" size={16} fill={true} stroke={0} />{T.mirela.videoLabel}</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
