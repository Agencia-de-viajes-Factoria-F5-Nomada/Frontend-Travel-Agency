import { apiClient } from './api';

const fetchHotelMap = async () => {
  try {
    const { data } = await apiClient.get('/hotels?size=100')
    const hotels = Array.isArray(data) ? data : (data.content || [])
    return Object.fromEntries(hotels.map(h => [h.id, h]))
  } catch {
    return {}
  }
}

const fixImageUrl = (url) => {
  if (!url || typeof url !== 'string') return ''
  if (url.includes('unsplash.com')) {
    return `${url.split('?')[0]}?auto=format&fit=crop&w=800&q=80`
  }
  return url
}

const onlyActive = (data) => {
  const arr = Array.isArray(data) ? data : (data.content || [])
  return arr.filter(t => t.active !== false)
}

const enrichWithHotel = (travel, hotelMap) => {
  if (!travel) return travel
  const hotel = hotelMap[travel.hotelId]
  if (!hotel) return travel
  return {
    ...travel,
    hotelImageUrl:  fixImageUrl(hotel.imageUrl || hotel.image_url || ''),
    hotelName:      hotel.name    || '',
    hotelCity:      hotel.city    || '',
    hotelCountry:   hotel.country || '',
    hotelStars:     hotel.stars   || 0,
    halfBoardPrice: hotel.halfBoardPrice || hotel.half_board_price || 0,
    fullBoardPrice: hotel.fullBoardPrice || hotel.full_board_price || 0,
  }
}

const fetchTravels = async () => {
  const { data } = await apiClient.get('/travels?size=100')
  return Array.isArray(data) ? data : (data.content || [])
}

export const travelService = {
  getAll: async () => {
    try {
      const travels  = await fetchTravels()
      const hotelMap = await fetchHotelMap()
      return travels.map(t => enrichWithHotel(t, hotelMap))
    } catch { return [] }
  },

  getAvailable: async () => {
    try {
      const { data } = await apiClient.get('/travels?size=100')
      const travels  = onlyActive(data)
      const hotelMap = await fetchHotelMap()
      return travels.map(t => enrichWithHotel(t, hotelMap))
    } catch { return [] }
  },

  getById: async (id) => {
    const { data } = await apiClient.get(`/travels/${id}`)
    const hotelMap  = await fetchHotelMap()
    return enrichWithHotel(data, hotelMap)
  },

  getSegmentsByTravelId: async (id) => {
    const { data } = await apiClient.get(`/travels/${id}/segments`)
    return Array.isArray(data) ? data : (data.content || [])
  },

  getFeatured: async () => {
    try {
      const { data }  = await apiClient.get('/travels?size=100')
      const allActive = onlyActive(data)
      const featured  = allActive.filter(t => t.featured === true)
      const source    = featured.length > 0 ? featured : allActive.slice(0, 6)
      const hotelMap  = await fetchHotelMap()
      return source.map(t => enrichWithHotel(t, hotelMap))
    } catch { return [] }
  },

  getOnSale: async () => {
    try {
      const { data } = await apiClient.get('/travels?size=100')
      const travels  = onlyActive(data).filter(t => t.sale === true)
      const hotelMap = await fetchHotelMap()
      return travels.map(t => enrichWithHotel(t, hotelMap))
    } catch { return [] }
  },

  getPage:  async (page = 0, size = 10) => (await apiClient.get(`/travels?page=${page}&size=${size}`)).data,
  create:   async (data)                => (await apiClient.post('/travels', data)).data,
  update:   async (id, data)            => (await apiClient.put(`/travels/${id}`, data)).data,
  delete:   async (id)                  => { await apiClient.delete(`/travels/${id}`) },
}