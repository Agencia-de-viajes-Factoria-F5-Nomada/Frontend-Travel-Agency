import api from './api';

const ENDPOINT = '/api/employees';

export const EmployeeService = {
    fetchEmployees: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createEmployee: async (employeeData) => {
        const { data } = await api.post(ENDPOINT, employeeData);
        return data;
    },

    updateEmployee: async (id, employeeData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, employeeData);
        return data;
    },

    deleteEmployee: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};