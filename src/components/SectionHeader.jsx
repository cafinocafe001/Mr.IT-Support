export default function SectionHeader({ eyebrow, title, description, align = 'left', light = false, id }) {
  return (
    <div className={`section-header section-header--${align} ${light ? 'section-header--light' : ''}`.trim()} data-reveal>
      <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
