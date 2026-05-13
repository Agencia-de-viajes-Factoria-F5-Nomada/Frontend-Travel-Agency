import { useEffect, useState } from 'react';
import { OfferService } from '../../services/OfferService';
import { Tag, Plus, Calendar } from 'lucide-react';

const OfferPage = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => { loadOffers(); }, []);

    const loadOffers = async () => {
        const data = await OfferService.fetchOffers();
        setOffers(data);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Tag className="text-yellow-500" /> Promociones y Ofertas
                </h1>
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus size={18} /> Nueva Oferta
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-surface-800 p-4 rounded-xl border border-surface-700">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{offer.title}</h3>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">
                                -{offer.discount}%
                            </span>
                        </div>
                        <p className="text-sm text-ink-soft mb-4">{offer.description}</p>
                        <div className="flex items-center gap-2 text-xs text-brand-300">
                            <Calendar size={14} /> Vence: {offer.expiryDate || 'Sin límite'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OfferPage;