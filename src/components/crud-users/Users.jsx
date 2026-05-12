import React, { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ dni: '', name: '', phone: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await UserService.fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await UserService.updateUser(currentId, formData);
      } else {
        await UserService.createUser(formData);
      }
      resetForm();
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const prepararEdicion = (user) => {
    setFormData({
      dni: user.dni,
      name: user.name,
      phone: user.phone,
      email: user.email
    });
    setCurrentId(user.id);
    setIsEditing(true);
  };

  const deleteUser = async (id) => {
    if (window.confirm("¿Eliminar usuario?")) {
      try {
        await UserService.deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ dni: '', name: '', phone: '', email: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#001f3f]">Gestión de Usuarios</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow">
        <input name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} className="border p-2 rounded" required />
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
        <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} className="border p-2 rounded" required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" required />
        
        <button type="submit" className="col-span-2 bg-[#001f3f] text-white p-2 rounded hover:bg-blue-900 transition-colors">
          {isEditing ? 'Actualizar Usuario' : 'Registrar Usuario'}
        </button>
        
        {isEditing && (
          <button type="button" onClick={resetForm} className="col-span-2 bg-gray-400 text-white p-2 rounded">
            Cancelar Edición
          </button>
        )}
      </form>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-[#001f3f] text-white">
            <tr>
              <th className="px-6 py-4 font-medium">DNI</th>
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Teléfono</th>
              <th className="px-6 py-4 font-medium text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{user.dni}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => prepararEdicion(user)} className="text-blue-600 hover:text-blue-800 font-semibold mr-4">
                    Editar
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-800 font-semibold">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;