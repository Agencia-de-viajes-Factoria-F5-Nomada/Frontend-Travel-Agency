import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Explora nuevos destinos</h1>
        <p className="hero__subtitle">
          Descubre los lugares más hermosos del mundo con los mejores precios
        </p>
        <Link to="/trips" className="hero__cta">
          Ver destinos
        </Link>
      </div>
    </section>
  );
}

export default Hero;
