import React, { useState } from 'react';

const TripSegmentsForm = ({ onSubmit, initialData = {} }) => {
  const [segment, setSegment] = useState({
    origin: initialData.origin || '',
    destination: initialData.destination || '',
    start_time: initialData.start_time || '',
    end_time: initialData.end_time || '',
    bus_id: initialData.bus_id || '',
    driver_id: initialData.driver_id || '',
    travel_id: initialData.travel_id || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSegment({ ...segment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSend = {
      ...segment,
      bus_id: Number(segment.bus_id),
      driver_id: Number(segment.driver_id),
      travel_id: Number(segment.travel_id)
    };
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Origen</label>
          <input name="origin" value={segment.origin} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6 mb-2">
          <label>Destino</label>
          <input name="destination" value={segment.destination} onChange={handleChange} className="form-control" required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-2">
          <label>Salida (Fecha y Hora)</label>
          <input type="datetime-local" name="start_time" value={segment.start_time} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-6 mb-2">
          <label>Llegada (Fecha y Hora)</label>
          <input type="datetime-local" name="end_time" value={segment.end_time} onChange={handleChange} className="form-control" required />
        </div>
      </div>

      <hr />
      <div className="row">
        <div className="col-md-4 mb-2">
          <label>ID Bus</label>
          <input type="number" name="bus_id" value={segment.bus_id} onChange={handleChange} className="form-control" placeholder="Ej: 1" required />
        </div>
        <div className="col-md-4 mb-2">
          <label>ID Conductor</label>
          <input type="number" name="driver_id" value={segment.driver_id} onChange={handleChange} className="form-control" placeholder="Ej: 1" required />
        </div>
        <div className="col-md-4 mb-2">
          <label>ID Viaje (Travel)</label>
          <input type="number" name="travel_id" value={segment.travel_id} onChange={handleChange} className="form-control" placeholder="Ej: 1" required />
        </div>
      </div>

      <button type="submit" className="btn btn-success w-100 mt-3">Guardar Segmento de Viaje</button>
    </form>
  );
};

export default TripSegmentsForm;