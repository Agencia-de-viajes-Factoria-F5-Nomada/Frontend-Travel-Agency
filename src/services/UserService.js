import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const UserService = {
    fetchUsers: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },

    createUser: async (userData) => {
        const { data } = await axios.post(API_URL, userData);
        return data;
    },

    updateUser: async (id, userData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, userData);
        return data;
    },

    deleteUser: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    }
};