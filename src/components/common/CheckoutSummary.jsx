function CheckoutSummary({ trip, passengers, total }) {
  const totalPassengers =
    passengers.adults + passengers.children + passengers.seniors;

  return (
    <aside className="checkout-summary">
      <h3 className="checkout-summary__title">Resumen</h3>
      <dl className="checkout-summary__list">
        <div className="checkout-summary__row">
          <dt>Destino</dt>
          <dd>{trip.destination}</dd>
        </div>
        <div className="checkout-summary__row">
          <dt>Fechas</dt>
          <dd>{trip.dates}</dd>
        </div>
        <div className="checkout-summary__row">
          <dt>Viajeros</dt>
          <dd>
            {totalPassengers} ({passengers.adults}A · {passengers.children}N ·{" "}
            {passengers.seniors}J)
          </dd>
        </div>
      </dl>
      <div className="checkout-summary__total">
        <span>Total</span>
        <span className="checkout-summary__amount">${total}</span>
      </div>
    </aside>
  );
}

export default CheckoutSummary;
