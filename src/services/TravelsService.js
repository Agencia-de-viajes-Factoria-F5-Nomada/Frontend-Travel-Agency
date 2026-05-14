import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const travelService = {
  getAll:      async ()     => { const r = await fetch(`${API}/travels`); if (!r.ok) throw new Error('Error viajes'); return r.json(); },
  getById:     async (id)   => { const r = await fetch(`${API}/travels/${id}`); if (!r.ok) throw new Error('Viaje no encontrado'); return r.json(); },
  getAvailable:async ()     => { const r = await fetch(`${API}/travels/available`); if (!r.ok) throw new Error('Error'); return r.json(); },
  getOnSale:   async ()     => { const r = await fetch(`${API}/travels/sale`); if (!r.ok) throw new Error('Error'); return r.json(); },
  create:      async (data) => { const r = await fetch(`${API}/travels`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear viaje'); return r.json(); },
  update:      async (id, data) => { const r = await fetch(`${API}/travels/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:      async (id)   => { const r = await fetch(`${API}/travels/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};