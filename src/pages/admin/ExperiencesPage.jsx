import { FEATURED_EXPERIENCES } from "../../constants/mockExperiences";

function ExperiencesPage() {
  return (
    <div className="crud-page">
      <div className="crud-page__container">
        <header className="crud-page__header">
          <h1 className="crud-page__title">Gestion de experiencias</h1>
          <p className="crud-page__subtitle">
            Actividades complementarias para cada destino
          </p>
        </header>

        <div className="crud-table-wrapper">
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Experiencia</th>
                <th>Duracion</th>
                <th>Precio desde</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {FEATURED_EXPERIENCES.map((experience) => (
                <tr key={experience.id}>
                  <td>#{experience.id.toString().padStart(3, "0")}</td>
                  <td>{experience.title}</td>
                  <td>{experience.duration}</td>
                  <td>{experience.price} EUR</td>
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

export default ExperiencesPage;
