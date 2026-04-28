import { Link } from "react-router-dom";

function FavoritesPage() {
  return (
    <div className="favorites">
      <div className="favorites__container">
        <h1 className="favorites__title">Mis favoritos</h1>
        <div className="favorites__empty">
          <p>Aún no tienes viajes guardados como favoritos.</p>
          <Link to="/trips" className="favorites__cta">
            Explorar viajes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;
