import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { LocalShipping, LocalFlorist, AttachMoney, VerifiedUser } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const offers = [
  { id: '1', name: 'Premium Flour', price: 100, oldPrice: 200, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=250&h=180&fit=crop', discount: '50% OFF' },
  { id: '2', name: 'Basmati Rice', price: 126, oldPrice: 180, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=250&h=180&fit=crop', discount: '30% OFF' },
  { id: '3', name: 'Cooking Oil', price: 90, oldPrice: 150, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=250&h=180&fit=crop', discount: '40% OFF' },
  { id: '4', name: 'Spice Combo', price: 90, oldPrice: 120, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=250&h=180&fit=crop', discount: '25% OFF' },
];

const features = [
  { icon: <LocalShipping fontSize="large" />, title: 'Fast Delivery', desc: 'Same day delivery within 2 hours' },
  { icon: <LocalFlorist fontSize="large" />, title: 'Farm Fresh', desc: 'Directly sourced from farmers' },
  { icon: <AttachMoney fontSize="large" />, title: 'Best Prices', desc: 'Lowest prices guaranteed' },
  { icon: <VerifiedUser fontSize="large" />, title: 'Quality Assured', desc: 'Money back guarantee' },
];

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <Box>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 10, textAlign: 'center', background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' }}>
        <Container>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', animation: 'fadeInDown 1s' }}>Fresh Groceries at Your Doorstep</Typography>
          <Typography variant="h6" sx={{ mb: 4, animation: 'fadeInUp 1s' }}>Premium quality products with lightning-fast delivery</Typography>
          <Button variant="contained" color="secondary" size="large" onClick={() => navigate('/products')} sx={{ px: 4, py: 1.5, fontSize: '1.1rem', boxShadow: 3, '&:hover': { transform: 'scale(1.05)', transition: '0.3s' } }}>Shop Now</Button>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>🔥 Today's Special Offers</Typography>
        <Grid container spacing={3}>
          {offers.map(item => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: 6 } }}>
                <Box sx={{ position: 'relative' }}>
                  <Chip label={item.discount} color="error" sx={{ position: 'absolute', top: 10, right: 10 }} />
                  <CardMedia component="img" height="180" image={item.image} alt={item.name} />
                </Box>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>₹{item.oldPrice}</Typography>
                  <Typography variant="h6" color="primary">₹{item.price}</Typography>
                  <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={() => addToCart(item)}>Add to Cart</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>✨ Why Choose FreshMart?</Typography>
          <Grid container spacing={4}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box sx={{ textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'scale(1.1)' } }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6">{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
