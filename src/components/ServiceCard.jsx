import { ArrowUpRight, Check, Info } from 'lucide-react';
import ServiceIcon from './ServiceIcon';

export default function ServiceCard({ service, active, onEnquire }) {
  return (
    <article
      className="service-panel"
      id={`service-panel-${service.id}`}
      role="tabpanel"
      aria-labelledby={`service-tab-${service.id}`}
      hidden={!active}
    >
      <div className="service-panel__heading">
        <div className="service-panel__icon"><ServiceIcon name={service.icon} size={30} /></div>
        <span className="service-panel__number">Service {service.number}</span>
      </div>
      <h3>{service.title}</h3>
      <p className="service-panel__description">{service.description}</p>
      <div className="service-panel__divider" />
      <h4>How we can help</h4>
      <ul className="service-offerings">
        {service.offerings.map((offering) => (
          <li key={offering}><Check size={16} strokeWidth={2.2} aria-hidden="true" />{offering}</li>
        ))}
      </ul>
      {service.note && (
        <p className="service-panel__note"><Info size={17} aria-hidden="true" />{service.note}</p>
      )}
      <a
        className="button button--dark service-panel__cta"
        href="#contact"
        onClick={() => onEnquire(service.title)}
      >
        Enquire about this service
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </article>
  );
}
