import { useState } from "react";
import { MOCK_ADMIN_USERS } from "../constants/mockAdminUsers";

export const useUsersCrud = () => {
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [editingUser, setEditingUser] = useState(null);

  const createUser = (data) => {
    const newUser = { ...data, id: Date.now() };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (id, data) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...data } : u))
    );
    setEditingUser(null);
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (editingUser?.id === id) setEditingUser(null);
  };

  const startEdit = (user) => setEditingUser(user);
  const cancelEdit = () => setEditingUser(null);

  return {
    users,
    editingUser,
    createUser,
    updateUser,
    deleteUser,
    startEdit,
    cancelEdit,
  };
};
