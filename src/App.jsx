import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import DeliveryModels from './components/DeliveryModels';
import WhyChooseUs from './components/WhyChooseUs';
import WorkProcess from './components/WorkProcess';
import Portfolio from './components/Portfolio';
import Founder from './components/Founder';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { services } from './data/services';

export default function App() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const [enquiryRequest, setEnquiryRequest] = useState({ service: '', requestId: 0 });

  const handleServiceEnquiry = (service) => {
    setEnquiryRequest((current) => ({ service, requestId: current.requestId + 1 }));
  };

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -45px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <About />
        <Services
          activeServiceId={activeServiceId}
          onServiceChange={setActiveServiceId}
          onEnquire={handleServiceEnquiry}
        />
        <DeliveryModels />
        <WhyChooseUs />
        <WorkProcess />
        <Portfolio />
        <Founder />
        <FAQ />
        <ContactForm
          selectedService={enquiryRequest.service}
          selectionRequestId={enquiryRequest.requestId}
        />
      </main>
      <Footer onServiceSelect={setActiveServiceId} />
      <BackToTop />
    </>
  );
}
