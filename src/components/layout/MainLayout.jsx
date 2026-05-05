import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ADMIN_LINKS = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Usuarios" },
  { to: "/admin/hotels", label: "Hoteles" },
  { to: "/admin/buses", label: "Autobuses" },
  { to: "/admin/drivers", label: "Conductores" },
  { to: "/admin/reservations", label: "Reservas" },
  { to: "/admin/destinations", label: "Destinos" },
];

const navClass = ({ isActive }) =>
  isActive ? "app-sidebar__link app-sidebar__link--active" : "app-sidebar__link";

function MainLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const showSidebar = user?.role === "admin" && location.pathname.startsWith("/admin");

  return (
    <div className={showSidebar ? "app-shell app-shell--admin" : "app-shell"}>
      <Navbar />
      <div className="app-shell__body">
        {showSidebar && (
          <aside className="app-sidebar" aria-label="Administracion">
            <div className="app-sidebar__panel">
              <span className="app-sidebar__eyebrow">Panel administrativo</span>
              <nav className="app-sidebar__nav">
                {ADMIN_LINKS.map((link) => (
                  <NavLink key={link.to} to={link.to} className={navClass}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>
        )}
        <main className="app-main">
        <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
