import axios from 'axios';
import { API } from '../constants/api';

const API_URL = "http://localhost:8080/api/travels";
const onlyActive = (travels) => travels.filter((travel) => travel.active !== false);

export const TravelsService = {
    fetchTravels: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },
    createTravel: async (formData) => {
        const { data } = await axios.post(API_URL, formData);
        return data;
    },
    updateTravel: async (id, formData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, formData);
        return data;
    },
    deleteTravel: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    }
};

export const travelService = {
    getAll: async () => {
        const res = await fetch(`${API}/travels`);
        if (!res.ok) throw new Error('Error al cargar viajes');
        return onlyActive(await res.json());
    },
    getAvailable: async () => {
        const res = await fetch(`${API}/travels`);
        if (!res.ok) throw new Error('Error al cargar viajes');
        return onlyActive(await res.json());
    },
    getById: async (id) => {
        const res = await fetch(`${API}/travels/${id}`);
        if (!res.ok) throw new Error('Viaje no encontrado');
        return res.json();
    },
    getOnSale: async () => {
        const res = await fetch(`${API}/travels`);
        if (!res.ok) throw new Error('Error al cargar ofertas');
        const data = await res.json();
        return onlyActive(data).filter(t => t.sale === true);
    },
    create: async (travelData) => {
        const res = await fetch(`${API}/travels`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(travelData),
        });
        if (!res.ok) throw new Error('Error al crear viaje');
        return res.json();
    },
    update: async (id, travelData) => {
        const res = await fetch(`${API}/travels/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(travelData),
        });
        if (!res.ok) throw new Error('Error al actualizar viaje');
        return res.json();
    },
    delete: async (id) => {
        const res = await fetch(`${API}/travels/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error('Error al eliminar viaje');
        return true;
    },
};
