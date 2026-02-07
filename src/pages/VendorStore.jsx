import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const VendorStore = () => { 
const { id } = useParams();
 const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState(''); 
  const [loading, setLoading] = useState(true);


useEffect(() => 
    { 
        const fetchStoreData = async () => { 
            try 
            { 
                const prodRes = await axios.get(import.meta.env.VITE_API_BASE_URL+'/product/vendor/'+id);
                 setProducts(prodRes.data); 
                 const vendorRes = await axios.get(import.meta.env.VITE_API_BASE_URL+'/vendor/'+id); 
                 setShopName(vendorRes.data.shopName);
                 setLoading(false); } catch (error)
                  {
                     console.error("Error loading store:", error); 
                     setLoading(false); } }; 
                     fetchStoreData();
                     }, 
                     
                     [id]
                    );
const addToCart = (product) => { const existingCart = JSON.parse(localStorage.getItem('cart')) || []; 
    const itemIndex = existingCart.findIndex(item => item.id === product.id);
     if (itemIndex > -1) { existingCart[itemIndex].quantity += 1; } else { existingCart.push({ ...product, quantity: 1 }); }
                    localStorage.setItem('cart', JSON.stringify(existingCart));
                   window.dispatchEvent(new Event("cartUpdated")); };
if (loading) return <div className="text-center py-20">Loading Store...</div>;

return (
    <div className="p-10"> <h1 className="text-3xl font-bold mb-5">{shopName}</h1> <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {products.map(p => ( <div key={p.id} className="border p-5 rounded-xl shadow"> <h3 className="font-bold text-xl">{p.name}</h3> <p className="text-green-600 font-bold">Price: ₹{p.price}</p> <p className="text-gray-500 text-sm">Stock: {p.stockQuantity} kg</p> 
    <button className="mt-3 bg-black text-white px-4 py-2 rounded" onClick={() => addToCart(p)}>Add to Cart</button> </div> ))} </div> </div>
); };

export default VendorStore;