import api from './api';

const ENDPOINT = '/api/drivers';

export const DriverService = {
    fetchDrivers: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createDriver: async (driverData) => {
        const { data } = await api.post(ENDPOINT, driverData);
        return data;
    },

    updateDriver: async (id, driverData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, driverData);
        return data;
    },

    deleteDriver: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};