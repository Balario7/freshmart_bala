import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, CircularProgress } from '@mui/material';
import { useCart } from '../context/CartContext';
import { getProductsApi } from '../api/fakeApi';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsApi();
        console.log('Products API response:', response);
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.success === false) {
          console.error('API returned error:', response);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 6, minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6, minHeight: '70vh' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>Our Products</Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
              <CardMedia component="img" height="180" image={product.image} alt={product.name} />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>{product.name}</Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>₹{product.price}</Typography>
                </Box>
                <Button fullWidth variant="contained" size="large" onClick={() => addToCart(product)} sx={{ '&:hover': { transform: 'scale(1.05)', transition: '0.2s' } }}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
