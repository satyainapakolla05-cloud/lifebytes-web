import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <h3>{post.title}</h3>

      <p className="excerpt">
        {post.content.slice(0, 120)}...
      </p>

      <div className="card-footer">
        <span className="read-time">⏱ 2 min read</span>
        <Link to={`/blogs/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </div>
  );
}
