import { API } from '../services/api';

const h = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

export const cloudinaryService = {
  upload: async (file) => {
    const form = new FormData();
    form.append('file', file);
    const r = await fetch(`${API}/images/upload`, { method: 'POST', headers: h(), body: form });
    if (!r.ok) throw new Error('Error al subir imagen');
    const data = await r.json();
    return data.url;
  },
  delete: async (publicId) => {
    const r = await fetch(`${API}/cloudinary/delete/${publicId}`, { method: 'DELETE', headers: h() });
    if (!r.ok) throw new Error('Error al eliminar imagen');
  },
};