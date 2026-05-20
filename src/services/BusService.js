import { apiClient } from './api';

export const busService = {
  getAll:  async ()                    => (await apiClient.get('/buses')).data,
  getPage: async (page = 0, size = 10) => (await apiClient.get(`/buses?page=${page}&size=${size}`)).data,
  getById: async (id)                  => (await apiClient.get(`/buses/${id}`)).data,
  create:  async (data)                => (await apiClient.post('/buses', data)).data,
  update:  async (id, data)            => (await apiClient.put(`/buses/${id}`, data)).data,
  delete:  async (id)                  => { await apiClient.delete(`/buses/${id}`) },
};