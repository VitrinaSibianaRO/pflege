// sections2.jsx — Mirela, Recenzii, Prețuri, Contact, Footer
const { useState: useState2 } = React;

function Mirela({ T, CFG }) {
  return (
    <section className="section section-mirela">
      <div className="container mirela-grid">
        <Reveal className="mirela-media">
          <MediaSlot src={CFG.media + "mirela.jpg"} kind="image" label="media/mirela.jpg — portret Mirela Popescu" ratio="4 / 5" radius={24} />
        </Reveal>
        <div className="mirela-copy">
          <Reveal className="kicker"><span style={{ width: 22, height: 1.5, background: "var(--accent)", display: "inline-block" }}></span>{T.mirela.kicker}</Reveal>
          <Reveal as="blockquote" delay={90} className="mirela-quote">“{T.mirela.quote}”</Reveal>
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

function ReviewCard({ r, T, isMine }) {
  const d = new Date(r.date);
  const dateStr = isNaN(d) ? "" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const initials = (r.name || "?").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={"review-card" + (isMine ? " mine" : "")}>
      {isMine && <span className="review-mine-tag">{T.reviews.yours}</span>}
      <Stars value={r.rating} size={15} />
      <p className="review-text">“{r.text}”</p>
      <div className="review-author">
        <span className="review-avatar">{initials}</span>
        <div>
          <div className="review-name">{r.name}</div>
          <div className="review-meta">{[r.role, dateStr].filter(Boolean).join(" · ")}</div>
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ T, onAdd, onClose }) {
  const [name, setName] = useState2("");
  const [role, setRole] = useState2("");
  const [rating, setRating] = useState2(5);
  const [text, setText] = useState2("");
  const [err, setErr] = useState2(false);
  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) { setErr(true); return; }
    onAdd({ id: "u" + Date.now(), name: name.trim(), role: role.trim(), rating, text: text.trim(),
      date: new Date().toISOString().slice(0, 10), mine: true });
    onClose();
  };
  return (
    <form className="review-form" onSubmit={submit}>
      <h3 className="review-form-title">{T.reviews.formTitle}</h3>
      <div className="rf-row">
        <label className="field">
          <span className="field-label">{T.reviews.nameLabel}</span>
          <input className={"input" + (err && !name.trim() ? " input-err" : "")} value={name}
            onChange={(e) => setName(e.target.value)} placeholder={T.reviews.namePh} />
        </label>
        <label className="field">
          <span className="field-label">{T.reviews.roleLabel}</span>
          <input className="input" value={role} onChange={(e) => setRole(e.target.value)} placeholder={T.reviews.rolePh} />
        </label>
      </div>
      <div className="field">
        <span className="field-label">{T.reviews.ratingLabel}</span>
        <Stars value={rating} size={26} interactive={true} onChange={setRating} />
      </div>
      <label className="field">
        <span className="field-label">{T.reviews.textLabel}</span>
        <textarea className={"input textarea" + (err && !text.trim() ? " input-err" : "")} rows={3} value={text}
          onChange={(e) => setText(e.target.value)} placeholder={T.reviews.textPh}></textarea>
      </label>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button type="button" className="btn btn-ghost" onClick={onClose}>{T.reviews.cancel}</button>
        <button type="submit" className="btn btn-primary">{T.reviews.submit}</button>
      </div>
    </form>
  );
}

function Reviews({ T, reviews, onAdd }) {
  const [showForm, setShowForm] = useState2(false);
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;
  return (
    <section id="reviews" className="section section-tint">
      <div className="container">
        <div className="reviews-head">
          <SectionHeader kicker={T.reviews.kicker} title={T.reviews.title} lead={T.reviews.lead} />
          <Reveal delay={120} className="reviews-summary">
            <div className="reviews-avg">{avg.toFixed(1)}</div>
            <div>
              <Stars value={Math.round(avg)} size={18} />
              <div className="reviews-count">{reviews.length} {reviews.length === 1 ? "recenzie" : "recenzii"}</div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              <Icon name="star" size={16} fill={true} stroke={0} />{T.reviews.addBtn}</button>
          </Reveal>
        </div>
        {showForm && <Reveal style={{ marginTop: 26 }}><ReviewForm T={T} onAdd={onAdd} onClose={() => setShowForm(false)} /></Reveal>}
        <div className="reviews-grid">
          {reviews.length === 0 && <p className="body" style={{ opacity: .7 }}>{T.reviews.empty}</p>}
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 70}><ReviewCard r={r} T={T} isMine={r.mine} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ T }) {
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

function ContactForm({ T }) {
  const [sent, setSent] = useState2(false);
  const [f, setF] = useState2({ name: "", phone: "", email: "", lang: "", msg: "" });
  const [err, setErr] = useState2(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim()) { setErr(true); return; }
    setSent(true);
  };
  if (sent) {
    return (
      <div className="contact-sent">
        <span className="contact-sent-ic"><Icon name="check" size={34} stroke={2.2} /></span>
        <p>{T.contact.sent}</p>
      </div>
    );
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="cf-row">
        <label className="field"><span className="field-label">{T.contact.fName}</span>
          <input className={"input" + (err && !f.name.trim() ? " input-err" : "")} value={f.name} onChange={set("name")} placeholder={T.contact.fNamePh} /></label>
        <label className="field"><span className="field-label">{T.contact.fPhone}</span>
          <input className={"input" + (err && !f.phone.trim() ? " input-err" : "")} value={f.phone} onChange={set("phone")} placeholder={T.contact.fPhonePh} /></label>
      </div>
      <div className="cf-row">
        <label className="field"><span className="field-label">{T.contact.fEmail}</span>
          <input className="input" type="email" value={f.email} onChange={set("email")} placeholder={T.contact.fEmailPh} /></label>
        <label className="field"><span className="field-label">{T.contact.fLang}</span>
          <select className="input" value={f.lang} onChange={set("lang")}>
            <option value="">—</option>
            {T.contact.fLangOpts.map((o, i) => <option key={i} value={o}>{o}</option>)}
          </select></label>
      </div>
      <label className="field"><span className="field-label">{T.contact.fMsg}</span>
        <textarea className="input textarea" rows={4} value={f.msg} onChange={set("msg")} placeholder={T.contact.fMsgPh}></textarea></label>
      <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>{T.contact.submit}<Icon name="arrow" size={20} stroke={1.9} /></button>
    </form>
  );
}

function Contact({ T, CFG }) {
  const rows = [
    ["pin", T.contact.addressLabel, T.contact.address, CFG.maps],
    ["phone", T.contact.phoneLabel, CFG.phoneDisplay, CFG.tel],
    ["mail", T.contact.emailLabel, CFG.email, "mailto:" + CFG.email]
  ];
  return (
    <section id="contact" className="section section-contact">
      <div className="container contact-grid">
        <div className="contact-left">
          <SectionHeader kicker={T.contact.kicker} title={T.contact.title} lead={T.contact.lead} />
          <div className="contact-info">
            <div className="contact-company">{T.contact.company}</div>
            {rows.map(([ic, label, val, href], i) => (
              <a key={i} href={href} target={ic === "pin" ? "_blank" : undefined} rel="noopener" className="contact-row">
                <span className="contact-ic"><Icon name={ic} size={20} stroke={1.8} /></span>
                <span><span className="contact-row-label">{label}</span><span className="contact-row-val">{val}</span></span>
              </a>
            ))}
            <div className="contact-cta-row">
              <a href={CFG.wa} target="_blank" rel="noopener" className="btn btn-whatsapp" style={{ flex: 1, justifyContent: "center" }}>
                <Icon name="whatsapp" size={18} fill={true} stroke={0} />WhatsApp</a>
              <a href={CFG.fb} target="_blank" rel="noopener" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Facebook</a>
            </div>
          </div>
          <div className="contact-map">
            <iframe title="Hartă" src="https://maps.google.com/maps?q=porumbacu%20de%20jos%2C%20nr%2048%2C%20jud.%20Sibiu&t=m&z=11&output=embed&iwloc=near"
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className="contact-right">
          <ContactForm T={T} />
        </div>
      </div>
    </section>
  );
}

function Footer({ T, lang, setLang, CFG }) {
  const links = [["#about", T.nav.about], ["#benefits", T.nav.benefits], ["#why", T.nav.why], ["#reviews", T.nav.reviews], ["#pricing", T.nav.pricing], ["#contact", T.nav.contact]];
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-tagline">{T.footer.tagline}</p>
          <div className="footer-built"><Icon name="pin" size={15} stroke={1.8} />{T.footer.built}</div>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">{T.footer.nav}</h4>
          {links.map(([h, l]) => <a key={h} href={h} className="footer-link">{l}</a>)}
        </div>
        <div className="footer-col">
          <h4 className="footer-h">{T.footer.contactT}</h4>
          <a href={CFG.tel} className="footer-link">{CFG.phoneDisplay}</a>
          <a href={"mailto:" + CFG.email} className="footer-link">{CFG.email}</a>
          <a href={CFG.maps} target="_blank" rel="noopener" className="footer-link">{T.contact.address}</a>
          <a href={CFG.fb} target="_blank" rel="noopener" className="footer-link">Facebook</a>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">Limbă · Sprache · Language</h4>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </div>
      <div className="footer-bottom"><div className="container">{T.footer.legal}</div></div>
    </footer>
  );
}

Object.assign(window, { Mirela, Reviews, Pricing, Contact, Footer, LangSwitch });
