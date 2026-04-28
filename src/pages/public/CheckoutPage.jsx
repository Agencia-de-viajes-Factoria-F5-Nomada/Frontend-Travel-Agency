import { Link } from "react-router-dom";
import { useBooking } from "../../context/useBooking";

function CheckoutPage() {
  const { booking } = useBooking();

  if (!booking) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>No hay reserva en curso</h1>
        <p>Selecciona un viaje para empezar.</p>
        <Link to="/trips">Ver viajes</Link>
      </div>
    );
  }

  const { trip, passengers, total } = booking;
  const totalPassengers = passengers.adults + passengers.children + passengers.seniors;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Checkout</h1>
      <p><strong>Destino:</strong> {trip.destination}</p>
      <p><strong>Fechas:</strong> {trip.dates}</p>
      <p><strong>Viajeros:</strong> {totalPassengers} ({passengers.adults} adultos, {passengers.children} niños, {passengers.seniors} jubilados)</p>
      <p><strong>Total:</strong> ${total}</p>
    </div>
  );
}

export default CheckoutPage;
