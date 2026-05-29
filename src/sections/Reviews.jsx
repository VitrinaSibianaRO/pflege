import { useState } from 'react';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import Stars from '../components/Stars';

function ReviewCard({ r, T, isMine }) {
  const d = new Date(r.date);
  const dateStr = isNaN(d) ? "" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const initials = (r.name || "?").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={"review-card" + (isMine ? " mine" : "")}>
      {isMine && <span className="review-mine-tag">{T.reviews.yours}</span>}
      <Stars value={r.rating} size={15} />
      <p className="review-text">&ldquo;{r.text}&rdquo;</p>
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
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
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

export default function Reviews({ T, reviews, onAdd }) {
  const [showForm, setShowForm] = useState(false);
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
