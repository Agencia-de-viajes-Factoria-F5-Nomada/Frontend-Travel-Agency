import axios from 'axios';

const API_URL = '/api/users';

export const UserService = {
    getAll: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },
    fetchUsers: async () => UserService.getAll(),

    create: async (userData) => {
        const { data } = await axios.post(API_URL, userData);
        return data;
    },
    createUser: async (userData) => UserService.create(userData),

    update: async (id, userData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, userData);
        return data;
    },
    updateUser: async (id, userData) => UserService.update(id, userData),

    delete: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    },
    deleteUser: async (id) => UserService.delete(id),
};