import { API } from '../constants/api';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const bookingService = {
  getAll: async () => {
    const res = await fetch(`${API}/bookings`, {
      headers: { ...authHeader() },
    });
    if (!res.ok) throw new Error('Error al cargar reservas');
    return res.json();
  },

  getPage: async (page = 0, size = 10) => {
    const res = await fetch(`${API}/bookings?page=${page}&size=${size}`, {
      headers: { ...authHeader() },
    });
    if (!res.ok) throw new Error('Error al cargar reservas');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API}/bookings/${id}`, {
      headers: { ...authHeader() },
    });
    if (!res.ok) throw new Error('Reserva no encontrada');
    return res.json();
  },

  create: async (bookingData) => {
    const res = await fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error('Error al crear reserva');
    return res.json();
  },

  update: async (id, bookingData) => {
    const res = await fetch(`${API}/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error('Error al actualizar reserva');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API}/bookings/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    });
    if (!res.ok) throw new Error('Error al eliminar reserva');
    return true;
  },

  quote: async (data) => {
    const res = await fetch(`${API}/bookings/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al calcular cotización');
    return res.json();
  },

  confirm: async (data) => {
    const res = await fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al confirmar reserva');
    return res.json();
  },
};