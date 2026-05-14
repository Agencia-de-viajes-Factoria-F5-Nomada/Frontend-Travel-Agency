import axios from 'axios';

const API_URL = '/api/bookings';

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