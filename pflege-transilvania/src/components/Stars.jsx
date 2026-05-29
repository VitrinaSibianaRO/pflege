import { useState } from 'react';
import Icon from './Icon';

export default function Stars({ value = 5, size = 16, interactive = false, onChange = null }) {
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
