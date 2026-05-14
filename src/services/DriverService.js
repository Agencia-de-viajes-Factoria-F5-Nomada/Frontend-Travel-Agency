import api from './api'

export const DriverService = {
  fetchDrivers: async () => {
    const { data } = await api.get('/drivers')
    return data
  },
  createDriver: async (driverData) => {
    const { data } = await api.post('/drivers', driverData)
    return data
  },
  updateDriver: async (id, driverData) => {
    const { data } = await api.put(`/drivers/${id}`, driverData)
    return data
  },
  deleteDriver: async (id) => {
    await api.delete(`/drivers/${id}`)
  },
}
