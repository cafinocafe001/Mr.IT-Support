import { ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

const principles = [
  {
    number: '01',
    title: 'Personal by default',
    text: 'You deal directly with the founder responsible for understanding and delivering your service.',
  },
  {
    number: '02',
    title: 'Practical in approach',
    text: 'Recommendations focus on the actual requirement, a clear scope and a useful next step.',
  },
  {
    number: '03',
    title: 'Connected in capability',
    text: 'Computer support, networking, web and design services work together around your needs.',
  },
];

export default function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-intro">
          <SectionHeader
            eyebrow="Who we are"
            title="Your Technology Partner for Practical Digital Solutions."
            id="about-title"
          />
          <div className="about-copy" data-reveal>
            <p className="about-copy__lead">
              Mr.IT Support is an independent IT services business dedicated to helping individuals and small businesses manage their technology needs.
            </p>
            <p>
              We bring together practical computer support, networking, digital design and website development to deliver useful solutions that support everyday technology requirements and business growth.
            </p>
            <div className="about-commitment">
              <CheckCircle2 size={22} aria-hidden="true" />
              <p><strong>Independent by structure. Professional in delivery.</strong> Clear communication, flexible local and remote support, and customer-focused problem solving shape every engagement.</p>
            </div>
            <a className="text-link" href="#founder">
              Meet the founder <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="principles-grid">
          {principles.map((principle) => (
            <article className="principle" key={principle.number} data-reveal>
              <div className="principle__top">
                <span>{principle.number}</span>
                <ArrowDownRight size={22} aria-hidden="true" />
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
