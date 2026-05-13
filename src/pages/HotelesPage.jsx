import React, { useEffect } from 'react';
import { HotelService } from '../services/HotelService';
import { useApi } from '../hooks/useApi';

const HotelesPage = () => {
    const { data: hotels, loading, error, request: fetchHotels } = useApi(HotelService.fetchHoteles);

    useEffect(() => {
        fetchHotels();
    }, []);

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

    if (loading) return <div className="p-10 text-center text-blue-600">Cargando datos del servidor...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error de conexión con el backend.</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Administración de Hoteles</h1>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    + Añadir Hotel
                </button>
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-3 font-semibold text-gray-700">Nombre</th>
                        <th className="p-3 font-semibold text-gray-700">Dirección</th>
                        <th className="p-3 font-semibold text-gray-700 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels?.map((hotel) => (
                        <tr key={hotel.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{hotel.name}</td>
                            <td className="p-3">{hotel.address}</td>
                            <td className="p-3 text-center">
                                <button className="text-blue-600 mr-4 hover:underline">Editar</button>
                                <button 
                                    onClick={() => handleDelete(hotel.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {hotels?.length === 0 && (
                <p className="text-center py-10 text-gray-500">No hay hoteles registrados.</p>
            )}
        </div>
    );
};

export default HotelesPage;