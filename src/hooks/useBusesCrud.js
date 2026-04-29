import { useState } from "react";
import { MOCK_ADMIN_BUSES } from "../constants/mockAdminBuses";

export const useBusesCrud = () => {
  const [buses, setBuses] = useState(MOCK_ADMIN_BUSES);
  const [editingBus, setEditingBus] = useState(null);

  const createBus = (data) => {
    const newBus = { ...data, id: Date.now() };
    setBuses((prev) => [...prev, newBus]);
  };

  const updateBus = (id, data) => {
    setBuses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    );
    setEditingBus(null);
  };

  const deleteBus = (id) => {
    setBuses((prev) => prev.filter((b) => b.id !== id));
    if (editingBus?.id === id) setEditingBus(null);
  };

  const startEdit = (bus) => setEditingBus(bus);
  const cancelEdit = () => setEditingBus(null);

  return {
    buses,
    editingBus,
    createBus,
    updateBus,
    deleteBus,
    startEdit,
    cancelEdit,
  };
};
