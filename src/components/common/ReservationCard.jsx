const TYPE_LABELS = {
  adult: "Adulto",
  child: "Niño",
  senior: "Jubilado",
};

function ReservationCard({
  code,
  trip,
  passengerCounts,
  travelers,
  total,
  email,
}) {
  const totalPassengers =
    passengerCounts.adults + passengerCounts.children + passengerCounts.seniors;
  const hasTravelers = Array.isArray(travelers) && travelers.length > 0;

  return (
    <article className="reservation-card">
      <header className="reservation-card__header">
        <span className="reservation-card__check" aria-hidden="true">✓</span>
        <h1 className="reservation-card__title">¡Reserva confirmada!</h1>
        <p className="reservation-card__subtitle">
          Hemos enviado los detalles a <strong>{email}</strong>
        </p>
      </header>

      <div className="reservation-card__code">
        <span className="reservation-card__code-label">Código de reserva</span>
        <span className="reservation-card__code-value">{code}</span>
      </div>

      <dl className="reservation-card__list">
        <div className="reservation-card__row">
          <dt>Destino</dt>
          <dd>{trip.destination}</dd>
        </div>
        <div className="reservation-card__row">
          <dt>Fechas</dt>
          <dd>{trip.dates}</dd>
        </div>
        <div className="reservation-card__row">
          <dt>Viajeros</dt>
          <dd>{totalPassengers}</dd>
        </div>
        <div className="reservation-card__row reservation-card__row--total">
          <dt>Total pagado</dt>
          <dd>${total}</dd>
        </div>
      </dl>

      {hasTravelers && (
        <ul className="reservation-card__travelers">
          {travelers.map((t, i) => (
            <li key={i} className="reservation-card__traveler">
              <span className="reservation-card__traveler-name">
                {t.name} {t.lastname}
              </span>
              <span className="reservation-card__traveler-type">
                {TYPE_LABELS[t.type]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default ReservationCard;
