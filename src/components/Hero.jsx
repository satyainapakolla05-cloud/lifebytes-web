import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // మీ .NET Core API URL ఇక్కడ ఇవ్వండి
    axios.get(import.meta.env.VITE_API_BASE_URL+'/posts') 
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-wrapper">
      {/* 1. ప్రొఫెషనల్ సింగిల్ లైన్ హెడ్డింగ్ */}
      <div className="hero-header">
        <h1>Small Stories. <span>Big Meanings.</span></h1>
        <p>One thought can change your life.</p>
      </div>

      {/* 2. బ్లాగ్ లిస్ట్ - ఇమేజ్ లెఫ్ట్, టెక్స్ట్ రైట్ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12">
        {loading ? (
          <p className="loading">Loading stories...</p>
        ) : (
          blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <div className="blog-image-section">
                <img src={blog.imageUrl} />
              </div>
              <div className="blog-content-section">
                <h2>{blog.title}</h2>
                <p>{blog.slug ? blog.slug.substring(0, 150) + "..." : "No content available."}...</p>
               <Link to={`/blog/${blog.id}`} className="mt-4 inline-block text-blue-600 font-bold hover:underline">
                Read Full Story →
               </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Hero;