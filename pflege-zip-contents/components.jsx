// components.jsx — componente reutilizabile (exportate în window)
const { useState, useEffect, useRef } = React;

// ---- Iconuri (set minimal, stroke simplu) ----
const ICONS = {
  phone: "M2.5 4.5C2.5 3.4 3.4 2.5 4.5 2.5h2.2c.5 0 .9.3 1 .8l.9 3c.1.4 0 .8-.3 1.1L7 10.6a12 12 0 0 0 5.4 5.4l1.2-1.3c.3-.3.7-.4 1.1-.3l3 .9c.5.1.8.5.8 1v2.2c0 1.1-.9 2-2 2C9.6 20.5 2.5 13.4 2.5 4.5Z",
  whatsapp: "M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm0 2a7.5 7.5 0 0 1 0 15 7.4 7.4 0 0 1-3.8-1l-.3-.2-2.4.6.6-2.3-.2-.4A7.5 7.5 0 0 1 12 4.5Zm-2.7 3.4c-.2 0-.5 0-.7.3-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.8 2.7.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.6-.4-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3.2-.4 0-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4Z",
  check: "M4 10.5l4 4 8-9",
  shield: "M10 2.5l6 2.2v5.3c0 3.7-2.5 6.6-6 7.5-3.5-.9-6-3.8-6-7.5V4.7L10 2.5Z",
  home: "M3 9.5L10 3.5l7 6M5 8.5v8h10v-8",
  euro: "M13.5 5.5a5 5 0 1 0 0 9M4.5 8.5h6M4.5 11.5h6",
  clock: "M10 4.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM10 7v3.2l2 1.3",
  doc: "M5 2.5h6l4 4v11H5V2.5ZM11 2.5v4h4M7.5 10.5h5M7.5 13.5h5",
  heart: "M10 16.5C5 13 3 10.4 3 7.8 3 6 4.4 4.5 6.3 4.5c1.2 0 2.3.6 2.9 1.6.6-1 1.7-1.6 2.9-1.6C14 4.5 15.4 6 15.4 7.8c0 2.6-2 5.2-5.4 8.7Z",
  gift: "M4 8.5h12v8H4v-8ZM3 6.5h14v2H3v-2ZM10 6.5v10M10 6.5c-1-2.5-4-2.5-4-.5 0 1 .9 1 2 1M10 6.5c1-2.5 4-2.5 4-.5 0 1-.9 1-2 1",
  globe: "M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM2.5 10h15M10 2.5c2.5 2 2.5 13 0 15M10 2.5c-2.5 2-2.5 13 0 15",
  pin: "M10 2.5c3 0 5.5 2.4 5.5 5.4 0 3.8-5.5 9.6-5.5 9.6S4.5 11.7 4.5 7.9C4.5 4.9 7 2.5 10 2.5ZM10 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  mail: "M3 5.5h14v9H3v-9ZM3 6l7 5 7-5",
  star: "M10 2.5l2.2 4.6 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5L2.8 7.8l5-.7L10 2.5Z",
  arrow: "M4 10h11M11 6l4 4-4 4",
  euro2: "M13.5 5.5a5 5 0 1 0 0 9M4.5 8.5h6M4.5 11.5h6",
  play: "M7 5l8 5-8 5V5Z"
};
function Icon({ name, size = 20, fill = false, stroke = 2, style = {}, ...rest }) {
  const d = ICONS[name] || "";
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={fill ? "currentColor" : "none"}
         stroke={fill ? "none" : "currentColor"} strokeWidth={stroke} strokeLinecap="round"
         strokeLinejoin="round" style={style} aria-hidden="true" {...rest}>
      <path d={d} />
    </svg>
  );
}

// ---- Reveal: animație la scroll ----
function Reveal({ children, delay = 0, as = "div", className = "", style = {} }) {
  const ref = useRef(null);
  // Pornim VIZIBIL. Ascundem-pentru-animație doar într-un requestAnimationFrame,
  // care rulează exclusiv într-un tab/iframe efectiv vizibil. În context ascuns
  // (preview offscreen / tab fundal) rAF nu rulează → conținutul rămâne vizibil.
  const [shown, setShown] = useState(true);
  useEffect(() => {
    const el = ref.current; if (!el || !("IntersectionObserver" in window)) return;
    let io = null;
    const raf = requestAnimationFrame(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      const r = el.getBoundingClientRect();
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      // Ascundem doar elementele de sub fold (cele din viewport rămân vizibile).
      if (vh > 0 && r.top > vh * 0.9) setShown(false);
      io.observe(el);
    });
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={className}
      style={{ ...style, opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(22px)",
        transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms` }}>
      {children}
    </Tag>
  );
}

// ---- MediaSlot: imagine/video cu fallback placeholder + cale fișier ca link ----
function MediaSlot({ src, kind = "image", label = "", ratio = "4 / 3", radius = 18, className = "", style = {} }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"mediaslot " + className}
      style={{ position: "relative", aspectRatio: ratio, borderRadius: radius, overflow: "hidden",
        background: "var(--ph-bg)", ...style }}>
      {/* Placeholder — întotdeauda dedesubt; e acoperit dacă fișierul real există */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12, padding: 20, textAlign: "center",
        backgroundImage: "repeating-linear-gradient(135deg, var(--ph-stripe) 0 14px, transparent 14px 28px)",
        backgroundColor: "var(--ph-bg)" }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, display: "grid", placeItems: "center",
          background: "var(--surface)", color: "var(--accent)", boxShadow: "0 4px 14px rgba(60,40,25,.10)" }}>
          <Icon name={kind === "video" ? "play" : "home"} size={24} fill={kind === "video"} stroke={1.8} />
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.5, color: "var(--ink-soft)", maxWidth: "92%" }}>{label}</div>
      </div>
      {!failed && kind === "image" && (
        <img src={src} alt="" loading="lazy" onError={() => setFailed(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      )}
      {!failed && kind === "video" && (
        <video src={src} autoPlay muted loop playsInline onError={() => setFailed(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      )}
      {/* Chip cu calea fișierului — link direct către media */}
      <a href={src} target="_blank" rel="noopener" title={"Deschide " + src}
        style={{ position: "absolute", left: 10, bottom: 10, display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 9px", borderRadius: 999, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".02em",
          color: "var(--ink)", background: "rgba(255,255,255,.86)", backdropFilter: "blur(6px)",
          textDecoration: "none", boxShadow: "0 2px 8px rgba(60,40,25,.12)", border: "1px solid var(--hairline)" }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}></span>
        {src}
      </a>
    </div>
  );
}

// ---- SectionHeader ----
function SectionHeader({ kicker, title, lead, align = "left", maxLead = 640 }) {
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

// ---- Stars ----
function Stars({ value = 5, size = 16, interactive = false, onChange = null }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "inline-flex", gap: 2, color: "var(--gold)" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}
          onMouseEnter={interactive ? () => setHover(n) : undefined}
          onMouseLeave={interactive ? () => setHover(0) : undefined}
          onClick={interactive ? () => onChange && onChange(n) : undefined}
          style={{ cursor: interactive ? "pointer" : "default", lineHeight: 0,
            color: (hover || value) >= n ? "var(--gold)" : "var(--hairline)", transition: "color .15s" }}>
          <Icon name="star" size={size} fill={true} stroke={0} />
        </span>
      ))}
    </div>
  );
}

// ---- Buton ----
function Btn({ children, variant = "primary", as = "button", icon = null, ...rest }) {
  const Tag = as;
  return (
    <Tag className={"btn btn-" + variant} {...rest}>
      {icon && <Icon name={icon} size={18} fill={icon === "whatsapp"} stroke={1.9} />}
      {children}
    </Tag>
  );
}

Object.assign(window, { Icon, Reveal, MediaSlot, SectionHeader, Stars, Btn });
