import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const bookingService = {
  getAll:  async ()     => { const r = await fetch(`${API}/bookings`, { headers: h() }); if (!r.ok) throw new Error('Error reservas'); return r.json(); },
  getById: async (id)   => { const r = await fetch(`${API}/bookings/${id}`, { headers: h() }); if (!r.ok) throw new Error('Reserva no encontrada'); return r.json(); },
  quote:   async (data) => { const r = await fetch(`${API}/bookings/quote`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error cotización'); return r.json(); },
  confirm: async (data) => { const r = await fetch(`${API}/bookings`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error confirmar reserva'); return r.json(); },
  delete:  async (id)   => { const r = await fetch(`${API}/bookings/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};