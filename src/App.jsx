import { BrowserRouter, Routes, Route,Outlet  } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import BlogDetail from "./pages/BlogDetail";

export default function App() {
  return (
    <BrowserRouter>
    
    <Navbar /> {/* 👈 ADD HERE */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <main className="min-h-screen">
  <Outlet />
</main>
       <Footer />
    </BrowserRouter>
  );
}
