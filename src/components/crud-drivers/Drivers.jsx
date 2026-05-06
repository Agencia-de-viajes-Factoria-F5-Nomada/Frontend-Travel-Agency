import React, { useState, useEffect } from 'react';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({ licenseNumber: '', name: '', phone: '' });
  const API_URL = 'http://localhost:8080/api/drivers';

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDrivers(data);
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
        fetchDrivers();
        setFormData({ licenseNumber: '', name: '', phone: '' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDriver = async (id) => {
    if (window.confirm("¿Eliminar conductor?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchDrivers();
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
      <h2>Gestión de Conductores</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="licenseNumber" placeholder="Nº Licencia" value={formData.licenseNumber} onChange={handleChange} required />
        <input name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} required />
        <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <button type="submit">Registrar Conductor</button>
      </form>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Licencia</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.licenseNumber}</td>
              <td>{driver.name}</td>
              <td>{driver.phone}</td>
              <td>
                <button onClick={() => deleteDriver(driver.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drivers;