import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Globe2, MapPin, Menu, X } from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { navigationItems } from '../data/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    let ticking = false;
    const updateNavigation = () => {
      setScrolled(window.scrollY > 24);
      const marker = window.scrollY + Math.max(window.innerHeight * 0.34, 220);
      let current = 'home';
      navigationItems.forEach((item) => {
        const section = document.getElementById(item.section);
        if (section && section.offsetTop <= marker) current = item.section;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        current = 'contact';
      }
      setActiveSection(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavigation);
        ticking = true;
      }
    };

    updateNavigation();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1101px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <p><MapPin size={14} aria-hidden="true" /> Local services in Jaffna & Northern Sri Lanka</p>
          <p><Globe2 size={14} aria-hidden="true" /> Suitable digital & IT services available remotely</p>
        </div>
      </div>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="nav-logo" href="#home" aria-label="Mr.IT Support — home" onClick={closeMenu}>
            <Logo fetchPriority="high" />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.section}>
                  <a
                    href={item.href}
                    className={activeSection === item.section ? 'active' : ''}
                    aria-current={activeSection === item.section ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="button button--primary nav-cta" href="#contact">
            Get Support
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <MobileMenu open={menuOpen} onClose={closeMenu} activeSection={activeSection} />
      </header>
    </>
  );
}
