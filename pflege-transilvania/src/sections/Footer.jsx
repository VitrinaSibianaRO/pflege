import Icon from '../components/Icon';
import { Logo, LangSwitch } from './Header';

export default function Footer({ T, lang, setLang, CFG }) {
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
