import { API } from '../constants/api';

const API_URL = `${API}/hotels`;
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const hotelService = {
  getAll: async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Error ${res.status} al cargar hoteles`);
      const data = await res.json();
      const hotels = Array.isArray(data) ? data : (data.content || []);
      console.log('✅ Hoteles cargados (fetch):', hotels.length);
      return hotels;
    } catch (error) {
      console.error('❌ Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error('Hotel no encontrado');
      return res.json();
    } catch (error) {
      console.error('❌ Error en getById:', error);
      throw error;
    }
  },

  getPage: async (page = 0, size = 10) => {
    try {
      const res = await fetch(`${API_URL}?page=${page}&size=${size}`);
      if (!res.ok) throw new Error(`Error ${res.status} al cargar hoteles`);
      return res.json();
    } catch (error) {
      console.error('❌ Error en getPage:', error);
      throw error;
    }
  },

  create: async (hotelData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: h(),
        body: JSON.stringify(hotelData),
      });
      if (!res.ok) throw new Error('Error al crear hotel');
      return res.json();
    } catch (error) {
      console.error('❌ Error en create:', error);
      throw error;
    }
  },

  update: async (id, hotelData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: h(),
        body: JSON.stringify(hotelData),
      });
      if (!res.ok) throw new Error('Error al actualizar hotel');
      return res.json();
    } catch (error) {
      console.error('❌ Error en update:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: h(),
      });
      if (!res.ok) throw new Error('Error al eliminar hotel');
      return true;
    } catch (error) {
      console.error('❌ Error en delete:', error);
      throw error;
    }
  },
};
