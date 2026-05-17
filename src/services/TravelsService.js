import { API } from '../constants/api';
import { externalTravelService } from './externalTravelService';

const API_URL = `${API}/travels`;

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchHotelMap = async () => {
  try {
    const res = await fetch(`${API}/hotels`);
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

const onlyActive = (travels) => {
  return travels.filter(t => t.active !== false);
};

const withExternalTravels = async (backendTravels) => {
  try {
    const external = await externalTravelService.getAvailable();
    return [...backendTravels, ...external];
  } catch {
    return backendTravels;
  }
};

export const travelService = {
  getAll: async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Error al cargar viajes: ${res.status}`);
      const travels = await res.json();
      const hotelMap = await fetchHotelMap();
      const enriched = travels.map(t => enrichWithHotel(t, hotelMap));
      return withExternalTravels(enriched);
    } catch {
      return externalTravelService.getAvailable();
    }
  },

  getAvailable: async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al cargar viajes');
      const travels = onlyActive(await res.json());
      const hotelMap = await fetchHotelMap();
      const enriched = travels.map(t => enrichWithHotel(t, hotelMap));
      return withExternalTravels(enriched);
    } catch {
      return externalTravelService.getAvailable();
    }
  },

  getFeatured: async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al cargar viajes');
      const allActive = onlyActive(await res.json());
      const featured = allActive.filter(t => t.featured === true);
      const backendTravels = featured.length > 0 ? featured : allActive;
      const hotelMap = await fetchHotelMap();
      const externalFeatured = await externalTravelService.getFeatured();
      return [...backendTravels.map(t => enrichWithHotel(t, hotelMap)), ...externalFeatured];
    } catch {
      return externalTravelService.getFeatured();
    }
  },

  getOnSale: async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al cargar ofertas');
      const travels = onlyActive(await res.json()).filter(t => t.sale === true);
      const hotelMap = await fetchHotelMap();
      return [
        ...travels.map(t => enrichWithHotel(t, hotelMap)),
        ...(await externalTravelService.getOnSale()),
      ];
    } catch {
      return externalTravelService.getOnSale();
    }
  },

  getById: async (id) => {
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
  },

  getPage: async (page = 0, size = 10) => {
    const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error('Error al cargar viajes');
    return res.json();
  },

  create: async (travelData) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(travelData),
    });
    if (!res.ok) throw new Error('Error al crear viaje');
    return res.json();
  },

  update: async (id, travelData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(travelData),
    });
    if (!res.ok) throw new Error('Error al actualizar viaje');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error('Error al eliminar viaje');
    return true;
  },
};