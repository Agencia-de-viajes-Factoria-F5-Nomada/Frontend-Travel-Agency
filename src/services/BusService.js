import axios from 'axios';

const API_URL = '/api/buses';

export const BusService = {
    getAll: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },
    fetchBuses: async () => BusService.getAll(),

    create: async (busData) => {
        const { data } = await axios.post(API_URL, busData);
        return data;
    },
    createBus: async (busData) => BusService.create(busData),

    update: async (id, busData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, busData);
        return data;
    },
    updateBus: async (id, busData) => BusService.update(id, busData),

    delete: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    },
    deleteBus: async (id) => BusService.delete(id),
};