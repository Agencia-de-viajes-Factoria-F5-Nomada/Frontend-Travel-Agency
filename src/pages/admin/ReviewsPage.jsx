const REVIEWS = [
  { id: 1, user: "James Wilson", destination: "Paris, Francia", score: 4.8, status: "Publicada" },
  { id: 2, user: "Sarah Johnson", destination: "Roma, Italia", score: 4.7, status: "Publicada" },
  { id: 3, user: "Emily Davis", destination: "Praga, Chequia", score: 4.6, status: "Pendiente" },
  { id: 4, user: "Laura Martinez", destination: "Bali, Indonesia", score: 4.9, status: "Publicada" },
];

function ReviewsPage() {
  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Gestion de resenas</h1>
          <p className="crud-page__subtitle">
            Revision de valoraciones publicadas por viajeros
          </p>
        </header>

        <div className="crud-table-wrapper">
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Destino</th>
                <th>Puntuacion</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {REVIEWS.map((review) => (
                <tr key={review.id}>
                  <td>#{review.id.toString().padStart(3, "0")}</td>
                  <td>{review.user}</td>
                  <td>{review.destination}</td>
                  <td>{review.score}</td>
                  <td>
                    <span
                      className={
                        review.status === "Publicada"
                          ? "crud-badge crud-badge--status-active"
                          : "crud-badge crud-badge--status-inactive"
                      }
                    >
                      {review.status}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="crud-table__btn crud-table__btn--edit">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
