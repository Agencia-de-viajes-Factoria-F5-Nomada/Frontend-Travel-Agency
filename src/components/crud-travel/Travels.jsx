import React, { useState, useEffect } from 'react';

const Travels = () => {
    const [travels, setTravels] = useState([]);
    const [formData, setFormData] = useState({
        destination: '',
        price: '',
        departureDate: '',
        availableSeats: '',
        onSale: false
    });

    useEffect(() => {
        fetchTravels();
    }, []);

    const fetchTravels = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/travels');
            const data = await response.json();
            setTravels(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/travels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormData({ destination: '', price: '', departureDate: '', availableSeats: '', onSale: false });
                fetchTravels();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/travels/${id}`, {
                method: 'DELETE'
            });
            fetchTravels();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#001f3f]">Panel de Viajes</h2>
            
            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow">
                <input 
                    name="destination" 
                    value={formData.destination} 
                    onChange={handleChange} 
                    placeholder="Destino"
                    className="border p-2 rounded"
                    required
                />
                <input 
                    name="price" 
                    type="number"
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="Precio"
                    className="border p-2 rounded"
                    required
                />
                <input 
                    name="departureDate" 
                    type="date"
                    value={formData.departureDate} 
                    onChange={handleChange} 
                    className="border p-2 rounded"
                    required
                />
                <input 
                    name="availableSeats" 
                    type="number"
                    value={formData.availableSeats} 
                    onChange={handleChange} 
                    placeholder="Asientos"
                    className="border p-2 rounded"
                    required
                />
                <div className="flex items-center gap-2">
                    <input 
                        name="onSale" 
                        type="checkbox"
                        checked={formData.onSale} 
                        onChange={handleChange} 
                    />
                    <label>¿Está en oferta?</label>
                </div>
                <button type="submit" className="col-span-2 bg-[#001f3f] text-white p-2 rounded hover:bg-blue-900">
                    Crear Viaje
                </button>
            </form>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-[#001f3f] text-white">
                        <tr>
                            <th className="px-6 py-4 font-medium">Destino</th>
                            <th className="px-6 py-4 font-medium">Precio</th>
                            <th className="px-6 py-4 font-medium">Fecha</th>
                            <th className="px-6 py-4 font-medium">Asientos</th>
                            <th className="px-6 py-4 font-medium">Estado</th>
                            <th className="px-6 py-4 font-medium text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {travels.map((travel) => (
                            <tr key={travel.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{travel.destination}</td>
                                <td className="px-6 py-4">{travel.price}</td>
                                <td className="px-6 py-4">{travel.departureDate}</td>
                                <td className="px-6 py-4">{travel.availableSeats}</td>
                                <td className="px-6 py-4">
                                    {travel.onSale ? (
                                        <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">En Oferta</span>
                                    ) : (
                                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">Normal</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => handleDelete(travel.id)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Travels;