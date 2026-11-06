import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { faqItems } from '../data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const buttonRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === 'ArrowDown') nextIndex = (index + 1) % faqItems.length;
    if (event.key === 'ArrowUp') nextIndex = (index - 1 + faqItems.length) % faqItems.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = faqItems.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-intro">
          <SectionHeader
            eyebrow="Frequently asked questions"
            title="Straight answers before you get started."
            description="Understand the services, delivery options and enquiry process before discussing your requirement."
            id="faq-title"
          />
          <div className="faq-help" data-reveal>
            <p>Have a different question?</p>
            <a className="text-link" href="#contact">Tell us what you need <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="faq-list" data-reveal>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <article className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={item.question}>
                <h3>
                  <button
                    ref={(element) => { buttonRefs.current[index] = element; }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span className="faq-item__number">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item.question}</span>
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
