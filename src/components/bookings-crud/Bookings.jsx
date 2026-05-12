import React, { useState, useEffect } from 'react';
import { BookingService } from '../services/BookingService';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({ customerName: '', destination: '', bookingDate: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await BookingService.fetchBookings();
      setBookings(data);
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
        await BookingService.updateBooking(currentId, formData);
      } else {
        await BookingService.createBooking(formData);
      }
      resetForm();
      loadBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const prepararEdicion = (booking) => {
    setFormData({
      customerName: booking.customerName,
      destination: booking.destination,
      bookingDate: booking.bookingDate
    });
    setCurrentId(booking.id);
    setIsEditing(true);
  };

  const deleteBooking = async (id) => {
    if (window.confirm("¿Anular esta reserva?")) {
      try {
        await BookingService.deleteBooking(id);
        loadBookings();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ customerName: '', destination: '', bookingDate: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#001f3f]">Gestión de Reservas</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow">
        <input name="customerName" placeholder="Nombre Cliente" value={formData.customerName} onChange={handleChange} className="border p-2 rounded" required />
        <input name="destination" placeholder="Destino" value={formData.destination} onChange={handleChange} className="border p-2 rounded" required />
        <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} className="border p-2 rounded" required />
        
        <button type="submit" className="col-span-2 bg-[#001f3f] text-white p-2 rounded hover:bg-blue-900 transition-colors">
          {isEditing ? 'Actualizar Reserva' : 'Crear Reserva'}
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
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Destino</th>
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{b.customerName}</td>
                <td className="px-6 py-4">{b.destination}</td>
                <td className="px-6 py-4">{b.bookingDate}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => prepararEdicion(b)} className="text-blue-600 hover:text-blue-800 font-semibold mr-4">
                    Editar
                  </button>
                  <button onClick={() => deleteBooking(b.id)} className="text-red-600 hover:text-red-800 font-semibold">
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

export default Bookings;