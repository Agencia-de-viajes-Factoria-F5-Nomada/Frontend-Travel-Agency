import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/useBooking";
import { useCheckoutForm } from "../../hooks/useCheckoutForm";
import { generateReservationCode } from "../../utils/generateReservationCode";
import PassengerForm from "../../components/forms/PassengerForm";
import CheckoutSummary from "../../components/common/CheckoutSummary";

const EMPTY_COUNTS = { adults: 0, children: 0, seniors: 0 };

function CheckoutPage() {
  const navigate = useNavigate();
  const { booking, setBooking } = useBooking();
  const counts = booking?.passengerCounts ?? EMPTY_COUNTS;
  const totalCounts = counts.adults + counts.children + counts.seniors;

  const { travelers, updateTraveler, validate, errors } =
    useCheckoutForm(counts);

  useEffect(() => {
    if (!booking || totalCounts === 0) navigate("/trips");
  }, [booking, totalCounts, navigate]);

  if (!booking || totalCounts === 0) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setBooking({
      ...booking,
      travelers,
      code: booking.code ?? generateReservationCode(),
    });
    navigate("/confirmation");
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <PassengerForm
            travelers={travelers}
            errors={errors}
            onUpdate={updateTraveler}
          />
          {errors.global && (
            <p className="checkout__error">{errors.global}</p>
          )}
          <button type="submit" className="checkout__button">
            Continuar pago
          </button>
        </form>
        <CheckoutSummary
          trip={booking.trip}
          passengerCounts={booking.passengerCounts}
          total={booking.total}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
