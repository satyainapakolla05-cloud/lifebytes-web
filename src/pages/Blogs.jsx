import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center text-gray-500">
        Loading stories...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Latest Stories</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">No stories yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm flex-grow">
                {post.content?.slice(0, 120)}...
              </p>

              <Link
                to={`/blogs/${post.id}`}
                className="mt-5 inline-flex items-center text-indigo-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
