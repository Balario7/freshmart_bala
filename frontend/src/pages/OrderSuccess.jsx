import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Divider } from '@mui/material';
import { CheckCircle, Home } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;

  if (!orderData) {
    navigate('/');
    return null;
  }

  const { orderId, orderDate, deliveryDate, address, cart, total } = orderData;

  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: '80vh' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'success.main' }}>
          Order Placed Successfully!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Thank you for shopping with FreshMart
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Order Details</Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1"><strong>Order ID:</strong> {orderId}</Typography>
            <Typography variant="body1"><strong>Order Date:</strong> {orderDate}</Typography>
            <Typography variant="body1"><strong>Expected Delivery:</strong> {deliveryDate}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Delivery Address</Typography>
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body1">{address.fullName}</Typography>
            <Typography variant="body1">{address.phone}</Typography>
            <Typography variant="body1">{address.street}</Typography>
            <Typography variant="body1">{address.city}, {address.state} - {address.pincode}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Order Summary</Typography>
          {cart.map(item => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>{item.name} ({item.quantity}x)</Typography>
              <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <Typography variant="h6">Total Amount:</Typography>
            <Typography variant="h6" color="primary">₹{total.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center' }}>
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<Home />}
          onClick={() => navigate('/')}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default OrderSuccess;