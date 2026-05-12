import React, { useState, useEffect } from 'react';
import { DriverService } from '../services/DriverService';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ licenseNumber: '', name: '', phone: '' });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const data = await DriverService.fetchDrivers();
      setDrivers(data);
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
        await DriverService.updateDriver(currentId, formData);
        setIsEditing(false);
        setCurrentId(null);
      } else {
        await DriverService.createDriver(formData);
      }
      setFormData({ licenseNumber: '', name: '', phone: '' });
      loadDrivers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (driver) => {
    setIsEditing(true);
    setCurrentId(driver.id);
    setFormData({
      licenseNumber: driver.licenseNumber,
      name: driver.name,
      phone: driver.phone
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar conductor?")) {
      try {
        await DriverService.deleteDriver(id);
        loadDrivers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Conductores</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input name="licenseNumber" placeholder="Nº Licencia" value={formData.licenseNumber} onChange={handleChange} required />
        <input name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} required />
        <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <button type="submit" style={{ backgroundColor: isEditing ? '#4CAF50' : '#001f3f', color: 'white' }}>
          {isEditing ? 'Actualizar Conductor' : 'Registrar Conductor'}
        </button>
        {isEditing && (
          <button type="button" onClick={() => { setIsEditing(false); setFormData({ licenseNumber: '', name: '', phone: '' }); }}>
            Cancelar
          </button>
        )}
      </form>

      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#6faecc', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px', color: 'white' }}>Licencia</th>
            <th style={{ padding: '10px', color: 'white' }}>Nombre</th>
            <th style={{ padding: '10px', color: 'white' }}>Teléfono</th>
            <th style={{ padding: '10px', textAlign: 'center', color: 'white' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td style={{ padding: '10px' }}>{driver.licenseNumber}</td>
              <td style={{ padding: '10px' }}>{driver.name}</td>
              <td style={{ padding: '10px' }}>{driver.phone}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button onClick={() => handleEditClick(driver)} style={{ marginRight: '10px' }}>Editar</button>
                <button onClick={() => handleDelete(driver.id)} style={{ color: 'red' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drivers;