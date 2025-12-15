import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#333', color: 'white', py: 4, mt: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>FreshMart</Typography>
            <Typography variant="body2">Your trusted partner for fresh groceries delivered to your doorstep.</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#4CAF50' } }}>Home</Link>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#4CAF50' } }}>Products</Link>
            <Link href="/cart" color="inherit" display="block" sx={{ '&:hover': { color: '#4CAF50' } }}>Cart</Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Legal</Typography>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1, '&:hover': { color: '#4CAF50' } }}>Terms & Conditions</Link>
            <Link href="/refund" color="inherit" display="block" sx={{ '&:hover': { color: '#4CAF50' } }}>Refund Policy</Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Facebook sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { color: '#4CAF50', transform: 'scale(1.2)' } }} />
              <Twitter sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { color: '#4CAF50', transform: 'scale(1.2)' } }} />
              <Instagram sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { color: '#4CAF50', transform: 'scale(1.2)' } }} />
              <YouTube sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { color: '#4CAF50', transform: 'scale(1.2)' } }} />
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4, pt: 2, borderTop: '1px solid #555' }}>
          © 2024 FreshMart. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
