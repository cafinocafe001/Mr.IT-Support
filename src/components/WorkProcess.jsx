import { ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { processSteps } from '../data/process';

export default function WorkProcess() {
  return (
    <section className="section process-section" id="process" aria-labelledby="process-title">
      <div className="process-grid" aria-hidden="true" />
      <div className="container">
        <div className="process-heading-row">
          <SectionHeader
            eyebrow="How we work"
            title="A clear process from first conversation to follow-up."
            description="Five straightforward steps keep the requirement, agreed scope and delivery expectations visible."
            id="process-title"
            light
          />
          <a className="button button--outline-light" href="#contact" data-reveal>
            Start a conversation <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <ol className="process-timeline">
          {processSteps.map((step) => (
            <li key={step.number} data-reveal>
              <div className="process-marker"><span>{step.number}</span></div>
              <div className="process-step__content">
                <p>Step {step.number}</p>
                <h3>{step.title}</h3>
                <span>{step.description}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="process-note" data-reveal>Scope and applicable charges are discussed before delivery. Follow-up or ongoing assistance is provided when agreed.</p>
      </div>
    </section>
  );
}
