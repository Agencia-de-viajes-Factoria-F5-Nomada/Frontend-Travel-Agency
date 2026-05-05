import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ dni: '', name: '', phone: '', email: '' });
  const API_URL = 'http://localhost:8080/api/users';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchUsers();
        setFormData({ dni: '', name: '', phone: '', email: '' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("¿Eliminar usuario?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchUsers(); 
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Usuarios</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} required />
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.dni}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;