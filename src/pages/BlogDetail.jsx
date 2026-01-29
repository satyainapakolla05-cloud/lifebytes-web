import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/posts";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await getPostById(id);
        console.log("API response:", res);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20">Loading story...</div>;
  }

  if (!blog) {
    return <div className="text-center mt-20">Story not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

     <p className="text-gray-500 text-sm mb-8">
  {blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""}
</p>

      <div className="prose prose-lg max-w-none">
        {blog.content}
      </div>
    </div>
  );
}
