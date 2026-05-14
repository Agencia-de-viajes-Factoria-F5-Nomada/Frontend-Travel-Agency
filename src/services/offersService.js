import api from './api'

export const getAllOffers = () => api.get('/offers')
export const createOffer  = (offer) => api.post('/offers', offer)
export const updateOffer  = (id, offer) => api.put(`/offers/${id}`, offer)
export const deleteOffer  = (id) => api.delete(`/offers/${id}`)
