function RankingCard({ title, items }) {
  return (
    <article className="ranking-card">
      <h3 className="ranking-card__title">{title}</h3>
      <ol className="ranking-card__list">
        {items.map((item, i) => (
          <li key={item.id} className="ranking-card__item">
            <span className="ranking-card__position">{i + 1}</span>
            <div className="ranking-card__body">
              <span className="ranking-card__name">{item.destination}</span>
              <span className="ranking-card__meta">
                {item.bookings} reservas
              </span>
            </div>
            <span className="ranking-card__value">
              €{item.revenue.toLocaleString("es-ES")}
            </span>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default RankingCard;
