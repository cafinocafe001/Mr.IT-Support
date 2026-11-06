import {
  ArrowRight,
  Check,
  Globe2,
  LifeBuoy,
  MapPin,
  Monitor,
  Network,
  PenTool,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow eyebrow--light"><span aria-hidden="true" />Independent IT services · Jaffna</p>
          <h1 id="hero-title">Technology solutions that keep your <em>business moving.</em></h1>
          <p className="hero-supporting">Reliable IT Support, Networking & Digital Solutions for Individuals and Small Businesses.</p>
          <p className="hero-description">
            From computer troubleshooting and network configuration to website development and digital branding, Mr.IT Support helps you solve technology challenges with practical and professional solutions.
          </p>
          <div className="hero-actions">
            <a className="button button--primary button--large" href="#services">
              Explore Our Services
              <ArrowRight size={19} aria-hidden="true" />
            </a>
            <a className="button button--outline-light button--large" href="#contact">
              Request IT Support
            </a>
          </div>
          <ul className="hero-service-list" aria-label="Core service areas">
            {['IT Support', 'Networking', 'Digital Solutions'].map((item) => (
              <li key={item}><Check size={15} aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual" data-reveal aria-label="Connected IT support, networking and digital solutions">
          <div className="network-stage" aria-hidden="true">
            <svg className="network-lines" viewBox="0 0 560 310" fill="none">
              <path d="M112 74L276 154L454 69M276 154L454 248M276 154L106 250" />
              <circle cx="276" cy="154" r="101" />
              <circle cx="276" cy="154" r="136" strokeDasharray="4 9" />
            </svg>
            <div className="network-core">
              <LifeBuoy size={30} strokeWidth={1.6} />
              <span>Practical<br />technology help</span>
            </div>
            <div className="network-node network-node--computer">
              <Monitor size={22} /><span>IT Support</span>
            </div>
            <div className="network-node network-node--network">
              <Network size={22} /><span>Networking</span>
            </div>
            <div className="network-node network-node--digital">
              <PenTool size={22} /><span>Digital</span>
            </div>
            <div className="network-node network-node--web">
              <Globe2 size={22} /><span>Web</span>
            </div>
            <span className="network-pulse network-pulse--one" />
            <span className="network-pulse network-pulse--two" />
          </div>

          <div className="support-brief">
            <div className="support-brief__header">
              <div>
                <span className="support-brief__kicker">A clear way forward</span>
                <h2>One partner. Connected expertise.</h2>
              </div>
              <span className="support-brief__badge">FOUNDER-LED</span>
            </div>
            <div className="support-brief__steps">
              <div><span>01</span><p><strong>Understand</strong>Your issue or goal</p></div>
              <div><span>02</span><p><strong>Solve</strong>A practical, defined scope</p></div>
              <div><span>03</span><p><strong>Support</strong>Clear next steps</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container hero-footer" data-reveal>
        <p>Your Trusted IT Partner <span>— Powered by P.Manojan</span></p>
        <div>
          <span><MapPin size={15} aria-hidden="true" />Jaffna-based</span>
          <span><Globe2 size={15} aria-hidden="true" />Remote-capable</span>
        </div>
      </div>
    </section>
  );
}
