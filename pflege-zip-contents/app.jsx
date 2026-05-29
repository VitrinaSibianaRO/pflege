// app.jsx — state limbă + recenzii (localStorage) + tweaks + mount
const { useState: useStateA, useEffect: useEffectA } = React;

const CFG = {
  phoneDisplay: "(+40) 750 639 017",
  tel: "tel:+40750639017",
  wa: "https://wa.me/40750639017",
  email: "pflege.transilvania@gmail.com",
  fb: "https://www.facebook.com/people/Pflege-Transilvania/100089086242873/",
  maps: "https://maps.google.com/maps?q=porumbacu+de+jos,+nr+48,+jud.+Sibiu",
  media: "media/"
};

const ACCENTS = {
  terracotta: { accent: "#bd4f2c", dark: "#9c3f22", shadow: "rgba(189,79,44,.30)", tint: "#f7ede5", soft: "#cf6f4f" },
  amber:      { accent: "#bd862a", dark: "#9a6c1d", shadow: "rgba(189,134,42,.30)", tint: "#f8f0e0", soft: "#d29e4d" },
  clay:       { accent: "#b14c4a", dark: "#92393a", shadow: "rgba(177,76,74,.30)", tint: "#f7eae8", soft: "#c66d6b" }
};
const HEADING_FONTS = {
  Newsreader: "'Newsreader', Georgia, serif",
  Bricolage: "'Bricolage Grotesque', system-ui, sans-serif",
  Petrona: "'Petrona', Georgia, serif"
};

// Design fixat: teracotă · hero fullbleed · Petrona
const DESIGN = { accent: "terracotta", heroStyle: "fullbleed", headingFont: "Petrona" };

function App() {
  const t = DESIGN;

  // ---- Limbă ----
  const [lang, setLangState] = useStateA(() => localStorage.getItem("pt_lang") || "ro");
  const setLang = (l) => { setLangState(l); localStorage.setItem("pt_lang", l); };
  useEffectA(() => { document.documentElement.lang = lang; }, [lang]);
  const T = (window.I18N[lang]) || window.I18N.ro;

  // ---- Recenzii ----
  const [userReviews, setUserReviews] = useStateA(() => {
    try { return JSON.parse(localStorage.getItem("pt_reviews") || "[]"); } catch (e) { return []; }
  });
  const addReview = (r) => {
    const next = [r, ...userReviews];
    setUserReviews(next);
    localStorage.setItem("pt_reviews", JSON.stringify(next));
  };
  const reviews = [...userReviews, ...window.MOCK_REVIEWS];

  // ---- Aplică tema (accent + font) pe :root ----
  useEffectA(() => {
    const a = ACCENTS[t.accent] || ACCENTS.terracotta;
    const r = document.documentElement.style;
    r.setProperty("--accent", a.accent);
    r.setProperty("--accent-dark", a.dark);
    r.setProperty("--accent-shadow", a.shadow);
    r.setProperty("--accent-soft", a.soft);
    r.setProperty("--tint", a.tint);
    r.setProperty("--display", HEADING_FONTS[t.headingFont] || HEADING_FONTS.Newsreader);
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
