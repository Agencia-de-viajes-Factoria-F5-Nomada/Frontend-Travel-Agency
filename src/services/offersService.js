import { apiClient } from './api';

export const offersService = {
  getAll:  async ()                    => (await apiClient.get('/offers')).data,
  getPage: async (page = 0, size = 10) => (await apiClient.get(`/offers?page=${page}&size=${size}`)).data,
  getById: async (id)                  => (await apiClient.get(`/offers/${id}`)).data,
  create:  async (data)                => (await apiClient.post('/offers', data)).data,
  update:  async (id, data)            => (await apiClient.put(`/offers/${id}`, data)).data,
  delete:  async (id)                  => { await apiClient.delete(`/offers/${id}`) },
};