import { ArrowUpRight, Check, Compass, Globe2, MapPin } from 'lucide-react';
import SectionHeader from './SectionHeader';

const localServices = [
  'Computer Repair',
  'Hardware Maintenance',
  'Wi-Fi Setup',
  'Router Configuration',
  'LAN Installation',
  'On-site IT Support',
  'Small Office Networking',
];

const remoteServices = [
  'Website Development',
  'Graphic Design',
  'Digital Branding',
  'Website Maintenance',
  'Remote IT Support',
  'Software Troubleshooting',
  'Network Design Consultation',
  'IT Documentation',
];

function ServiceList({ items }) {
  return (
    <ul className="delivery-list">
      {items.map((item) => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
    </ul>
  );
}

export default function DeliveryModels() {
  return (
    <section className="section delivery-section" id="solutions" aria-labelledby="delivery-title">
      <div className="container">
        <SectionHeader
          eyebrow="Service delivery"
          title="Local hands-on support. Remote expertise without borders."
          description="The right delivery model depends on the work. Physical services are provided locally, while suitable digital and technical services can support customers internationally."
          id="delivery-title"
        />

        <div className="delivery-grid">
          <article className="delivery-card delivery-card--local" data-reveal>
            <div className="delivery-card__top">
              <div className="delivery-card__icon"><MapPin size={28} aria-hidden="true" /></div>
              <span>Model A</span>
            </div>
            <p className="delivery-card__overline">Jaffna & Northern Sri Lanka</p>
            <h3>Local IT Services</h3>
            <p>Hands-on assistance for devices, hardware and network setups that require local physical availability.</p>
            <ServiceList items={localServices} />
            <a href="#contact" className="text-link">Discuss a local requirement <ArrowUpRight size={17} aria-hidden="true" /></a>
          </article>

          <article className="delivery-card delivery-card--remote" data-reveal>
            <div className="delivery-card__top">
              <div className="delivery-card__icon"><Globe2 size={28} aria-hidden="true" /></div>
              <span>Model B</span>
            </div>
            <p className="delivery-card__overline">International · Where suitable</p>
            <h3>Global Remote Services</h3>
            <p>Digital and technical services delivered without physical presence, for international customers where remote delivery is appropriate.</p>
            <ServiceList items={remoteServices} />
            <a href="#contact" className="text-link text-link--light">Discuss a remote project <ArrowUpRight size={17} aria-hidden="true" /></a>
          </article>
        </div>

        <article className="future-strip" data-reveal>
          <div className="future-strip__icon"><Compass size={28} aria-hidden="true" /></div>
          <div>
            <p className="future-strip__label">Looking ahead · Future objective</p>
            <h3>International expansion, with a clear distinction from today’s services.</h3>
          </div>
          <p>Mr.IT Support’s long-term vision is to expand into international markets after the founder legally relocates. This is a future business development objective—not a claim that on-site services in another country are currently available.</p>
        </article>
      </div>
    </section>
  );
}
