import React, { useState, useEffect } from 'react';
 import axios from 'axios'; 
 import { useNavigate } from 'react-router-dom';
  import Hero from "../components/Hero";
  import VendorStore from './VendorStore';

const Home = ({ lang }) => { 
const [vendors, setVendors] = useState([]);
const navigate = useNavigate();

useEffect(() => { 
  const fetchVendors = async () => { 
    try
     {
       const response = await axios.get(import.meta.env.VITE_API_BASE_URL+'/vendor/all');
        setVendors(response.data);
     }
      catch (error)
       {
         console.error("Vendors load error");
         } }; fetchVendors(); 
        }, 
    []);

return ( 
//{/* <div> <Hero lang={lang} />  */}
<div className="max-w-7xl mx-auto p-10">
   <h2 className="text-2xl font-bold mb-8 text-center">Visit Our Local Shops</h2> 
   <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
     {
     vendors.map(v => ( <div key={v.id} onClick={() => navigate(`/vendor-store/${v.id}`)} 
     className="cursor-pointer bg-white p-6 rounded-3xl shadow hover:shadow-lg border text-center">
       <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"> 
        {v.shopName.charAt(0)} </div> 
        <h3 className="font-bold">{v.shopName}</h3> 
        </div> 
        )
      )} 
      </div>
       </div> 
       //</div> 
       );
       };

export default Home;