import { ArrowUpRight } from 'lucide-react';

export default function PortfolioCard({ project }) {
  return (
    <article className="portfolio-card">
      {project.image && (
        <img src={project.image} alt={project.imageAlt || project.title} loading="lazy" decoding="async" />
      )}
      <div className="portfolio-card__content">
        <p>{project.category}</p>
        <h3>{project.title}</h3>
        <span>{project.description}</span>
        {project.technologies?.length > 0 && (
          <ul aria-label="Technologies used">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        )}
        {project.detailsUrl && (
          <a className="text-link" href={project.detailsUrl}>
            View project details <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
