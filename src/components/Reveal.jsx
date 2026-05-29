import { useState, useEffect, useRef } from 'react';

export default function Reveal({ children, delay = 0, as = "div", className = "", style = {} }) {
  const ref = useRef(null);
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
      if (vh > 0 && r.top > vh * 0.9) setShown(false);
      io.observe(el);
    });
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={className}
      style={{ ...style, opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(22px)",
        transition: `opacity 1s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 1s cubic-bezier(.2,.7,.2,1) ${delay}ms` }}>
      {children}
    </Tag>
  );
}
