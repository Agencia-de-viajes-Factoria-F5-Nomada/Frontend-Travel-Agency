import React, { useState, useEffect } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    destination: '',
    bookingDate: ''
  });
  const API_URL = 'http://localhost:8080/api/bookings';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
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
        fetchBookings();
        setFormData({ customerName: '', destination: '', bookingDate: '' });
      }
    } catch (error) {
      console.error("Error al crear reserva:", error);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("¿Anular esta reserva?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchBookings();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Reservas</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input name="customerName" placeholder="Nombre Cliente" value={formData.customerName} onChange={handleChange} required />
        <input name="destination" placeholder="Destino" value={formData.destination} onChange={handleChange} required />
        <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required />
        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white' }}>Crear Reserva</button>
      </form>

      <table border="1" width="100%" style={{ textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.customerName}</td>
              <td>{b.destination}</td>
              <td>{b.bookingDate}</td>
              <td>
                <button onClick={() => deleteBooking(b.id)} style={{ color: 'red' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;