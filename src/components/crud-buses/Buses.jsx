import React, { useState, useEffect } from 'react';

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({ plate: '', model: '', capacity: '' });
  const API_URL = 'http://localhost:8080/api/buses';

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBuses(data);
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
        fetchBuses();
        setFormData({ plate: '', model: '', capacity: '' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBus = async (id) => {
    if (window.confirm("¿Eliminar autobús?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchBuses();
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
      <h2>Gestión de Autobuses</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="plate" placeholder="Matrícula" value={formData.plate} onChange={handleChange} required />
        <input name="model" placeholder="Modelo" value={formData.model} onChange={handleChange} required />
        <input name="capacity" type="number" placeholder="Capacidad" value={formData.capacity} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.plate}</td>
              <td>{bus.model}</td>
              <td>{bus.capacity}</td>
              <td>
                <button onClick={() => deleteBus(bus.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Buses;