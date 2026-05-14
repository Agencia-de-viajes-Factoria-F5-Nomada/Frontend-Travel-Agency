import api from './api'

export const BookingService = {
  fetchBookings: async () => {
    const { data } = await api.get('/bookings')
    return data
  },
  createBooking: async (bookingData) => {
    const { data } = await api.post('/bookings', bookingData)
    return data
  },
  updateBooking: async (id, bookingData) => {
    const { data } = await api.put(`/bookings/${id}`, bookingData)
    return data
  },
  deleteBooking: async (id) => {
    await api.delete(`/bookings/${id}`)
  },
}
