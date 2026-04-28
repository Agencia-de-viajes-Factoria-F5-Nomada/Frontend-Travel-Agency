import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/useBooking";
import { useCheckoutForm } from "../../hooks/useCheckoutForm";
import PassengerForm from "../../components/forms/PassengerForm";
import CheckoutSummary from "../../components/common/CheckoutSummary";

const EMPTY_COUNTS = { adults: 0, children: 0, seniors: 0 };

function CheckoutPage() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const { passengers, updatePassenger, validate, errors } = useCheckoutForm(
    booking?.passengers ?? EMPTY_COUNTS
  );

  useEffect(() => {
    if (!booking) navigate("/trips");
  }, [booking, navigate]);

  if (!booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/confirmation");
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <PassengerForm
            passengers={passengers}
            errors={errors}
            onUpdate={updatePassenger}
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
          passengers={booking.passengers}
          total={booking.total}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
