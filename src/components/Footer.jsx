import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>LifeBytes</h3>
          <p>
            Short stories. Deep meanings.  
            Thoughts that stay with you.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} LifeBytes · All rights reserved
      </div>
    </footer>
  );
}
