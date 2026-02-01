import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, ThumbsUp, Share2, MessageCircle } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Like count state
  const [comments, setComments] = useState([]); // Comments list
  const [commentInput, setCommentInput] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    // ఇక్కడ మీ పోర్ట్ 44351 అని కన్ఫర్మ్ చేసుకోండి
    axios.get(import.meta.env.VITE_API_BASE_URL+`/posts/${id}`)
      .then(res => {
        setBlog(res.data);
       const count = res.data.likes !== undefined ? res.data.likes : res.data.Likes;
            setLikeCount(count || 0);// Backend నుండి వచ్చే లైక్స్
      })
      .catch(err => console.log(err));
  }, [id]);

  // WhatsApp Share Function
  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const message = `Check out this blog: ${blog.title} - ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

 const handleLike = async () => {
    try {
        // Ippudu already like ayyi unte thagginchali (false), lekapothe penchali (true)
        const nextAction = !isLiked; 

        const res = await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/posts/${id}/like?isIncrement=${nextAction}`
        );
        
        if (res.data && res.data.likes !== undefined) {
            setLikeCount(res.data.likes); // Backend nundi vacchina updated count
            setIsLiked(nextAction); // Heart color change avvadaniki state toggle
        }
    } catch (err) {
        console.error("Like error:", err);
    }
};

  const addComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  if (!blog) return <div className="p-20 text-center">Loading Story...</div>;

  return (
   <div className="max-w-4xl mx-auto p-6 md:p-12 bg-white min-h-screen">
      <Link to="/" className="text-blue-500 font-semibold mb-6 inline-block">Back to Home</Link>
      
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>

      {/* Action Buttons: Like & Share */}
      <img 
        src={blog.img || "/images/p2s.png"} 
        alt={blog.title}
        className="w-full h-auto rounded-3xl shadow-2xl mb-10 object-cover max-h-[300px]"
      />

      <div 
        className="text-gray-800 text-xl leading-relaxed space-y-6"
        style={{ whiteSpace: 'pre-line', fontFamily: 'serif' }}
      >
        {blog.content}
      </div>

      {/* --- Action Bar: Like, Comment Count, Share --- */}
<div className="flex items-center gap-8 py-6 mt-8 border-y border-gray-100">
  
  {/* Like Button */}
  <button 
  onClick={handleLike} 
  className="flex items-center gap-2 transition-all active:scale-90"
>
  <Heart 
    size={26} 
    // isLiked true unte fill (red), lekapothe khali (none)
    fill={isLiked ? "#ef4444" : "none"} 
    // isLiked true unte border red, lekapothe gray/black
    color={isLiked ? "#ef4444" : "#374151"} 
  />
  <span className={`font-bold text-lg ${isLiked ? "text-red-500" : "text-gray-700"}`}>
    {likeCount}
  </span>
</button>

 {/* Comment Icon - దీని మీద క్లిక్ చేస్తే ఓపెన్ అవుతుంది */}
      <button 
        onClick={() => {
          console.log("Comment button clicked!"); // ఇది చెక్ చేయడానికి
          setShowCommentInput(!showCommentInput);
        }} 
        className={`flex items-center gap-2 transition-colors ${showCommentInput ? "text-blue-600" : "text-gray-700"}`}
      >
        <MessageCircle size={24} />
        <span className="font-semibold">{comments?.length || 0}</span>
      </button>

  {/* WhatsApp Share Button */}
  <button 
    onClick={shareOnWhatsApp} 
    className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition"
  >
    <Share2 size={24} />
    <span className="font-semibold">Share</span>
  </button>
</div>

{/* --- Toggle అయ్యే కామెంట్ బాక్స్ --- */}
     {showCommentInput && (
      <div className="mt-4 p-4 bg-gray-50 rounded-2xl flex items-center gap-3 animate-in fade-in duration-300">
        <input 
          type="text" 
          autoFocus 
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-white border border-gray-200 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={addComment}
          className="text-blue-600 font-bold px-3"
        >
          Post
        </button>
      </div>
    )}
    {/* --- కామెంట్ల లిస్ట్ --- */}
    <div className="mt-6 space-y-3 px-2">
      {comments && comments.length > 0 ? (
        comments.map((c, i) => (
          <div key={i} className="text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm">
            {c}
          </div>
        ))
      ) : (
        showCommentInput && <p className="text-gray-400 text-sm ml-4">No comments yet. Be the first!</p>
      )}
    </div>
    </div>
  );
};

export default BlogDetail;