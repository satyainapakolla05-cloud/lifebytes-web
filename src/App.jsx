import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Hero from './components/Hero';
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import VendorRegistration from "./pages/VendorRegistration";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";

export default function App() {
  const [lang, setCurrentLang] = useState('తెలుగు');
  return (
    <BrowserRouter>
    <Navbar onLanguageChange={setCurrentLang} />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetail lang={lang} />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Hero lang={lang} />} />
           <Route path="/blog/:id" element={<BlogDetail lang={lang} />} />
           <Route path="/vendor-register" element={<VendorRegistration />} />
           <Route path="/vendor-login" element={<VendorLogin />} />
           <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    
  );
}