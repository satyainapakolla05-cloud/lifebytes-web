import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [vendor] = useState(JSON.parse(localStorage.getItem('vendorInfo')));
  const [isAdding, setIsAdding] = useState(false); // ఫార్మ్ చూపించడానికి
  const [editingId, setEditingId] = useState(null);
const [editData, setEditData] = useState({});
const navigate = useNavigate();

  // కొత్త ఐటమ్ డేటా
 const [newItem, setNewItem] = useState({
  name: '',
  price: 0,
  stockQuantity: 0,
  category: 'Veggies',
  vendorId: vendor?.id // ఇక్కడ కేవలం ఐడి మాత్రమే ఉండాలి
});

  useEffect(() => {
    if (vendor) fetchProducts();
  }, [vendor]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASE_URL+`/product/vendor/${vendor.id}`);
      setProducts(response.data);
    } catch (error) {
      console.error("డేటా లోడ్ అవ్వలేదు", error);
    }
  };

  

  const handleAddProduct = async (e) => {
  e.preventDefault();

  // Swagger లో ఉన్నట్లే అన్ని ఫీల్డ్స్ పంపాలి
  const productData = {
    name: newItem.name,
    description: "Fresh quality", 
    price: parseFloat(newItem.price),
    imageUrl: "", 
    stockQuantity: parseInt(newItem.stockQuantity),
    category: newItem.category,
    vendorId: vendor.id,
    // API ఎర్రర్ రాకుండా దీన్ని 'null' గా పంపండి
    vendor: null 
  };

  try {
    // URL లో 'api/product' కరెక్ట్ గా ఉందో లేదో చూడండి (Swagger లో ఉన్నట్లే)
    const response = await axios.post(import.meta.env.VITE_API_BASE_URL+`/product`, productData);
    
    if (response.status === 201 || response.status === 200) {
      alert("సక్సెస్! ఐటమ్ సేవ్ అయ్యింది.");
      setIsAdding(false);
      setNewItem({ name: '', price: '', stockQuantity: '', category: 'Veggies', vendorId: vendor.id });
      fetchProducts(); // కింద టేబుల్ అప్ డేట్ అవుతుంది
    }
  } catch (error) {
    console.error("Full Error Details:", error.response?.data);
    alert("సేవ్ అవ్వలేదు. కన్సోల్ ఒకసారి చెక్ చేయండి.");
  }
};


const handleEditClick = (product) => {
  setEditingId(product.id);
  setEditData({ ...product });
};

// అప్‌డేట్ చేసిన డేటాను సేవ్ చేయడానికి
const handleUpdate = async (id) => {
  try {
    // ఇక్కడ మీ PUT API ని పిలవాలి
    await axios.put(import.meta.env.VITE_API_BASE_URL+`/product/${id}`, editData);
    alert("వివరాలు అప్‌డేట్ అయ్యాయి!");
    setEditingId(null);
    fetchProducts(); // టేబుల్ రిఫ్రెష్
  } catch (error) {
    alert("అప్‌డేట్ చేయడం కుదరలేదు");
  }
};

const handleLogout = () => {
    // LocalStorage నుండి వెండర్ డేటాను తీసేయడం
    localStorage.removeItem('vendorInfo');
    // లాగిన్ పేజీకి పంపడం
    navigate('/vendor-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <nav className="bg-white shadow-md border-b px-6 py-4 flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-800">LifeBites <span className="text-green-600">Vendor</span></span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hidden md:block text-sm font-medium text-gray-600">
            Welcome, {vendor?.ownerName}
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition border border-red-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto">
        
        {/* హెడర్ మరియు బటన్ */}
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">మీ షాపు ఇన్వెంటరీ 🥬</h1>
            <p className="text-gray-500 text-sm">ఇక్కడ మీ కూరగాయల ధరలను మరియు స్టాక్‌ను మేనేజ్ చేయండి.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-green-100"
          >
            {isAdding ? '✕ Close' : '+ Add New Item'}
          </button>
        </div>

        {/* --- యాడ్ న్యూ ఐటమ్ సెక్షన్ (బటన్ నొక్కినప్పుడు వస్తుంది) --- */}
        {isAdding && (
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-10 border-2 border-green-50 animate-pulse-once">
            <h3 className="text-lg font-bold mb-6 text-gray-700">కొత్త వస్తువు వివరాలు నమోదు చేయండి</h3>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input type="text" placeholder="ఐటమ్ పేరు (టమాటా)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400" 
                value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required />
              
              <input type="number" placeholder="ధర (₹)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400" 
                value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} required />
              
              <input type="number" placeholder="స్టాక్ (kg/pcs)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400" 
                value={newItem.stockQuantity} onChange={(e) => setNewItem({...newItem, stockQuantity: e.target.value})} required />
              
              <button type="submit" className="bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                Save to Database
              </button>
            </form>
          </div>
        )}

        {/* --- ఇన్వెంటరీ టేబుల్ --- */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700 font-bold text-sm uppercase">
              <tr>
                <th className="p-4">వస్తువు పేరు</th>
                <th className="p-4">ధర (₹)</th>
                <th className="p-4">స్టాక్</th>
                <th className="p-4 text-center">చర్య</th>
              </tr>
            </thead>
           <tbody>
  {products.map((p) => (
    <tr key={p.id} className="border-b hover:bg-green-50/50 transition">
      <td className="p-4 font-semibold text-gray-700">{p.name}</td>
      
      <td className="p-4 font-bold text-green-600">
        {editingId === p.id ? (
          <input type="number" className="border p-1 w-20 rounded" value={editData.price} 
            onChange={(e) => setEditData({...editData, price: e.target.value})} />
        ) : (
          `₹${p.price}`
        )}
      </td>
      
      <td className="p-4 text-gray-600">
        {editingId === p.id ? (
          <input type="number" className="border p-1 w-20 rounded" value={editData.stockQuantity} 
            onChange={(e) => setEditData({...editData, stockQuantity: e.target.value})} />
        ) : (
          `${p.stockQuantity} kg`
        )}
      </td>
      
      <td className="p-4 text-center">
        {editingId === p.id ? (
          <button onClick={() => handleUpdate(p.id)} className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold">Save</button>
        ) : (
          <button onClick={() => handleEditClick(p)} className="text-blue-500 hover:underline font-medium">Edit</button>
        )}
      </td>
    </tr>
  ))}
</tbody>
          </table>
          {products.length === 0 && (
            <div className="p-10 text-center text-gray-400 italic">
              ఇంకా ఏమీ యాడ్ చేయలేదు. '+ Add New Item' క్లిక్ చేసి ప్రారంభించండి.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;