import axios from 'axios';
import { API } from '../constants/api';
import { externalTravelService } from './externalTravelService';

const API_URL = `${API}/travels`;

const authHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

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
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`${API}/hotels`, { headers });
        if (!res.ok) {
            console.warn('⚠️ No se pudieron cargar los hoteles, usando valores por defecto');
            return {};
        }
        const hotels = await res.json();
        console.log('✅ Hoteles cargados:', hotels.length);
        return Object.fromEntries(hotels.map(h => [h.id, h]));
    } catch (error) {
        console.warn('⚠️ Error cargando hoteles:', error.message);
        return {};
    }
};

const fixImageUrl = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return '';
    if (url.includes('unsplash.com')) {
        const base = url.split('?')[0];
        return `${base}?auto=format&fit=crop&w=800&q=80`;
    }
    if (url.includes('picsum.photos')) {
        return url;
    }
    return url;
};

const enrichWithHotel = (travel, hotelMap) => {
    if (!travel) return travel;
    const hotel = hotelMap[travel.hotelId ?? travel.hotel_id];
    if (hotel) {
        const rawUrl = hotel.imageUrl || hotel.image_url || '';
        return {
            ...travel,
            hotelImageUrl: fixImageUrl(rawUrl),
            hotelName: hotel.name || '',
            hotelCity: hotel.city || '',
            hotelCountry: hotel.country || '',
            hotelStars: hotel.stars || 0,
            halfBoardPrice: hotel.halfBoardPrice || hotel.half_board_price || travel.price || 0,
        };
    }
    return travel;
};

export const travelService = {
    getAll: async () => {
        try {
            const res = await fetch(`${API_URL}`, { headers: authHeaders() });
            if (!res.ok) throw new Error(`Error al cargar viajes: ${res.status}`);
            const travels = await res.json();
            const hotelMap = await fetchHotelMap();
            const enriched = travels.map(t => enrichWithHotel(t, hotelMap));
            console.log('✅ Viajes cargados y enriquecidos:', enriched.length);
            return enriched;
        } catch (error) {
            console.error('❌ Error en getAll:', error);
            throw error;
        }
    },
    getAvailable: async () => {
        try {
            const res = await fetch(`${API_URL}`, { headers: authHeaders() });
            if (!res.ok) throw new Error(`Error al cargar viajes: ${res.status}`);
            const travels = await res.json();
            const hotelMap = await fetchHotelMap();
            const enriched = travels.map(t => enrichWithHotel(t, hotelMap));
            return [...enriched, ...(await externalTravelService.getAvailable())];
        } catch (error) {
            console.error('❌ Error en getAvailable:', error);
            return externalTravelService.getAvailable();
        }
    },
    getFeatured: async () => {
        try {
            const res = await fetch(`${API_URL}`, { headers: authHeaders() });
            if (!res.ok) throw new Error('Error al cargar viajes');
            const travels = await res.json();
            const featured = travels.filter(t => t.featured === true);
            const backendTravels = featured.length > 0 ? featured : travels;
            const hotelMap = await fetchHotelMap();
            return [...backendTravels.map(t => enrichWithHotel(t, hotelMap)), ...(await externalTravelService.getFeatured())];
        } catch (error) {
            console.error('❌ Error en getFeatured:', error);
            return externalTravelService.getFeatured();
        }
    },
    getById: async (id) => {
        try {
            if (String(id).startsWith('external-')) {
                const ext = await externalTravelService.getById(id);
                if (!ext) throw new Error('Viaje no encontrado');
                return ext;
            }
            const res = await fetch(`${API_URL}/${id}`, { headers: authHeaders() });
            if (!res.ok) throw new Error('Viaje no encontrado');
            const travel = await res.json();
            const hotelMap = await fetchHotelMap();
            return enrichWithHotel(travel, hotelMap);
        } catch (error) {
            console.error('❌ Error en getById:', error);
            throw error;
        }
    },
    getOnSale: async () => {
        try {
            const res = await fetch(`${API_URL}`, { headers: authHeaders() });
            if (!res.ok) throw new Error('Error al cargar ofertas');
            const travels = (await res.json()).filter(t => t.sale === true);
            const hotelMap = await fetchHotelMap();
            return [...travels.map(t => enrichWithHotel(t, hotelMap)), ...(await externalTravelService.getOnSale())];
        } catch (error) {
            console.error('❌ Error en getOnSale:', error);
            return externalTravelService.getOnSale();
        }
    },
    create: async (travelData) => {
        const res = await fetch(`${API_URL}`, {
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