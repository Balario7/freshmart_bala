import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Login from './pages/Login';
import OrderSuccess from './pages/OrderSuccess';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { CartContext } from './context/CartContext';
import { getProductsApi } from './api/fakeApi';

const theme = createTheme({
  palette: {
    primary: { main: '#4CAF50' },
    secondary: { main: '#45a049' },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const displayProducts = async () => {
      const result = await getProductsApi();
      if (result.success) {
        console.log('All Products:');
        result.data.forEach(product => {
          console.log(`ID: ${product.id}, Name: ${product.name}, Price: ₹${product.price}, Category: ${product.category}`);
        });
      }
    };
    displayProducts();
  }, []);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      const updated = existing
        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev => {
      const updated = quantity <= 0
        ? prev.filter(i => i.id !== id)
        : prev.map(i => i.id === id ? { ...i, quantity } : i);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          {isLoggedIn ? (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
            </>
          ) : (
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </BrowserRouter>
      </CartContext.Provider>
    </ThemeProvider>
  );
}

export default App;
