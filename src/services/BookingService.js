import { apiClient } from './api';

export const bookingService = {
  getAll:   async ()                   => (await apiClient.get('/bookings')).data,
  getPage:  async (page = 0, size = 10) => (await apiClient.get(`/bookings?page=${page}&size=${size}`)).data,
  getById:  async (id)                  => (await apiClient.get(`/bookings/${id}`)).data,
  create:   async (data)                => (await apiClient.post('/bookings', data)).data,
  update:   async (id, data)            => (await apiClient.put(`/bookings/${id}`, data)).data,
  delete:   async (id)                  => { await apiClient.delete(`/bookings/${id}`) },
  quote:    async (data)                => (await apiClient.post('/bookings/quote', data)).data,
  confirm:  async (data)                => (await apiClient.post('/bookings', data)).data,
  createCustomTrip: async (data)        => (await apiClient.post('/custom-trip-requests', data)).data,
};