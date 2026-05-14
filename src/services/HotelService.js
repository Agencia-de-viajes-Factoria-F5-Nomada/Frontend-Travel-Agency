import { API } from '../constants/api';

const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });
const BASE = `${API}/hotels`;

export const hotelService = {
    getAll: async () => {
        const res = await fetch(BASE, { headers: h() });
        if (!res.ok) throw new Error('Error al cargar hoteles');
        return res.json();
    },
    getById: async (id) => {
        const res = await fetch(`${BASE}/${id}`);
        if (!res.ok) throw new Error('Hotel no encontrado');
        return res.json();
    },
    create: async (data) => {
        const res = await fetch(BASE, { method: 'POST', headers: h(), body: JSON.stringify(data) });
        if (!res.ok) throw new Error('Error al crear hotel');
        return res.json();
    },
    update: async (id, data) => {
        const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) });
        if (!res.ok) throw new Error('Error al actualizar hotel');
        return res.json();
    },
    delete: async (id) => {
        const res = await fetch(`${BASE}/${id}`, { method: 'DELETE', headers: h() });
        if (!res.ok) throw new Error('Error al eliminar hotel');
        return true;
    },
};