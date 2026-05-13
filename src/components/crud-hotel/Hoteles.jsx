import React, { useState, useEffect } from 'react';
import { HotelService } from '../services/HotelService';

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [form, setForm] = useState({ nombre: '', ubicacion: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchHoteles();
  }, []);

  const fetchHoteles = async () => {
    try {
      const data = await HotelService.fetchHoteles();
      setHoteles(data);
    } catch (error) {
      console.error("Error al cargar hoteles:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await HotelService.updateHotel(editandoId, form);
      } else {
        await HotelService.createHotel(form);
      }
      resetForm();
      fetchHoteles();
    } catch (error) {
      console.error("Error en la operación:", error);
    }
  };

  const deleteHotel = async (id) => {
    if (window.confirm("¿Deseas eliminar este hotel?")) {
      try {
        await HotelService.deleteHotel(id);
        setHoteles(hoteles.filter(h => h.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const prepararEdicion = (hotel) => {
    setForm({ nombre: hotel.nombre, ubicacion: hotel.ubicacion });
    setEditandoId(hotel.id);
  };

  const resetForm = () => {
    setForm({ nombre: '', ubicacion: '' });
    setEditandoId(null);
  };

  return (
    <div className="p-8 bg-surface-950 min-h-screen text-ink">
      <h1 className="text-3xl font-bold text-accent mb-8">Administración de Hoteles</h1>

      <form onSubmit={handleSubmit} className="mb-10 p-6 border border-border rounded-xl bg-black/20 max-w-md">
        <h2 className="text-xl mb-4 text-accent">{editandoId ? 'Actualizar Hotel' : 'Registrar Nuevo Hotel'}</h2>
        <input 
          className="w-full p-2 mb-3 bg-surface-900 border border-border rounded text-ink"
          placeholder="Nombre del hotel"
          value={form.nombre}
          onChange={(e) => setForm({...form, nombre: e.target.value})}
          required
        />
        <input 
          className="w-full p-2 mb-4 bg-surface-900 border border-border rounded text-ink"
          placeholder="Ubicación"
          value={form.ubicacion}
          onChange={(e) => setForm({...form, ubicacion: e.target.value})}
          required
        />
        <button type="submit" className="w-full bg-accent text-black font-bold py-2 rounded hover:brightness-110 transition-all">
          {editandoId ? 'Confirmar Cambios' : 'Crear Hotel'}
        </button>
        {editandoId && (
          <button 
            type="button" 
            onClick={resetForm}
            className="w-full mt-2 text-gray-400 text-sm hover:underline"
          >
            Cancelar edición
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hoteles.map((hotel) => (
          <div key={hotel.id} className="bg-surface-900 border border-border p-5 rounded-xl shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-accent">{hotel.nombre}</h3>
              <p className="text-gray-400 mb-4">{hotel.ubicacion}</p>
            </div>
            <div className="flex gap-4 border-t border-border pt-4">
              <button onClick={() => prepararEdicion(hotel)} className="text-blue-400 hover:text-blue-300 font-medium">Editar</button>
              <button onClick={() => deleteHotel(hotel.id)} className="text-red-500 hover:text-red-400 font-medium">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hoteles;