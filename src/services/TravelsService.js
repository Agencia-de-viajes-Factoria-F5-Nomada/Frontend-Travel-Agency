import api from './api';

const ENDPOINT = '/api/travels';

export const TravelsService = {
    fetchTravels: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createTravel: async (formData) => {
        const { data } = await api.post(ENDPOINT, formData);
        return data;
    },

    updateTravel: async (id, formData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, formData);
        return data;
    },

    deleteTravel: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};