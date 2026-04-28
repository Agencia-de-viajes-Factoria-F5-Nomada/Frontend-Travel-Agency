import { useState, useMemo } from "react";
import FiltersPanel from "../../components/forms/FiltersPanel";
import TripCard from "../../components/cards/TripCard";
import TripsHeader from "../../components/common/TripsHeader";

const MOCK_TRIPS = [
  {
    id: 1,
    destination: "París, Francia",
    description: "Descubre la ciudad del amor con visitas a la Torre Eiffel y Museo del Louvre",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=300&fit=crop",
    price: 1200,
    rating: 4.8,
    pensionType: "media",
  },
  {
    id: 2,
    destination: "Tokio, Japón",
    description: "Experimenta la cultura japonesa con templos antiguos y modernos rascacielos",
    image: "https://images.unsplash.com/photo-1524631049256-7cc155b1830d?w=500&h=300&fit=crop",
    price: 1500,
    rating: 4.9,
    pensionType: "completa",
  },
  {
    id: 3,
    destination: "Barcelona, España",
    description: "Visita la modernista Barcelona con la Sagrada Familia y Park Güell",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=500&h=300&fit=crop",
    price: 850,
    rating: 4.6,
    pensionType: "media",
  },
  {
    id: 4,
    destination: "Nueva York, USA",
    description: "Vive el ritmo de Nueva York con Times Square, Central Park y Broadway",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=500&h=300&fit=crop",
    price: 950,
    rating: 4.7,
    pensionType: "completa",
  },
  {
    id: 5,
    destination: "Roma, Italia",
    description: "Explora la historia en el Coliseo, Vaticano y las fuentes de Roma",
    image: "https://images.unsplash.com/photo-1552832860-cfb67165eaf0?w=500&h=300&fit=crop",
    price: 1100,
    rating: 4.8,
    pensionType: "media",
  },
  {
    id: 6,
    destination: "Ámsterdam, Holanda",
    description: "Navega por los canales de Ámsterdam y visita sus famosos museos",
    image: "https://images.unsplash.com/photo-1594422409212-5ba8f3caa94f?w=500&h=300&fit=crop",
    price: 900,
    rating: 4.5,
    pensionType: "completa",
  },
  {
    id: 7,
    destination: "Bangkok, Tailandia",
    description: "Sumérgete en la cultura tailandesa con templos brillantes y mercados flotantes",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop",
    price: 750,
    rating: 4.7,
    pensionType: "media",
  },
  {
    id: 8,
    destination: "Dubái, Emiratos Árabes",
    description: "Lujo y modernidad en Dubái con el Burj Khalifa y playas de arena blanca",
    image: "https://images.unsplash.com/photo-1512453375869-cac897acb932?w=500&h=300&fit=crop",
    price: 1400,
    rating: 4.6,
    pensionType: "completa",
  },
];

function TripsPage() {
  const [filters, setFilters] = useState({
    maxPrice: 5000,
    pensionType: "all",
    minRating: 0,
    sortBy: "rating",
  });

  const filteredAndSortedTrips = useMemo(() => {
    let result = MOCK_TRIPS.filter((trip) => {
      const priceFilter = trip.price <= filters.maxPrice;
      const pensionFilter =
        filters.pensionType === "all" || trip.pensionType === filters.pensionType;
      const ratingFilter = trip.rating >= filters.minRating;

      return priceFilter && pensionFilter && ratingFilter;
    });

    // Sort
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  return (
    <div className="trips-page">
      <TripsHeader resultCount={filteredAndSortedTrips.length} />

      <div className="trips-page__container">
        <FiltersPanel filters={filters} onFilterChange={setFilters} />

        <section className="trips-page__content">
          <div className="trips-grid">
            {filteredAndSortedTrips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>

          {filteredAndSortedTrips.length === 0 && (
            <div className="trips-page__empty">
              <p>No hay viajes que coincidan con los filtros seleccionados</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TripsPage;
