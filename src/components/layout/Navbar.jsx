import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Frontend Travel Agency</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/trips">Trips</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/admin/dashboard">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
