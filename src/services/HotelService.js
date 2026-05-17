import { API } from '../constants/api';

const API_URL = `${API}/hotels`;
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const hotelService = {
  getAll: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Error ${res.status} al cargar hoteles`);
    const data = await res.json();
    return data.content || data;
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Hotel no encontrado');
    return res.json();
  },

  getPage: async (page = 0, size = 10) => {
    const res = await fetch(`${API_URL}?page=${page}&size=${size}`);
    if (!res.ok) throw new Error(`Error ${res.status} al cargar hoteles`);
    return res.json();
  },

  create: async (hotelData) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: h(),
      body: JSON.stringify(hotelData),
    });
    if (!res.ok) throw new Error('Error al crear hotel');
    return res.json();
  },

  update: async (id, hotelData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: h(),
      body: JSON.stringify(hotelData),
    });
    if (!res.ok) throw new Error('Error al actualizar hotel');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: h(),
    });
    if (!res.ok) throw new Error('Error al eliminar hotel');
    return true;
  },
};