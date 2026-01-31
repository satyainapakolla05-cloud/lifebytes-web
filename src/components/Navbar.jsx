import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">LifeBytes</Link>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
        </div>
      </div>
    </nav>
  );
}
