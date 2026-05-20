import { apiClient } from './api';

export const employeesService = {
  getAll:  async ()                    => (await apiClient.get('/employees')).data,
  getPage: async (page = 0, size = 10) => (await apiClient.get(`/employees?page=${page}&size=${size}`)).data,
  getById: async (id)                  => (await apiClient.get(`/employees/${id}`)).data,
  create:  async (data)                => (await apiClient.post('/employees', data)).data,
  update:  async (id, data)            => (await apiClient.put(`/employees/${id}`, data)).data,
  delete:  async (id)                  => { await apiClient.delete(`/employees/${id}`) },
};