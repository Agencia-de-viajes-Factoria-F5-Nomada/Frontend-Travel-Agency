import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const PUBLIC_LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/destinations", label: "Destinos" },
  { to: "/offers", label: "Ofertas" },
  { to: "/experiences", label: "Experiencias" },
  { to: "/about", label: "Nosotros" },
];

const PRIVATE_LINKS = [
  { to: "/profile", label: "Perfil" },
  { to: "/favorites", label: "Favoritos" },
];

const activeStyle = ({ isActive }) =>
  isActive ? "navbar__link navbar__link--active" : "navbar__link";

function NavItem({ to, label, end }) {
  return (
    <li className="navbar__item">
      <NavLink to={to} end={end} className={activeStyle}>
        {label}
      </NavLink>
    </li>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        <span className="navbar__mark">TA</span>
        <span className="navbar__brand-text">Travel Agency</span>
      </NavLink>
      <ul className="navbar__links">
        {PUBLIC_LINKS.map((l) => (
          <NavItem key={l.to} {...l} />
        ))}
      </ul>
      <ul className="navbar__actions">
        {!user && (
          <>
            <NavItem to="/login" label="Login" />
            <li className="navbar__item">
              <NavLink to="/register" className="navbar__button-link">
                Registro
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            {PRIVATE_LINKS.map((l) => (
              <NavItem key={l.to} {...l} />
            ))}
            {isAdmin && <NavItem to="/admin/dashboard" label="Admin" />}
            <li className="navbar__item">
              <button type="button" className="navbar__logout" onClick={logout}>
                Salir
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
