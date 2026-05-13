import axios from 'axios';

const API_URL = 'http://localhost:8080/trip_segments';

export const getAllSegments = () => axios.get(API_URL);
export const getSegmentById = (id) => axios.get(`${API_URL}/${id}`);
export const createSegment = (segment) => axios.post(API_URL, segment);
export const updateSegment = (id, segment) => axios.put(`${API_URL}/${id}`, segment);
export const deleteSegment = (id) => axios.delete(`${API_URL}/${id}`);