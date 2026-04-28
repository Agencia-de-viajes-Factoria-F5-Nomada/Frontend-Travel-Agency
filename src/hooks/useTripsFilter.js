import { useState, useMemo } from "react";
import { MOCK_TRIPS } from "../constants/mockTrips";

export const useTripsFilter = () => {
  const [filters, setFilters] = useState({
    maxPrice: 5000,
    pensionType: "all",
    minRating: 0,
    sortBy: "rating",
  });

  const filteredTrips = useMemo(() => {
    let result = MOCK_TRIPS.filter((trip) => {
      const priceFilter = trip.price <= filters.maxPrice;
      const pensionFilter =
        filters.pensionType === "all" || trip.pensionType === filters.pensionType;
      const ratingFilter = trip.rating >= filters.minRating;
      return priceFilter && pensionFilter && ratingFilter;
    });

    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters]);

  return { filters, setFilters, filteredTrips };
};
