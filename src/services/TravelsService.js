import axios from 'axios';
import { API } from '../constants/api';

const API_URL = `${API}/travels`;

export const TravelsService = {
    fetchTravels: async () => {
        const { data } = await axios.get(API_URL);
        return data;
    },
    createTravel: async (formData) => {
        const { data } = await axios.post(API_URL, formData);
        return data;
    },
    updateTravel: async (id, formData) => {
        const { data } = await axios.put(`${API_URL}/${id}`, formData);
        return data;
    },
    deleteTravel: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    }
};

const fetchHotelMap = async () => {
    try {
        const res = await fetch(`${API}/hotels?size=100`);
        if (!res.ok) return {};
        const data = await res.json();
        const hotels = Array.isArray(data) ? data : (data.content || []);
        return Object.fromEntries(hotels.map(h => [h.id, h]));
    } catch {
        return {};
    }
};

const fixImageUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    if (url.includes('unsplash.com')) {
        return `${url.split('?')[0]}?auto=format&fit=crop&w=800&q=80`;
    }
    return url;
};

const onlyActive = (data) => {
    const arr = Array.isArray(data) ? data : (data.content || []);
    return arr.filter(t => t.active !== false);
};

const enrichWithHotel = (travel, hotelMap) => {
    if (!travel) return travel;
    const hotel = hotelMap[travel.hotelId];
    if (!hotel) return travel;
    return {
        ...travel,
        hotelImageUrl: fixImageUrl(hotel.imageUrl || hotel.image_url || ''),
        hotelName:     hotel.name    || '',
        hotelCity:     hotel.city    || '',
        hotelCountry:  hotel.country || '',
        hotelStars:    hotel.stars   || 0,
        halfBoardPrice: hotel.halfBoardPrice || hotel.half_board_price || 0,
    };
};

const fetchTravels = async () => {
    const res = await fetch(`${API_URL}?size=100`);
    if (!res.ok) throw new Error(`Error al cargar viajes: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : (data.content || []);
};

export const travelService = {

    getAll: async () => {
        try {
            const travels = await fetchTravels();
            const hotelMap = await fetchHotelMap();
            return travels.map(t => enrichWithHotel(t, hotelMap));
        } catch (error) {
            console.error('❌ Error en getAll:', error);
            return [];
        }
    },

    getAvailable: async () => {
        try {
            const res = await fetch(`${API_URL}?size=100`);
            if (!res.ok) throw new Error(`Error al cargar viajes: ${res.status}`);
            const travels = onlyActive(await res.json());
            const hotelMap = await fetchHotelMap();
            return travels.map(t => enrichWithHotel(t, hotelMap));
        } catch (error) {
            console.error('❌ Error en getAvailable:', error);
            return [];
        }
    },

    getById: async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`);
            if (!res.ok) throw new Error('Viaje no encontrado');
            const travel = await res.json();
            const hotelMap = await fetchHotelMap();
            return enrichWithHotel(travel, hotelMap);
        } catch (error) {
            console.error('❌ Error en getById:', error);
            throw error;
        }
    },

    getFeatured: async () => {
        try {
            const res = await fetch(`${API_URL}?size=100`);
            if (!res.ok) throw new Error('Error al cargar viajes');
            const allActive = onlyActive(await res.json());
            const featured = allActive.filter(t => t.featured === true);
            const source = featured.length > 0 ? featured : allActive.slice(0, 6);
            const hotelMap = await fetchHotelMap();
            return source.map(t => enrichWithHotel(t, hotelMap));
        } catch (error) {
            console.error('❌ Error en getFeatured:', error);
            return [];
        }
    },

    getOnSale: async () => {
        try {
            const res = await fetch(`${API_URL}?size=100`);
            if (!res.ok) throw new Error('Error al cargar ofertas');
            const travels = onlyActive(await res.json()).filter(t => t.sale === true);
            const hotelMap = await fetchHotelMap();
            return travels.map(t => enrichWithHotel(t, hotelMap));
        } catch (error) {
            console.error('❌ Error en getOnSale:', error);
            return [];
        }
    },

    create: async (travelData) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(travelData),
        });
        if (!res.ok) throw new Error('Error al crear viaje');
        return res.json();
    },

    update: async (id, travelData) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(travelData),
        });
        if (!res.ok) throw new Error('Error al actualizar viaje');
        return res.json();
    },

    delete: async (id) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error('Error al eliminar viaje');
        return true;
    },
};