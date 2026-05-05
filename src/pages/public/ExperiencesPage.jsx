import { Link } from "react-router-dom";
import { FEATURED_EXPERIENCES } from "../../constants/mockExperiences";

function ExperiencesPage() {
  return (
    <section className="offers-section">
      <div className="offers-section__container">
        <h1 className="offers-section__title">Experiencias</h1>
        <p className="offers-section__subtitle">
          Actividades pensadas para completar cada destino con momentos memorables
        </p>
        <div className="offers-section__grid">
          {FEATURED_EXPERIENCES.map((experience) => (
            <article className="offer-card" key={experience.id}>
              <div className="offer-card__image">
                <img src={experience.image} alt={experience.title} />
                <span className="offer-card__badge">{experience.duration}</span>
              </div>
              <div className="offer-card__content">
                <h2 className="offer-card__title">{experience.title}</h2>
                <p className="offer-card__description">{experience.description}</p>
                <p className="trip-card__price">Desde {experience.price} EUR</p>
              </div>
              <Link to="/trips" className="offer-card__link">
                Ver viajes
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperiencesPage;
