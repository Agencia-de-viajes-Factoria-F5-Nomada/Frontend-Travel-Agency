import { useState } from "react";
import { MOCK_ADMIN_HOTELS } from "../constants/mockAdminHotels";

export const useHotelsCrud = () => {
  const [hotels, setHotels] = useState(MOCK_ADMIN_HOTELS);
  const [editingHotel, setEditingHotel] = useState(null);

  const createHotel = (data) => {
    const newHotel = { ...data, id: Date.now() };
    setHotels((prev) => [...prev, newHotel]);
  };

  const updateHotel = (id, data) => {
    setHotels((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...data } : h))
    );
    setEditingHotel(null);
  };

  const deleteHotel = (id) => {
    setHotels((prev) => prev.filter((h) => h.id !== id));
    if (editingHotel?.id === id) setEditingHotel(null);
  };

  const startEdit = (hotel) => setEditingHotel(hotel);
  const cancelEdit = () => setEditingHotel(null);

  return {
    hotels,
    editingHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    startEdit,
    cancelEdit,
  };
};
