import axios from 'axios';
import { API } from '../constants/api';

const API_URL = "http://localhost:8080/api/travels";

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
    getAvailable: async () => {
        const res = await fetch(`${API}/travels`);
        if (!res.ok) throw new Error('Error al cargar viajes');
        return res.json();
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
        return data.filter(t => t.sale === true);
    },
};