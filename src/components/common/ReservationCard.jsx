function ReservationCard({ code, trip, passengers, total, email }) {
  const totalPassengers =
    passengers.adults + passengers.children + passengers.seniors;

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
    </article>
  );
}

export default ReservationCard;
