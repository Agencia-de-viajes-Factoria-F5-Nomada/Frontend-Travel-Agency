import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const busService = {
  getAll:  async ()     => { const r = await fetch(`${API}/buses`, { headers: h() }); if (!r.ok) return []; const data = await r.json(); return Array.isArray(data) ? data : (data.content || []); },
  getById: async (id)   => { const r = await fetch(`${API}/buses/${id}`, { headers: h() }); if (!r.ok) throw new Error('Bus no encontrado'); return r.json(); },
  create:  async (data) => { const r = await fetch(`${API}/buses`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear bus'); return r.json(); },
  update:  async (id, data) => { const r = await fetch(`${API}/buses/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:  async (id)   => { const r = await fetch(`${API}/buses/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};