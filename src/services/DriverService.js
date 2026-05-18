import { apiClient } from './api';

export const driverService = {
  getAll:    async ()                    => (await apiClient.get('/drivers')).data,
  getPage:   async (page = 0, size = 10) => (await apiClient.get(`/drivers?page=${page}&size=${size}`)).data,
  getById:   async (id)                  => (await apiClient.get(`/drivers/${id}`)).data,
  getActive: async ()                    => (await apiClient.get('/drivers/activos')).data,
  create:    async (data)                => (await apiClient.post('/drivers', data)).data,
  update:    async (id, data)            => (await apiClient.put(`/drivers/${id}`, data)).data,
  delete:    async (id)                  => { await apiClient.delete(`/drivers/${id}`) },
};