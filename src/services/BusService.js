import axios from 'axios';

const API_URL = 'http://localhost:8080/api/buses';

export const BusService = {
    fetchBuses: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },

    createBus: async (busData) => {
        const { data } = await axios.post(API_URL, busData);
        return data;
    },

    updateBus: async (id, busData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, busData);
        return data;
    },

    deleteBus: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    }
};