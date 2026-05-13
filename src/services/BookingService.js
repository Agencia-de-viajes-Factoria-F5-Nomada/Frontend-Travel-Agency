import api from './api'; 

const ENDPOINT = '/api/bookings';

export const BookingService = {
    fetchBookings: async () => {
        // 'api' ya sabe que debe usar la VITE_API_URL del .env
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createBooking: async (bookingData) => {
        const { data } = await api.post(ENDPOINT, bookingData);
        return data;
    },

    updateBooking: async (id, bookingData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, bookingData);
        return data;
    },

    deleteBooking: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};