import axios from 'axios';

const API_URL = 'http://localhost:8080/api/drivers';

export const DriverService = {
    fetchDrivers: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },

    createDriver: async (driverData) => {
        const { data } = await axios.post(API_URL, driverData);
        return data;
    },

    updateDriver: async (id, driverData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, driverData);
        return data;
    },

    deleteDriver: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    }
};