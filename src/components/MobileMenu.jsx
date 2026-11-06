import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { navigationItems } from '../data/navigation';

export default function MobileMenu({ open, onClose, activeSection }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-menu">
      <button className="mobile-menu__scrim" onClick={onClose} aria-label="Close navigation menu" />
      <nav
        className="mobile-menu__panel"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        ref={panelRef}
      >
        <p className="mobile-menu__label">Navigate</p>
        <ul>
          {navigationItems.map((item, index) => (
            <li key={item.section}>
              <a
                href={item.href}
                className={activeSection === item.section ? 'active' : ''}
                aria-current={activeSection === item.section ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="mobile-menu__number">0{index + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <a className="button button--primary button--full" href="#contact" onClick={onClose}>
          Request a Quote
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <p className="mobile-menu__note">Founder-led support for local and suitable remote requirements.</p>
      </nav>
    </div>
  );
}
