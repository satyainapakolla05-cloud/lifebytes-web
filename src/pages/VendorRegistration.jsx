import React, { useState } from 'react';
import axios from 'axios';

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gstNumber: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // మీ రైల్వే API URL ఇక్కడ ఇవ్వండి
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL+'/vendor/register', formData);
      if (response.status === 200) {
        setMessage('రిజిస్ట్రేషన్ విజయవంతమైంది! అడ్మిన్ అప్రూవల్ కోసం వేచి చూడండి.');
        setFormData({ shopName: '', ownerName: '', email: '', phoneNumber: '', address: '', gstNumber: '' });
      }
    } catch (error) {
      setMessage('రిజిస్ట్రేషన్ విఫలమైంది. మళ్ళీ ప్రయత్నించండి.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">వెండర్ రిజిస్ట్రేషన్</h2>
      
      {message && <p className={`mb-4 text-center ${message.includes('విజయవంతం') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="shopName" placeholder="షాపు పేరు" value={formData.shopName} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" />
        <input type="text" name="ownerName" placeholder="యజమాని పేరు" value={formData.ownerName} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" />
        <input type="email" name="email" placeholder="ఈమెయిల్" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" />
        <input type="text" name="phoneNumber" placeholder="ఫోన్ నెంబర్" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" />
        <textarea name="address" placeholder="షాపు అడ్రస్" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"></textarea>
        <input type="text" name="gstNumber" placeholder="GST నెంబర్ (ఉంటే)" value={formData.gstNumber} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" />
        
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition duration-300">
          రిజిస్టర్ చేయండి
        </button>
      </form>
    </div>
  );
};

export default VendorRegistration;