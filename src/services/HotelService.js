import { apiClient } from './api';

export const hotelService = {
  getAll:  async () => {
    const { data } = await apiClient.get('/hotels')
    return Array.isArray(data) ? data : (data.content || [])
  },
  getById: async (id)                  => (await apiClient.get(`/hotels/${id}`)).data,
  getPage: async (page = 0, size = 10) => (await apiClient.get(`/hotels?page=${page}&size=${size}`)).data,
  create:  async (data)                => (await apiClient.post('/hotels', data)).data,
  update:  async (id, data)            => (await apiClient.put(`/hotels/${id}`, data)).data,
  delete:  async (id)                  => { await apiClient.delete(`/hotels/${id}`) },
};