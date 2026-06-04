import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { Toaster } from './components/Toast';
import AuthModal from './components/AuthModal';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen font-body transition-colors">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Toaster />
        <AuthModal />
      </div>
    </ThemeProvider>
  );
}
