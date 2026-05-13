import api from './api';

const ENDPOINT = '/api/buses';

export const BusService = {
    fetchBuses: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createBus: async (busData) => {
        const payload = {
            license_plate: busData.license_plate || busData.plate,
            model: busData.model,
            capacity: busData.capacity,
            ac: busData.ac || false,
            usb: busData.usb || false,
            bath: busData.bath || false,
            wifi: busData.wifi || false
        };
        const { data } = await api.post(ENDPOINT, payload);
        return data;
    },

    updateBus: async (id, busData) => {
        const payload = {
            license_plate: busData.license_plate || busData.plate,
            model: busData.model,
            capacity: busData.capacity
        };
        const { data } = await api.put(`${ENDPOINT}/${id}`, payload);
        return data;
    },

    deleteBus: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};