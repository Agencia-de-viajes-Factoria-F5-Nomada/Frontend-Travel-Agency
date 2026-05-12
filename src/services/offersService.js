import axios from 'axios';

const API_URL = 'http://localhost:8080/offers';

export const getAllOffers = () => axios.get(API_URL);
export const createOffer = (offer) => axios.post(API_URL, offer);
export const updateOffer = (id, offer) => axios.put(`${API_URL}/${id}`, offer);
export const deleteOffer = (id) => axios.delete(`${API_URL}/${id}`);