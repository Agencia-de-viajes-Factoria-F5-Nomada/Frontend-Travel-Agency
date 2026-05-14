import { useEffect, useState } from 'react';
import { BookingService } from '../services/bookingService';
import { Trash2, Edit3, X, Calendar, User, ShieldCheck, Hash, Users } from 'lucide-react';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    // Estado inicial con los atributos exactos de tu base de datos
    const [formData, setFormData] = useState({
        bought_date: new Date().toISOString().split('T')[0],
        total_price: '',
        type_board: 'FULL',
        is_group: false,
        employee_id: '',
        travels_id: ''
    });

    const loadData = async () => {
        try {
            const data = await BookingService.getAll();
            setBookings(data || []);
        } catch (error) { console.error("Error cargando tabla:", error); }
    };

    useEffect(() => { loadData(); }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    // FUNCIÓN CLAVE: Envía los datos y refresca la tabla
    const handleConfirmarRegistro = async (e) => {
        e.preventDefault();
        try {
            // Convertimos a los tipos de datos que espera Java (Numbers)
            const dataToSave = {
                ...formData,
                total_price: parseFloat(formData.total_price),
                employee_id: parseInt(formData.employee_id),
                travels_id: parseInt(formData.travels_id)
            };

            await BookingService.create(dataToSave);
            
            // Si sale bien:
            setShowModal(false); // Cierra el formulario
            loadData();         // Vuelve a llamar a la base de datos para ver el nuevo registro
            
            // Limpiar el formulario para la próxima vez
            setFormData({
                bought_date: new Date().toISOString().split('T')[0],
                total_price: '',
                type_board: 'FULL',
                is_group: false,
                employee_id: '',
                travels_id: ''
            });
        } catch (error) {
            alert("Error al guardar. Revisa que el Backend esté encendido.");
            console.error(error);
        }
    };

    return (
        <div className="w-full text-white p-6">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');
                  .font-nomada { font-family: 'Playfair Display', serif; }
                  .glow-card { box-shadow: 0 0 40px rgba(109, 179, 209, 0.15); border: 1px solid rgba(109, 179, 209, 0.1); }
                `}
            </style>

            <div className="flex justify-between items-center mb-10">
                <h1 className="text-5xl font-nomada tracking-tight">Reservas</h1>
                <button 
                    onClick={() => setShowModal(true)}
                    className="px-8 py-3 bg-[#6db3d1] text-[#00162b] rounded-full text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white transition-all shadow-lg"
                >
                    + NUEVA RESERVA
                </button>
            </div>

            {/* TABLA QUE MUESTRA LOS DATOS */}
            <div className="bg-[#002a4d]/20 rounded-[2.5rem] overflow-hidden border border-white/5 backdrop-blur-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#6db3d1] text-[#00162b]">
                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em]">ID</th>
                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em]">Detalle</th>
                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em]">Fecha</th>
                            <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em]">Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.booking_id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                                <td className="px-6 py-6 font-mono text-[10px] text-blue-400/30">TR-{b.booking_id}</td>
                                <td className="px-6 py-6">
                                    <div className="font-nomada text-lg italic">Viaje #{b.travels_id}</div>
                                    <div className="text-[8px] text-[#6db3d1] font-bold opacity-40">AGENTE {b.employee_id}</div>
                                </td>
                                <td className="px-6 py-6 text-xs text-white/40">{b.bought_date}</td>
                                <td className="px-6 py-6 font-nomada text-2xl">{b.total_price}€</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL / FORMULARIO PARA METER DATOS */}
            {showModal && (
                <div className="fixed inset-0 bg-[#000b14]/90 backdrop-blur-sm flex items-center justify-center z-[100]">
                    <form onSubmit={handleConfirmarRegistro} className="glow-card bg-[#001b33] rounded-[3rem] w-full max-w-sm p-10 relative">
                        
                        <div className="text-center mb-8">
                            <h2 className="text-[9px] tracking-[0.5em] text-[#6db3d1] font-bold uppercase mb-4 opacity-60">Nuevo Registro</h2>
                            <div className="flex items-center justify-center gap-2 border-b border-white/5 pb-4">
                                <input 
                                    name="total_price" 
                                    type="number" 
                                    step="0.01"
                                    placeholder="0.00" 
                                    value={formData.total_price}
                                    onChange={handleChange}
                                    className="bg-transparent text-5xl font-nomada text-center outline-none w-32" 
                                    required
                                />
                                <span className="text-xl font-nomada text-white/20 pt-4">EUR</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="border-b border-white/5 pb-2">
                                    <label className="flex items-center gap-2 text-[7px] font-black text-[#6db3d1] uppercase mb-2"><Calendar size={10}/> Fecha</label>
                                    <input type="date" name="bought_date" value={formData.bought_date} onChange={handleChange} className="bg-transparent text-[11px] font-nomada w-full outline-none" />
                                </div>
                                <div className="border-b border-white/5 pb-2">
                                    <label className="flex items-center gap-2 text-[7px] font-black text-[#6db3d1] uppercase mb-2"><ShieldCheck size={10}/> Pensión</label>
                                    <select name="type_board" value={formData.type_board} onChange={handleChange} className="bg-transparent text-[11px] font-nomada w-full outline-none">
                                        <option value="FULL" className="bg-[#001b33]">COMPLETA</option>
                                        <option value="HALF" className="bg-[#001b33]">MEDIA</option>
                                    </select>
                                </div>
                                <div className="border-b border-white/5 pb-2">
                                    <label className="flex items-center gap-2 text-[7px] font-black text-[#6db3d1] uppercase mb-2"><Hash size={10}/> ID Viaje</label>
                                    <input type="number" name="travels_id" value={formData.travels_id} onChange={handleChange} placeholder="105" className="bg-transparent text-[11px] font-nomada w-full outline-none" required />
                                </div>
                                <div className="border-b border-white/5 pb-2">
                                    <label className="flex items-center gap-2 text-[7px] font-black text-[#6db3d1] uppercase mb-2"><User size={10}/> ID Agente</label>
                                    <input type="number" name="employee_id" value={formData.employee_id} onChange={handleChange} placeholder="22" className="bg-transparent text-[11px] font-nomada w-full outline-none" required />
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-white/[0.02] rounded-xl border border-white/5">
                                <span className="text-[8px] font-bold text-white/30 tracking-widest uppercase">¿Reserva Grupal?</span>
                                <input type="checkbox" name="is_group" checked={formData.is_group} onChange={handleChange} className="accent-[#6db3d1] w-3 h-3" />
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-[#6db3d1] text-[#00162b] py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] mt-4 hover:bg-white shadow-lg transition-all"
                            >
                                CONFIRMAR REGISTRO
                            </button>
                        </div>

                        <button type="button" onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-white/10 hover:text-white">
                            <X size={16} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default BookingsPage;