import TripsHeader from "../../components/common/TripsHeader";
import FiltersPanel from "../../components/forms/FiltersPanel";
import TripGrid from "../../components/cards/TripGrid";
import { useTripsFilter } from "../../hooks/useTripsFilter";

function TripsPage() {
  const { filters, setFilters, filteredTrips } = useTripsFilter();

  return (
    <div className="trips-page">
      <TripsHeader resultCount={filteredTrips.length} />

      <div className="trips-page__container">
        <FiltersPanel filters={filters} onFilterChange={setFilters} />
        <section className="trips-page__content">
          <TripGrid trips={filteredTrips} />
        </section>
      </div>
    </div>
  );
}

export default TripsPage;
