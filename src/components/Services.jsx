import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ServiceCard from './ServiceCard';
import ServiceIcon from './ServiceIcon';
import { services } from '../data/services';

export default function Services({ activeServiceId, onServiceChange, onEnquire }) {
  const tabRefs = useRef([]);

  const handleTabKeyDown = (event, index) => {
    let nextIndex;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) nextIndex = (index + 1) % services.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) nextIndex = (index - 1 + services.length) % services.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = services.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    onServiceChange(services[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="services-heading-row">
          <SectionHeader
            eyebrow="What we do"
            title="Connected services for the technology you rely on."
            description="From a device that needs attention to a business ready for a stronger digital presence, choose a service area to explore practical support options."
            id="services-title"
          />
          <p className="services-heading-note" data-reveal>
            <span>07</span>
            service categories<br />one practical partner
            <ArrowDown size={20} aria-hidden="true" />
          </p>
        </div>

        <div className="service-explorer" data-reveal>
          <div className="service-tabs">
            <div className="service-tab-list" role="tablist" aria-label="Mr.IT Support service categories" aria-orientation="vertical">
              {services.map((service, index) => {
                const active = activeServiceId === service.id;
                return (
                  <button
                    key={service.id}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    type="button"
                    role="tab"
                    id={`service-tab-${service.id}`}
                    aria-selected={active}
                    aria-controls={`service-panel-${service.id}`}
                    tabIndex={active ? 0 : -1}
                    className={`service-tab ${active ? 'service-tab--active' : ''}`}
                    onClick={() => onServiceChange(service.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <span className="service-tab__number">{service.number}</span>
                    <span className="service-tab__icon"><ServiceIcon name={service.icon} size={20} /></span>
                    <span className="service-tab__title">{service.shortTitle}</span>
                    <ArrowRight className="service-tab__arrow" size={18} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <div className="service-tabs__help">
              <p>Not sure which service fits?</p>
              <a href="#contact">Tell us what is happening <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="service-panels">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                active={activeServiceId === service.id}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
