import api from './api'

export const BusService = {
  fetchBuses: async () => {
    const { data } = await api.get('/buses')
    return data
  },
  createBus: async (busData) => {
    const { data } = await api.post('/buses', busData)
    return data
  },
  updateBus: async (id, busData) => {
    const { data } = await api.put(`/buses/${id}`, busData)
    return data
  },
  deleteBus: async (id) => {
    await api.delete(`/buses/${id}`)
  },
}
