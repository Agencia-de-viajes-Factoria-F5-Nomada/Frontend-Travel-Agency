import axios from 'axios';
import { API } from '../constants/api';

const API_URL = 'http://localhost:8080/api/bookings';

const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const BookingService = {
    fetchBookings: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },

    createBooking: async (bookingData) => {
        const { data } = await axios.post(API_URL, bookingData);
        return data;
    },

    updateBooking: async (id, bookingData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, bookingData);
        return data;
    },

    deleteBooking: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    }
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