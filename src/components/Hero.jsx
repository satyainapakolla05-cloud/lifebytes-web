import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = ({ lang }) => {
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
        
        {loading ? (
          <p className="loading">Loading stories...</p>
        ) : (
          blogs.map((blog) => (
              <div className="flex justify-center px-4 mb-10">
          <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
             <div className="w-full md:w-1/2 h-64 md:h-80 overflow-hidden">
                 <img src={blog.imageUrl}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>

           <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
             <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
               { lang === 'తెలుగు' ? blog.titletelugu : blog.titleenglish}
               </h2>
               <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                {lang === 'తెలుగు' ?  blog.contenttelugu.substring(0,20) + "..." : blog.contentenglish.substring(0,20)+ "..."}
               
                </p>
               <Link to={`/blog/${blog.id}`} className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Read Full Story →<span className="text-xl"></span>
               </Link>
            </div>
             </div>
              </div>
          ))
            
        )}
      
    </div>
  );
};

export default Hero;