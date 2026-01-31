import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // ఇక్కడ మీ పోర్ట్ 44351 అని కన్ఫర్మ్ చేసుకోండి
    axios.get(`https://localhost:44351/api/posts/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!blog) return <div className="p-20 text-center">Loading Story...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 bg-white min-h-screen">
      <Link to="/" className="text-blue-500 font-semibold mb-6 inline-block">← Back to Home</Link>
      
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>

      <img 
        src={blog.img || "/images/p2s.png"} 
        alt={blog.title} 
        className="w-full h-auto rounded-3xl shadow-2xl mb-10 object-cover max-h-[500px]" 
      />

      {/* ఇక్కడ whiteSpace: 'pre-line' వాడటం వల్ల పేరాగ్రాఫ్‌లు సరిగ్గా వస్తాయి */}
      <div 
        className="text-gray-800 text-xl leading-relaxed space-y-6" 
        style={{ whiteSpace: 'pre-line', fontFamily: 'serif' }}
      >
        {blog.content}
      </div>

      <div className="mt-12 p-6 bg-gray-50 border-l-8 border-blue-600 rounded-r-xl">
        <p className="italic text-gray-700 text-lg">
          "Success is not an overnight miracle... కష్టపడండి, ఆ కిక్ కోసం వెయిట్ చేయండి!"
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;