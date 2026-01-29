import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "16px 32px", borderBottom: "1px solid #eee" }}>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>LifeBytes</h2>

        <div style={{ display: "flex", gap: "16px" }}>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}
