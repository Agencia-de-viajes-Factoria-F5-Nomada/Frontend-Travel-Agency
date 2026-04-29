import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const PUBLIC_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/trips", label: "Trips" },
  { to: "/contact", label: "Contact" },
];

const PRIVATE_LINKS = [
  { to: "/profile", label: "Profile" },
  { to: "/favorites", label: "Favorites" },
];

const ADMIN_LINKS = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/reservations", label: "Reservas" },
  { to: "/admin/destinations", label: "Destinos" },
];

const activeStyle = ({ isActive }) =>
  isActive ? { fontWeight: 700, textDecoration: "underline" } : undefined;

function NavItem({ to, label, end }) {
  return (
    <li>
      <NavLink to={to} end={end} style={activeStyle}>
        {label}
      </NavLink>
    </li>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <nav>
      <h2>Frontend Travel Agency</h2>
      <ul>
        {PUBLIC_LINKS.map((l) => (
          <NavItem key={l.to} {...l} />
        ))}
        {!user && (
          <>
            <NavItem to="/login" label="Login" />
            <NavItem to="/register" label="Register" />
          </>
        )}
        {user && (
          <>
            {PRIVATE_LINKS.map((l) => (
              <NavItem key={l.to} {...l} />
            ))}
            {isAdmin &&
              ADMIN_LINKS.map((l) => <NavItem key={l.to} {...l} />)}
            <li>
              <button type="button" className="navbar__logout" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
