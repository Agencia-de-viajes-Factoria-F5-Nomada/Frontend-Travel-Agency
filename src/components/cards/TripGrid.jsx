import TripCard from "./TripCard";

function TripGrid({ trips }) {
  if (trips.length === 0) {
    return (
      <div className="trip-grid__empty">
        <p>No hay viajes que coincidan con los filtros seleccionados</p>
      </div>
    );
  }

  return (
    <div className="trip-grid">
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} />
      ))}
    </div>
  );
}

export default TripGrid;
