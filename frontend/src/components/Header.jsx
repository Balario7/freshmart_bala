import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart, LocalFlorist } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <LocalFlorist sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold', '&:hover': { opacity: 0.8 } }} onClick={() => navigate('/')}>
          FreshMart
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/products')} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>Products</Button>
        <Button color="inherit" onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>Logout</Button>
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
