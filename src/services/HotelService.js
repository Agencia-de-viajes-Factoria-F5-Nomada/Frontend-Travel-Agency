import api from './api';

const ENDPOINT = '/api/hotels';

export const HotelService = {
    fetchHoteles: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createHotel: async (hotelData) => {
        const { data } = await api.post(ENDPOINT, hotelData);
        return data;
    },

    updateHotel: async (id, hotelData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, hotelData);
        return data;
    },

    deleteHotel: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};