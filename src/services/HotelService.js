import axios from 'axios';
import { API } from '../constants/api';

const API_URL = `${API}/hotels`;
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const HotelService = {
    // R - Read (Obtener todos los hoteles)
    fetchHoteles: async () => {
        try {
            const { data } = await axios.get(API_URL);
            console.log('✅ Hoteles cargados (axios):', data.length);
            return data;
        } catch (error) {
            console.error("❌ Error en fetchHoteles:", error);
            throw error;
        }
    },

    // C - Create (Registrar un nuevo hotel)
    createHotel: async (hotelData) => {
        try {
            const { data } = await axios.post(API_URL, hotelData);
            return data;
        } catch (error) {
            console.error("❌ Error en createHotel:", error);
            throw error;
        }
    },

    // U - Update (Actualizar un hotel existente)
    updateHotel: async (id, hotelData) => {
        try {
            const { data } = await axios.put(`${API_URL}/${id}`, hotelData);
            return data;
        } catch (error) {
            console.error("❌ Error en updateHotel:", error);
            throw error;
        }
    },

    // D - Delete (Borrar un hotel)
    deleteHotel: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("❌ Error en deleteHotel:", error);
            throw error;
        }
    }
};

export const hotelService = {
    getAll: async () => {
        try {
            const res = await fetch(`${API_URL}`);
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
    create: async (hotelData) => {
        try {
            const res = await fetch(`${API_URL}`, {
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
