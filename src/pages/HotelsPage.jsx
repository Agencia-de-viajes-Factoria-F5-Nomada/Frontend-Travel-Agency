import React, { useEffect, useState } from 'react'; // Añadimos useState
import { HotelService } from '../services/HotelService';
import { useApi } from '../hooks/useApi';
import { Edit, Trash2, X, Building2, MapPin, Star, DollarSign } from 'lucide-react';

const HotelesPage = () => {
    const { data: hotels, loading, error, request: fetchHotels } = useApi(HotelService.fetchHoteles);
    
    // Estado para controlar la visibilidad del formulario
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Estado para los datos del nuevo hotel (según tu MySQL)
    const [newHotel, setNewHotel] = useState({
        name: '',
        address: '',
        city: '',
        stars: 5,
        capacity: '',
        full_board_price: ''
    });

    useEffect(() => {
        fetchHotels();
    }, []);

    const handleChange = (e) => {
        setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await HotelService.createHotel(newHotel); // Asegúrate de tener este método en tu Service
            setIsFormOpen(false);
            fetchHotels(); // Recargar la lista
            setNewHotel({ name: '', address: '', city: '', stars: 5, capacity: '', full_board_price: '' });
        } catch (err) {
            console.error("Error al guardar:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Deseas eliminar este hotel?")) {
            try {
                await HotelService.deleteHotel(id);
                fetchHotels();
            } catch (err) {
                console.error("Error al eliminar:", err);
            }
        }
    };

    if (loading) return <div className="p-10 text-center text-[#00f2ff] bg-[#080c14] min-h-screen">Cargando...</div>;
    if (error) return <div className="p-10 text-center text-red-500 bg-[#080c14] min-h-screen">Error de conexión con el backend.</div>;

    return (
        <div className="p-8 bg-[#080c14] min-h-screen text-white font-['Urbanist'] relative">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Administración de <span className="text-[#00f2ff]">Hoteles</span>
                </h1>
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="bg-[#4fb3af] hover:bg-[#3d8e8b] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg"
                >
                    + Añadir Hotel
                </button>
            </div>

            {/* Modal de Formulario (Se muestra solo si isFormOpen es true) */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0a111e] w-full max-w-lg rounded-[40px] shadow-2xl border border-white/10 relative overflow-hidden">
                        <div className="p-8 text-center border-b border-white/5 relative">
                            <button onClick={() => setIsFormOpen(false)} className="absolute right-8 top-8 text-white/30 hover:text-white">
                                <X size={24} />
                            </button>
                            <p className="text-[#94a3b8] uppercase tracking-[0.3em] text-[10px] font-bold mb-2">Nuevo Registro</p>
                            <h2 className="text-3xl font-bold text-[#00f2ff] flex items-center justify-center gap-3">
                                <Building2 size={32} /> Hotel
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <input name="name" placeholder="Nombre del Hotel" className="w-full bg-[#111827] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#00f2ff]/50" onChange={handleChange} required />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="address" placeholder="Dirección" className="w-full bg-[#111827] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none" onChange={handleChange} />
                                <input name="city" placeholder="Ciudad" className="w-full bg-[#111827] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none" onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#111827] border border-white/5 rounded-2xl p-3">
                                    <label className="text-[10px] text-[#94a3b8] block">Estrellas</label>
                                    <select name="stars" className="bg-transparent text-white w-full outline-none" onChange={handleChange}>
                                        {[5,4,3,2,1].map(n => <option key={n} value={n} className="bg-[#111827]">{n} Estrellas</option>)}
                                    </select>
                                </div>
                                <div className="bg-[#111827] border border-white/5 rounded-2xl p-3">
                                    <label className="text-[10px] text-[#94a3b8] block">Precio PC (€)</label>
                                    <input name="full_board_price" type="number" step="0.01" className="bg-transparent text-white w-full outline-none" placeholder="0.00" onChange={handleChange} />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-[#4fb3af] hover:bg-[#3d8e8b] text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all">
                                Confirmar Registro
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabla (la misma que ya tienes) */}
            <div className="bg-[#111827] rounded-3xl p-6 shadow-2xl border border-white/5">
                <table className="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-[#94a3b8] text-xs uppercase tracking-[0.2em] font-bold">
                            <th className="px-6 py-4">Nombre del Hotel</th>
                            <th className="px-6 py-4">Dirección</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels?.map((hotel) => (
                            <tr key={hotel.id} className="group">
                                <td className="bg-[#1f2937] px-6 py-5 rounded-l-2xl border-y border-l border-white/5 font-semibold">{hotel.name}</td>
                                <td className="bg-[#1f2937] px-6 py-5 border-y border-white/5 text-[#94a3b8]">{hotel.address}</td>
                                <td className="bg-[#1f2937] px-6 py-5 text-center rounded-r-2xl border-y border-r border-white/5">
                                    <div className="flex justify-center gap-6">
                                        <button title="Editar" className="text-[#00f2ff] hover:scale-110 transition-transform"><Edit size={22} /></button>
                                        <button onClick={() => handleDelete(hotel.id)} title="Eliminar" className="text-[#f87171] hover:scale-110 transition-transform"><Trash2 size={22} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HotelesPage;