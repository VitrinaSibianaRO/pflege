import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import MediaSlot from '../components/MediaSlot';

export default function Hero({ T, CFG, heroStyle }) {
  const stats = [
    [T.hero.stat1n, T.hero.stat1l], [T.hero.stat2n, T.hero.stat2l], [T.hero.stat3n, T.hero.stat3l]
  ];
  const ctas = (
    <div className="hero-ctas">
      <a href="#contact" className="btn btn-primary btn-lg">{T.hero.ctaApply}<Icon name="arrow" size={20} stroke={1.9} /></a>
      <a href={CFG.wa} target="_blank" rel="noopener" className="btn btn-whatsapp btn-lg">
        <Icon name="whatsapp" size={20} fill={true} stroke={0} />{T.hero.ctaWhatsapp}</a>
    </div>
  );
  const statRow = (
    <div className="hero-stats">
      {stats.map(([n, l], i) => (
        <Reveal key={i} delay={300 + i * 90} className="hero-stat">
          <div className="hero-stat-n">{n}</div>
          <div className="hero-stat-l">{l}</div>
        </Reveal>
      ))}
    </div>
  );

  if (heroStyle === "fullbleed") {
    return (
      <section id="top" className="hero hero-fullbleed">
        <div className="hero-bg">
          <MediaSlot src={CFG.media + "hero.mp4"} kind="video" label="media/hero.mp4 — video îngrijitoare & vârstnic" ratio="auto" radius={0}
            style={{ position: "absolute", inset: 0, height: "100%" }} />
          <div className="hero-scrim"></div>
        </div>
        <div className="hero-fb-content">
          <Reveal className="kicker kicker-light"><span style={{ width: 22, height: 1.5, background: "#fff", display: "inline-block" }}></span>{T.hero.kicker}</Reveal>
          <Reveal as="h1" delay={80} className="h1 h1-light">{T.hero.title}</Reveal>
          <Reveal as="p" delay={160} className="lead lead-light" style={{ maxWidth: 600 }}>{T.hero.lead}</Reveal>
          <Reveal delay={230}>{ctas}</Reveal>
          {statRow}
        </div>
      </section>
    );
  }

  // split (editorial) — default
  return (
    <section id="top" className="hero hero-split">
      <div className="hero-split-inner">
        <div className="hero-copy">
          <Reveal className="kicker"><span style={{ width: 22, height: 1.5, background: "var(--accent)", display: "inline-block" }}></span>{T.hero.kicker}</Reveal>
          <Reveal as="h1" delay={80} className="h1" style={{ marginTop: 16 }}>{T.hero.title}</Reveal>
          <Reveal as="p" delay={160} className="lead" style={{ marginTop: 18, maxWidth: 520 }}>{T.hero.lead}</Reveal>
          <Reveal delay={230} style={{ marginTop: 28 }}>{ctas}</Reveal>
          {statRow}
        </div>
        <Reveal delay={180} className="hero-media">
          <MediaSlot src={CFG.media + "hero.mp4"} kind="video" label="media/hero.mp4 — video îngrijitoare cu un vârstnic, lumină caldă" ratio="3 / 4" radius={26} />
          <div className="hero-media-badge">
            <Icon name="heart" size={18} fill={true} stroke={0} />
            <span>{T.about.badge2}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
