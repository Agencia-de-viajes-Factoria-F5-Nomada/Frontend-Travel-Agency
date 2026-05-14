import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const tripSegmentsService = {
  getAll:  async ()         => { const r = await fetch(`${API}/trip-segments`, { headers: h() }); if (!r.ok) throw new Error('Error segmentos'); return r.json(); },
  getById: async (id)       => { const r = await fetch(`${API}/trip-segments/${id}`, { headers: h() }); if (!r.ok) throw new Error('Segmento no encontrado'); return r.json(); },
  create:  async (data)     => { const r = await fetch(`${API}/trip-segments`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear segmento'); return r.json(); },
  update:  async (id, data) => { const r = await fetch(`${API}/trip-segments/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:  async (id)       => { const r = await fetch(`${API}/trip-segments/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};