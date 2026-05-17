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
        const res = await fetch(`${API}/hotels`);
        if (!res.ok) {
            console.warn('⚠️ No se pudieron cargar los hoteles');
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
    return url;
};

const enrichWithHotel = (travel, hotelMap) => {
    if (!travel) return travel;
    const hotel = hotelMap[travel.hotelId];
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

    // Portada — primeros 6 viajes de la BD
    getFeatured: async () => {
        try {
            const res = await fetch(`${API_URL}`);
            if (!res.ok) throw new Error('Error al cargar viajes');
            const travels = await res.json();
            const hotelMap = await fetchHotelMap();
            const featured = travels.slice(0, 6).map(t => enrichWithHotel(t, hotelMap));
            console.log('✅ Viajes destacados (BD):', featured.length);
            return featured;
        } catch (error) {
            console.error('❌ Error en getFeatured:', error);
            return externalTravelService.getFeatured();
        }
    },

    // Búsqueda — todos: BD + externos
    getAvailable: async () => {
        try {
            const res = await fetch(`${API_URL}`);
            if (!res.ok) throw new Error('Error al cargar viajes');
            const travels = await res.json();
            const hotelMap = await fetchHotelMap();
            const backend = travels.map(t => enrichWithHotel(t, hotelMap));
            const external = await externalTravelService.getAvailable();
            return [...backend, ...external];
        } catch (error) {
            console.error('❌ Error en getAvailable:', error);
            return externalTravelService.getAvailable();
        }
    },

    // Ofertas — BD con sale:true + externos con sale:true
    getOnSale: async () => {
        try {
            const res = await fetch(`${API_URL}`);
            if (!res.ok) throw new Error('Error al cargar ofertas');
            const travels = (await res.json()).filter(t => t.sale === true);
            const hotelMap = await fetchHotelMap();
            const backendSale = travels.map(t => enrichWithHotel(t, hotelMap));
            const externalSale = await externalTravelService.getOnSale();
            return [...backendSale, ...externalSale];
        } catch (error) {
            console.error('❌ Error en getOnSale:', error);
            return externalTravelService.getOnSale();
        }
    },

    // Todos los viajes de la BD
    getAll: async () => {
        try {
            const res = await fetch(`${API_URL}`);
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

    getById: async (id) => {
        try {
            if (String(id).startsWith('external-')) {
                const ext = await externalTravelService.getById(id);
                if (!ext) throw new Error('Viaje no encontrado');
                return ext;
            }
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