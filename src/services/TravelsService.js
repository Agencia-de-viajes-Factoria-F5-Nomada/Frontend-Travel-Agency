import api from './api'

export const TravelsService = {
  fetchTravels: async () => {
    const { data } = await api.get('/travels')
    return data
  },
  createTravel: async (formData) => {
    const { data } = await api.post('/travels', formData)
    return data
  },
  updateTravel: async (id, formData) => {
    const { data } = await api.put(`/travels/${id}`, formData)
    return data
  },
  deleteTravel: async (id) => {
    await api.delete(`/travels/${id}`)
  },
}
