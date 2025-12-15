import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Divider, CircularProgress, TextField, Stepper, Step, StepLabel } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitOrderApi } from '../api/fakeApi';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const steps = ['Review Order', 'Delivery Address', 'Confirm Order'];

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 30 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  return (
    <Container sx={{ py: 6, minHeight: '70vh' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>Your cart is empty</Typography>
          <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={() => window.location.href='/products'}>Start Shopping</Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cart.map(item => (
              <Card key={item.id} sx={{ mb: 2, transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', borderRadius: 8 }} />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography color="text.secondary">₹{item.price}/unit</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Remove />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="h6" color="primary">₹{(item.price * item.quantity).toFixed(2)}</Typography>
                      <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 80, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Order Summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>₹{subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                  <Typography>Delivery Fee:</Typography>
                  <Typography>₹{deliveryFee}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                  <Typography>Tax (5%):</Typography>
                  <Typography>₹{tax.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">₹{total.toFixed(2)}</Typography>
                </Box>
                <Button fullWidth variant="contained" size="large" onClick={() => { setOpen(true); setActiveStep(0); }} sx={{ py: 1.5, fontSize: '1.1rem', '&:hover': { transform: 'scale(1.02)', transition: '0.2s' } }}>Proceed to Checkout</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent>
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>Review Your Order</Typography>
              {cart.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.name} ({item.quantity}x)</Typography>
                  <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>₹{subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Delivery Fee:</Typography>
                <Typography>₹{deliveryFee}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax (5%):</Typography>
                <Typography>₹{tax.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">₹{total.toFixed(2)}</Typography>
              </Box>
            </Box>
          )}
          
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Delivery Address</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={address.fullName}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={address.phone}
                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    required
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="State"
                    value={address.state}
                    onChange={(e) => setAddress({...address, state: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="PIN Code"
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Confirm Order</Typography>
              <Typography variant="body2" gutterBottom><strong>Order ID:</strong> #FM{Date.now()}</Typography>
              <Typography variant="body2" gutterBottom><strong>Order Date:</strong> {new Date().toLocaleDateString('en-GB')}</Typography>
              <Typography variant="body2" gutterBottom><strong>Expected Delivery:</strong> {(() => {
                const orderDate = new Date();
                const deliveryDate = new Date(orderDate);
                const randomDays = Math.floor(Math.random() * 7) + 7; // 7-14 days (1-2 weeks)
                deliveryDate.setDate(orderDate.getDate() + randomDays);
                
                // If delivery goes to next month, adjust to stay in same month
                if (deliveryDate.getMonth() !== orderDate.getMonth()) {
                  const lastDayOfMonth = new Date(orderDate.getFullYear(), orderDate.getMonth() + 1, 0).getDate();
                  const maxDaysInMonth = lastDayOfMonth - orderDate.getDate();
                  if (maxDaysInMonth >= 7) {
                    deliveryDate.setDate(orderDate.getDate() + Math.min(14, maxDaysInMonth));
                  } else {
                    deliveryDate.setDate(orderDate.getDate() + 7);
                  }
                }
                
                return deliveryDate.toLocaleDateString('en-GB');
              })()}</Typography>
              
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle1" gutterBottom><strong>Delivery Address:</strong></Typography>
                <Typography>{address.fullName}</Typography>
                <Typography>{address.phone}</Typography>
                <Typography>{address.street}</Typography>
                <Typography>{address.city}, {address.state} - {address.pincode}</Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom><strong>Order Summary:</strong></Typography>
                {cart.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{item.name} ({item.quantity}x)</Typography>
                    <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <Typography>Total Amount:</Typography>
                  <Typography color="primary">₹{total.toFixed(2)}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
          {activeStep > 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)} disabled={loading}>Back</Button>
          )}
          {activeStep < 2 ? (
            <Button 
              variant="contained" 
              onClick={() => {
                if (activeStep === 1) {
                  const isAddressValid = Object.values(address).every(field => field.trim() !== '');
                  if (!isAddressValid) {
                    alert('Please fill all address fields');
                    return;
                  }
                }
                setActiveStep(activeStep + 1);
              }}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="contained" 
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  const user = JSON.parse(localStorage.getItem('user') || '{}');
                  const orderData = {
                    email: user.email || 'guest@freshmart.com',
                    items: cart.map(item => ({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: item.quantity
                    })),
                    totalPrice: total
                  };
                  const response = await submitOrderApi(orderData);
                  const orderDate = new Date();
                  const deliveryDate = new Date(orderDate);
                  const randomDays = Math.floor(Math.random() * 7) + 7; // 7-14 days
                  deliveryDate.setDate(orderDate.getDate() + randomDays);
                  
                  // Keep delivery in same month
                  if (deliveryDate.getMonth() !== orderDate.getMonth()) {
                    const lastDayOfMonth = new Date(orderDate.getFullYear(), orderDate.getMonth() + 1, 0).getDate();
                    const maxDaysInMonth = lastDayOfMonth - orderDate.getDate();
                    if (maxDaysInMonth >= 7) {
                      deliveryDate.setDate(orderDate.getDate() + Math.min(14, maxDaysInMonth));
                    } else {
                      deliveryDate.setDate(orderDate.getDate() + 7);
                    }
                  }
                  
                  const orderSuccessData = {
                    orderId: response.orderId,
                    orderDate: orderDate.toLocaleDateString('en-GB'),
                    deliveryDate: deliveryDate.toLocaleDateString('en-GB'),
                    address,
                    cart,
                    total
                  };
                  localStorage.removeItem('cart');
                  navigate('/order-success', { state: orderSuccessData });
                } catch (error) {
                  alert('Order failed. Please try again.');
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Order'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
