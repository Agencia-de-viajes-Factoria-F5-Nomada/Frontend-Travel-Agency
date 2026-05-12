import React, { useState, useEffect } from 'react';
import { BusService } from '../services/BusService';

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({ plate: '', model: '', capacity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const data = await BusService.fetchBuses();
      setBuses(data);
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
        await BusService.updateBus(currentId, formData);
      } else {
        await BusService.createBus(formData);
      }
      resetForm();
      loadBuses();
    } catch (error) {
      console.error(error);
    }
  };

  const prepararEdicion = (bus) => {
    setFormData({
      plate: bus.plate,
      model: bus.model,
      capacity: bus.capacity
    });
    setCurrentId(bus.id);
    setIsEditing(true);
  };

  const deleteBus = async (id) => {
    if (window.confirm("¿Eliminar autobús?")) {
      try {
        await BusService.deleteBus(id);
        loadBuses();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ plate: '', model: '', capacity: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#001f3f]">Gestión de Autobuses</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow">
        <input name="plate" placeholder="Matrícula" value={formData.plate} onChange={handleChange} className="border p-2 rounded" required />
        <input name="model" placeholder="Modelo" value={formData.model} onChange={handleChange} className="border p-2 rounded" required />
        <input name="capacity" type="number" placeholder="Capacidad" value={formData.capacity} onChange={handleChange} className="border p-2 rounded" required />
        
        <button type="submit" className="col-span-2 bg-[#001f3f] text-white p-2 rounded hover:bg-blue-900 transition-colors">
          {isEditing ? 'Actualizar Autobús' : 'Registrar Autobús'}
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
              <th className="px-6 py-4 font-medium">Matrícula</th>
              <th className="px-6 py-4 font-medium">Modelo</th>
              <th className="px-6 py-4 font-medium">Capacidad</th>
              <th className="px-6 py-4 font-medium text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {buses.map((bus) => (
              <tr key={bus.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{bus.plate}</td>
                <td className="px-6 py-4">{bus.model}</td>
                <td className="px-6 py-4">{bus.capacity}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => prepararEdicion(bus)} className="text-blue-600 hover:text-blue-800 font-semibold mr-4">
                    Editar
                  </button>
                  <button onClick={() => deleteBus(bus.id)} className="text-red-600 hover:text-red-800 font-semibold">
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

export default Buses;