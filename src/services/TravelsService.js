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
        const data = await res.json();
        const hotels = Array.isArray(data) ? data : (data.content || []);
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

const fetchTravels = async () => {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error(`Error al cargar viajes: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : (data.content || []);
};

export const travelService = {

    getFeatured: async () => {
        try {
            const travels = await fetchTravels();
            const hotelMap = await fetchHotelMap();
            const featured = travels.slice(0, 6).map(t => enrichWithHotel(t, hotelMap));
            console.log('✅ Viajes destacados (BD):', featured.length);
            return featured;
        } catch (error) {
            console.error('❌ Error en getFeatured:', error);
            return externalTravelService.getFeatured();
        }
    },

    getAvailable: async () => {
        try {
            const travels = await fetchTravels();
            const hotelMap = await fetchHotelMap();
            const backend = travels.map(t => enrichWithHotel(t, hotelMap));
            const external = await externalTravelService.getAvailable();
            return [...backend, ...external];
        } catch (error) {
            console.error('❌ Error en getAvailable:', error);
            return externalTravelService.getAvailable();
        }
    },

    getOnSale: async () => {
        try {
            const travels = await fetchTravels();
            const onSale = travels.filter(t => t.sale === true);
            const hotelMap = await fetchHotelMap();
            const backendSale = onSale.map(t => enrichWithHotel(t, hotelMap));
            const externalSale = await externalTravelService.getOnSale();
            return [...backendSale, ...externalSale];
        } catch (error) {
            console.error('❌ Error en getOnSale:', error);
            return externalTravelService.getOnSale();
        }
    },

    getAll: async () => {
        try {
            const travels = await fetchTravels();
            const hotelMap = await fetchHotelMap();
            const enriched = await withExternalTravels(travels.map(t => enrichWithHotel(t, hotelMap)));
            console.log('✅ Viajes cargados y enriquecidos:', enriched.length);
            return enriched;
        } catch (error) {
            console.error('❌ Error en getAll:', error);
            return externalTravelService.getAvailable();
        }
    },
    getAvailable: async () => {
        try {
            const res = await fetch(`${API_URL}`);
            if (!res.ok) throw new Error(`Error al cargar viajes: ${res.status}`);
            const travels = onlyActive(await res.json());
            const hotelMap = await fetchHotelMap();
            const enriched = await withExternalTravels(travels.map(t => enrichWithHotel(t, hotelMap)));
            console.log('✅ Viajes disponibles cargados:', enriched.length);
            return enriched;
        } catch (error) {
            console.error('❌ Error en getAvailable:', error);
            return externalTravelService.getAvailable();
        }
    },
    getById: async (id) => {
        try {
            if (String(id).startsWith('external-')) {
                const externalTravel = await externalTravelService.getById(id);
                if (!externalTravel) throw new Error('Viaje no encontrado');
                return externalTravel;
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
    getFeatured: async () => {
        try {
            const res = await fetch(`${API_URL}`);
            if (!res.ok) throw new Error('Error al cargar viajes');
            const allActive = onlyActive(await res.json());
            // Si el backend tiene viajes con featured=true los priorizamos,
            // si no tiene ninguno los mostramos todos (campo opcional)
            const featured = allActive.filter(t => t.featured === true);
            const backendTravels = featured.length > 0 ? featured : allActive;
            const hotelMap = await fetchHotelMap();
            const externalFeatured = await externalTravelService.getFeatured();
            return [...backendTravels.map(t => enrichWithHotel(t, hotelMap)), ...externalFeatured];
        } catch (error) {
            console.error('❌ Error en getFeatured:', error);
            return externalTravelService.getFeatured();
        }
    },
    getOnSale: async () => {
        try {
            const res = await fetch(`${API_URL}`);
            if (!res.ok) throw new Error('Error al cargar ofertas');
            const travels = onlyActive(await res.json()).filter(t => t.sale === true);
            const hotelMap = await fetchHotelMap();
            return [
                ...travels.map(t => enrichWithHotel(t, hotelMap)),
                ...(await externalTravelService.getOnSale()),
            ];
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

    getPage: async (page = 0, size = 10) => {
        const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
            headers: { ...authHeaders() },
        });
        if (!res.ok) throw new Error('Error al cargar viajes');
        return res.json();
    },
};