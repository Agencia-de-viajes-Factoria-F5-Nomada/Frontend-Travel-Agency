import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const driverService = {
  getAll:    async ()     => { const r = await fetch(`${API}/drivers`, { headers: h() }); if (!r.ok) throw new Error('Error conductores'); return r.json(); },
  getPage:   async (page = 0, size = 10) => { const r = await fetch(`${API}/drivers?page=${page}&size=${size}`, { headers: h() }); if (!r.ok) throw new Error('Error conductores'); return r.json(); },
  getById:   async (id)   => { const r = await fetch(`${API}/drivers/${id}`, { headers: h() }); if (!r.ok) throw new Error('Conductor no encontrado'); return r.json(); },
  getActive: async ()     => { const r = await fetch(`${API}/drivers/activos`, { headers: h() }); if (!r.ok) throw new Error('Error'); return r.json(); },
  create:    async (data) => { const r = await fetch(`${API}/drivers`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear conductor'); return r.json(); },
  update:    async (id, data) => { const r = await fetch(`${API}/drivers/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:    async (id)   => { const r = await fetch(`${API}/drivers/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};