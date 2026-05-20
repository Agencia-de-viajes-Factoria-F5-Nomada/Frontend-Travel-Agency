import { apiClient } from './api';

export const userService = {
  getAll:    async ()              => (await apiClient.get('/users')).data,
  getPage:   async (page = 0, size = 10) => (await apiClient.get(`/users?page=${page}&size=${size}`)).data,
  getById:   async (id)            => (await apiClient.get(`/users/${id}`)).data,
  getActive: async ()              => (await apiClient.get('/users/activos')).data,
  create:    async (data)          => (await apiClient.post('/users', data)).data,
  update:    async (id, data)      => (await apiClient.put(`/users/${id}`, data)).data,
  delete:    async (id)            => { await apiClient.delete(`/users/${id}`) },
};