import api from './api';

const ENDPOINT = '/api/trip_segments';

export const TripSegmentService = {
    fetchSegments: async () => {
        const { data } = await api.get(ENDPOINT);
        return data;
    },

    getSegmentById: async (id) => {
        const { data } = await api.get(`${ENDPOINT}/${id}`);
        return data;
    },

    createSegment: async (segmentData) => {
        const { data } = await api.post(ENDPOINT, segmentData);
        return data;
    },

    updateSegment: async (id, segmentData) => {
        const { data } = await api.put(`${ENDPOINT}/${id}`, segmentData);
        return data;
    },

    deleteSegment: async (id) => {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    }
};