import { FEATURED_OFFERS } from "../../constants/mockOffers";

function OffersPage() {
  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Gestion de ofertas</h1>
          <p className="crud-page__subtitle">
            Promociones visibles para los viajeros
          </p>
        </header>

        <div className="crud-table-wrapper">
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Oferta</th>
                <th>Descuento</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {FEATURED_OFFERS.map((offer) => (
                <tr key={offer.id}>
                  <td>#{offer.id.toString().padStart(3, "0")}</td>
                  <td>{offer.title}</td>
                  <td>{offer.discount}%</td>
                  <td>
                    <span className="crud-badge crud-badge--status-active">Activa</span>
                  </td>
                  <td>
                    <button type="button" className="crud-table__btn crud-table__btn--edit">
                      Editar
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

export default OffersPage;
