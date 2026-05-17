import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const userService = {
  getAll:    async ()     => { const r = await fetch(`${API}/users`, { headers: h() }); if (!r.ok) throw new Error('Error usuarios'); return r.json(); },
  getPage:   async (page = 0, size = 10) => { const r = await fetch(`${API}/users?page=${page}&size=${size}`, { headers: h() }); if (!r.ok) throw new Error('Error usuarios'); return r.json(); },
  getById:   async (id)   => { const r = await fetch(`${API}/users/${id}`, { headers: h() }); if (!r.ok) throw new Error('Usuario no encontrado'); return r.json(); },
  getActive: async ()     => { const r = await fetch(`${API}/users/activos`, { headers: h() }); if (!r.ok) throw new Error('Error'); return r.json(); },
  create:    async (data) => { const r = await fetch(`${API}/users`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear usuario'); return r.json(); },
  update:    async (id, data) => { const r = await fetch(`${API}/users/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:    async (id)   => { const r = await fetch(`${API}/users/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};