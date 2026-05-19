import { apiClient } from './api';

export const tripSegmentsService = {
  getAll:  async ()                    => (await apiClient.get('/trip-segments')).data,
  getPage: async (page = 0, size = 10) => (await apiClient.get(`/trip-segments?page=${page}&size=${size}`)).data,
  getById: async (id)                  => (await apiClient.get(`/trip-segments/${id}`)).data,
  create:  async (data)                => (await apiClient.post('/trip-segments', data)).data,
  update:  async (id, data)            => (await apiClient.put(`/trip-segments/${id}`, data)).data,
  delete:  async (id)                  => { await apiClient.delete(`/trip-segments/${id}`) },
};