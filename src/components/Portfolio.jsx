import { ArrowUpRight, FolderOpen } from 'lucide-react';
import SectionHeader from './SectionHeader';
import PortfolioCard from './PortfolioCard';
import { portfolioProjects } from '../data/portfolio';

const projectCategories = [
  'IT Support Projects',
  'Networking Projects',
  'Website Development',
  'Graphic Design',
  'Digital Branding',
  'Technical Solutions',
];

export default function Portfolio() {
  return (
    <section className="section portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="A portfolio built on genuine work, not placeholders."
          description="This space is ready for approved project stories, practical details and relevant technologies as genuine showcase material becomes available."
          id="portfolio-title"
        />

        {portfolioProjects.length > 0 ? (
          <div className="portfolio-grid">
            {portfolioProjects.map((project) => <PortfolioCard key={project.id || project.title} project={project} />)}
          </div>
        ) : (
          <div className="portfolio-empty" data-reveal>
            <div className="portfolio-empty__heading">
              <div className="portfolio-empty__icon"><FolderOpen size={30} strokeWidth={1.6} aria-hidden="true" /></div>
              <div>
                <p>Project showcase · In preparation</p>
                <h3>Real projects will be documented here with context, scope and the work delivered.</h3>
              </div>
            </div>
            <p className="portfolio-empty__copy">Only verified projects and approved details will be published. New showcases can be added to the reusable portfolio component as genuine work becomes available.</p>
            <ul className="portfolio-categories" aria-label="Future portfolio categories">
              {projectCategories.map((category) => <li key={category}>{category}</li>)}
            </ul>
            <a className="button button--dark" href="#contact">Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </section>
  );
}
