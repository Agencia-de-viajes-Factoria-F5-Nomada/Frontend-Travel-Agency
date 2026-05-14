import axios from 'axios';

const API_URL = '/api/drivers';

export const DriverService = {
    getAll: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },
    fetchDrivers: async () => DriverService.getAll(),

    create: async (driverData) => {
        const { data } = await axios.post(API_URL, driverData);
        return data;
    },
    createDriver: async (driverData) => DriverService.create(driverData),

    update: async (id, driverData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, driverData);
        return data;
    },
    updateDriver: async (id, driverData) => DriverService.update(id, driverData),

    delete: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    },
    deleteDriver: async (id) => DriverService.delete(id),
};