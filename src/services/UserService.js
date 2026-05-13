import api from './api';

const ENDPOINT = '/api/users';

export const UserService = {
    fetchUsers: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createUser: async (userData) => {
        const { data } = await api.post(ENDPOINT, userData);
        return data;
    },

    updateUser: async (id, userData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, userData);
        return data;
    },

    deleteUser: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};