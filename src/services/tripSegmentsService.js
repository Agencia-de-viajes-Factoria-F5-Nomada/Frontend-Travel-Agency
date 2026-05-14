import api from './api'

export const getAllSegments  = () => api.get('/trip-segments')
export const getSegmentById = (id) => api.get(`/trip-segments/${id}`)
export const createSegment  = (segment) => api.post('/trip-segments', segment)
export const updateSegment  = (id, segment) => api.put(`/trip-segments/${id}`, segment)
export const deleteSegment  = (id) => api.delete(`/trip-segments/${id}`)
