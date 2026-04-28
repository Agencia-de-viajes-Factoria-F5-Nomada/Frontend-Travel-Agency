import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/useBooking";
import { generateReservationCode } from "../../utils/generateReservationCode";
import ReservationCard from "../../components/common/ReservationCard";

const SIMULATED_EMAIL = "cliente@ejemplo.com";

function ConfirmationPage() {
  const navigate = useNavigate();
  const { booking, clearBooking } = useBooking();
  const [code] = useState(generateReservationCode);

  useEffect(() => {
    if (!booking) navigate("/trips");
  }, [booking, navigate]);

  if (!booking) return null;

  const handleHome = () => {
    clearBooking();
    navigate("/");
  };

  return (
    <div className="confirmation">
      <div className="confirmation__container">
        <ReservationCard
          code={code}
          trip={booking.trip}
          passengers={booking.passengers}
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
