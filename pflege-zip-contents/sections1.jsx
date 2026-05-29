// sections1.jsx — Header, Hero, Despre, Beneficii, De ce noi
const { useState: useState1, useEffect: useEffect1 } = React;

// ---- Logo wordmark ----
function Logo({ onClick }) {
  return (
    <a href="#top" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none", color: "var(--ink)" }}>
      <span style={{ width: 40, height: 40, borderRadius: 999, display: "grid", placeItems: "center",
        background: "var(--accent)", color: "#fff", fontFamily: "var(--display)", fontWeight: 600, fontSize: 17,
        boxShadow: "0 4px 12px var(--accent-shadow)" }}>PT</span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 18, letterSpacing: "-.01em" }}>Pflege Transilvania</span>
        <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Îngrijire · Germania</span>
      </span>
    </a>
  );
}

// ---- Comutator limbă ----
function LangSwitch({ lang, setLang }) {
  const langs = ["ro", "de", "en"];
  return (
    <div style={{ display: "inline-flex", padding: 3, gap: 2, background: "var(--surface-2)", borderRadius: 999, border: "1px solid var(--hairline)" }}>
      {langs.map((l) => (
        <button key={l} onClick={() => setLang(l)}
          style={{ border: "none", cursor: "pointer", padding: "5px 11px", borderRadius: 999, fontSize: 12.5,
            fontWeight: 600, letterSpacing: ".03em", textTransform: "uppercase", fontFamily: "var(--sans)",
            background: lang === l ? "var(--accent)" : "transparent", color: lang === l ? "#fff" : "var(--ink-soft)",
            transition: "all .2s" }}>{l}</button>
      ))}
    </div>
  );
}

function Header({ T, lang, setLang, CFG }) {
  const [scrolled, setScrolled] = useState1(false);
  const [open, setOpen] = useState1(false);
  const [active, setActive] = useState1("");
  const SECTION_IDS = ["about", "benefits", "why", "reviews", "pricing", "contact"];
  useEffect1(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Scroll spy: găsim secțiunea care ocupă zona centrală a viewport-ului
      const mid = window.innerHeight * 0.38;
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) { current = id; break; }
      }
      // Dacă nu e nicio secțiune la mijloc, ia prima care e parțial vizibilă
      if (!current) {
        for (const id of [...SECTION_IDS].reverse()) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.6) { current = id; break; }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["#about", T.nav.about], ["#benefits", T.nav.benefits], ["#why", T.nav.why],
    ["#reviews", T.nav.reviews], ["#pricing", T.nav.pricing], ["#contact", T.nav.contact]
  ];
  const close = () => setOpen(false);
  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "")}>
      <div className="header-inner">
        <Logo onClick={close} />
        <nav className="desktop-nav">
          {links.map(([href, label]) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a key={href} href={href} className={"navlink" + (isActive ? " navlink-active" : "")}>{label}</a>
            );
          })}
        </nav>
        <div className="header-actions">
          <LangSwitch lang={lang} setLang={setLang} />
          <a href={CFG.tel} className="btn btn-ghost header-call">
            <Icon name="phone" size={17} stroke={1.9} />
            <span className="callnum">{CFG.phoneDisplay}</span>
          </a>
          <a href="#contact" className="btn btn-primary header-apply">{T.topbar.apply}</a>
          <button className="hamburger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <span style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}></span>
            <span style={{ opacity: open ? 0 : 1 }}></span>
            <span style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}></span>
          </button>
        </div>
      </div>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        {links.map(([href, label]) => {
          const id = href.slice(1);
          const isActive = active === id;
          return (
            <a key={href} href={href} className={"mobile-link" + (isActive ? " mobile-link-active" : "")} onClick={close}>{label}</a>
          );
        })}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <a href={CFG.tel} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={close}>
            <Icon name="phone" size={17} stroke={1.9} />{T.topbar.call}</a>
          <a href={CFG.wa} target="_blank" rel="noopener" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={close}>
            <Icon name="whatsapp" size={17} fill={true} stroke={0} />WhatsApp</a>
        </div>
      </div>
    </header>
  );
}

function Hero({ T, CFG, heroStyle }) {
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
          <MediaSlot src={CFG.media + "hero.jpg"} kind="image" label="media/hero.jpg — fotografie îngrijitoare & vârstnic" ratio="auto" radius={0}
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
          <MediaSlot src={CFG.media + "hero.jpg"} kind="image" label="media/hero.jpg — îngrijitoare cu un vârstnic, lumină caldă" ratio="3 / 4" radius={26} />
          <div className="hero-media-badge">
            <Icon name="heart" size={18} fill={true} stroke={0} />
            <span>{T.about.badge2}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About({ T, CFG }) {
  const badges = [["doc", T.about.badge1], ["shield", T.about.badge2], ["pin", T.about.badge3]];
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal className="about-media">
          <MediaSlot src={CFG.media + "despre.jpg"} kind="image" label="media/despre.jpg — echipa / îngrijire la domiciliu" ratio="4 / 5" radius={24} />
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

function Benefits({ T }) {
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

function WhyUs({ T, CFG }) {
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
          <MediaSlot src={CFG.media + "germania.jpg"} kind="image" label="media/germania.jpg — Germania / document de muncă" ratio="3 / 4" radius={24} />
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Header, Hero, About, Benefits, WhyUs, Logo });
