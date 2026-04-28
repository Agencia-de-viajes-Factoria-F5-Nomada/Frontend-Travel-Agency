import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    people: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/trips");
  };

  return (
    <section className="search-bar">
      <div className="search-bar__container">
        <form className="search-bar__form" onSubmit={handleSubmit}>
          <div className="search-bar__field">
            <label htmlFor="destination">Destino</label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="¿A dónde deseas ir?"
              value={formData.destination}
              onChange={handleChange}
            />
          </div>

          <div className="search-bar__field">
            <label htmlFor="startDate">Fecha inicio</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="search-bar__field">
            <label htmlFor="endDate">Fecha fin</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="search-bar__field">
            <label htmlFor="people">Personas</label>
            <input
              type="number"
              id="people"
              name="people"
              min="1"
              max="10"
              value={formData.people}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="search-bar__button">
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
