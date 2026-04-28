function MetricCard({ title, value, icon, variation, period }) {
  const isPositive = variation >= 0;
  const arrow = isPositive ? "↑" : "↓";
  const variationClass = isPositive
    ? "metric-card__variation--up"
    : "metric-card__variation--down";

  return (
    <article className="metric-card">
      <div className="metric-card__header">
        <span className="metric-card__icon" aria-hidden="true">{icon}</span>
        <h3 className="metric-card__title">{title}</h3>
      </div>
      <p className="metric-card__value">{value}</p>
      <div className="metric-card__footer">
        <span className={`metric-card__variation ${variationClass}`}>
          {arrow} {Math.abs(variation)}%
        </span>
        {period && <span className="metric-card__period">{period}</span>}
      </div>
    </article>
  );
}

export default MetricCard;
