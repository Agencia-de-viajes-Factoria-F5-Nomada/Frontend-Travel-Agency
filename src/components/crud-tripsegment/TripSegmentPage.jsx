import { useEffect, useState } from 'react';
import { TripSegmentService } from '../../services/TripSegmentService';
import { MapPin, ArrowRight } from 'lucide-react';

const TripSegmentPage = () => {
    const [segments, setSegments] = useState([]);

    useEffect(() => { loadSegments(); }, []);

    const loadSegments = async () => {
        const data = await TripSegmentService.fetchSegments();
        setSegments(data);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-red-500" /> Segmentos de Ruta
            </h1>

            <div className="space-y-3">
                {segments.map((seg) => (
                    <div key={seg.id} className="bg-surface-800 p-4 rounded-xl border border-surface-700 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-xs text-ink-soft uppercase">Origen</p>
                                <p className="font-bold">{seg.origin}</p>
                            </div>
                            <ArrowRight className="text-surface-500" />
                            <div className="text-center">
                                <p className="text-xs text-ink-soft uppercase">Destino</p>
                                <p className="font-bold">{seg.destination}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-ink-soft italic">Duración est.</p>
                            <p className="font-mono text-brand-400">{seg.duration || 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripSegmentPage;