import axios from 'axios';
import { API } from '../constants/api';

const API_URL = `${API}/hotels`;
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const HotelService = {
    // R - Read (Obtener todos los hoteles)
    fetchHoteles: async () => {
        try {
            const { data } = await axios.get(API_URL);
            return data;
        } catch (error) {
            console.error("Error en fetchHoteles:", error);
            throw error;
        }
    },

    // C - Create (Registrar un nuevo hotel)
    createHotel: async (hotelData) => {
        try {
            const { data } = await axios.post(API_URL, hotelData);
            return data;
        } catch (error) {
            console.error("Error en createHotel:", error);
            throw error;
        }
    },

    // U - Update (Actualizar un hotel existente)
    updateHotel: async (id, hotelData) => {
        try {
            const { data } = await axios.put(`${API_URL}/${id}`, hotelData);
            return data;
        } catch (error) {
            console.error("Error en updateHotel:", error);
            throw error;
        }
    },

    // D - Delete (Borrar un hotel)
    deleteHotel: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error en deleteHotel:", error);
            throw error;
        }
    }
};

export const hotelService = {
    getAll: async () => {
        const res = await fetch(`${API}/hotels`);
        if (!res.ok) throw new Error('Error al cargar hoteles');
        return res.json();
    },
    getById: async (id) => {
        const res = await fetch(`${API}/hotels/${id}`);
        if (!res.ok) throw new Error('Hotel no encontrado');
        return res.json();
    },
    create: async (hotelData) => {
        const res = await fetch(`${API}/hotels`, {
            method: 'POST',
            headers: h(),
            body: JSON.stringify(hotelData),
        });
        if (!res.ok) throw new Error('Error al crear hotel');
        return res.json();
    },
    update: async (id, hotelData) => {
        const res = await fetch(`${API}/hotels/${id}`, {
            method: 'PUT',
            headers: h(),
            body: JSON.stringify(hotelData),
        });
        if (!res.ok) throw new Error('Error al actualizar hotel');
        return res.json();
    },
    delete: async (id) => {
        const res = await fetch(`${API}/hotels/${id}`, {
            method: 'DELETE',
            headers: h(),
        });
        if (!res.ok) throw new Error('Error al eliminar hotel');
        return true;
    },
};
