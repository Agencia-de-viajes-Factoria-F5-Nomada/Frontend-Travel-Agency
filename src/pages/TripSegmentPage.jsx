import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Map, Plus, X, Trash2, MapPin } from 'lucide-react';

const TripSegmentPage = () => {
  // Nota: Asegúrate de tener TripSegmentService creado o usa uno genérico por ahora
  const [segments, setSegments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Map className="text-brand-500" /> Segmentos de Viaje
          </h1>
          <p className="text-ink-soft">Configura las rutas y tramos del sistema.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-brand-500 px-5 py-2.5 font-semibold text-white hover:bg-brand-600 transition-all flex items-center gap-2"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? 'Cancelar' : 'Nuevo Segmento'}
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-brand-500/30 bg-surface-900 p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold text-white mb-4">Añadir Tramo</h2>
          <div className="text-ink-soft italic">Formulario en desarrollo...</div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {segments.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-surface-700 p-12 text-center">
            <MapPin className="mx-auto text-surface-600 mb-4" size={48} />
            <p className="text-ink-muted">No hay segmentos configurados todavía.</p>
          </div>
        ) : (
          <div className="bg-surface-900 rounded-2xl border border-surface-700 overflow-hidden">
            {/* Aquí iría el mapeo de los segmentos cuando tengas datos */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripSegmentPage;