import axios from 'axios';

const API_URL = "/api/travels";

export const TravelsService = {
    getAll: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },
    fetchTravels: async () => TravelsService.getAll(),

    create: async (formData) => {
        const { data } = await axios.post(API_URL, formData);
        return data;
    },
    createTravel: async (formData) => TravelsService.create(formData),

    update: async (id, formData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, formData);
        return data;
    },
    updateTravel: async (id, formData) => TravelsService.update(id, formData),

    delete: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    },
    deleteTravel: async (id) => TravelsService.delete(id),
};