import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const offersService = {
  getAll:  async ()         => { const r = await fetch(`${API}/offers`, { headers: h() }); if (!r.ok) throw new Error('Error ofertas'); return r.json(); },
  getPage: async (page = 0, size = 10) => { const r = await fetch(`${API}/offers?page=${page}&size=${size}`, { headers: h() }); if (!r.ok) throw new Error('Error ofertas'); return r.json(); },
  getById: async (id)       => { const r = await fetch(`${API}/offers/${id}`, { headers: h() }); if (!r.ok) throw new Error('Oferta no encontrada'); return r.json(); },
  create:  async (data)     => { const r = await fetch(`${API}/offers`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear oferta'); return r.json(); },
  update:  async (id, data) => { const r = await fetch(`${API}/offers/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:  async (id)       => { const r = await fetch(`${API}/offers/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};