import { useState } from "react";
import { MOCK_ADMIN_DRIVERS } from "../constants/mockAdminDrivers";

export const useDriversCrud = () => {
  const [drivers, setDrivers] = useState(MOCK_ADMIN_DRIVERS);
  const [editingDriver, setEditingDriver] = useState(null);

  const createDriver = (data) => {
    const newDriver = { ...data, id: Date.now() };
    setDrivers((prev) => [...prev, newDriver]);
  };

  const updateDriver = (id, data) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...data } : d))
    );
    setEditingDriver(null);
  };

  const deleteDriver = (id) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    if (editingDriver?.id === id) setEditingDriver(null);
  };

  const startEdit = (driver) => setEditingDriver(driver);
  const cancelEdit = () => setEditingDriver(null);

  return {
    drivers,
    editingDriver,
    createDriver,
    updateDriver,
    deleteDriver,
    startEdit,
    cancelEdit,
  };
};
