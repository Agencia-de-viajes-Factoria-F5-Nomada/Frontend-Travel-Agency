import { useState } from "react";

const INITIAL = { adults: 1, children: 0, seniors: 0 };

export const useBookingCalculator = (pricePerPerson, maxPeople) => {
  const [passengers, setPassengers] = useState(INITIAL);

  const totalPassengers = passengers.adults + passengers.children + passengers.seniors;
  const total = pricePerPerson * totalPassengers;

  const setPassenger = (type, value) => {
    const otherPassengers = totalPassengers - passengers[type];
    const cap = Math.max(0, maxPeople - otherPassengers);
    const next = Math.min(Math.max(0, value), cap);
    setPassengers((prev) => ({ ...prev, [type]: next }));
  };

  return { passengers, setPassenger, total, totalPassengers };
};
