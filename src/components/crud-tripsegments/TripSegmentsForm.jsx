import { useEffect, useState } from 'react';
import { TripSegmentService } from '../../services/TripSegmentService';
import { MapPin, ArrowRight, Plus, X } from 'lucide-react';
import TripSegmentsForm from './TripSegmentsForm'; // Asegúrate de que el Form esté en la misma carpeta

const TripSegmentPage = () => {
    const [segments, setSegments] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { loadSegments(); }, []);

    const loadSegments = async () => {
        const data = await TripSegmentService.fetchSegments();
        setSegments(data);
    };

    const handleCreate = async (data) => {
        await TripSegmentService.createSegment(data);
        setShowForm(false);
        loadSegments();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <MapPin className="text-red-500" /> Segmentos de Ruta
                </h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Cerrar' : 'Nuevo Segmento'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-surface-800 p-4 rounded-xl border border-brand-500/30">
                    <h2 className="text-lg font-semibold mb-4 text-brand-400">Registrar Nuevo Tramo</h2>
                    <TripSegmentsForm onSubmit={handleCreate} />
                </div>
            )}

            <div className="grid gap-3">
                {segments.map((seg) => (
                    <div key={seg.id} className="bg-surface-800 p-4 rounded-xl border border-surface-700 flex items-center justify-between hover:border-surface-500 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="min-w-[100px]">
                                <p className="text-[10px] text-ink-soft uppercase tracking-wider">Origen</p>
                                <p className="font-bold text-white">{seg.origin}</p>
                            </div>
                            <ArrowRight className="text-brand-500" size={20} />
                            <div className="min-w-[100px]">
                                <p className="text-[10px] text-ink-soft uppercase tracking-wider">Destino</p>
                                <p className="font-bold text-white">{seg.destination}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-ink-soft uppercase tracking-wider font-mono">ID Viaje: {seg.travel_id}</p>
                            <p className="text-brand-400 font-bold">{seg.start_time?.split('T')[1] || '00:00'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripSegmentPage;