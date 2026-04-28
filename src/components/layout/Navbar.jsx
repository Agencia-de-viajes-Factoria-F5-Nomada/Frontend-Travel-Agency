import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <h2>Frontend Travel Agency</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/trips">Trips</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {user && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            {user.role === "admin" && (
              <li><Link to="/admin/dashboard">Admin</Link></li>
            )}
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
