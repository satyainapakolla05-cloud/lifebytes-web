import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, ThumbsUp, Share2, MessageCircle } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoved, setIsLoved] = useState(false);

  useEffect(() => {
    // ఇక్కడ మీ పోర్ట్ 44351 అని కన్ఫర్మ్ చేసుకోండి
    axios.get(import.meta.env.VITE_API_BASE_URL+`/posts/${id}`)
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
<div className="flex items-center space-x-8 py-6 border-t border-b border-gray-100 mt-10">
        
        {/* Like Button */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center space-x-2 transition-all duration-300 ${isLiked ? 'text-blue-600 scale-110' : 'text-gray-500 hover:text-blue-500'}`}
        >
          <ThumbsUp size={24} fill={isLiked ? "currentColor" : "none"} />
          <span className="font-semibold">{isLiked ? 'Liked' : 'Like'}</span>
        </button>

        {/* Love Button (Instagram Style) */}
        <button 
          onClick={() => setIsLoved(!isLoved)}
          className={`flex items-center space-x-2 transition-all duration-300 ${isLoved ? 'text-red-500 scale-110' : 'text-gray-500 hover:text-red-400'}`}
        >
          <Heart size={24} fill={isLoved ? "currentColor" : "none"} />
          <span className="font-semibold">{isLoved ? 'Loved' : 'Love'}</span>
        </button>

        {/* Comment Link */}
        <div className="flex items-center space-x-2 text-gray-500 cursor-pointer hover:text-gray-800">
          <MessageCircle size={24} />
          <span className="font-semibold">Comment</span>
        </div>

        {/* Share Link */}
        <div className="flex items-center space-x-2 text-gray-500 cursor-pointer hover:text-green-600">
          <Share2 size={24} />
          <span className="font-semibold">Share</span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;