import { ArrowUpRight, Globe2, MapPin } from 'lucide-react';
import Logo from './Logo';
import { navigationItems } from '../data/navigation';
import { services } from '../data/services';
import { siteConfig } from '../config/site';

export default function Footer({ onServiceSelect }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="footer-logo" aria-label="Mr.IT Support — back to home">
            <Logo loading="lazy" />
          </a>
          <p className="footer-tagline">Your Trusted IT Partner <span>— Powered by P.Manojan</span></p>
          <p>Practical IT support, networking and digital solutions for individuals and small businesses, delivered directly by an independent founder.</p>
          <div className="footer-location">
            <span><MapPin size={15} aria-hidden="true" />{siteConfig.location}</span>
            <span><Globe2 size={15} aria-hidden="true" />Suitable services available remotely</span>
          </div>
        </div>

        <div className="footer-links">
          <h2>Navigate</h2>
          <ul>
            {navigationItems.map((item) => <li key={item.section}><a href={item.href}>{item.label}</a></li>)}
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#founder">Founder</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-links footer-services">
          <h2>Services</h2>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <a href="#services" onClick={() => onServiceSelect(service.id)}>{service.shortTitle}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-enquire">
          <h2>Have a requirement?</h2>
          <p>Start with the issue or goal. We’ll help identify a practical next step.</p>
          <a className="button button--primary" href="#contact">Make an enquiry <ArrowUpRight size={17} aria-hidden="true" /></a>
          {(siteConfig.contact.email || siteConfig.contact.phone) && (
            <div className="footer-contact">
              {siteConfig.contact.email && <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>}
              {siteConfig.contact.phone && <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>}
            </div>
          )}
          {siteConfig.socialLinks.length > 0 && (
            <ul className="footer-social" aria-label="Social media links">
              {siteConfig.socialLinks.map((link) => <li key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></li>)}
            </ul>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Mr.IT Support. All rights reserved.</p>
        <p>Independent · Founder-led · Customer-focused</p>
      </div>
    </footer>
  );
}
