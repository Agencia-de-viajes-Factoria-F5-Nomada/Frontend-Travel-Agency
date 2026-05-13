import api from './api';

const ENDPOINT = '/api/offers'; 

export const OfferService = {
    fetchOffers: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    createOffer: async (offerData) => {
        const { data } = await api.post(ENDPOINT, offerData);
        return data;
    },

    updateOffer: async (id, offerData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, offerData);
        return data;
    },

    deleteOffer: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};