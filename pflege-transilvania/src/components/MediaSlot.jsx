import { useState } from 'react';
import Icon from './Icon';

export default function MediaSlot({ src, kind = "image", label = "", ratio = "4 / 3", radius = 18, className = "", style = {} }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"mediaslot " + className}
      style={{ position: "relative", aspectRatio: ratio, borderRadius: radius, overflow: "hidden",
        background: "var(--ph-bg)", ...style }}>
      {/* Placeholder — întotdeauna dedesubt; e acoperit dacă fișierul real există */}
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
    </div>
  );
}
