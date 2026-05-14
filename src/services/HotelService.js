import axios from 'axios';

const API_URL = '/api/hotels';

export const HotelService = {
    getAll: async () => {
        try {
            const { data } = await axios.get(API_URL);
            return data;
        } catch (error) {
            console.error("Error en getAll:", error);
            throw error;
        }
    },
    fetchHoteles: async () => HotelService.getAll(),

    create: async (hotelData) => {
        try {
            const { data } = await axios.post(API_URL, hotelData);
            return data;
        } catch (error) {
            console.error("Error en create:", error);
            throw error;
        }
    },
    createHotel: async (hotelData) => HotelService.create(hotelData),

    update: async (id, hotelData) => {
        try {
            const { data } = await axios.put(`${API_URL}/${id}`, hotelData);
            return data;
        } catch (error) {
            console.error("Error en update:", error);
            throw error;
        }
    },
    updateHotel: async (id, hotelData) => HotelService.update(id, hotelData),

    delete: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error en delete:", error);
            throw error;
        }
    },
    deleteHotel: async (id) => HotelService.delete(id),
};