import api from './api'

export const HotelService = {
  fetchHoteles: async () => {
    const { data } = await api.get('/hotels')
    return data
  },
  createHotel: async (hotelData) => {
    const { data } = await api.post('/hotels', hotelData)
    return data
  },
  updateHotel: async (id, hotelData) => {
    const { data } = await api.put(`/hotels/${id}`, hotelData)
    return data
  },
  deleteHotel: async (id) => {
    await api.delete(`/hotels/${id}`)
  },
}
