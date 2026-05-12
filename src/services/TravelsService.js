import axios from 'axios';

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