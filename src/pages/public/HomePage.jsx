import Hero from "../../components/common/Hero";
import SearchBar from "../../components/common/SearchBar";
import FeaturedSection from "../../components/common/FeaturedSection";
import OffersSection from "../../components/common/OffersSection";

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <SearchBar />
      <FeaturedSection />
      <OffersSection />
    </div>
  );
}

export default HomePage;
