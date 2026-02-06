import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', phoneNumber: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ప్రస్తుతానికి సింపుల్ లాగిన్ (Email & Phone)
      const response = await axios.get(import.meta.env.VITE_API_BASE_URL+'/vendor/all');
      const vendor = response.data.find(v => v.email === credentials.email && v.phoneNumber === credentials.phoneNumber);

      if (vendor) {
        if (vendor.isApproved) {
          // వెండర్ వివరాలను LocalStorage లో సేవ్ చేయడం
          localStorage.setItem('vendorInfo', JSON.stringify(vendor));
          navigate('/vendor-dashboard');
        } else {
          setError('మీ అకౌంట్ ఇంకా అడ్మిన్ అప్రూవల్ లో ఉంది. దయచేసి వేచి ఉండండి.');
        }
      } else {
        setError('వివరాలు సరిపోలలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.');
      }
    } catch (err) {
      setError('సర్వర్ సమస్య. కాసేపటి తర్వాత ప్రయత్నించండి.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">వెండర్ లాగిన్</h2>
        
        {error && <p className="mb-4 text-center text-red-500 font-medium">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">ఈమెయిల్ అడ్రస్</label>
            <input 
              type="email" 
              name="email" 
              value={credentials.email} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">ఫోన్ నెంబర్</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={credentials.phoneNumber} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="మీ రిజిస్టర్డ్ ఫోన్ నెంబర్"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
          >
            లాగిన్ అవ్వండి
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          అకౌంట్ లేదా? <span onClick={() => navigate('/vendor-register')} className="text-green-600 cursor-pointer font-bold hover:underline">రిజిస్టర్ చేసుకోండి</span>
        </p>
      </div>
    </div>
  );
};

export default VendorLogin;