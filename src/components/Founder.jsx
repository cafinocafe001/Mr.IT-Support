import { ArrowUpRight, GraduationCap, Network, ShieldCheck, UserRound } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { siteConfig } from '../config/site';

const education = [
  'HND in Network Engineering',
  'BSc (Hons) in Network Technology & Cybersecurity',
];

const technicalLearning = [
  'CCNA',
  'CCNP Enterprise Core Networking training/badge',
  'Fortinet NSE 1 and NSE 2',
  'Cisco CyberOps and Network Defense learning',
];

export default function Founder() {
  return (
    <section className="section founder-section" id="founder" aria-labelledby="founder-title">
      <div className="container founder-layout">
        <div className="founder-visual" data-reveal>
          {siteConfig.founderImage ? (
            <img src={siteConfig.founderImage} alt="P. Manojan, founder of Mr.IT Support" loading="lazy" decoding="async" />
          ) : (
            <div className="founder-monogram" role="img" aria-label="P. Manojan founder monogram; photograph not yet supplied">
              <span className="founder-monogram__icon"><UserRound size={28} aria-hidden="true" /></span>
              <strong>PM</strong>
              <p>Founder-led.<br />Personally delivered.</p>
              <span className="founder-monogram__line" aria-hidden="true" />
            </div>
          )}
          <div className="founder-visual__caption">
            <div><span>Founder</span><h3>P. Manojan</h3></div>
            <span>Jaffna, Sri Lanka</span>
          </div>
        </div>

        <div className="founder-content">
          <SectionHeader
            eyebrow="Meet the founder"
            title="Technical learning with a practical service mindset."
            id="founder-title"
          />
          <div data-reveal>
            <p className="founder-content__lead">Mr.IT Support is operated and delivered by <strong>P. Manojan</strong>, bringing a direct, accountable and customer-focused approach to every service.</p>
            <p>His background spans network engineering, network technology and cybersecurity education, alongside ongoing technical learning across networking and cyber defense topics.</p>
          </div>

          <div className="founder-credentials" data-reveal>
            <div className="credential-group">
              <div className="credential-group__title"><GraduationCap size={22} aria-hidden="true" /><h3>Education</h3></div>
              <ul>{education.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="credential-group">
              <div className="credential-group__title"><Network size={22} aria-hidden="true" /><h3>Technical training & learning</h3></div>
              <ul>{technicalLearning.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <p className="founder-disclaimer" data-reveal><ShieldCheck size={17} aria-hidden="true" />Education, technical training and ongoing learning support a practical, carefully scoped approach to every service.</p>
          <a className="text-link" href="#contact" data-reveal>Discuss a requirement with Manojan <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
