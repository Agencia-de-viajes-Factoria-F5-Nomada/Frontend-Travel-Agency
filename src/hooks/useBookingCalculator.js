import { useState } from "react";

const INITIAL = { adults: 1, children: 0, seniors: 0 };

export const useBookingCalculator = (pricePerPerson, maxPeople) => {
  const [passengerCounts, setPassengerCounts] = useState(INITIAL);

  const totalPassengers =
    passengerCounts.adults + passengerCounts.children + passengerCounts.seniors;
  const total = pricePerPerson * totalPassengers;

  const setPassenger = (type, value) => {
    const otherPassengers = totalPassengers - passengerCounts[type];
    const cap = Math.max(0, maxPeople - otherPassengers);
    const next = Math.min(Math.max(0, value), cap);
    setPassengerCounts((prev) => ({ ...prev, [type]: next }));
  };

  return { passengerCounts, setPassenger, total, totalPassengers };
};
