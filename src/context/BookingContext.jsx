import { useState } from "react";
import { BookingContext } from "./useBooking";

const STORAGE_KEY = "booking";

const readStored = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function BookingProvider({ children }) {
  const [booking, setBookingState] = useState(readStored);

  const setBooking = (next) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setBookingState(next);
  };

  const clearBooking = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setBookingState(null);
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
