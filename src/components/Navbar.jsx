import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages, ChevronDown, Home } from 'lucide-react';


const Navbar = ({ onLanguageChange }) => {
   const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('తెలుగు');
 const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
 const [cartCount, setCartCount] = React.useState(0);

 React.useEffect(() => { 
   const updateCount = () => { const cart = JSON.parse(localStorage.getItem('cart')) || []; setCartCount(cart.length); };
   window.addEventListener("cartUpdated", updateCount);
   return () => window.removeEventListener("cartUpdated", updateCount); }, []);
 
  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    onLanguageChange(lang); // Parent component కి సమాచారం పంపుతుంది
    setIsOpen(false);
  };

  return (


    <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
      
      {/* Logo Section */}
      <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
        Life<span className="text-gray-900">Bites</span>
      </Link>
      {/* వెండర్ లాగిన్ బటన్ (కొత్తది) */}

      {/* Right Side Options */}
      <div className="flex items-center space-x-4 md:space-x-8">
        
        {/* Home Option - Desktop & Mobile */}
        <Link 
          to="/" 
          className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-bold transition-all"
        >
          <Home size={20} />
          <span className="hidden md:inline">Home</span>
        </Link>
      <div className="relative p-2"> <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 rounded-full"> {cartCount} </span> {/* Nee Cart Icon ikkada pettu */} <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> </div>
        {/* Language Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all font-bold text-gray-700 text-sm md:text-base"
          >
            <Languages size={18} className="text-blue-600" />
            <span>{selectedLang === 'తెలుగు' ? 'తెలుగు' : 'English'}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => { handleLangChange('తెలుగు'); setIsOpen(false); }}
                className="w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 font-bold text-gray-800"
              >
                తెలుగు
              </button>
              <button 
                onClick={() => { handleLangChange('English'); setIsOpen(false); }}
                className="w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors font-bold text-gray-800"
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;