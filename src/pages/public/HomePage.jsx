import Hero from "../../components/common/Hero";
import SearchBar from "../../components/common/SearchBar";
import SectionTitle from "../../components/common/SectionTitle";
import DestinationCard from "../../components/cards/DestinationCard";
import OfferCard from "../../components/cards/OfferCard";

const FEATURED_DESTINATIONS = [
  {
    id: 1,
    name: "París, Francia",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    price: 1200,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Tokio, Japón",
    image:
      "https://images.unsplash.com/photo-1524631049256-7cc155b1830d?w=400&h=300&fit=crop",
    price: 1500,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Nueva York, USA",
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=400&h=300&fit=crop",
    price: 950,
    rating: 4.7,
  },
];

const FEATURED_OFFERS = [
  {
    id: 1,
    title: "Vuelo + Hotel",
    description: "Paquetes completos con los mejores destinos",
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Escapada de Lujo",
    description: "Resorts de 5 estrellas a precios especiales",
    discount: 30,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Tours Guiados",
    description: "Experiencias completas con guía profesional",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab7?w=400&h=300&fit=crop",
  },
];

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <SearchBar />

      <section className="home-page__section destinations-section">
        <div className="home-page__container">
          <SectionTitle
            title="Destinos Destacados"
            subtitle="Descubre los lugares más populares entre nuestros viajeros"
          />
          <div className="destinations-grid">
            {FEATURED_DESTINATIONS.map((destination) => (
              <DestinationCard
                key={destination.id}
                {...destination}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-page__section offers-section">
        <div className="home-page__container">
          <SectionTitle
            title="Ofertas Destacadas"
            subtitle="Aprovecha nuestras mejores promociones"
          />
          <div className="offers-grid">
            {FEATURED_OFFERS.map((offer) => (
              <OfferCard
                key={offer.id}
                {...offer}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
