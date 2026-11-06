import {
  ArrowLeftRight,
  BadgeCheck,
  Layers3,
  MessagesSquare,
  PackageSearch,
  Puzzle,
  UserRound,
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const strengths = [
  {
    icon: UserRound,
    title: 'Founder-Led Technical Assistance',
    text: 'Direct communication with the person responsible for understanding the requirement and delivering the agreed work.',
  },
  {
    icon: Layers3,
    title: 'Multiple Connected Technology Services',
    text: 'IT support, networking, websites and visual design can be considered together instead of as disconnected tasks.',
  },
  {
    icon: Puzzle,
    title: 'Practical Problem-Solving Approach',
    text: 'The focus stays on the actual issue, suitable options and a solution that fits the defined requirement.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Flexible Local and Remote Delivery',
    text: 'Local hands-on help and remote services provide a delivery approach suited to the nature of the work.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear Service Communication',
    text: 'Requirements, proposed scope and applicable charges are explained before the agreed work begins.',
  },
  {
    icon: BadgeCheck,
    title: 'Professional Customer Experience',
    text: 'A respectful, organised and customer-focused process supports each enquiry from first discussion to follow-up.',
  },
  {
    icon: PackageSearch,
    title: 'Technology Sourcing Assistance',
    text: 'Product recommendations and supplier coordination help you identify suitable technology without retail pressure.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section why-section" id="why-us" aria-labelledby="why-title">
      <div className="container why-layout">
        <div className="why-intro">
          <SectionHeader
            eyebrow="Why Mr.IT Support"
            title="Personal attention. Professional thinking."
            description="A founder-led service model built around practical value, connected expertise and clear communication."
            id="why-title"
          />
          <div className="why-quote" data-reveal>
            <span aria-hidden="true">“</span>
            <p>Technology support should make the next step clearer—not more complicated.</p>
          </div>
        </div>
        <div className="strength-list">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <article className="strength-item" key={strength.title} data-reveal>
                <span className="strength-item__number">{String(index + 1).padStart(2, '0')}</span>
                <div className="strength-item__icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></div>
                <div>
                  <h3>{strength.title}</h3>
                  <p>{strength.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
