import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages, ChevronDown, Home } from 'lucide-react';

const Navbar = () => {
  const [lang, setLang] = useState('Telugu');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
      
      {/* Logo Section */}
      <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
        Life<span className="text-gray-900">Bites</span>
      </Link>

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

        {/* Language Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all font-bold text-gray-700 text-sm md:text-base"
          >
            <Languages size={18} className="text-blue-600" />
            <span>{lang}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => { setLang('Telugu'); setIsOpen(false); }}
                className="w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 font-bold text-gray-800"
              >
                తెలుగు
              </button>
              <button 
                onClick={() => { setLang('English'); setIsOpen(false); }}
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