import { useState, useEffect } from 'react';
import { I18N, MOCK_REVIEWS } from './i18n';

import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Benefits from './sections/Benefits';
import WhyUs from './sections/WhyUs';
import Mirela from './sections/Mirela';
import Reviews from './sections/Reviews';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const CFG = {
  phoneDisplay: "(+40) 750 639 017",
  tel: "tel:+40750639017",
  wa: "https://wa.me/40750639017",
  email: "pflege.transilvania@gmail.com",
  fb: "https://www.facebook.com/people/Pflege-Transilvania/100089086242873/",
  maps: "https://maps.google.com/maps?q=porumbacu+de+jos,+nr+48,+jud.+Sibiu",
  media: "/media/"
};

const ACCENTS = {
  terracotta: { accent: "#bd4f2c", dark: "#9c3f22", shadow: "rgba(189,79,44,.30)", tint: "#f7ede5", soft: "#cf6f4f" },
};
const HEADING_FONTS = {
  Petrona: "'Petrona', Georgia, serif",
};

const DESIGN = { accent: "terracotta", heroStyle: "fullbleed", headingFont: "Petrona" };

export default function App() {
  const t = DESIGN;

  // ---- Limbă ----
  const [lang, setLangState] = useState(() => localStorage.getItem("pt_lang") || "ro");
  const setLang = (l) => { setLangState(l); localStorage.setItem("pt_lang", l); };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const T = I18N[lang] || I18N.ro;

  // ---- Recenzii ----
  const [userReviews, setUserReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pt_reviews") || "[]"); } catch { return []; }
  });
  const addReview = (r) => {
    const next = [r, ...userReviews];
    setUserReviews(next);
    localStorage.setItem("pt_reviews", JSON.stringify(next));
  };
  const reviews = [...userReviews, ...MOCK_REVIEWS];

  // ---- Aplică tema (accent + font) pe :root ----
  useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS.terracotta;
    const r = document.documentElement.style;
    r.setProperty("--accent", a.accent);
    r.setProperty("--accent-dark", a.dark);
    r.setProperty("--accent-shadow", a.shadow);
    r.setProperty("--accent-soft", a.soft);
    r.setProperty("--tint", a.tint);
    r.setProperty("--display", HEADING_FONTS[t.headingFont] || HEADING_FONTS.Petrona);
  }, [t.accent, t.headingFont]);

  return (
    <div className="app">
      <Header T={T} lang={lang} setLang={setLang} CFG={CFG} />
      <main>
        <Hero T={T} CFG={CFG} heroStyle={t.heroStyle} />
        <About T={T} CFG={CFG} />
        <Benefits T={T} />
        <WhyUs T={T} CFG={CFG} />
        <Mirela T={T} CFG={CFG} />
        <Reviews T={T} reviews={reviews} onAdd={addReview} />
        <Pricing T={T} />
        <Contact T={T} CFG={CFG} />
      </main>
      <Footer T={T} lang={lang} setLang={setLang} CFG={CFG} />
    </div>
  );
}
