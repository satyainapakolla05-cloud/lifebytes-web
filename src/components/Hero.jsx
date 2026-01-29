import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Small Stories.<br />
          <span>Big Meanings.</span>
        </h1>

        <p>
          One thought can change your life.  
          LifeBytes brings short, powerful stories for modern minds.
        </p>

        <div className="hero-buttons">
          <Link to="/blogs" className="btn primary">
            Read Blogs
          </Link>
          <Link to="/about" className="btn secondary">
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
