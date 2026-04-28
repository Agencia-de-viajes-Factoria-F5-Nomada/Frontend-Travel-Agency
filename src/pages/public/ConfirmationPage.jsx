import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/useBooking";
import ReservationCard from "../../components/common/ReservationCard";

const SIMULATED_EMAIL = "cliente@ejemplo.com";

function ConfirmationPage() {
  const navigate = useNavigate();
  const { booking, clearBooking } = useBooking();

  useEffect(() => {
    if (!booking || !booking.code) navigate("/trips");
  }, [booking, navigate]);

  if (!booking || !booking.code) return null;

  const handleHome = () => {
    clearBooking();
    navigate("/");
  };

  return (
    <div className="confirmation">
      <div className="confirmation__container">
        <ReservationCard
          code={booking.code}
          trip={booking.trip}
          passengerCounts={booking.passengerCounts}
          travelers={booking.travelers}
          total={booking.total}
          email={SIMULATED_EMAIL}
        />
        <button onClick={handleHome} className="confirmation__button">
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
