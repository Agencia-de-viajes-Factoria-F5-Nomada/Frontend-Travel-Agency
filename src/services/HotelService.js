import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hotels';

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