import { useState } from 'react';
import Icon from '../components/Icon';
import SectionHeader from '../components/SectionHeader';

function ContactForm({ T }) {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", email: "", lang: "", msg: "" });
  const [err, setErr] = useState(false);
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

export default function Contact({ T, CFG }) {
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
              <a href={CFG.fb} target="_blank" rel="noopener" className="btn btn-facebook" style={{ flex: 1, justifyContent: "center" }}>
                <Icon name="facebook" size={18} />Facebook</a>
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
