import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

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

export function LangSwitch({ lang, setLang }) {
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

export { Logo };

const SECTION_IDS = ["about", "benefits", "why", "reviews", "pricing", "contact"];

export default function Header({ T, lang, setLang, CFG }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const mid = window.innerHeight * 0.38;
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) { current = id; break; }
      }
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
